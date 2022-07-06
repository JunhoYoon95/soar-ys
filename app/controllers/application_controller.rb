class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init
  before_action :configure_permitted_parameters, if: :devise_controller?
 
  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  
  def init
    @app_company = "회사명"
    @app_title = "Soar"
    @app_logo = ""
    @app_description = ""
    @app_url = ""
  end
  
end