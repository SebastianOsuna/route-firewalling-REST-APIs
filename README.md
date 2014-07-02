route-firewalling-REST-APIs
============

Proof of concept for firewalling routes in Ruby on Rails.

The idea was to replicate the firewall functionality available in Symfony2 for PHP projects.

You can mark your routed actions as `:private` if you want users to authenticate ( and probably authorize ) before making a request. 
This proof of concept was thought as an alternative to devise.

You can use custom headers with the help of `rails_config` for the access tokens. 
In this example I use `Settings.headers.accessToken` as `X-Access-Token`. 
My User class uses the `accessToken` property as access token for authentication.
It also uses the `role` property as role for authorization.

# Usage

### Single action
```
def firewalled_action
    return if is :private
    ...
end
```
 
### Group actions 
```
before_action :authenticate, only: [ :action1, :action2, ... ]
...
def authenticate
   is :private
end
```
 
### Authorization
 
Authorization requires your User class to have a role property.
 
```
is :private, role: :ROLE_NAME
```

============

1. Clone repository

2. `cd server`

3. `bundle install`

4. `rake db:migrate RAILS_ENV=development`

5. `rails server`