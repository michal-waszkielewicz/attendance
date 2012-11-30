class Attend < ActiveRecord::Base
  attr_accessible :student_id
  belongs_to :student
end
