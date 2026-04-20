<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserCredentialsMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public string $loginUrl,
        public string $tenantName
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Account Credentials - '.$this->tenantName,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.user-credentials',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
