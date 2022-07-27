Rails.application.routes.draw do
  devise_for :users, :controllers =>  {user: 'configure_permitted_parameters'}

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # TODO:: 해당 페이지는 전체 url에 /admin을 붙일 것인가요
  root to: "main#home"
  # root to: "user#index"
  get '/home', to: 'main#home'
  get 'admin/users', to: 'user#index'

  # 선생님 관련 페이지
  get '/teacher', to: 'teacher#home'
  get 'teacher/home', to: 'teacher#home'
  get 'teacher/mypage/:id', to: 'teacher#mypage'
  get 'teacher/class-teacher', to: 'teacher#class_teacher_calendar'
  get 'teacher/new-teacher', to: 'teacher#new_teacher'
  post 'teacher/create_teacher', to: 'teacher#create_teacher'
  
  
  # School 관련 페이지
  get 'admin/school/interview-list', to: 'interview#interview_list'

  
  # class 관련 페이지
  get 'class/classrom-student/:id', to: 'class#class_room_student'
  get 'class/classrom-teacher/:id', to: 'class#class_room_teacher'
  get 'admin/class/class-list', to: 'class#class_list'
  get 'admin/class/class-bidding', to: 'class#class_bidding'
  get 'admin/class/class-detail/:id', to: 'class#admin_class_detail'

  
  # homework 관련 페이지
  get 'admin/homework/homwork-list', to: 'homework#admin_homework_list'

  
  # Salary 관련 페이지
  get 'admin/static/transactions', to: 'salary#admin_transaction'

  
  # Payment 관련 페이지
  get 'admin/static/payments', to: 'payment#admin_payment_list'

  
  # QnA 관련 페이지
  get 'admin/community/qna', to: 'qna#admin_qna'


  # Review 관련 페이지
  get 'admin/community/review', to: 'review#admin_review'


  # Coupon 관련 페이지
  get 'admin/settings/coupon', to: 'coupon#admin_coupon'


  # Applicants 관련 페이지
  get 'admin/users/applicants', to: 'applicant#admin_applicant_list'

  
  # book 관련 페이지
  get 'admin/book/book-list', to: 'book#admin_book_list'
  get 'admin/book/book-detail/:id', to: 'book#admin_book_detail'

  
  # student 관련 페이지
  get 'student/home/:id', to: 'student#student_home'



  # 유저 관련 페이지
  get 'admin/users/delete-user/:id', to: 'user#delete_user'
  get 'admin/users/parent-detail/:id', to: 'user#parent_detail'
  get 'admin/users/teacher-detail/:id', to: 'user#teacher_detail'
  get 'admin/users/student-detail/:id', to: 'user#student_detail'
  
end
