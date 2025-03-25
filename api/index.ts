import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define package info directly since JSON imports require resolveJsonModule
const pkg = {
  description: 'A simple webhook to parse email replies using email-reply-parser',
  version: '1.0.1'
};

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    app: 'Email Reply Parser',
    description: pkg.description,
    version: pkg.version,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}