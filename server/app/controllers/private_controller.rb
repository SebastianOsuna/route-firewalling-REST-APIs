class PrivateController < ApplicationController
	include Firewall

	def privateZone
		# Firewall up the method
		# This mark this method as private.
		# The request most have a valid access token in the headers in order to continue
		if is :private 
			return 
		end
		# Continue with what the action is supposed to do
		render json: { message: 'Welcome to the private zone.', user: firewall_user }
	end

end
