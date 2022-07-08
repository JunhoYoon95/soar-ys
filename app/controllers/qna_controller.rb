class QnaController < ApplicationController
    def admin_qna
        @qna_list = Qna.all
    end
end
