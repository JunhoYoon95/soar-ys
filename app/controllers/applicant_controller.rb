class ApplicantController < ApplicationController
    def admin_applicant_list
        @applicants = Applicant.all
    end
end
