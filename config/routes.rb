Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :show, :update, :destroy]
      post 'estimate', to: 'calculation#estimate_result';
      post 'create_project', to: 'calculation#create_project';
    end
  end
  get 'posts/:id/edit', to: 'home#index';
  get 'posts/:id', to: 'home#index';
  get 'posts/new', to: 'home#index';
  get 'questions', to: 'home#index';
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root 'home#index'
end
