(function() {

	var SERVER = "http://localhost:3000/";

	var LOGIN = SERVER + "sessions";

	var PRIVATE = SERVER + "private";

	var PUBLIC = SERVER + "public";

    var USERS = SERVER + "users";

	var token, header, role;

    // display user list
    $.get( USERS ).success( function( data ) {
        data.forEach( function( obj ) {
            $("#user-list").append(
                $("<li>").text( obj.username + ":" + obj.password + " - " + obj.role )
            );
        } );
    } );

    // login function
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
            $("#user-list").hide();
			$("#private-zone").show();
			$("#user-id").text( data.id );
			token = data.token;
			header = data.header;
            role = data.role;
			$("#user-token").text( token );
            $("#user-role").text( role );
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
					type: "GET"
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

    $("#check-private-as-admin").click( function() {
        if( token && header ) {
            $.ajax(
                {
                    url: PRIVATE + "/admin",
                    type: "GET",
                    beforeSend: function( xhr ) { xhr.setRequestHeader( header, token ); }
                }
            ).done( function( data ) {
                    // Shouldn't happen
                    $("#private-as-admin-content").text( data.message ).css( { color: 'green' } );
                } ).fail( function( jqXHR ) {
                    $("#private-as-admin-content").text( jqXHR.responseJSON.error ).css( { color: 'red' } );
                } );
        } else{
            $("#private-as-admin-content").text( "You haven't logged in, don't cheat!" ).css( { color: 'red' } );
        }
    } );

    $("#check-private-as-user").click( function() {
        if( token && header ) {
            $.ajax(
                {
                    url: PRIVATE + "/user/action2",
                    type: "GET",
                    beforeSend: function( xhr ) { xhr.setRequestHeader( header, token ); }
                }
            ).done( function( data ) {
                    // Shouldn't happen
                    $("#private-as-user-content").text( data.message ).css( { color: 'green' } );
                } ).fail( function( jqXHR ) {
                    $("#private-as-user-content").text( jqXHR.responseJSON.error ).css( { color: 'red' } );
                } );
        } else{
            $("#private-as-user-content").text( "You haven't logged in, don't cheat!" ).css( { color: 'red' } );
        }
    } );

	if( $("#public-zone") ) { 
		$.get( PUBLIC ).done( function( data ) {
			$("#public-zone-content").text( data.message ).css( { color: 'green' } );
		} ).fail( function() {
			$("#public-zone-content").text( "This is just embarrasing. Sorry!" ).css( { color: 'red' } );
		} );
	}
	
})();