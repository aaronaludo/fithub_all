<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/responsive.css') }}" />
    <title>@yield('title')</title>
</head>
<body>
    <div id="wrapper">
        <header id="header" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid p-0">
                <div id="header-logo">
                    <div class="d-flex justify-content-center align-items-center h-100 w-100">
                        {{-- <img src="assets/images/logo-with-text.png" alt="Mobvex"/> --}}
                        <h5 class="m-0" style="color: #3f1214 !important;font-weight: 1000;">Fit Hub</h5>
                    </div>
                </div>
                <a href="#" id="button-menu"><i class="fa-solid fa-bars"></i></a>
                <a href="#" id="button-menu-close"><i class="fa-solid fa-xmark"></i></a>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="{{ asset('assets/images/profile-45x45.png') }}" alt="User" title="User" class="round" /> {{ auth()->guard('admin')->user()->first_name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="{{ route('admin.edit-profile') }}">Edit Profile</a></li>
                            <li><a class="dropdown-item" href="{{ route('admin.change-password') }}">Change Password</a></li>
                            <li>
                                <form method="POST" action="{{ route('admin.logout') }}">
                                    @csrf
                                    <button type="submit" class="dropdown-item">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
        <nav id="column-left">
            <ul id="menu">
                {{-- <li><a href="{{ route('admin.dashboard.index') }}"><i class="fa-solid fa-gauge"></i> Dashboard</a></li>
                <li><a href="{{ route('admin.users.index') }}"><i class="fa-solid fa-users"></i> Users</a></li>
                <li><a href="{{ route('admin.admins.index') }}"><i class="fa-solid fa-users"></i> Admins</a></li>
                <li><a href="{{ route('admin.ride-histories.index') }}"><i class="fa-solid fa-car"></i> Ride Histories</a></li> --}}

                {{-- <li><a href="{{ route('admin.reports.index') }}"><i class="fa-solid fa-chart-simple"></i> Reports</a></li> --}}
                {{-- <li><a href="{{ route('admin.settings.index') }}"><i class="fa-solid fa-gear"></i> Settings</a></li> --}}

                {{-- new --}}
                <li>
                    <a href="{{ route('admin.dashboard.index') }}" class="{{ request()->routeIs('admin.dashboard.index') ? 'active' : '' }}">
                        <i class="fa-solid fa-gauge"></i> Dashboard
                    </a>
                </li>
                <li>
                    <a class="collapsed {{ Request::route()->getName() === 'admin.gym-management.index' || Request::route()->getName() === 'admin.gym-management.schedule' || Request::route()->getName() === 'admin.gym-management.members' ? 'active' : '' }}" data-bs-toggle="collapse" href="#gym-management-menu" role="button" aria-expanded="{{ Request::route()->getName() === 'admin.gym-management.index' || Request::route()->getName() === 'admin.gym-management.schedule' || Request::route()->getName() === 'admin.gym-management.members' ? 'true' : 'false' }}" aria-controls="gym-management-menu">
                        <i class="fa-solid fa-dumbbell"></i> Gym Management
                    </a>
                    <ul id="gym-management-menu" class="collapse {{ Request::route()->getName() === 'admin.gym-management.schedule' || Request::route()->getName() === 'admin.gym-management.members' ? 'show' : '' }}">
                        <li><a href="{{ route('admin.gym-management.schedule') }}" class="{{ Request::route()->getName() === 'admin.gym-management.schedule' ? 'active' : '' }}">Schedules</a></li>
                        <li><a href="{{ route('admin.gym-management.members') }}" class="{{ Request::route()->getName() === 'admin.gym-management.members' ? 'active' : '' }}">Members Data</a></li>
                    </ul>
                </li>
                                           
                <li>
                    <a class="collapsed {{ Request::route()->getName() === 'admin.staff-account-management.index' || Request::route()->getName() === 'admin.staff-account-management.attendances' ? 'active' : '' }}" data-bs-toggle="collapse" href="#staff-account-management-menu" role="button" aria-expanded="{{ Request::route()->getName() === 'admin.staff-account-management.index' || Request::route()->getName() === 'admin.staff-account-management.attendances' ? 'true' : 'false' }}" aria-controls="staff-account-management-menu">
                        <i class="fa-solid fa-users"></i> Staff Account Management
                    </a>
                    <ul id="staff-account-management-menu" class="collapse {{ Request::route()->getName() === 'admin.staff-account-management.index' || Request::route()->getName() === 'admin.staff-account-management.attendances' ? 'show' : '' }}">
                        <li><a href="{{ route('admin.staff-account-management.index') }}" class="{{ Request::route()->getName() === 'admin.staff-account-management.index' ? 'active' : '' }}">Overview</a></li>
                        <li><a href="{{ route('admin.staff-account-management.attendances') }}" class="{{ Request::route()->getName() === 'admin.staff-account-management.attendances' ? 'active' : '' }}">Attendances</a></li>
                    </ul>
                </li>

                <li>
                    <a href="{{ route('admin.reports.index') }}" class="{{ request()->routeIs('admin.reports.index') ? 'active' : '' }}">
                        <i class="fa-solid fa-chart-simple"></i> Reports
                    </a>
                </li>
                <li>
                    <a href="{{ route('admin.online-registrations.index') }}" class="{{ request()->routeIs('admin.online-registrations.index') ? 'active' : '' }}">
                        <i class="fa-solid fa-address-card"></i> Online Registrations
                    </a>
                </li>
                <li>
                    <a href="{{ route('admin.feedbacks.index') }}" class="{{ request()->routeIs('admin.feedbacks.index') ? 'active' : '' }}">
                        <i class="fa-solid fa-comment"></i> Feedbacks
                    </a>
                </li>                             
            </ul>
        </nav>
        <div id="content">
            @yield('content')
        </div>
        <footer>Copyright. &copy; 2024 All Rights Reserved.</footer>
    </div>
    <script type="text/javascript" src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/js/script.js') }}"></script>
</body>
</html>
