# Email Reply Parser Webhook

A simple webhook service that uses the Email Reply Parser library to parse email content and extract visible text, quoted replies, and fragments.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Build the project:
```bash
pnpm build
```

3. Start the server:
```bash
pnpm start
```

For development:
```bash
pnpm dev
```

## Usage

Send a POST request to `http://localhost:3000/webhook` with the following JSON body:

```json
{
  "emailContent": "Your email content here"
}
```

The webhook will return a JSON response with:
- `visibleText`: The main content of the email (excluding quoted replies)
- `quotedText`: The quoted replies in the email
- `fragments`: An array of email fragments with their properties (content, isQuoted, isSignature, isHidden)

## Example Response

```json
{
  "visibleText": "This is the main content of the email",
  "quotedText": "> This is a quoted reply",
  "fragments": [
    {
      "content": "This is the main content of the email",
      "isQuoted": false,
      "isSignature": false,
      "isHidden": false
    },
    {
      "content": "> This is a quoted reply",
      "isQuoted": true,
      "isSignature": false,
      "isHidden": true
    }
  ]
}
``` 