class Book < ApplicationRecord
    has_many :homework
    def admin_book_list
    end

    def admin_book_detail
    end
end
