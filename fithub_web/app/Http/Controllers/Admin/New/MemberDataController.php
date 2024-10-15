<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MemberDataController extends Controller
{
    public function index(Request $request)
    {
        $searchEmail = $request->email;
    
        $gym_members = User::where('role_id', 3)
            ->when($searchEmail, function ($query, $searchEmail) {
                return $query->where('email', 'like', "%{$searchEmail}%");
            })
            ->get();
    
        return view('admin.gymmanagement.memberdata', compact('gym_members'));
    }       
    public function view($id)
    {
        $gym_member = User::where('role_id', 3)->findOrFail($id);

        return view('admin.gymmanagement.memberdata-view', compact('gym_member'));
    }

    public function create()
    {
        return view('admin.gymmanagement.memberdata-create');
    }

    public function edit($id)
    {
        $gym_member = User::where('role_id', 3)->findOrFail($id);

        return view('admin.gymmanagement.memberdata-edit', compact('gym_member'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $users = new User;
        $users->role_id = 3;
        $users->status_id = 2;
        $users->first_name = $validatedData['first_name'];
        $users->last_name = $validatedData['last_name'];
        $users->address = $validatedData['address'];
        $users->phone_number = $validatedData['phone_number'];
        $users->email = $validatedData['email'];
        $users->password = bcrypt($validatedData['password']);
        $users->save();

        return redirect()->route('admin.gym-management.members')->with('success', 'Gym member added successfully');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|confirmed',
        ]);

        $gym_member = User::where('role_id', 3)->findOrFail($id);

        $gym_member->first_name = $validatedData['first_name'];
        $gym_member->last_name = $validatedData['last_name'];
        $gym_member->address = $validatedData['address'];
        $gym_member->phone_number = $validatedData['phone_number'];
        $gym_member->email = $validatedData['email'];

        if ($request->filled('password')) {
            $gym_member->password = bcrypt($validatedData['password']);
        }

        $gym_member->save();

        return redirect()->route('admin.gym-management.members')->with('success', 'Gym member updated successfully');
    }
}
