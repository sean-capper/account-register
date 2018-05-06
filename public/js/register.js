$(document).ready(function() {
    $('#submit').click(() => {
        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: $('#account').serialize()
        });
    });

    $('.link-btn').click(() => {
        window.location.replace('/');
    });
});