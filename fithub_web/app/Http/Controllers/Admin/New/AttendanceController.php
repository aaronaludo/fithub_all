<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AttendanceController extends Controller
{
    public function index()
    {
        return view('admin.attendances.index');
    }

    public function scanner()
    {
        return view('admin.attendances.scanner');
    }

    public function fetchScanner(Request $request)
    {
        $result = $request->result;
        $user = User::where('email', $result)->first();

        if ($user) {
            return response()->json(['data' => $user]);
        } else {
            return response()->json(['data' => 'No data found'], 404);
        }
    }
}
