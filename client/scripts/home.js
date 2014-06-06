$(document).foundation();

$('#js-sendMessage').on('click', function() {

	var email = $('#email').val();
	var message = $('#message').val();

	var payload = {
		email: email,
		msg: message
	};

	$.ajax({
		data: JSON.stringify(payload),
		headers: {
			'Content-type': 'application/json'
		},
		type: 'POST',
		url: '/services/feedback',
		success: function(response) {
			console.log("Thank you");
		},
		error: function(error) {
			console.log(error);
		}
	});

});