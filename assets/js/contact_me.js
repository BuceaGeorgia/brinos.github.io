$(function () {
    // $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    //     preventSubmit: true,
    //     submitError: function ($form, event, errors) {
    //         // additional error messages or events

    //         trackEvent('contact', {section: 'footer', status: 'validation_error'});
    //     },

    $('.contactForm').on("submit", function(e) {
        e.preventDefault();
        // submitSuccess: function ($form, event) {
            // event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            //TODO for some reason this is not working from the config file
            var url = "https://formspree.io/f/xzbnoqpn";// + "{% if site.formspree_form_path %}{{ site.formspree_form_path }}{% else %}{{ site.email }}{% endif %}";
       
            var email = $("#email").val();
            var phone = $("#phone").val();
            var name = $("#name").val();
            var message = $("textarea#message").val();
            var nn= "<?php echo $_POST['name']; ?>"
            console.log(name)
            console.log(email)
            console.log(phone)
            if(name.trim() === '' || email.trim() === '' || phone.trim() === '') {
                $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");

                    $('#success > .alert-danger').append($("<strong>").text("Please fill in all required fields."));
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    trackEvent('contact', {section: 'footer', status: 'error'});
                    return;
            }


            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            console.log("here!")

            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            console.log("here!")
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                // crossDomain: true,
                //headers: {  'Access-Control-Allow-Origin': '*' },
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,

                success: function () {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    trackEvent('contact', {section: 'footer', status: 'success'});
                },

                error: function () {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    trackEvent('contact', {section: 'footer', status: 'error'});
                },

                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                }
            });
        // },
        // filter: function () {
        //     return $(this).is(":visible");
        // },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
