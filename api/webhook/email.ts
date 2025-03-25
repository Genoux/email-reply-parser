import type { VercelRequest, VercelResponse } from '@vercel/node';
import EmailReplyParser from 'email-reply-parser';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Email parsing service
const parseEmailContent = (emailBody: string): string => {
  const parser = new EmailReplyParser();
  const parsedEmail = parser.read(emailBody);
  const visibleText = parsedEmail.getVisibleText();
  
  // Remove newlines
  return visibleText.replace(/\r?\n/g, ' ').trim();
};

// Authentication function
const authenticate = (req: VercelRequest): boolean => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  return token === process.env.API_KEY;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  // Authenticate request
  if (!authenticate(req)) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Invalid token' 
    });
  }

  try {
    const { body } = req;
    
    if (!body?.body) {
      throw new ValidationError('Missing email body in payload');
    }
    
    // Parse the email content
    const visibleText = parseEmailContent(body.body);
    
    return res.status(200).json({
      success: true,
      textPlain: visibleText
    });
  } catch (error) {
    console.error('[Email Webhook Error]:', error);
    
    return res.status(200).json({
      success: false,
      error: error instanceof ValidationError 
        ? error.message 
        : 'Internal processing error'
    });
  }
}