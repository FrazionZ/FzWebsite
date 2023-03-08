<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class EmailController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:'.User::class, 'confirmed'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $request->user()->update([
            'email' => $request->email,
            'email_verified_at' => null
        ]);

        $request->user()->sendEmailVerificationNotification();

        return redirect()->route('profile.index')->with('status', $this->toastResponse('success', 'Adresse Mail mis à jour, veuillez confirmer votre nouvelle adresse'));
    }
}
