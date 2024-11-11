@extends('layouts.admin')
@section('title', 'Memberships')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-between">
                <div><h2 class="title">Memberships</h2></div>
                <div class="d-flex align-items-center"><a class="btn btn-danger" href="{{ route('admin.staff-account-management.memberships.create') }}"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add</a></div>
            </div>
            <div class="col-lg-12 mb-20">
                <div class="box">
                    <div class="row">
                        <div class="col-lg-10">
                            <form action="{{ route('admin.staff-account-management.memberships') }}" method="GET" class="d-flex">
                                <div class="input-group mb-3 mb-lg-0 w-100">
                                    <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                                    <input type="text" class="form-control" name="name" placeholder="Search by Name" value="{{ request('name') }}" />
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
                                        <th>Price</th>
                                        <th>Year</th>
                                        <th>Month</th>
                                        <th>Week</th>
                                        <th>Created Date</th>
                                        <th>Updated Date</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody>
                                        @foreach($data as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td>{{ $item->name }}</td>
                                                <td>{{ $item->price }} ({{ $item->currency }})</td>
                                                <td>{{ $item->year ?? '0' }}</td>
                                                <td>{{ $item->month ?? '0' }}</td>
                                                <td>{{ $item->week ?? '0' }}</td>
                                                <td>{{ $item->created_at }}</td>
                                                <td>{{ $item->updated_at }}</td>
                                                <td>
                                                    <div class="d-flex">
                                                        <div class="action-button"><a href="{{ route('admin.staff-account-management.memberships.view', $item->id) }}" title="View"><i class="fa-solid fa-eye"></i></a></div>
                                                        <div class="action-button"><a href="{{ route('admin.staff-account-management.memberships.edit', $item->id) }}" title="Edit"><i class="fa-solid fa-pencil text-primary"></i></a></div>
                                                        <div class="action-button">
                                                            <form action="{{ route('admin.staff-account-management.memberships.delete') }}" method="POST" style="display: inline;">
                                                                @csrf
                                                                @method('DELETE')
                                                                <input type="hidden" name="id" value="{{ $item->id }}">
                                                                <button type="submit" title="Delete" style="background: none; border: none; padding: 0; cursor: pointer;">
                                                                    <i class="fa-solid fa-trash text-danger"></i>
                                                                </button>
                                                            </form>
                                                        </div> 
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