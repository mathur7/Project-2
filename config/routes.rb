Rails.application.routes.draw do

  post '/rate' => 'rater#create', :as => 'rate'
  root 'popups#index'

  get '/about', to: 'pages#about'
  get '/contact', to: 'pages#contact'
  get '/faq', to: 'pages#faq'

  resources :popups do 
    get 'search', on: :collection
    get 'search_geo', on: :collection # route for "address/geocode" search results
  end 

  devise_for :users
  resources :popups do
    resources :feeds
  end 
 

end

  
#                   Prefix Verb   URI Pattern                                Controller#Action
#         new_user_session GET    /users/sign_in(.:format)                   devise/sessions#new
#             user_session POST   /users/sign_in(.:format)                   devise/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)                  devise/sessions#destroy
#            user_password POST   /users/password(.:format)                  devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)              devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)             devise/passwords#edit
#                          PATCH  /users/password(.:format)                  devise/passwords#update
#                          PUT    /users/password(.:format)                  devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)                    devise/registrations#cancel
#        user_registration POST   /users(.:format)                           devise/registrations#create
#    new_user_registration GET    /users/sign_up(.:format)                   devise/registrations#new
#   edit_user_registration GET    /users/edit(.:format)                      devise/registrations#edit
#                          PATCH  /users(.:format)                           devise/registrations#update
#                          PUT    /users(.:format)                           devise/registrations#update
#                          DELETE /users(.:format)                           devise/registrations#destroy
#                   popups GET    /popups(.:format)                          popups#index
#                          POST   /popups(.:format)                          popups#create
#                new_popup GET    /popups/new(.:format)                      popups#new
#               edit_popup GET    /popups/:id/edit(.:format)                 popups#edit
#                    popup GET    /popups/:id(.:format)                      popups#show
#                          PATCH  /popups/:id(.:format)                      popups#update
#                          PUT    /popups/:id(.:format)                      popups#update
#                          DELETE /popups/:id(.:format)                      popups#destroy
#              popup_feeds GET    /popups/:popup_id/feeds(.:format)          feeds#index
#                          POST   /popups/:popup_id/feeds(.:format)          feeds#create
#           new_popup_feed GET    /popups/:popup_id/feeds/new(.:format)      feeds#new
#          edit_popup_feed GET    /popups/:popup_id/feeds/:id/edit(.:format) feeds#edit
#               popup_feed GET    /popups/:popup_id/feeds/:id(.:format)      feeds#show
#                          PATCH  /popups/:popup_id/feeds/:id(.:format)      feeds#update
#                          PUT    /popups/:popup_id/feeds/:id(.:format)      feeds#update
#                          DELETE /popups/:popup_id/feeds/:id(.:format)      feeds#destroy
#                     root GET    /                                          popups#index

