@extends('layouts.admin')
@section('title', 'Create Schedule')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-between">
                <div><h2 class="title">Create Schedule</h1></div>
            </div>
            <div class="col-lg-12">
                <div class="box">
                    <div class="row">
                        <div class="col-lg-12">
                            <form action="{{ route('admin.gym-management.schedules.update', $data->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @METHOD('PUT')
                                @if ($errors->any())
                                    <div class="alert alert-danger">
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif
                                <div class="mb-3 row">
                                    <label for="name" class="col-sm-12 col-lg-2 col-form-label">Name: <span class="required">*</span></label>
                                    <div class="col-lg-10 col-sm-12 d-flex align-items-center">
                                        <input type="text" class="form-control" id="name" name="name" value="{{ $data->name }}" required/>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="image" class="col-sm-12 col-lg-2 col-form-label">Image: <span class="required">*</span></label>
                                    <div class="col-lg-10 col-sm-12 d-flex align-items-center">
                                        @if($data->image)
                                            <img src="{{ asset($data->image) }}" alt="Current Image" class="img-thumbnail me-3" style="width: 100px; height: auto;">
                                        @endif
                                        <input type="file" class="form-control" id="image" name="image"/>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="isenabled" class="col-sm-12 col-lg-2 col-form-label">Status: <span class="required">*</span></label>
                                    <div class="col-lg-10 col-sm-12 d-flex align-items-center">
                                        <select class="form-control" id="isenabled" name="isenabled" required>
                                            <option value="1" {{ $data->isenabled == 1 ? 'selected' : '' }}>Enable</option>
                                            <option value="0" {{ $data->isenabled == 0 ? 'selected' : '' }}>Disabled</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center mt-5 mb-4">
                                    <button class="btn btn-danger">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
