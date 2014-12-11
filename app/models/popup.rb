class Popup < ActiveRecord::Base

  belongs_to :user
  has_many :feeds

  # letsrate gem requirement
  letsrate_rateable "price"
  
  # for geocoder gem to convert address into "geocode"(longitude and latitude)
  geocoded_by :address
  after_validation :geocode

  # paperclip image styles
  has_attached_file :image, styles: {
      thumb: '100x100>',
      square: '200x200#',
      medium: '400x266>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_length_of :name, :maximum => 15
  # not using validations for the rest of the form fields until we make the necessary changes to the form
  validates :name, presence: true
  validates :address, presence: true
  validates :day, presence: true
  validates :hours, presence: true
  validates :website, presence: true
  validates :price, presence: true
  validates :description, presence: true
  validates :category, presence: true
  

  #search query for finding popups by name - ILIKE makes it case insensitive
  def self.search_for(query)
    where('name ILIKE :query', query: "%#{query}%")
  end

  def self.search_geo(query)
    where('address ILIKE :query', query: "#{query}")
    # if params[:address]
    #   @geocode_results = Popup.near(params[:geocode], 1, :order => :distance)
    # else
    #   @geocode_results = Popup.all
    # end
  end

end
