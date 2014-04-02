class PublicController < ApplicationController 
	include Firewall

	def publicZone
		# This is just for code clarity.
		# If the action is public (not behind the 'firewall') this can be removed.
		# The only relevant value is :private. See private_controller to check it's usage.
		is :public
		# Render public message.
		render json: { message: 'Welcome to the Public Zone.'}
	end

	def login
		username = params[:username]
		password = params[:password]

		if username and password
			user = User.find_by username: username, password: password
			if user
				# Generate user token.
				user.generateToken
				# Save the newly generated token
				user.save
				# Respond with the token and any other relevant information
				render json: { token: user.accessToken, id: user.id } and return
			end
		end
		# If username or password are not given or invalid credentials, respond with an error message
		render json: { error: 'Unauthorized', code: 401 }, :status => '401'
	end

	def _404
		render json: { error: 'Resource not found.' }, :status => 404
	end

end
