class PrivateController < ApplicationController
	include Firewall

    before_action :_authorize, only: [ :action2, :action3 ]

	def private_zone
		# Firewall up the method
		# This mark this method as private.
		# The request must have a valid access token in the headers in order to continue
		return if is :private

		# Continue with what the action is supposed to do
		render json: { message: 'Welcome to the private zone.', user: firewall_user }
    end

    def action1
        return if is :private, :role => :ADMIN

        render json: { message: 'Hello admin!' }
    end

    def action2
        render json: { message: 'Hello user, this is action2!' }
    end

    def action3
        render json: { message: 'Hello user, this is action3!' }
    end

    private

        def _authorize
            is :private, :role => :USER
        end

end
