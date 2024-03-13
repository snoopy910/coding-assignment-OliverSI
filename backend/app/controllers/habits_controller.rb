class HabitsController < ApplicationController
  def index
    habits = Habit.all
    render json: habits, status: :ok
  end

  def create
    habit = Habit.create(habit_params)
    render json: habit, status: :created    
  end

  def destroy
    habit = Habit.find(params[:id])
    habit.destroy
    head :ok
  end

  private

  def habit_params
    params.require(:habit).permit(:title, :description)
  end
end
