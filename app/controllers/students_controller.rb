# -*- coding: utf-8 -*-
class StudentsController < ApplicationController
  def index
    @students = Student.all

    # collect dates
    @dates = @students.map { |s|
      s.attends.map { |a|
        a.created_at.to_date
      }
    }.flatten.sort.uniq


    # collect attendats on each date
    for d in @dates
      class << d
        attr_accessor :attendants
      end
      d.attendants = []

      for s in @students
        for a in s.attends
          if a.created_at.to_date == d
            d.attendants << s
            break
          end
        end
      end
    end
  end

  def attend
    authenticate_student!
    session[:current_student_id] = current_student.id
  end
  def send_geolocation
    current_student = Student.find_by_id(session[:current_student_id])

    if current_student == nil
      render :json => "Sesja wygasła.", :status => 401
    elsif params[:latitude] == nil || params[:longitude] == nil
      render :json => "Nie znaleziono danych geolokacyjnych.", :status => 406
    elsif too_far(params[:latitude].to_f, params[:longitude].to_f)
      render :json => "Znajdujesz się zbyt daleko.", :status => 406
    elsif incorrect_time()
      render :json => "Zgłoszenie poza godziną zajęć.", :status => 406
    else
      
      Attend.new(:student_id => session[:current_student_id]).save

      head :ok
    end
  end

  private
  
  def too_far(lat, long)
    pwr = Geokit::LatLng.new(51.107779, 17.061975)
    you = Geokit::LatLng.new(lat, long)
    dist = you.distance_to(pwr, :units => :kms)

    logger.debug('Distance is ' + dist.to_s + ' kms.')

    dist > 1
  end

  def incorrect_time
    false
  end
end
