class AddContactAndNameToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :contact, :string
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :date_of_birth, :date
    add_column :users, :gender, :string
  end
end
