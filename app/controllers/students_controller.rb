class StudentsController < ApplicationController
  def index
    @students = Student.all
  end
  def attend
    authenticate_student!
  end
end
