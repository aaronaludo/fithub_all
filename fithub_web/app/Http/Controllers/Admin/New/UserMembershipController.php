<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserMembership;

class UserMembershipController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->id;
    
        $data = UserMembership::query()
            ->when($search, function ($query, $search) {
                return $query->where('id', 'like', "%{$search}%");
            })
            ->get();

        return view('admin.user-memberships.index', compact('data'));
    }

    public function view($id)
    {
        $data = UserMembership::findOrFail($id);

        return view('admin.user-memberships.view', compact('data'));
    }

    public function isapprove(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:user_memberships,id',
            'isapproved' => 'required|integer'
        ]);

        $data = UserMembership::findOrFail($request->id);
        $data->isapproved = $request->isapproved;
        $data->save();

        return redirect()->route('admin.staff-account-management.user-memberships')->with('success', 'User Membership updated successfully');
    }
}
