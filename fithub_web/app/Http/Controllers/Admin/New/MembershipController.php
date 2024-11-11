<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Membership;

class MembershipController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->name;
    
        $data = Membership::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->get();

        return view('admin.memberships.index', compact('data'));
    }

    public function view($id)
    {
        $data = Membership::findOrFail($id);

        return view('admin.memberships.view', compact('data'));
    }

    public function create()
    {
        return view('admin.memberships.create');
    }

    public function edit($id)
    {
        $data = Membership::findOrFail($id);

        return view('admin.memberships.edit', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'currency' => 'required',
            'price' => 'required'
        ]);

        $data = new Membership;
        $data->name = $request->name;
        $data->currency = $request->currency;
        $data->price = $request->price;
        $data->year = $request->year;
        $data->month = $request->month;
        $data->week = $request->week;
        $data->save();

        return redirect()->route('admin.staff-account-management.memberships')->with('success', 'Membership added successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'currency' => 'required',
            'price' => 'required'
        ]);

        $data = Membership::findOrFail($id);
        $data->name = $request->name;
        $data->currency = $request->currency;
        $data->price = $request->price;
        $data->year = $request->year;
        $data->month = $request->month;
        $data->week = $request->week;
        $data->save();

        return redirect()->route('admin.staff-account-management.memberships')->with('success', 'Membership updated successfully');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:memberships,id',
        ]);

        $data = Membership::findOrFail($request->id);
        $data->delete();

        return redirect()->route('admin.staff-account-management.memberships')->with('success', 'Membership deleted successfully');
    }
}
