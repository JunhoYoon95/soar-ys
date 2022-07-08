class SalaryController < ApplicationController
    def admin_transaction
        @salaries = Salary.all
    end
end
