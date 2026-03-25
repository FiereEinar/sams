<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BukSU Attendance System</h1>
        </div>
        <div class="content">
            <h2>Hello, {{ $tenantName }}!</h2>
            <p>This is an official notice regarding your <strong>{{ ucfirst($plan) }}</strong> subscription on the BukSU Attendance System.</p>
            
            <p>Your current subscription is set to expire on: <strong>{{ $expirationDate }}</strong>.</p>
            
            <p>If you are on a premium plan, please ensure your payment information is up to date to avoid any disruptions to your service. If you are on a basic plan, you may be required to renew your organization access for the next academic term.</p>

            <p>Thank you for using the BukSU Attendance System!</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} BukSU Attendance System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
