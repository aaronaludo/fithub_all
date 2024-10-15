<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminAccountController;
use App\Http\Controllers\Admin\AdminAdminController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminRideHistoryController;

use App\Http\Controllers\Admin\New\DashboardController as Dashboard;
use App\Http\Controllers\Admin\New\FeedbackController as Feedback;
use App\Http\Controllers\Admin\New\GymMemberAttendanceController as GymMemberAttendance;
use App\Http\Controllers\Admin\New\OnlineRegistrationController as OnlineRegistration;
use App\Http\Controllers\Admin\New\ReportController as Report;
use App\Http\Controllers\Admin\New\StaffAccountManagementController as StaffAccountManagement;
use App\Http\Controllers\Admin\New\ScheduleController as Schedule;
use App\Http\Controllers\Admin\New\MemberDataController as MemberData;
use App\Http\Controllers\Admin\New\AttendanceController as Attendance;

Route::get('/', function () {
    return redirect('/admin/login');
});

Route::get('/admin/login', [AdminAuthController::class, 'index'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.process.login');

Route::middleware(['auth:admin'])->group(function () {

    // use App\Http\Controllers\Admin\New\DashboardController as Dashboard;
    // use App\Http\Controllers\Admin\New\FeedbackController as Feedback;
    // use App\Http\Controllers\Admin\New\GymManagementController as GymManagement;
    // use App\Http\Controllers\Admin\New\GymMemberAttendanceController as GymMemberAttendance;
    // use App\Http\Controllers\Admin\New\OnlineRegistrationController as OnlineRegistration;
    // use App\Http\Controllers\Admin\New\ReportController as Report;
    // use App\Http\Controllers\Admin\New\StaffAccountManagementController as StaffAccountManagement;

    // Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard.index');

    Route::get('/admin/dashboard', [Dashboard::class, 'index'])->name('admin.dashboard.index');
    
    Route::get('/admin/feedbacks', [Feedback::class, 'index'])->name('admin.feedbacks.index');

    Route::get('/admin/gym-management', [GymManagement::class, 'index'])->name('admin.gym-management.index');
    Route::get('/admin/schedule', [Schedule::class, 'index'])->name('admin.gym-management.schedule');
    Route::get('/admin/members', [MemberData::class, 'index'])->name('admin.gym-management.members');
    
    Route::get('/admin/online-registrations', [OnlineRegistration::class, 'index'])->name('admin.online-registrations.index');
    Route::get('/admin/reports', [Report::class, 'index'])->name('admin.reports.index');

    Route::get('/admin/staff-account-management', [StaffAccountManagement::class, 'index'])->name('admin.staff-account-management.index');
    Route::get('/admin/staff-account-management/attendances', [Attendance::class, 'index'])->name('admin.staff-account-management.attendances');

    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/search', [AdminUserController::class, 'search'])->name('admin.users.search');
    Route::post('/admin/users/verify/{id}', [AdminUserController::class, 'verify'])->name('admin.users.verify');
    Route::get('/admin/users/{id}', [AdminUserController::class, 'view'])->name('admin.users.view');

    Route::get('/admin/admins', [AdminAdminController::class, 'index'])->name('admin.admins.index');
    Route::get('/admin/admins/add', [AdminAdminController::class, 'add'])->name('admin.admins.add');
    Route::get('/admin/admins/{id}', [AdminAdminController::class, 'view'])->name('admin.admins.view');
    Route::post('/admin/admins/store', [AdminAdminController::class, 'store'])->name('admin.admins.store');

    Route::get('/admin/ride-histories', [AdminRideHistoryController::class, 'index'])->name('admin.ride-histories.index');
    Route::get('/admin/ride-histories/{id}', [AdminRideHistoryController::class, 'view'])->name('admin.ride-histories.view');

    // Route::get('/admin/reports', [AdminReportController::class, 'index'])->name('admin.reports.index');

    Route::get('/admin/settings', [AdminSettingController::class, 'index'])->name('admin.settings.index');

    Route::get('/admin/change-password', [AdminAccountController::class, 'changePassword'])->name('admin.change-password');
    Route::get('/admin/edit-profile', [AdminAccountController::class, 'editProfile'])->name('admin.edit-profile');
    Route::post('/admin/update-profile', [AdminAccountController::class, 'updateProfile'])->name('admin.account.update-profile');
    Route::post('/admin/update-change-password', [AdminAccountController::class, 'updatePassword'])->name('admin.account.update_change_password');

    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});