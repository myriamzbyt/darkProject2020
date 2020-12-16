class ApplicationController < ActionController::Base
  before_action :principal

  def principal
    @parent = Parent.new
    @enfant = Enfant.new
    @famille = list_famille
    @info_enfant = Enfant.where(parent_id: @parent_id) if !@parent_id.nil?
  end

  def list_famille
    Famille.all
  end

  def detail
    @famille = Famille.find(params[:id])
    @parents = Parent.where(famille_id: @famille.id) if @famille.present?
    @enfants = Enfant.where(parent_id: @parents.ids) if @parents.present?
    puts 'hello'
    puts @famille.inspect
    puts @parents.inspect
    puts @enfants.inspect
  end
end
