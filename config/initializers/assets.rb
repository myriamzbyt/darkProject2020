# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules', 'trix', 'dist')
Rails.application.config.assets.paths << Rails.root.join('node_modules', 'select2', 'dist', 'css')
Rails.application.config.assets.paths << Rails.root.join('node_modules', 'mapbox-gl', 'dist')
Rails.application.config.assets.paths << Rails.root.join('node_modules', '@reach', 'combobox')
Rails.application.config.assets.paths << Rails.root.join('node_modules', '@mapbox', 'mapbox-gl-draw', 'dist')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += ['print.css', 'new_design/new_application.css', 'new_design/print.css', 'new_design/application.js', 'new_design/manager.css']
