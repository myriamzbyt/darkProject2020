class RootController < ApplicationController
  include ApplicationHelper

  def index
    redirect_to principal_application_path
  end
end
