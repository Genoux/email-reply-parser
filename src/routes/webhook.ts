import type { Request, Response } from 'express';
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';
import { parseEmailContent } from '../services/emailParser';

const router = Router();

router.post('/email', authenticateApiKey, (req: Request, res: Response) => {
  try {
    const emailData = req.body;
    
    if (!emailData.body) {
      return res.status(400).json({
        error: 'Missing email body in payload'
      });
    }
    
    const visibleText = parseEmailContent(emailData.body);
    
    res.status(200).json({
      textPlain: visibleText,
    });
  } catch (error) {
    console.error('Error processing email webhook:', error);
    res.status(500).json({
      error: 'Failed to process email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;