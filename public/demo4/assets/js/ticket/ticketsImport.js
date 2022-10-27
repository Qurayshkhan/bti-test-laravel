
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toastr-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
$('#ticket_import').click(function (){
    var button = document.querySelector("#ticket_import");
    button.setAttribute("data-kt-indicator", "on");
    $.ajax({
        url: '/tickets-import',
        type: 'get',
        success: function (data) {
            button.removeAttribute("data-kt-indicator");
            if(data.status == 200){
                toastr.success(data.message);
            }
            if(data.status == 400){
                toastr.error(data.message);
            }

        }
    });
});
