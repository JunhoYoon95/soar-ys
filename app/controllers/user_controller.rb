class UserController < ApplicationController
    before_action :authenticate_user!
    def admin_check(message)
        if current_user
            @user = User.find(current_user.id)
            if @user.role != 10
                # sign_out(@user)
                # redirect_to new_user_session_path, notice: 'You are not allowed'
                flash[:alert] = 'Sorry, You are not allowed to access ' + message + ' page'
                redirect_to(:back)
            end
        else
            # redirect_to new_user_session_path, notice: 'You are not allowed'
            flash[:alert] = 'Sorry, You are not allowed to access ' + message + ' page'
            redirect_to(:back)
        end
    end
    def index
        @users = User.all
        @admins = User.where(role: 10).all
        @teachers = User.where(role: 5).all
        @parents = User.where(role: 1).all
    end
    def parent_detail
        admin_check("admin/parent")
        @id = params[:id]
        # 유저가 parent 라면  몇 명의 학생을 데이고 있는지에 대해서도 가져와야 합니다
        # student 들을 전부 데려오고, 데려온 학생의 이름들을 string 값으로 합칩니다
    end
    def teacher_detail
        admin_check("admin/teacher")
        # 선생님 정보를 그대로 가져옵니다
        @id = params[:id]
        # 기본적인 user 정보를 가져오고, Teacher 에서 uid == @id 인 놈을 또 찾아서 가져와서 둘 다 보여줘야 합니다
        # @user = ....
        # @teacher = Teacher.find(params[:id])
    end
    def delete_user
        before_action :admin_check
        user = User.find(params[:id])
        user.update(deleted: true)
        redirect_back fallback_location: '/index';
    end
    def student_detail
        #
    end
    def update_user
    end
end
