<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Đăng ký user (mặc định role user)
    public function registerUser(Request $request)
    {
        try {
            $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role'     => 'user',
            ]);

            $token = $user->createToken('user_token')->plainTextToken;

            return response()->json([
                'message' => 'User registered successfully',
                'token'   => $token,
                'user'    => $user->only(['id', 'name', 'email', 'role']),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // Đăng nhập chung
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.']
            ]);
        }

        // Tạo token dựa vào role
        $token = $user->createToken($user->role . '_token')->plainTextToken;

        // Xác định URL điều hướng
        $redirect = $user->role === 'admin'
            ? '/admin'
            : '/';

        return response()->json([
            'message'       => ucfirst($user->role) . ' logged in successfully',
            'token'         => $token,
            'user'          => $user->only(['id', 'name', 'email', 'role']),
            'redirect_url'  => $redirect
        ]);
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
