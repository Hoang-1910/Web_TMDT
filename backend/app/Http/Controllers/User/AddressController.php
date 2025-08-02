<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    // Lấy tất cả địa chỉ của một user
    public function index($user_id)
    {
        $addresses = Address::where('user_id', $user_id)->get();

        return response()->json($addresses);
    }

    // Thêm mới địa chỉ
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'recipient_name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'district' => 'required|string',
            'ward' => 'required|string',
            'is_default' => 'boolean'
        ]);

        // Nếu địa chỉ được đặt là mặc định, gỡ bỏ mặc định các địa chỉ khác
        if (!empty($validated['is_default']) && $validated['is_default']) {
            Address::where('user_id', $validated['user_id'])->update(['is_default' => false]);
        }

        $address = Address::create($validated);

        return response()->json($address, 201);
    }

    // Cập nhật địa chỉ
    public function update(Request $request, $id)
    {
        $address = Address::findOrFail($id);

        $validated = $request->validate([
            'recipient_name' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'address' => 'sometimes|string',
            'city' => 'sometimes|string',
            'district' => 'sometimes|string',
            'ward' => 'sometimes|string',
            'is_default' => 'sometimes|boolean'
        ]);

        if (isset($validated['is_default']) && $validated['is_default']) {
            Address::where('user_id', $address->user_id)->update(['is_default' => false]);
        }

        $address->update($validated);

        return response()->json($address);
    }

    // Xóa địa chỉ
    public function destroy($id)
    {
        $address = Address::findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Address deleted']);
    }

    // Đặt 1 địa chỉ là mặc định
    public function setDefault($id)
    {
        $address = Address::findOrFail($id);

        Address::where('user_id', $address->user_id)->update(['is_default' => false]);
        $address->is_default = true;
        $address->save();

        return response()->json(['message' => 'Default address set', 'address' => $address]);
    }
}
