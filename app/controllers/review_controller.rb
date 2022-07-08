class ReviewController < ApplicationController
    def admin_review
        @reviews = Review.all
    end
end
