# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20220718024726) do

  create_table "applicants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "books", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "title",       limit: 45,    null: false
    t.text     "description", limit: 65535
    t.string   "publisher",   limit: 45,    null: false
  end

  create_table "class_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.string   "name",        limit: 45, null: false
    t.string   "description", limit: 45
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coupons", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "type",                       null: false
    t.float    "amount",       limit: 24
    t.datetime "period_start"
    t.datetime "period_end"
    t.float    "percent",      limit: 24
    t.string   "code",         limit: 45,    null: false
    t.string   "name",         limit: 45,    null: false
    t.text     "description",  limit: 65535, null: false
  end

  create_table "homeworks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "book_id",                  null: false
    t.integer  "order",                    null: false
    t.text     "question",   limit: 65535, null: false
    t.text     "note",       limit: 65535
    t.index ["book_id"], name: "fk_book_id_idx", using: :btree
  end

  create_table "interviews", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "levels", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.string   "grade",      limit: 45
    t.string   "name",       limit: 45
    t.integer  "native",     limit: 1
    t.string   "speaking",   limit: 45
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "qnas", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "salaries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "seed_schedules", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "day",        null: false
    t.integer  "hour",       null: false
    t.integer  "session",    null: false, comment: "수업진행시간"
    t.integer  "seed_id",    null: false
    t.integer  "minute",     null: false
    t.index ["seed_id"], name: "seed_id_idx", using: :btree
  end

  create_table "seeds", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.string   "title",         limit: 45, null: false
    t.integer  "level_id",                 null: false
    t.integer  "grade",                    null: false
    t.datetime "start_date",               null: false
    t.datetime "end_date",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "class_type_id",            null: false
    t.index ["class_type_id"], name: "class_type_id_idx", using: :btree
    t.index ["level_id"], name: "level_id_idx", using: :btree
  end

  create_table "soar_classes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.text     "description",     limit: 65535, null: false
    t.string   "name",            limit: 45,    null: false
    t.integer  "teacher_seed_id",               null: false
    t.text     "note",            limit: 65535
    t.integer  "price",                         null: false
    t.integer  "book_id"
    t.integer  "min_student",                   null: false
    t.integer  "max_student",                   null: false
    t.index ["book_id"], name: "book_id_idx", using: :btree
    t.index ["teacher_seed_id"], name: "teacher_seed_id_idx", using: :btree
  end

  create_table "students", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "uid",                   null: false
    t.string   "name",       limit: 45, null: false
    t.index ["uid"], name: "uid_idx", using: :btree
  end

  create_table "teacher_seed", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.integer  "teacher_id",       null: false
    t.integer  "seed_schedule_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["seed_schedule_id"], name: "ㄴ_idx", using: :btree
    t.index ["teacher_id"], name: "fk_teacher_id_idx", using: :btree
  end

  create_table "teachers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "name",        limit: 45
    t.text     "description", limit: 65535
    t.string   "major",       limit: 45
    t.integer  "sex",                                   null: false
    t.integer  "location",                              null: false
    t.string   "video_link",  limit: 45
    t.integer  "video",       limit: 1,     default: 0, null: false
    t.integer  "interview",   limit: 1,     default: 0, null: false
    t.text     "notes",       limit: 65535
    t.integer  "impression",                            null: false
    t.integer  "uid",                                   null: false
    t.index ["uid"], name: "uid_idx", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin" do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "name"
    t.integer  "role",                   default: 1
    t.string   "phone"
    t.integer  "country_code"
    t.boolean  "kakaotalk",              default: false
    t.boolean  "referral_code"
    t.boolean  "deleted",                default: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "homeworks", "books", name: "fk_book_id", on_update: :cascade
  add_foreign_key "seed_schedules", "seeds", name: "seed_id"
  add_foreign_key "seeds", "class_types", name: "class_type_id", on_update: :cascade, on_delete: :cascade
  add_foreign_key "seeds", "levels", name: "level_id", on_update: :cascade
  add_foreign_key "soar_classes", "books", name: "book_id"
  add_foreign_key "soar_classes", "teacher_seed", name: "teacher_seed_id"
  add_foreign_key "students", "users", column: "uid", name: "uid"
  add_foreign_key "teacher_seed", "seed_schedules", name: "", on_update: :cascade
  add_foreign_key "teacher_seed", "teachers", name: "fk_teacher_id", on_update: :cascade
  add_foreign_key "teachers", "users", column: "uid", name: "fk_uid"
end
