class Parent < ApplicationRecord
  belongs_to :famille, optional: true
  has_many :enfants, inverse_of: :parent
end
