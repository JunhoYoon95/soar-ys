class CreateTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :teachers do |t|
      t.string :uid
      t.number :sex
      t.number :location
      t.string :video_link
      t.boolean :video
      t.boolean :interview
      t.number :empathy
      t.number :book_comprehension
      t.number :logical
      t.string :notes
      t.string :education
      t.string :major

      t.timestamps
    end
  end
end
