RouteFirewallingRestApis::Application.routes.draw do
    get 'private' => 'private#private_zone'
    get 'private/admin' => 'private#action1'
    get 'private/user/action2' => 'private#action2'
    get 'private/user/action3' => 'private#action3'

    get 'public' => 'public#public_zone'
    get 'users' => 'public#users'

    post 'sessions' => 'public#login' 
    match '*anything' => 'application#cor', via: [:options]
    match '*anything' => 'public#_404', via: [:get,:post,:put,:delete,:options,:head]
    
end
