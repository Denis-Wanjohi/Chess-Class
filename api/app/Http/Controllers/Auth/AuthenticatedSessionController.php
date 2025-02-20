<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        $request->authenticate();

        // $request->session()->regenerate();

        $user = Auth::user();

        return response([
            'user'=> $user,
            'token'=> $user->createToken('Auth')->plainTextToken
        ],200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        // Optionally, you can return a response
        return response()->json(['message' => 'Logged out successfully'], 200);

        // return response()->noContent();
    }
}
