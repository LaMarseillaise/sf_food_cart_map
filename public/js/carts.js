(function(){
  var map;
  var markers = [];

  function initialize() {
    var sf = new google.maps.LatLng(37.788404, -122.402505);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 18
    });

    getCartLocations();

    // Geolocation; code from Google.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        if (position.coords.longitude > -122.517663 &&
            position.coords.longitude < -122.356489 &&
            position.coords.latitude  >   37.710603 &&
            position.coords.latitude  <   37.810393){
          var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
        } else {
          var pos = sf;
        }
        changeCenter(pos);
      }, function() {
        changeCenter(sf);
      });
    } else {
      changeCenter(sf);
    }

    google.maps.event.addListener(map, 'click', function(newCenter) {
      changeCenter(newCenter.latLng);
    });
  }

  function changeCenter(location){
    hideAllMarkers();
    showMarkers(location);
    map.panTo(location);
  }

  function getCartLocations(){
    $.getJSON("https://data.sfgov.org/resource/rqzj-sfat.json", function(data) {
      $.each(data, function(key, cart) {
        var coords = new google.maps.LatLng(cart.latitude, cart.longitude);
        var marker = new google.maps.Marker({
          position: coords,
          map: map,
          title: cart.applicant
        });

        if(cart.fooditems){
          var food = cart.fooditems.replace(/:/g, ',')
        } else {
          var food = "Unknown"
        }

        var infowindow = new google.maps.InfoWindow({
            content:  "<h3>" + cart.applicant + "</h3>" +
                      "<p><strong>Food:</strong> "    + food              + "</p>" +
                      "<p><strong>Type:</strong> "    + cart.facilitytype + "</p>" +
                      "<p><strong>Address:</strong> " + cart.address      + "</p>" +
                      "<p><strong>Status:</strong> "  + cart.status       + "</p>"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        markers.push(marker);
      });
    });
  }

  function showMarkers(location) {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].getPosition().A > location.A - 0.008 &&
          markers[i].getPosition().A < location.A + 0.008 &&
          markers[i].getPosition().F > location.F - 0.012 &&
          markers[i].getPosition().F < location.F + 0.012){
        markers[i].setMap(map);
      }
    }
  }

  function hideAllMarkers(){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);
})();
