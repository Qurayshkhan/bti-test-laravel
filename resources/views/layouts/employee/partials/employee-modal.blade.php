<div class="modal fade" tabindex="-1" id="add_employee">
    <div class="modal-dialog  modal-dialog-centered mw-900px">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="add_and_edit_title">Add Employee</h3>

                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                    <span> <i class="text-danger bi bi-x-circle fs-1"></i></span>
                </div>
                <!--end::Close-->
            </div>

            <div class="modal-body">
                <div class="container">
                    <form id="add_employee_form">
                        @csrf
                        <input type="hidden" name="edit_employee_id" id="id" value="">
                        <!--begin::Image input-->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <!--begin::Label-->
                                    <label class="required fs-6 fw-semibold mb-2">First name</label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-solid" placeholder="Enter first name" name="first_name" id="first_name" value="">
                                    <span class="text-danger" id="error_first_name"></span>
                                    <!--end::Input-->
                                <div class="fv-plugins-message-container invalid-feedback"></div>
                            </div>
                            </div>
                            <div class="col-md-6">
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <!--begin::Label-->
                                    <label class="required fs-6 fw-semibold mb-2">Last name</label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-solid" placeholder="Enter last name" name="last_name" id="last_name" value="">
                                    <span class="text-danger" id="error_last_name"></span>
                                    <!--end::Input-->
                                <div class="fv-plugins-message-container invalid-feedback"></div>
                            </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <!--begin::Label-->
                                    <label class="required fs-6 fw-semibold mb-2">Email</label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="email" class="form-control form-control-solid" placeholder="Enter email" name="email" id="email" value="">
                                    <span class="text-danger" id="error_email"></span>
                                    <!--end::Input-->
                                <div class="fv-plugins-message-container invalid-feedback"></div>
                            </div>
                            </div>
                            <div class="col-md-6">
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <!--begin::Label-->
                                    <label class="required fs-6 fw-semibold mb-2">Phone</label>
                                    <!--end::Label-->
                                    <!--begin::Input-->
                                    <input type="text" class="form-control form-control-solid" placeholder="Enter phone" name="phone" id="phone" value="">
                                    <span class="text-danger" id="error_phone"></span>
                                    <!--end::Input-->
                                <div class="fv-plugins-message-container invalid-feedback"></div>
                            </div>
                            </div>

                        </div>


                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semibold mb-2">Select company</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <select class="form-select form-select-solid" data-control="select2" data-placeholder="Select an option" name="company_id" id="company_id">
                                <option></option>
                                @foreach ($companies as $company)
                                <option value="{{$company->id}}">{{$company->name}}</option>
                                @endforeach

                            </select>
                            <!--end::Input-->
                        <div class="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                        <!--end::Image input-->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary me-10" id="submit">
                                <span class="indicator-label">
                                    Submit
                                </span>
                                <span class="indicator-progress">
                                    Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    </div>
</div>
