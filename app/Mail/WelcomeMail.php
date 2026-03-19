<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $organizationName,
        public string $loginUrl,
        public string $plan,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to BukSU Attendance System!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome',
            with: [
                'organizationName' => $this->organizationName,
                'loginUrl' => $this->loginUrl,
                'plan' => $this->plan,
            ],
        );
    }
}
