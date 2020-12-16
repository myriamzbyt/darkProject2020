Rails.application.routes.draw do
  root :to => 'root#redirection_principal'

  namespace :application do
    get 'principal'
    get 'resume'
    get '/:id', action: 'detail'
  end
  namespace :familles do
    post 'resume_famille'
    post 'create_parent'
    post 'create_enfant'
    post 'familles'
  end
end
