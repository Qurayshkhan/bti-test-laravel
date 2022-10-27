<div class="modal fade" tabindex="-1" id="add_company">
    <div class="modal-dialog  modal-dialog-centered mw-900px">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="add_and_edit_title">Add Company</h3>

                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                    <span> <i class="text-danger bi bi-x-circle fs-1"></i></span>
                </div>
                <!--end::Close-->
            </div>

            <div class="modal-body">
                <div class="container">
                    <form id="add_company_form">
                        @csrf
                        <input type="hidden" name="edit_company_id" id="id" value="">
                        <!--begin::Image input-->
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <label class="required fs-6 fw-semibold mb-2">Logo</label>
                            <span class="text-danger mt-5" id="error_logo"></span>
                        </div>
                        <div class="image-input image-input-outline"   data-kt-image-input="true"
                            style="background-image: url(/assets/media/svg/avatars/blank.svg)">
                            <!--begin::Image preview wrapper-->
                            <div class="image-input-wrapper w-125px h-125px" id="bg-image-edit"
                                style="background-image: url(/assets/media/avatars/300-1.jpg)"></div>

                            <!--end::Image preview wrapper-->

                            <!--begin::Edit button-->
                            <label
                                class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="change" data-bs-toggle="tooltip" data-bs-dismiss="click"
                                title="Change avatar">
                                <i class="bi bi-pencil-fill fs-7"></i>

                                <!--begin::Inputs-->
                                <input type="file" name="logo" accept=".png, .jpg, .jpeg" />
                                <input type="hidden" name="logo_remove" />
                                <!--end::Inputs-->
                            </label>

                            <!--end::Edit button-->

                            <!--begin::Cancel button-->
                            <span
                                class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="cancel" data-bs-toggle="tooltip" data-bs-dismiss="click"
                                title="Cancel avatar">
                                <i class="bi bi-x fs-2"></i>
                            </span>
                            <!--end::Cancel button-->

                            <!--begin::Remove button-->
                            <span
                                class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="remove" data-bs-toggle="tooltip" data-bs-dismiss="click"
                                title="Remove avatar">
                                <i class="bi bi-x fs-2"></i>
                            </span>

                            <!--end::Remove button-->
                        </div>
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semibold mb-2">Name</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" class="form-control form-control-solid" placeholder="Enter name" name="name" id="name" value="">
                            <span class="text-danger" id="error_name"></span>
                            <!--end::Input-->
                        <div class="fv-plugins-message-container invalid-feedback"></div></div>
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semibold mb-2">Email</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="email" class="form-control form-control-solid" placeholder="Enter email" name="email" id="email" value="">
                            <span class="text-danger" id="error_email"></span>
                            <!--end::Input-->
                        <div class="fv-plugins-message-container invalid-feedback"></div></div>
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
