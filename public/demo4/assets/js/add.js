"use strict";
var KTModalCustomersAdd = (function () {
    var t, e, o, n, r, i;
    return {
        init: function () {
            (i = new bootstrap.Modal(
                document.querySelector("#kt_modal_add_ticket1")
            )),
                (r = document.querySelector("#kt_modal_add_ticket_form")),
                (t = r.querySelector("#kt_modal_add_ticket_submit")),
                (e = r.querySelector("#kt_modal_add_ticket_cancel")),
                (o = document.querySelector("#kt_modal_add_ticket_close")),
                (n = FormValidation.formValidation(r, {
                    fields: {
                        subject: {
                            validators: {
                                notEmpty: {
                                    message: "Subject is required",
                                },
                            },
                        },

                        customer_id: {
                            validators: {
                                notEmpty: { message: "Customer is required" },
                            },
                        },
                        type_id: {
                            validators: {
                                notEmpty: { message: "Ticket type is required" },
                            },
                        },
                        description: {
                            validators: {
                                notEmpty: { message: "Description is required" },
                            },
                        },



                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: "",
                        }),
                    },
                })),
                $(r.querySelector('[name="country"]')).on(
                    "change",
                    function () {
                        n.revalidateField("country");
                    }
                ),
                t.addEventListener("click", function (e) {
                    e.preventDefault(),
                    n &&
                    n.validate().then(function (e) {
                        if("Valid" == e){
                            t.setAttribute(
                                "data-kt-indicator",
                                "on"
                            )
                            let currentLocation=document.location;
                            var formdata = $('#kt_modal_add_ticket_form').serialize();
                            $.ajax({
                                url: '/ticket/store',
                                type: 'POST',
                                data:formdata,
                                success: function (data) {
                                    // history.replaceState({ }, "", currentLocation.origin);
                                    if(data.status === 200){
                                        t.removeAttribute( "data-kt-indicator");
                                        Swal.fire({
                                            text: data.msg,
                                            icon: "success",
                                            buttonsStyling: !1,
                                            confirmButtonText:
                                                "Ok, got it!",
                                            customClass: {
                                                confirmButton:
                                                    "btn btn-primary",
                                            },
                                        }).then(function (e) {
                                            i.hide();
                                            location.reload();
                                        });

                                    }
                                }
                            })

                        }else{
                            Swal.fire({
                                text: "Sorry, looks like there are some errors detected, please try again.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton:
                                        "btn btn-primary",
                                },
                            });
                        }

                        // console.log("validated!"),
                        //     "Valid" == e
                        //         ? (t.setAttribute(
                        //             "data-kt-indicator",
                        //             "on"
                        //         ),
                        //             (t.disabled = !0),
                        //             setTimeout(function () {
                        //                 t.removeAttribute(
                        //                     "data-kt-indicator"
                        //                 ),
                        //                     Swal.fire({
                        //                         text: "Form has been successfully submitted!",
                        //                         icon: "success",
                        //                         buttonsStyling: !1,
                        //                         confirmButtonText:
                        //                             "Ok, got it!",
                        //                         customClass: {
                        //                             confirmButton:
                        //                                 "btn btn-primary",
                        //                         },
                        //                     }).then(function (e) {
                        //                         e.isConfirmed &&
                        //                         (i.hide(),
                        //                             (t.disabled = !1),
                        //                             (window.location =
                        //                                 r.getAttribute(
                        //                                     "data-kt-redirect"
                        //                                 )));
                        //                     });
                        //             }, 2e3))
                        //         : Swal.fire({
                        //             text: "Sorry, looks like there are some errors detected, please try again.",
                        //             icon: "error",
                        //             buttonsStyling: !1,
                        //             confirmButtonText: "Ok, got it!",
                        //             customClass: {
                        //                 confirmButton:
                        //                     "btn btn-primary",
                        //             },
                        //         });
                    });
                }),
                e.addEventListener("click", function (t) {
                    t.preventDefault(),
                        Swal.fire({
                            text: "Are you sure you would like to cancel?",
                            icon: "warning",
                            showCancelButton: !0,
                            buttonsStyling: !1,
                            confirmButtonText: "Yes, cancel it!",
                            cancelButtonText: "No, return",
                            customClass: {
                                confirmButton: "btn btn-primary",
                                cancelButton: "btn btn-active-light",
                            },
                        }).then(function (t) {
                            t.value
                                ? (r.reset(), i.hide())
                                : "cancel" === t.dismiss &&
                                Swal.fire({
                                    text: "Your form has not been cancelled!.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary",
                                    },
                                });
                        });
                }),
                o.addEventListener("click", function (t) {
                    t.preventDefault(),
                        Swal.fire({
                            text: "Are you sure you would like to cancel?",
                            icon: "warning",
                            showCancelButton: !0,
                            buttonsStyling: !1,
                            confirmButtonText: "Yes, cancel it!",
                            cancelButtonText: "No, return",
                            customClass: {
                                confirmButton: "btn btn-primary",
                                cancelButton: "btn btn-active-light",
                            },
                        }).then(function (t) {
                            t.value
                                ? (r.reset(), i.hide())
                                : "cancel" === t.dismiss &&
                                Swal.fire({
                                    text: "Your form has not been cancelled!.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary",
                                    },
                                });
                        });
                });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {

    KTModalCustomersAdd.init();
});
