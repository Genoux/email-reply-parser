import EmailReplyParser from 'email-reply-parser';

export const parseEmailContent = (emailBody: string): string => {
  const parser = new EmailReplyParser();
  const parsedEmail = parser.read(emailBody);
  const visibleText = parsedEmail.getVisibleText();
  
  return visibleText.replace(/\r?\n/g, ' ').trim();
};