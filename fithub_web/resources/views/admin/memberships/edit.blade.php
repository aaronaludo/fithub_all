@extends('layouts.admin')
@section('title', 'Edit Membership')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-between">
                <div><h2 class="title">Edit Membership</h1></div>
            </div>
            <div class="col-lg-12">
                <div class="box">
                    <div class="row">
                        <div class="col-lg-12">
                            <form action="{{ route('admin.staff-account-management.memberships.update', $data->id) }}" method="POST" enctype="multipart/form-data">
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
                                    <label for="currency" class="col-sm-12 col-lg-2 col-form-label">Currency: <span class="required">*</span></label>
                                    <div class="col-lg-10 col-sm-12 d-flex align-items-center">
                                        <input type="text" class="form-control" id="currency" name="currency" value="{{ $data->currency }}" required/>
                                    </div>
                                </div>                  
                                <div class="mb-3 row">
                                    <label for="price" class="col-sm-12 col-lg-2 col-form-label">Price: <span class="required">*</span></label>
                                    <div class="col-lg-10 col-sm-12 d-flex align-items-center">
                                        <input type="number" class="form-control" id="price" name="price" value="{{ $data->price }}" required/>
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
