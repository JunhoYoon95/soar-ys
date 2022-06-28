class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init
  
  def init
    @app_company = "회사명"
    @app_title = "앱타이틀"
    @app_logo = ""
    @app_description = ""
    @app_url = ""

  end
  
  
  
end
