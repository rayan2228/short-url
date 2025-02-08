import { APP_URL, PORT } from "../../constants.js";

export function mailVerification(token) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    /* General Reset */
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }

    /* Container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* Header */
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    /* Content */
    .content {
      padding: 20px;
      text-align: center;
    }

    .content h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #007bff;
    }

    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    /* Button */
    .verify-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    a{
        color: #ffffff;
    }
    .verify-button:hover {
      background-color: #0056b3;
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 15px;
      background-color: #f4f4f4;
      font-size: 14px;
      color: #666;
    }

    .footer a {
      color: #007bff;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>Verify Your Email Address</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Welcome to Our Platform!</h2>
      <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below.</p>
      <a href="${APP_URL}:${PORT}/api/v1/users/verify/${token}" class="verify-button">Verify Email Address</a>
      <p>If you did not sign up for this account, you can safely ignore this email.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
      <p>&copy; ${new Date().getFullYear()} ShortURL. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}
