class Enfant < ApplicationRecord
  belongs_to :parents, optional: true
end
