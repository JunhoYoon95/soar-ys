class UserController < ApplicationController
    def index
    end
    def user_detail
        @id = params[:id]
    end
    def update_user
    end
end
