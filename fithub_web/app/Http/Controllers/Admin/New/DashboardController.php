<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Feedback;

class DashboardController extends Controller
{
    public function index()
    {
        $gym_members_count = User::where('role_id', 3)->count();
        $staffs_count = User::where('role_id', 2)->count();
        $feedbacks_count = Feedback::count();
        $gym_members = User::where('role_id', 3)->limit(10)->get();

        return view('admin.dashboard.index', compact('gym_members_count', 'staffs_count', 'feedbacks_count', 'gym_members'));
    }
}
