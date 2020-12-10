Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #Routage à la page principal au moment du lancement de l'application
  root 'root#index'
  resources :application do
    member do
      get 'principal', id: "1"
      get 'resume', id:"1"
    end
    collection do
      patch 'create_family'
    end
  end
end
