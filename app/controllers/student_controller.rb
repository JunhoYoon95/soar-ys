class StudentController < ApplicationController
    def student_home
        @student = Student.find(params[:id])
        @user = User.find(current_user.id);
        if @student.uid != @user.id
            flash[:alert] = "Sorry, You are not allowed to access this student's page"
            redirect_to(:back)
        else
            flash[:notice] = "Welcome, " + @student.name + "!"
        end
        
    end
end
