Rails.application.routes.draw do
  devise_for :users, :controllers =>  {user: 'configure_permitted_parameters'}

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # TODO:: 해당 페이지는 전체 url에 /admin을 붙일 것인가요
  root to: "user#index"
  get '/home', to: 'main#home'
  get 'admin/users', to: 'user#index'

  # 선생님 관련 페이지
  get '/teacher', to: 'teacher#home'
  get 'teacher/home', to: 'teacher#home'
  get 'teacher/mypage/:id', to: 'teacher#mypage'
  get 'teacher/new-teacher', to: 'teacher#new_teacher'
  post 'teacher/create_teacher', to: 'teacher#create_teacher'
  
  


  # 관리자 관련 페이지
  get 'admin/users/delete-user/:id', to: 'user#delete_user'
  get 'admin/users/parent-detail/:id', to: 'user#parent_detail'
  get 'admin/users/teacher-detail/:id', to: 'user#teacher_detail'
  get 'admin/users/student-detail/:id', to: 'user#student_detail'
  
end
