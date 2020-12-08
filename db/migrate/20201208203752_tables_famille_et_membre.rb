class TablesFamilleEtMembre < ActiveRecord::Migration[6.0]
  def change
    create_table :familles do |t|
      t.string :nom
      t.timestamps
    end

    create_table :parents do |t|
      t.string :prenom_mere
      t.integer :annee_naissance_mere
      t.string :commentaire_mere
      t.string :prenom_pere
      t.integer :annee_naissance_pere
      t.string :commentaire_pere
      t.integer "famille_id"
      t.timestamps
      t.index ["famille_id"], name: "index_parents_on_famille_id"
    end

    create_table :enfants do |t|
      t.string :prenom
      t.integer :annee_naissance
      t.string :commentaire
      t.integer "parent_id"
      t.timestamps
      t.index ["parent_id"], name: "index_enfants_on_parent_id"
    end
    add_foreign_key "parents", "familles", column: "famille_id"
    add_foreign_key "enfants", "parents", column: "parent_id"
  end
end
