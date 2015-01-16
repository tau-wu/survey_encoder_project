$(document).ready(function() {
	$("#access_info").hide();
	$("#error_info").hide();

	// Variable to hold request
	var request;

	// Bind to the submit event of our form
	$("#participant_form").submit( function(event) {

		//Hide the right divs
		$("#access_info").hide();
		$("#error_info").hide();

	    // Abort any pending request
	    if (request) {
	        request.abort();
	    }

	    // setup some local variables
	    var $form = $('#participant_form');

	    // Let's select and cache all the fields
	    var $inputs = $form.find("input, select, button");
	    var $data = $inputs.serialize();

	    // Let's disable the inputs for the duration of the Ajax request.
	    // Note: we disable elements AFTER the form data has been serialized.
	    // Disabled form elements will not be serialized.
	    $inputs.prop("disabled", true);

	    //CSRF Cookie madness
	    function getCookie(name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie != '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = jQuery.trim(cookies[i]);
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		}

		var csrftoken = getCookie('csrftoken');

		function csrfSafeMethod(method) {
		    // these HTTP methods do not require CSRF protection
		    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}

		function sameOrigin(url) {
		    // test that a given url is a same-origin URL
		    // url could be relative or scheme relative or absolute
		    var host = document.location.host; // host + port
		    var protocol = document.location.protocol;
		    var sr_origin = '//' + host;
		    var origin = protocol + sr_origin;
		    // Allow absolute or scheme relative URLs to same origin
		    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		        // or any other URL that isn't scheme relative or absolute i.e relative.
		        !(/^(\/\/|http:|https:).*/.test(url));
		}

		$.ajaxSetup({
		    beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
		            // Send the token to same-origin, relative URLs only.
		            // Send the token only if the method warrants CSRF protection
		            // Using the CSRFToken value acquired earlier
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		    }
		});

		// Fire off the request to
	    request = $.ajax({
	        data: $data,
            type: 'post',
            url: '/change_this/request_key/'
	    });

	    // Callback handler that will be called on success
	    request.done(function (response, textStatus, jqXHR){
	        $("#access_info").fadeIn(2000);
	        $("#access_token").html("<p>" + response + "</p>");
	    });

	    // Callback handler that will be called on failure
	    request.fail(function (jqXHR, textStatus, errorThrown){
	        // Log the error
	        $("#error_info").html("<p>" + 
	            "The following error occurred: </p>" +
	            jqXHR.responseText );
	        $("#error_info").fadeIn(1000).delay(4000).hide(1000);
	    });

	    // Callback handler that will be called regardless
	    // if the request failed or succeeded
	    request.always(function () {
	        // Reenable the inputs
	        $inputs.prop("disabled", false);
	    });

	    // Prevent default posting of form
	    event.preventDefault();

	    return false;
	});

	// Bind to the submit event of our form
	$("#admin_form").submit( function(event) {

	    //Hide the right divs
		$("#access_info").hide();
		$("#error_info").hide();

	    // Abort any pending request
	    if (request) {
	        request.abort();
	    }

	    // setup some local variables
	    var $form = $('#admin_form');

	    // Let's select and cache all the fields
	    var $inputs = $form.find("input, select, button");
	    var $data = $inputs.serialize();

	    // Let's disable the inputs for the duration of the Ajax request.
	    // Note: we disable elements AFTER the form data has been serialized.
	    // Disabled form elements will not be serialized.
	    $inputs.prop("disabled", true);

	    //CSRF Cookie madness
	    function getCookie(name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie != '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = jQuery.trim(cookies[i]);
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		}

		var csrftoken = getCookie('csrftoken');

		function csrfSafeMethod(method) {
		    // these HTTP methods do not require CSRF protection
		    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}

		function sameOrigin(url) {
		    // test that a given url is a same-origin URL
		    // url could be relative or scheme relative or absolute
		    var host = document.location.host; // host + port
		    var protocol = document.location.protocol;
		    var sr_origin = '//' + host;
		    var origin = protocol + sr_origin;
		    // Allow absolute or scheme relative URLs to same origin
		    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		        // or any other URL that isn't scheme relative or absolute i.e relative.
		        !(/^(\/\/|http:|https:).*/.test(url));
		}

		$.ajaxSetup({
		    beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
		            // Send the token to same-origin, relative URLs only.
		            // Send the token only if the method warrants CSRF protection
		            // Using the CSRFToken value acquired earlier
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		    }
		});

		// Fire off the request to
	    request = $.ajax({
	        data: $data,
            type: 'post',
            url: '/change_this/login/'
	    });

	    // Callback handler that will be called on success
	    request.done(function (response, textStatus, jqXHR){
	        window.location.replace("/change_this/");
	    });

	    // Callback handler that will be called on failure
	    request.fail(function (jqXHR, textStatus, errorThrown){
	        // Log the error
	        $("#error_info").html("<p>" + 
	            "The following error occurred: </p>" +
	            jqXHR.responseText );
	        $("#error_info").fadeIn(1000).delay(4000).hide(1000);
	    });

	    // Callback handler that will be called regardless
	    // if the request failed or succeeded
	    request.always(function () {
	        // Reenable the inputs
	        $inputs.prop("disabled", false);
	    });

	    // Prevent default posting of form
	    event.preventDefault();

	    return false;
	});
});