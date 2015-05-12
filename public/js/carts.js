var map;

function initialize() {
  var sf = new google.maps.LatLng(37.761, -122.441);
  map = new google.maps.Map(document.getElementById('map-canvas'));

  var givenLocation = new google.maps.Marker({
    map: map,
    position: sf
  });

  // Geolocation; code from Google.
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      givenLocation.setPosition(pos);
      map.setCenter(pos);
      map.setZoom(17);
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
    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
