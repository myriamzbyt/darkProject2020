class Parent < ApplicationRecord
  belongs_to :familles
  has_many :enfants
end