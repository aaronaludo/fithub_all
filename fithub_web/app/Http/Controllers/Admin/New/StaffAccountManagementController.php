<?php

namespace App\Http\Controllers\Admin\New;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StaffAccountManagementController extends Controller
{
    public function index()
    {
        return view('admin.staffaccountmanagement.index');
    }
}
