@extends('layouts.admin')
@section('title', 'Members Data')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-between">
                <div><h2 class="title">Members Data</h2></div>
                <div class="d-flex align-items-center"><a class="btn btn-danger" href="{{ route('admin.gym-management.members.create') }}"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add</a></div>
            </div>
            <div class="col-lg-12 mb-20">
                <div class="box">
                    <div class="row">
                        <div class="col-lg-10">
                            <form action="{{ route('admin.gym-management.members') }}" method="GET" class="d-flex">
                                <div class="input-group mb-3 mb-lg-0 w-100">
                                    <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                                    <input type="text" class="form-control" name="email" placeholder="Search by Email" value="{{ request('email') }}" />
                                </div>
                        </div>
                        <div class="col-lg-2">
                            <button type="submit" class="btn btn-danger w-100">Search</button>
                        </div>
                            </form>
                    </div>
                </div>
            </div>            
            <div class="col-lg-12">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif
                <div class="box">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead class="table-light">
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Created Date</th>
                                        <th>Updated Date</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody>
                                        @foreach($gym_members as $item)
                                            <tr>
                                                <td>1</td>
                                                <td>{{ $item->first_name }} {{ $item->last_name }}</td>
                                                <td>{{ $item->phone_number }}</td>
                                                <td>{{ $item->email }}</td>
                                                <td>{{ $item->created_at }}</td>
                                                <td>{{ $item->updated_at }}</td>
                                                <td>
                                                    <div class="d-flex">
                                                        <div class="action-button"><a href="{{ route('admin.gym-management.members.view', $item->id) }}" title="View"><i class="fa-solid fa-eye"></i></a></div>
                                                        <div class="action-button"><a href="{{ route('admin.gym-management.members.edit', $item->id) }}" title="Edit"><i class="fa-solid fa-pencil text-primary"></i></a></div>
                                                        {{-- <div class="action-button"><a href="#" title="Delete"><i class="fa-solid fa-trash text-danger"></i></a></div> --}}
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection