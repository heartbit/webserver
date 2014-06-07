$(document).foundation();

$('#js-sendMessage').on('click', function(e) {

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
			$('#js-sendMessage').html("Thank you! We come back to you soon.");
		},
		error: function(error) {
			$('#js-sendMessage').html('An error occured :/');
		}
	});

	e.preventDefault();

});