class CreateAttends < ActiveRecord::Migration
  def change
    create_table :attends do |t|
      t.integer :student_id

      t.timestamps
    end
  end
end
