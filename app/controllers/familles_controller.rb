class FamillesController < ActionController::Base
  before_action :principal

  def principal
    @parent = Parent.new
    @enfant = Enfant.new
    @famille = list_famille
  end

  def resume_famille
    redirect_to application_resume_path(:id => params[:id])
  end

  def create_parent
    @parent = Parent.last
    @parent.update(parent_params)
    @parent.save!

    flash.notice = "Création des parents avec succès."
    redirect_to application_principal_path
  end

  def familles
    @parent.update(famille_id: params[:parent][:famille_id])
    @parent.save
    flash.notice = "Enregistrement du nom de famille avec succès."
    redirect_to application_principal_path
  end

  def create_enfant
    parent_id = Parent.last.id
    @enfant.update(enfant_params(parent_id))
    @enfant.save!
    flash.notice = "Création de l'enfant avec succès."
    redirect_to application_principal_path
  end

  def list_famille
    Famille.all
  end

  def parent_params
    params.require(:parent).permit(:prenom_pere, :annee_naissance_pere, :prenom_mere, :annee_naissance_mere)
  end

  def enfant_params(parent_id)
    permited_params = params.require(:enfant).permit(:prenom, :annee_naissance)
    permited_params[:parent_id] = parent_id
    permited_params
  end
end
