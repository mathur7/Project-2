$(document).ready(function() {
    function initialize() {
    //just a variable storing a location
    var mapLoad = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}]
    }

    var map = new google.maps.Map(document.getElementById("map-search"), mapLoad);

    var loadSearch = function() {
      // Find search string and geocode and add to url
      var url = "/popups/search.json";
      $.ajax(url, {
        type: 'get',
        data: {
        "q": $('#q').val(),
        "geocode": $('#geocode').val()
      }
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image, data[i].price, data[i].geocode);
        }
      });
    }

    loadSearch();

    $('#search_form').on('submit', function(event) {
    });

    //   var loadSearchGeo = function() {
    //   // Find search string and geocode and add to url
    //   var url = "/popups/search_geo.json";
    //   $.ajax(url, {
    //     type: 'get',
    //     data: {
    //     "q": $('#q').val(),
    //     "geocode": $('#geocode').val()
    //   }
    //   }).success(function(data) {
    //     for (var i in data) {
    //       addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image, data[i].price, data[i].geocode);
    //     }
    //   });
    // }

    // loadSearchGeo();

    // $('#search_form').on('submit', function(event) {
    // });


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
      
      var contentString = "<a href=/popups/" + id + '>' + name + "</a>" + "<br>" + "<img width='90' height='90' src=" + image + ">" + "<br>";
      var newInfoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    };

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow) {
      google.maps.event.addListener(marker, 'mouseover', function() {
        if ( !! lastInfoWindow) {
          lastInfoWindow.close();
        }
        if (lastInfoWindow === newInfoWindow) {
          lastInfoWindow = null;
        } else {
          newInfoWindow.open(map, this);
          lastInfoWindow = newInfoWindow;
        }
      });
      // newInfoWindow.open(map,marker);
    }
  };
  google.maps.event.addDomListener(window, 'load', initialize);
});