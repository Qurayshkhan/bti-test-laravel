$(document).ready(function () {



    let dt = new DataTransfer(); // Allows you to manipulate the files of the input file

    $("#attachment").on('change', function(e) {
        for (var i = 0; i < this.files.length; i++) {
            let fileBloc = $('<span/>', {
                    class: 'file-block'
                }),
                fileName = $('<span/>', {
                    class: 'name',
                    text: this.files.item(i).name
                });
            fileBloc.append(fileName)
                .append(
                    '<span class="file-delete"><i class="bi bi-x fs-1 text-white close"  style="cursor:pointer"></i></span>'
                    );
            $("#filesList > #files-names").append(fileBloc);
        };
        // Adding files to the DataTransfer object

        for (let file of this.files) {
            dt.items.add(file);
        }
        // Update of the files of the input file after addition
        this.files = dt.files;

        // EventListener for delete button created
        $('span.file-delete').click(function() {
            let name = $(this).prev('span.name').text();
            console.log(name);
            // Suppress file name display
            $(this).parent().remove();
            for (let i = 0; i < dt.items.length; i++) {
                // Match file and name
                if (name === dt.items[i].getAsFile().name) {
                    // Deleting file in DataTransfer object
                    dt.items.remove(i);
                    continue;
                }
            }
            // Updating input file files after deletion
            document.getElementById('attachment').files = dt.files;
        });
    });




    $('.ticket-update-btn').click(function () {
        $('.ticket-update-btn').attr('data-kt-indicator', 'on')
        let ticket_id = $(this).attr('ticket_id');
        let user_id = $(this).attr('user_id');
        let users = $('#user-list').val();
        let is_public = parseInt(1);
        let status_id = $('.ticket-status').attr("status-id");
        var container = document.getElementById('kt_editor');
        var editor = new Quill(container);
        var delta = editor.getContents();
        var text = editor.getText();

        var justHtml = editor.root.innerHTML;
        var form = $('#ticket_update_form')[0];
        var form_data = new FormData(form);

        form_data.append('ticket_id', ticket_id);
        form_data.append('status_id', status_id);
        form_data.append('note', justHtml);
        form_data.append('text', text);
        form_data.append('user_id', user_id);
        form_data.append('cc_users', users);

        if ($('#is_public').is(":checked")) {

            is_public = parseInt(0);
        }
        form_data.append('is_public', is_public);
        $('.error_update-ticket').html('');
        $.ajax({
            url: '/ticket/update',
            type: 'POST',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: form_data,
            success: function (data) {
                $('.ticket-update-btn').removeAttr('data-kt-indicator', 'on');
                $('#is_public').prop('checked', false);
                if (data.status == 200) {
                    window.getUpdates(ticket_id);
                    dt.clearData();
                    $('#ticket_update_form')[0].reset();
                    $('#files-names').html('');
                    $('.editor').addClass('d-none');
                    $('.via-envolep').removeClass('d-none');
                    $('.write-update').removeClass('d-none');
                    toastr.success(data.message);
                }
                if(data.status == 400)
                {

                    toastr.warning(data.message);
                }
            },
            error: function (request, status, error) {
                let errors = request.responseJSON;
                $('.ticket-update-btn').removeAttr('data-kt-indicator', 'on');
                $('.editor').addClass('d-none');
                $('.via-envolep').removeClass('d-none');
                $('.write-update').removeClass('d-none');
                toastr.error(errors.errors.text);

            }
        });
    })



    const myTimeout = setTimeout(function () {

        let ticket_id_update = $('.write-update').attr('ticket_id');
        window.getUpdates(ticket_id_update);
    }, 2000);


    window.getUpdates = function getTicketUpdates(ticket_id_update) {
        clearTimeout(myTimeout);

        $.ajax({
            url: '/get/ticket/updates/' + ticket_id_update,
            type: 'get',
            success: function (data) {
                var html = '';
                if (data.length > 0) {

                    jQuery.each(data, function (index, item) {


                        let replyArea = 'd-none';

                        html += ' <div class="mt-3 p-3 main_reply" style="border: solid #f5f8fa; border-radius:3px">\n' +
                            '                                    <div>\n' +
                            '                                        <div class="d-flex flex-wrap gap-2 flex-stack cursor-pointer p-5"\n' +
                            '                                             data-kt-inbox-message="header">\n' +
                            '                                            <!--begin::Author-->\n' +
                            '                                            <div class="d-flex align-items-center">\n' +
                            '                                                <!--begin::Avatar-->\n' +
                            '                                                <div class="symbol symbol-50 me-4">\n' +
                            '                                                 <span class="symbol-label" style="">' + item.nickName + '</span>\n' +
                            '                                                </div>\n' +
                            '                                                <!--end::Avatar-->\n' +
                            '                                                <div class="pe-5">\n' +
                            '                                                    <!--begin::Author details-->\n' +
                            '                                                    <div class="d-flex align-items-center flex-wrap gap-1">\n' +
                            '                                                        <a href="#"\n' +
                            '                                                           class="fw-bold text-dark text-hover-primary">' + item.user + '</a>\n' +
                            '                                                        <!--begin::Svg Icon | path: icons/duotune/abstract/abs050.svg-->\n' +
                            '                                                        <span class="svg-icon svg-icon-7 svg-icon-success mx-3">\n' +
                            '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px"\n' +
                            '                                                             height="24px" viewBox="0 0 24 24" version="1.1">\n' +
                            '                                                            <circle fill="currentColor" cx="12" cy="12"\n' +
                            '                                                                    r="8"></circle>\n' +
                            '                                                        </svg>\n' +
                            '                                                    </span>\n' +
                            '                                                        <!--end::Svg Icon-->\n' +
                            '                                                        <span class="text-muted fw-bold">' + item.created_at_humans + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                    <!--end::Author details-->\n' +

                            '                                                    <!--begin::Preview message-->\n' +
                            '                                                    <div class="text-muted fw-semibold mw-450px d-none"\n' +
                            '                                                         data-kt-inbox-message="preview">With resrpect, i must disagree with\n' +
                            '                                                        Mr.Zinsser. We all know the most part of important part....</div>\n' +
                            '                                                    <!--end::Preview message-->\n' +
                            '                                                </div>\n' +
                            '                                            </div>\n' +
                            '                                            <!--end::Author-->\n' +
                            '                                            <!--begin::Actions-->\n' +
                            '                                            <div class="d-flex align-items-center flex-wrap gap-2">\n' +
                            '                                                <div class="d-flex">' +
                            '                                                    <span class="fw-bold text-dark text-hover-primary">' + item.created_at + '</span>' +
                            '                                               </div>\n' +
                            '                                            </div>\n' +
                            '                                            <!--end::Actions-->\n' +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                    <div>\n' +
                            '  <div class="p-5">\n' +
                            ' <span>' + item.notes + '</span>\n' +
                            ' <div> <div class="row">';
                        if (item.files.length > 0) {
                            jQuery.each(item.files, function (index, item) {
                                let tempName = item.name.split(".");
                                let fileMime = tempName[tempName.length - 1];
                                let checkImageTypes = ["gif", "jpeg", "png", "jpg"];
                                let checkFileTypes = ["txt", "pdf", "docx", "doc", "csv", "xls"];
                                if ($.inArray(fileMime, checkImageTypes) > 0) {
                                    html += ' <div class="col-sm-3" style="margin-top: 15px;"> ' +
                                        '   <a href="/ticket/file/download/' + item.id + '" class="download-file" id="' + item.id + '">' +
                                        '       <i class="bi bi-download btn btn-primary fw-bolder" style="color:white;position:absolute;margin-top: 1px;margin-left: 48px;font-size: 10px;"></i>' +
                                        '   </a>' +
                                        '   <img class="iamges-show" src="data:image/png;base64,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" style="height:100px;width:100px;"><br>' +
                                        '<span class="text-gray-400">' + item.name + '</span>' +
                                        '</div> ';
                                } else {
                                    html += '   <div class="col-sm-3"> ' +
                                        '   <a href="/ticket/file/download/' + item.id + '" class="download-file" id="' + item.id + '">' +
                                        '       <i class="bi bi-download btn btn-primary fw-bolder" style="color:white;position:absolute;margin-top: 1px;margin-left: 48px;font-size: 10px;"></i>' +
                                        '   </a>' +
                                        '       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACLCAMAAABmx5rNAAAAY1BMVEX///8AAADd3d0bGxtdXV2kpKSxsbHy8vL8/Pw/Pz/r6+vNzc0HBwd3d3eHh4fHx8fl5eU3NzcsLCxKSkq5ubkmJiarq6sUFBQyMjJVVVXW1tZkZGSXl5fBwcGBgYGdnZ1tbW0BvEbwAAACgklEQVR4nO3c3XLCIBAFYDBqMNFoNVEb05/3f8qOvQmgjuzuwbZ2z12no/0GyEIBNUaj0Wg0vyGb/dCkZ5i9Vbkk5fvSElPs2jycBVXyne3g4BL3yqKc84G2tGyKtacN1rITWOwWiqk6icUWE6BlUogs9gWIkVqsxXWT3HLs8ZZdvU5J3cQY2AAeLdPEV+wvmwY0ZuiW2aUFNIAhFnuAdBPGYjvEAAZZ7BHQMigLos5ILPtgLpPXGYllXr4EY0baMiKLcQHmIHy0ZRZTBotCYZ0RWiKMbABLLcYdfctWMoDFFlMFGEmdkVuMC7uJP2YAlngAs7sJYTFhnSm43QSxRHWmYLYMxhK1DLPOgCyQOoOyRN3EmihhFlOGRY/RMjhLVGeW9DEDtIgnSqQlwpAX5FBLNFFSF+RYS1RniBMl2BJPlCQM2hK1zK58kKW9+vtwA3D1IMuNHIKf6h+1hJmmb71mt9j0B5tuoW7CnjJa1kRL+ixJtzjqnv3VRx9jIXfSZ0aLudg9vJOcFjPQDnmyWsyk6ZZ34lW81ArDs6RkHOKpc5Ja1KIWtTzWUla8+H8VZGm3lpfuDW0pmZJzxoUTxtILLOM/9GpRy/+2CJ7pYry6BKp1/eeUl5O3Rwebjxwv/ls849yoFrWo5bksk5oX/2gEZBkKe29L48ZGx4C2VJYf9Hq3Flieef2iFrVQLI5/j9Y7RwPVuk2z4qXxziGecT5Si1rUoha1qEUtalELzZJ+Zya/ZdHOkfHOw+iWfFHL9aTeOSm5x5yEJFKM4X9kOTXpxYJ6RY2edbKFfBOLmiadYtwpK2VF+yj8PN+z1M1IknPT9PNZjux7/PcDaDQazV/KF8WrPzDMNG8GAAAAAElFTkSuQmCC" style="height:100px;width:100px;"> ' +
                                        '<span class="text-gray-400">' + item.name + '</span>' +
                                        '       </div>  ';
                                }

                            })
                        }
                        html += '    </div>   </div> ' +
                            '   </div>';


                        html += '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                </div>';
                    });
                } else {
                    html += '<div class="no_update mt-5 text-center">' +
                        '<img class="mx-auto h-150px h-lg-200px theme-light-show" src="https://preview.keenthemes.com/metronic8/laravel/demo4/media/illustrations/misc/upgrade.svg" >' +
                        '<h2 class="mt-5">No updates yet for this item</h2>' +
                        '<span class="d-flex m-auto w-50">Be the first one to update about progress, mention someone\n' +
                        'or upload files to share with your team members</span>' +
                        '</div>';
                }

                $('#ticket_updates').html(html);


            }
        });
    }


    $(document).on('click', '.submit_reply', function () {
        var formData = $(this).closest('form');
        var note = formData.find('textarea[name="note"]').val();
        var ticket_id = $('.write-update').attr('ticket_id');

        if (note !== '') {

            $.ajax({
                url: '/ticket/updates/reply',
                type: 'post',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                data: formData.serialize(),
                success: function (data) {
                    window.getUpdates(ticket_id);
                },
                error: function (request, status, error) {

                }
            });
        }

    });

    $(document).on('focus', '.reply_note', function () {
        $(this).closest('form').find('.reply_submit_btn').removeClass('d-none')
    });
    $(document).on('focusout', '.reply_note', function () {
        if ($(this).val() === '') {
            $(this).closest('form').find('.reply_submit_btn').addClass('d-none')
        }

    });

    $(document).on('click','.download-file', function(){

        let file_id = $(this).attr('id');

        $.ajax({
            url: '/ticket/file/download',
            type: 'post',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {file_id:file_id},
            success: function (data) {
                console.log(data)
                $('#test-image').attr('src',data);
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", 'file.png'); //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);


            },
            error: function (request, status, error) {

            }
        });

    });

});
