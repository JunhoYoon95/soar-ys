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
    end
    def student_detail
    end
    def update_user
    end
end
