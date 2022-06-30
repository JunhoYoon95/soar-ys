class UserController < ApplicationController
    def index
    end
    def parent_detail
        @id = params[:id]
        # 유저가 parent 라면  몇 명의 학생을 데이고 있는지에 대해서도 가져와야 합니다
        # student 들을 전부 데려오고, 데려온 학생의 이름들을 string 값으로 합칩니다
    end
    def teacher_detail
        # 선생님 정보를 그대로 가져옵니다
        @id = params[:id]
        # 기본적인 user 정보를 가져오고, Teacher 에서 uid == @id 인 놈을 또 찾아서 가져와서 둘 다 보여줘야 합니다
        # @user = ....
        # @teacher = Teacher.find(params[:id])
    end
    def student_detail
        #
    end
    def update_user
    end
end
