@extends('layouts.admin')
@section('title', 'Schedules')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-between">
                <div><h2 class="title">Schedules</h2></div>
                <div class="d-flex align-items-center"><a class="btn btn-danger" href="{{ route('admin.gym-management.schedules.create') }}"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add</a></div>
            </div>
            <div class="col-lg-12 mb-20">
                <div class="box">
                    <div class="row">
                            <div class="col-lg-10">
                                <form action="{{ route('admin.gym-management.schedules') }}" method="GET" class="d-flex">
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
                                        <th>Image</th>
                                        <th>Is Enabled</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody>
                                        @foreach($data as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td>{{ $item->name }}</td>
                                                <td><img src="{{ asset($item->image) }}" alt="{{ $item->name }}" class="img-thumbnail me-3" style="width: 100px; height: auto;"></td>
                                                <td>{{ $item->isenabled ? 'Enabled' : 'Disabled' }}</td>
                                                <td>
                                                    <div class="d-flex">
                                                        <div class="action-button"><a href="{{ route('admin.gym-management.schedules.view', $item->id) }}" title="View"><i class="fa-solid fa-eye"></i></a></div>
                                                        <div class="action-button"><a href="{{ route('admin.gym-management.schedules.edit', $item->id) }}" title="Edit"><i class="fa-solid fa-pencil text-primary"></i></a></div>
                                                        <div class="action-button">
                                                            <form action="{{ route('admin.gym-management.schedules.delete') }}" method="POST" style="display: inline;">
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