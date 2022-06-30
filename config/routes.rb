Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # TODO:: 해당 페이지는 전체 url에 /admin을 붙일 것인가요
  root to: "main#home"
  get '/home', to: 'main#home'
  get '/users', to: 'user#index'

  get '/users/parent-detail/:id', to: 'user#parent_detail'
  get '/users/teacher-detail/:id', to: 'user#teacher_detail'
  
end
