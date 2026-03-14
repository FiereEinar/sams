<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;

class PaymentController extends Controller
{
    private function isUserPaidOnCourse($userID, $courseID)
    {
        $client = new Client;
        $userPayments = Payment::where('user_id', $userID)->where('course_id', $courseID)->get();
        $PAYMONGO_SECRET = config('app.PAYMONGO_SECRET');
        $hasPayed = false;

        foreach ($userPayments as $payment) {
            $checkoutResponse = $client->request('GET', "https://api.paymongo.com/v1/checkout_sessions/{$payment->checkout_session_id}", [
                'headers' => [
                    'accept' => 'application/json',
                    'Authorization' => "Basic {$PAYMONGO_SECRET}",
                ],
                'verify' => false,
            ]);

            $checkout = json_decode($checkoutResponse->getBody(), true);

            $status = $checkout['data']['attributes']['payment_intent']['attributes']['status'] ?? null;
            if ($status === 'succeeded') {
                $hasPayed = true;
                break;
            }
        }

        return $hasPayed;
    }

    public function createACheckout(Course $course)
    {
        if ($course->price === 0 || $course->subscription_type === 'Free') {
            return redirect("/course/{$course->id}/content");
        }

        $client = new Client;
        $PAYMONGO_SECRET = config('app.PAYMONGO_SECRET');
        $currentUser = auth()->guard('web')->user();
        $userPayments = Payment::where('user_id', $currentUser->id)->where('course_id', $course->id)->get();
        $hasPayed = false;
        $activeLink = null;

        // First check all previous payments
        foreach ($userPayments as $payment) {
            $checkoutResponse = $client->request('GET', "https://api.paymongo.com/v1/checkout_sessions/{$payment->checkout_session_id}", [
                'headers' => [
                    'accept' => 'application/json',
                    'Authorization' => "Basic {$PAYMONGO_SECRET}",
                ],
                'verify' => false,
            ]);

            $checkout = json_decode($checkoutResponse->getBody(), true);

            $status = $checkout['data']['attributes']['payment_intent']['attributes']['status'] ?? null;
            $linkStatus = $checkout['data']['attributes']['status'] ?? null;
            if ($status === 'succeeded') {
                $hasPayed = true;
                break;
            }

            if ($linkStatus === 'active') {
                $activeLink = $checkout['data']['attributes']['checkout_url'];
            }
        }

        if ($hasPayed) {
            // Redirect to course content if payment succeeded
            return redirect("/course/{$course->id}/content");
        }

        if ($activeLink !== null) {
            return redirect($activeLink);
        }

        // Otherwise, create a new checkout session
        $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => json_encode([
                'data' => [
                    'attributes' => [
                        'send_email_receipt' => true,
                        'show_description' => true,
                        'show_line_items' => true,
                        'description' => 'Course payment',
                        'success_url' => config('app.url').'/course/'.$course->id,
                        'line_items' => [[
                            'currency' => 'PHP',
                            'amount' => $course->price * 100,
                            'name' => $course->title,
                            'quantity' => 1,
                        ]],
                        'payment_method_types' => ['gcash', 'paymaya'],
                    ],
                ],
            ]),
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'Authorization' => "Basic {$PAYMONGO_SECRET}",
            ],
            'verify' => false,
        ]);

        $body = json_decode($response->getBody(), true);

        $checkoutUrl = $body['data']['attributes']['checkout_url'];
        $checkoutID = $body['data']['id'];

        Payment::create([
            'user_id' => $currentUser->id,
            'course_id' => $course->id,
            'checkout_session_id' => $checkoutID,
            'amount' => $course->price,
        ]);

        return redirect()->away($checkoutUrl);
    }
}
