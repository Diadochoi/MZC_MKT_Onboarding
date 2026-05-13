// Vercel Serverless Function for Notion Feedback Integration
// This function handles POST requests from the feedback form and saves data to Notion

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_URL = 'https://api.notion.com/v1';

async function addFeedbackToNotion(feedbackData) {
  const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  };

  const body = {
    parent: { database_id: DATABASE_ID },
    properties: {
      '제출자': {
        title: [
          {
            text: {
              content: feedbackData.name || '익명'
            }
          }
        ]
      },
      '이메일': {
        email: feedbackData.email || ''
      },
      '멘토': {
        select: {
          name: feedbackData.mentor || '선택안함'
        }
      },
      '피드백내용': {
        rich_text: [
          {
            text: {
              content: feedbackData.content || ''
            }
          }
        ]
      },
      '제출일': {
        date: {
          start: new Date().toISOString().split('T')[0]
        }
      },
      '상태': {
        select: {
          name: '신규'
        }
      }
    }
  };

  const response = await fetch(`${NOTION_API_URL}/pages`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Notion API error: ${error.message}`);
  }

  return await response.json();
}

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 요청 본문에서 피드백 데이터 추출
    const { name, email, mentor, content } = req.body;

    // 필수 필드 검증
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Feedback content is required' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Notion에 데이터 저장
    const result = await addFeedbackToNotion({
      name: name || 'Unknown',
      email: email.trim(),
      mentor: mentor || 'Not specified',
      content: content.trim()
    });

    // 성공 응답
    return res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      pageId: result.id
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);

    // 환경 변수 설정 확인
    if (!NOTION_API_KEY || !DATABASE_ID) {
      return res.status(500).json({
        error: 'Server configuration error: Missing Notion API credentials',
        details: 'Please set NOTION_API_KEY and NOTION_DATABASE_ID environment variables'
      });
    }

    return res.status(500).json({
      error: 'Failed to submit feedback',
      message: error.message
    });
  }
}
