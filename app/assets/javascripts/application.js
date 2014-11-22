// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require_tree .

$(document).ready(function() {
    function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}]
    };
    var map = new google.maps.Map(document.getElementById("map-canvas-index"),
    mapOptions);

    $(window).on('resize', function () {
        google.maps.event.trigger(map, 'resize');
      });

    var loadGeo = function() {
      var url = "/popups.json";
      $.ajax(url, {
        type: 'get'
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image, data[i].price);
        }
      });
    };
    loadGeo();
  
    function addPin(latitude, longitude, name, id, address, category, image, price) {
      var loc = new google.maps.LatLng(latitude, longitude);
      console.log(loc);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: "http://i.imgur.com/xYtLJ5D.png",
        animation: google.maps.Animation.DROP,
        title: name
      });

    //   infobox = new InfoBox({
    //      content: document.getElementById("infobox"),
    //      disableAutoPan: false,
    //      maxWidth: 150,
    //      pixelOffset: new google.maps.Size(-140, 0),
    //      zIndex: null,
    //      boxStyle: {
    //         background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
    //         opacity: 0.75,
    //         width: "280px"
    //     },
    //     closeBoxMargin: "12px 4px 2px 2px",
    //     closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    //     infoBoxClearance: new google.maps.Size(1, 1)
    // });
    
    // google.maps.event.addListener(marker, 'click', function() {
    //     infobox.open(map, this);
    //     map.panTo(loc);
    // });

      // --> adding autocomplete functionality 
    var input = document.getElementById('location');
    var searchform = document.getElementById('search_form');
    var place;
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        place = autocomplete.getPlace();
        //console.log(place);
    });

    searchform.addEventListener("Search", function() {
        var newlatlong = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
        map.setCenter(newlatlong);
        marker.setPosition(newlatlong);
        map.setZoom(12);
 
    });
     
    //Reset the input box on click
    input.addEventListener('click', function(){
      input.value = "";
    });

    // end of autocomplete code

      var contentString = "<img width='90' src=" + image + ">" + "<br>" + "<a href=/popups/" + id + '>' + name + "</a>" + '<br>' + address + '<br>' + 'Category: ' + category + '<br>' + price;
      
      var newInfoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    };

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow) {
      google.maps.event.addListener(marker, 'mouseover', function() {
        //if lastinfowindow is NOT not lastinfowindow or if lastinfowindow is lastinfowindow, close lastinfowindow
        if ( !! lastInfoWindow) {
          lastInfoWindow.close();
        }
        //if lastinfowindow is the same as newinfowindow, assign lastinfowindow to be null
        if (lastInfoWindow === newInfoWindow) {
          lastInfoWindow = null;
        // else open new infowindow for this(the marker), lastwindow is now assigned the value of newinfowindow
        } else {
          newInfoWindow.open(map, this);
          lastInfoWindow = newInfoWindow;
        }
      });
    }

  };
  
  google.maps.event.addDomListener(window, 'load', initialize);
});
