class ClassController < ApplicationController
    def class_list
        @class_list = SoarClass.all
    end
end
