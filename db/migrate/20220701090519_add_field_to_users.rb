class AddFieldToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string
    add_column :users, :role, :integer, default: 1
    add_column :users, :phone, :string
    add_column :users, :country_code, :integer
    add_column :users, :kakaotalk, :boolean, default: false
    add_column :users, :referral_code, :boolean
    add_column :users, :deleted, :boolean, default: false
  end
end
