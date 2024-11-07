<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->name;
    
        $data = Schedule::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->get();

        return view('admin.gymmanagement.schedules', compact('data'));
    }

    public function view($id)
    {
        $data = Schedule::findOrFail($id);

        return view('admin.gymmanagement.schedules-view', compact('data'));
    }

    public function create()
    {
        return view('admin.gymmanagement.schedules-create');
    }

    public function edit($id)
    {
        $data = Schedule::findOrFail($id);

        return view('admin.gymmanagement.schedules-edit', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'isenabled' => 'required'
        ]);
    
        $data = new Schedule;
        $data->name = $request->name;
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $destinationPath = public_path('images/schedules');
            
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
    
            $image->move($destinationPath, $imageName);
            $data->image = 'images/schedules/' . $imageName;
        }
    
        $data->isenabled = $request->isenabled;
        
        $data->save();
    
        return redirect()->route('admin.gym-management.schedules')->with('success', 'Schedule added successfully');
    }    

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'isenabled' => 'required'
        ]);

        $data = Schedule::findOrFail($id);
        $data->name = $request->name;
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $destinationPath = public_path('images/schedules');
            
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
    
            $image->move($destinationPath, $imageName);
            $data->image = 'images/schedules/' . $imageName;
        }
    
        $data->isenabled = $request->isenabled;
        
        $data->save();

        return redirect()->route('admin.gym-management.schedules')->with('success', 'Schedule updated successfully');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:schedules,id',
        ]);

        $data = Schedule::findOrFail($request->id);
        $data->delete();

        return redirect()->route('admin.gym-management.schedules')->with('success', 'Schedule deleted successfully');
    }
}
