<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class SendCodeController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->email;
        $code = str_pad((string) rand(0, 999999), 6, '0', STR_PAD_LEFT);

        Cache::put('signup_code_'.$email, $code, now()->addMinutes(15));

        Mail::to($email)->send(new VerificationCodeMail($code));

        return response()->json(['message' => 'Verification code sent successfully.']);
    }
}
