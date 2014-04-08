route-firewalling-REST-APIs
============

Proof of concept for firewalling routes in Ruby on Rails.

The idea was to replicate the firewall functionality available in Symfony2 for PHP projects.

You can mark your routed actions as `:private` if you want users to authenticate ( and probably authorize ) before making a request. This proof of concept was thought as an alternative to devise.

You can use custom headers with the help of `rails_config` for the access tokens.

============

1. Clone repository

2. `cd server`

3. `bundle install`

4. `rake db:migrate RAILS_ENV=development`

5. `rails server`