class RootController < ApplicationController
  include ApplicationHelper

  def index
  end

  def redirection_principal
    redirect_to application_principal_path
  end
end
