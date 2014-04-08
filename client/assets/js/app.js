(function() {

	var SERVER = "http://localhost:3000/";

	var LOGIN = SERVER + "sessions";

	var PRIVATE = SERVER + "private";

	var token, header;

	$("#submit").click(function(event) {
		var username = $("#username").val();
		var password = $("#password").val();

		$.post( LOGIN , 
			{ 
				username: username,
				password: password
			} 
		).done( function( data ) {
			$(".login-box").hide();
			$("#private-zone").show();
			$("#user-id").text( data.id );
			token = data.token;
			header = data.header;
			$("#user-token").text( token );
		} ).fail( function( jqXHR ) {
			if( jqXHR.status == 401 ) {
				// Bad Credentials
				$("#login-error").text( jqXHR.responseJSON.error );
			} else {
				// Unknown error
				// The server is probably down
				alert( "Oops! Something went wrong, this shouldn't happen." );
			}
		} );
	});

	$("#check-private-zone").click(function(){
		if( token && header ) {
			$.ajax(
				{
					url: PRIVATE,
					type: "GET",
					beforeSend: function( xhr ) { xhr.setRequestHeader( header, token ); }
				}
			).done( function( data ) {
				$("#private-zone-content").text( data.message ).css( { color: 'green' } );
			} ).fail( function( jqXHR ) {
				// Shouldn't happen
				$("#private-zone-content").text( "Something went wrong. Sorry." ).css( { color: 'red' } );
			} );
		} else{
			$("#private-zone-content").text( "You haven't logged in, don't cheat!" ).css( { color: 'red' } );
		}
	});

	$("#check-private-zone-notoken").click(function(){
		if( token && header ) {
			$.ajax(
				{
					url: PRIVATE,
					type: "GET",
				}
			).done( function( data ) {
				// Shouldn't happen
				$("#private-zone-content-notoken").text( "Something went wrong. Sorry." ).css( { color: 'red' } );
			} ).fail( function( jqXHR ) {
				$("#private-zone-content-notoken").text( jqXHR.responseJSON.error ).css( { color: 'green' } );
			} );
		} else{
			$("#private-zone-content-notoken").text( "You haven't logged in, don't cheat!" ).css( { color: 'red' } );
		}
	});
})();