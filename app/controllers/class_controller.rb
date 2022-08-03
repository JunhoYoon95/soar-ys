class ClassController < ApplicationController
    def class_list
        @class_list = SoarClass.all
    end
    def class_bidding
        @class_list = SoarClass.all
        @data_tables = ActiveRecord::Base.connection.tables
        @class_types = ClassType.all
        @levels = Level.all
    end
    def createSeeds
        
        seed = Seed.new
        seed.title = params[:name]
        seed.class_type_id = params[:class_type]
        seed.level_id = params[:level]
        seed.grade = params[:grade]
        seed.start_date = params[:start_date]
        seed.end_date = params[:end_date]
        seed.save

        seed_schedule = SeedSchedule.new
        seed_schedule.day = params[:day]
        seed_schedule.hour = params[:hour]
        seed_schedule.minute = params[:minute]
        seed_schedule.session = params[:session]
        seed_schedule.seed_id = seed.id
        seed_schedule.save


    end
    def admin_class_detail
        # @class_detail = SoarClass.find(params[:id])
    end
    def class_room_student
    end
    def class_room_teacher
    end
end
