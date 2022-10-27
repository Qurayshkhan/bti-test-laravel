@extends('layouts.master')
@section('content')
    @include('layouts.employee.partials.employee-modal')
    <div class="container">
        @if(Session::has('status'))
        <div class="alert alert-danger">
          {{ Session::get('status')}}
        </div>
        @endif
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h3>Employees</h3>
                    <div>
                        <button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_employee">Add
                            employees</button>
                    </div>
                </div>
                <table id="employeeTable" class="table table-row-bordered gy-5">
                    <thead>
                        <tr class="fw-semibold fs-6 text-muted">
                            <th>Name</th>
                            <th>Email</th>
                            <th>PHONE</th>
                            <th>COMPANY</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        @foreach ($employees as $employee)
                        <tr>
                            <td>{{$employee->first_name ?? ''}} {{$employee->last_name ?? ''}}</td>
                            <td>{{$employee->email ?? ''}}</td>
                            <td>{{$employee->phone ?? ''}}</td>
                            <td>{{$employee->company->name ?? ''}}</td>
                            <td>{{$employee->created_at->diffForHumans()}}</td>
                            <td>
                                <div class="m-3 d-flex justify-content-center">
                                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#add_employee"onclick="editEmployee('{{$employee->id}}' ,'{{$employee->first_name}}','{{$employee->last_name}}' ,'{{$employee->email}}', '{{$employee->phone}}', '{{$employee->company->id ?? ''}}')">Edit</button>

                                    <form action="{{ route('employee.destroy', ['employee' => $employee->id]) }}" method="POST">
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

        $("#employeeTable").DataTable();
        $(document).ready(function() {
            $('#company_id').select2({
        dropdownParent: $('#add_employee')
    });
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $('#add_employee_form').submit(function(e) {
                e.preventDefault();
                var button = document.querySelector("#submit");
                button.setAttribute("data-kt-indicator", "on");
                let form = $('#add_employee_form').serialize();
                $.ajax({
                    type: 'POST',
                    url: "{{ route('employee.store') }}",
                    data: form,
                    success: function(response) {
                        button.removeAttribute("data-kt-indicator");
                        toastr.success("Add or Editemployee successfully");
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

        let editEmployee = (employee_id, first_name, last_name, email, phone, company_id) =>{

            $('#add_and_edit_title').html("Edit Employee");
            $('#id').val(employee_id);
            $('#first_name').val(first_name);
            $('#last_name').val(last_name);
            $('#email').val(email);
            $('#phone').val(phone);
            $('#company_id').val(company_id).trigger('change');

        }



    </script>
@endsection

