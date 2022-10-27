@extends('layouts.master')
@section('content')
    @include('layouts.company.partials.company-modal')
    <div class="container">
        @if(Session::has('status'))
        <div class="alert alert-danger">
          {{ Session::get('status')}}
        </div>
        @endif
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h3>Companies</h3>
                    <div>
                        <button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_company">Add
                            company</button>
                    </div>
                </div>
                <table id="companyTable" class="table table-row-bordered gy-5">
                    <thead>
                        <tr class="fw-semibold fs-6 text-muted">
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($companies as $company)
                        <tr>

                            <td><img src="{{asset('storage/uploads/'.$company->logo)}}" alt="" width="70px"></td>
                            <td>{{$company->name}}</td>
                            <td>{{$company->email}}</td>
                            <td>{{$company->created_at->diffForHumans()}}</td>
                            <td>
                                <div class="m-3 d-flex justify-content-center">
                                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#add_company"onclick="editCompany('{{$company->id}}' ,'{{$company->name}}', '{{$company->email}}', '{{$company->logo}}')">Edit</button>

                                    <form action="{{ route('company.destroy', ['company' => $company->id]) }}" method="POST">
                                        @csrf

                                        @method("DELETE")

                                        <button type="submit" class="btn btn-danger btn-sm"  style="margin-left: 2px">Delete</button>
                                    </form>
                                </div>
                            </td>

                        </tr>
                        @endforeach

                    </tbody>
                </table>
            </div>
        </div>

    </div>
@endsection
@section('script')
    <script>
        $("#companyTable").DataTable();
        $(document).ready(function() {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $('#add_company_form').submit(function(e) {
                e.preventDefault();
                var button = document.querySelector("#submit");
                button.setAttribute("data-kt-indicator", "on");
                let form = this;
                $.ajax({
                    type: 'POST',
                    url: "{{ route('company.store') }}",
                    data: new FormData(form),
                    processData: false,
                    contentType: false,
                    cache: false,
                    enctype: "multipart/form-data",
                    success: function(response) {
                        button.removeAttribute("data-kt-indicator");
                        toastr.success("New company add successfully");
                        $('#add_company').modal('hide');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);


                    },
                    error: function(error) {
                        button.removeAttribute("data-kt-indicator");
                        $.each(error.responseJSON.errors, function (key, value) {
                        $("#error_" + key).html(value);
                    });
                    }
                })
            });


        });

        let editCompany = (company_id, name, email, logo) =>{
            console.log(company_id)
            $('#add_and_edit_title').html("Edit Company");
            $('#id').val(company_id);
            $('#name').val(name);
            $('#email').val(email);
            $('#bg-image-edit').css("background-image", `url({{asset('storage/uploads/${logo}')}})`)
        }



    </script>
@endsection
