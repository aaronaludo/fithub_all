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
        $gym_members = User::where('role_id', 3)->count();
        $staffs = User::where('role_id', 2)->count();
        $feedbacks = Feedback::count();

        return view('admin.dashboard.index', ['gym_members' => $gym_members, 'staffs' => $staffs, 'feedbacks' => $feedbacks]);
    }
}
