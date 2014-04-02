RouteFirewallingRestApis::Application.routes.draw do
    get 'private' => 'private#privateZone'
    get 'public' => 'public#publicZone'

    post 'sessions' => 'public#login' 

    match ':anything' => 'public#_404', via: [:get,:post,:put,:delete,:options,:head]
    
end
