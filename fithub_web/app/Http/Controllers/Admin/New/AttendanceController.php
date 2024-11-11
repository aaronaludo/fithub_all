<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->id;
    
        $data = Attendance::query()
            ->when($search, function ($query, $search) {
                return $query->where('id', 'like', "%{$search}%");
            })
            ->get();

        return view('admin.attendances.index', compact('data'));
    }

    public function scanner()
    {
        return view('admin.attendances.scanner');
    }

    public function fetchScanner(Request $request)
    {
        $result = $request->result;
    
        if (!preg_match('/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}_clock(in|out)$/', $result)) {
            return response()->json(['data' => 'Invalid format.']);
        }
        
        [$email, $type] = explode('_', $result);
        $user = User::where('email', $email)->first();
    
        if ($user) {
            $membership = $user->usermemberships()
                ->where('isapproved', 1)
                ->where('expiration_at', '>', now())
                ->latest('expiration_at')
                ->first();
    
            if ($membership) {
                $existingAttendance = Attendance::where('user_id', $user->id)
                    ->whereDate('created_at', now()->toDateString())
                    ->pluck('type')
                    ->toArray();
    
                if ($type === 'clockout' && !in_array('clockin', $existingAttendance)) {
                    return response()->json(['data' => "Clockout cannot be used without clocking in first."]);
                }
                
                if (($type === 'clockin' && in_array('clockin', $existingAttendance)) ||
                    ($type === 'clockout' && in_array('clockout', $existingAttendance))) {
                    return response()->json(['data' => "User has already clocked $type today."]);
                }
    
                $data = new Attendance;
                $data->user_id = $user->id;
                $data->type = $type;
                $data->save();
    
                return response()->json(['data' => $user->email]);
            } else {
                return response()->json(['data' => 'No valid membership found']);
            }
        } else {
            return response()->json(['data' => 'No data found']);
        }
    }     
}
