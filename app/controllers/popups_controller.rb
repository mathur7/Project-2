class PopupsController < ApplicationController

before_action :authenticate_user!, except: [:index, :show, :search]

  def index
    @popups = Popup.all
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popups, :only => [:id, :name, :address, :geocode, :longitude, :latitude, :hours, :day, :website, :price, :description, :image, :category]}
    end
  end

  # search page and google map json rendering
  # Popup.search_for(params[:q]) || 
  def search
    @results = Popup.near("1 main st, sf, ca 94109")
    respond_to do |f|
      f.html { render :search }
      f.json { render json: @results, :only => [:id, :name, :address, :geocode, :longitude, :latitude, :hours, :day, :website, :price, :description, :image, :category]}
    end
  end
  
  def new
    @popup = Popup.new
    @taco = Popup.where(:category => "Food")
  end

  def create
    @popup = Popup.create popup_params 
    redirect_to popup_path(@popup)
  end

  def show    
    @popup = Popup.find(params[:id])
    @feed_new = Feed.new
    @user = current_user
    @feeds = @popup.feeds.all
  end

  def update
    @popup = Popup.find(params[:id])
    @popup.update image_params
    redirect_to :back
  end

private 

  def popup_params
    params.require(:popup).permit(:id, :name, :website, :address, :hours, :day, :category, :price, :description, :image, :longitude, :latitude, :feeds_attributes => [:comment])  
  end

  def image_params
    params.require(:popup).permit(:image)  
  end

end
