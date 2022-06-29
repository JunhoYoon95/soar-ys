class MainController < ApplicationController
  before_action :authenticate_user!
  
  def home

    @page_title = "페이지타이틀"
    @page_subtitle = "페이지서브타이틀"     
  end
  
  def landing
    @page_title = "와이에스메타"
    @page_subtitle = "YSmeta"   
    
    
    render "main/landing"
  end
  
  
  
end