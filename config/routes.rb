Rails.application.routes.draw do
  devise_for :users, :controllers =>  {user: 'configure_permitted_parameters'}

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # TODO:: 해당 페이지는 전체 url에 /admin을 붙일 것인가요
  root to: "user#index"
  get '/home', to: 'main#home'
  get '/users', to: 'user#index'

  get '/users/delete-user/:id', to: 'user#delete_user'
  get '/users/parent-detail/:id', to: 'user#parent_detail'
  get '/users/teacher-detail/:id', to: 'user#teacher_detail'
  get '/users/student-detail/:id', to: 'user#student_detail'
  
end
