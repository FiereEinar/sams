<x-mail::message>
# Welcome, {{ $name }}!

An account has been created for you at **{{ $tenantName }}**.

Here are your login credentials:

**Email:** {{ $email }}  
**Password:** {{ $password }}

<x-mail::button :url="$loginUrl">
Login to your account
</x-mail::button>

For security reasons, we strongly recommend changing your password after your first login.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
