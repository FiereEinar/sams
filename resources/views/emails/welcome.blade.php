<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 40px;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; padding: 40px; text-align: center;">
        <h1 style="color: #6366f1; margin-bottom: 16px;">🎉 Welcome Aboard!</h1>
        <p style="font-size: 18px; margin-bottom: 8px;">
            Your organization <strong>{{ $organizationName }}</strong> is now active!
        </p>
        <p style="color: #94a3b8; margin-bottom: 8px;">
            Plan: <strong style="color: {{ $plan === 'premium' ? '#a78bfa' : '#94a3b8' }}; text-transform: uppercase;">{{ $plan }}</strong>
        </p>
        <p style="color: #94a3b8; margin-bottom: 32px;">
            Your workspace is ready to use. Click the button below to log in and get started.
        </p>
        <a href="{{ $loginUrl }}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Go to Your Dashboard
        </a>
        <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
            If the button doesn't work, copy and paste this link: {{ $loginUrl }}
        </p>
    </div>
</body>
</html>
