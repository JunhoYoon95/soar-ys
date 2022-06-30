class UserController < ApplicationController
    def index
    end
    def parent_detail
        @id = params[:id]
        # 유저의 role 을 판단하는 코드를 둡시다
        # 유저가 parent 라면  몇 명의 학생을 데이고 있는지에 대해서도 가져와야 합니다
        # pranet 라면 student 들을 전부 데려오고, 데려온 학생의 이름들을 string 값으로 합칩니다
    end
    def teacher_detail
    end
    def student_detail
    end
    def update_user
    end
end
