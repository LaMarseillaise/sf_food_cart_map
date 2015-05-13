(function(){
  var map;

  function initialize() {
    var sf = new google.maps.LatLng(37.761, -122.441);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: sf,
      zoom: 18
    });

    // Geolocation; code from Google.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
        map.setCenter(pos);
        map.setZoom(18);
      }, function() {
        map.setCenter(sf);
        map.setZoom(13);
      });
    }

    $.getJSON("https://data.sfgov.org/resource/rqzj-sfat.json", function(data) {
      $.each(data, function(key, cart) {
        var coords = new google.maps.LatLng(cart.latitude, cart.longitude);
        var marker = new google.maps.Marker({
          position: coords,
          map: map,
          title: cart.applicant
        });

        var infowindow = new google.maps.InfoWindow({
            content:  "<h3>" + cart.applicant + "</h3>" +
                      "<p><strong>Food:</strong> "    + cart.fooditems.replace(/:/g, ',') + "</p>" +
                      "<p><strong>Type:</strong> "    + cart.facilitytype + "</p>" +
                      "<p><strong>Address:</strong> " + cart.address      + "</p>" +
                      "<p><strong>Status:</strong> "  + cart.status       + "</p>"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
      });
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
})();
