module Firewall extend ActiveSupport::Concern

    included do
        # If the token is valid, this is where the user that owns the token is left
        # so that the controller can access it
        attr_reader :firewall_user
    end

	def is ( scope, *options )
        # If scope is private
		if scope == :private
            # Check the token header
			unless request.headers[ Settings.headers.accessToken ].blank?
                # Verify validity
                # Check if any user has the given access token
                # Remember that the generateToken method on the User model has to be injective
                @firewall_user = User.find_by accessToken: request.headers[ Settings.headers.accessToken ]
                if @firewall_user.blank?
                    # Return error message
                    render json: { error: 'Unauthorized', code: 401 }, :status => '401'
                elsif options.any?
                    render json: { error: 'Forbidden', code: 403 }, :status => '403' if options.first[ :role ].to_s != @firewall_user.role.to_s
                end
            else
                # Return error message
                render :json => { error: 'Unauthorized', code: 401 }, :status => '401'
            end
		end
	end
end