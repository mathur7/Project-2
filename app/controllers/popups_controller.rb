class PopupsController < ApplicationController

def index
  @popups = Popup.all
  respond_to do |f|
    f.html { render :index }
    f.json { render json: @popups, :only => [:name, :address, :hours, :expires_at, :price, :description, :image] }
  end
end

def new
  @popup = Popup.new
  @popups = Popup.all
end


def create
  @popup = Popup.new popup_params
  if @popup.save
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popup, status: :created }
    end
  else
    f.json { render json: @popup.errors, status: :unprocessable_entity }
  end
end

def show
  @popup = Popup.find_by_id(params[:id])
end

private 

def popup_params
  params.require(:popup).permit(:name, :address, :hours, :expires_at, :price, :description, :image)  
end

end


