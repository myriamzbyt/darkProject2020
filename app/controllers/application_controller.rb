class ApplicationController < ActionController::Base

  def index
    params[:id] =1
  end

  def principal
    @Member = 'A saisir'
  end

  def resume
    @info_famille = nil
  end


  def create_family
  end
end
