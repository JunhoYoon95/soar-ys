class CreateHomeworks < ActiveRecord::Migration[5.0]
  def change
    create_table :homeworks do |t|

      t.timestamps
    end
  end
end
