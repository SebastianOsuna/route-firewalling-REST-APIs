class User < ActiveRecord::Base

	# Some injective function to generate a Token.
	# In this case the token depends on the username, the password and the time it was generated.
	def generateToken
		# Current timestamp
		@time = Time.now.to_i.to_s
		# Secret message form
		@tmp = self.username + '!' + self.password + '~' + @time + ':'
		# Use some hashing algorithm as SHA2 or MD5
		# You can also use a salt for more security. Remember to save the salt.
		self.accessToken = Digest::SHA2.hexdigest( @tmp )
	end

end
