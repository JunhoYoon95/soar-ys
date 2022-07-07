class CreateSoarClasses < ActiveRecord::Migration[5.0]
  def change
    create_table :soar_classes do |t|

      t.timestamps
    end
  end
end
