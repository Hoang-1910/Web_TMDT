<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    public function index()
    {
        return response()->json(Stock::all());
    }

    public function show($id)
    {
        return response()->json(Stock::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:stocks',
            'owner' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $stock = Stock::create($request->only('name', 'owner', 'address'));
        return response()->json($stock, 201);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:stocks,name,' . $stock->id,
            'owner' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $stock->update($request->only('name', 'owner', 'address'));
        return response()->json($stock);
    }

    public function destroy($id)
    {
        Stock::destroy($id);
        return response()->json(['message' => 'Stock deleted']);
    }
}
