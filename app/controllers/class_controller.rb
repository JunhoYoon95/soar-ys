class ClassController < ApplicationController
    def class_list
        @class_list = SoarClass.all
    end
    def class_bidding
        @class_list = SoarClass.all
    end
    def admin_class_detail
        # @class_detail = SoarClass.find(params[:id])
    end
    def class_room_student
    end
    def class_room_teacher
    end
end
