class CreateQnas < ActiveRecord::Migration[5.0]
  def change
    create_table :qnas do |t|

      t.timestamps
    end
  end
end
