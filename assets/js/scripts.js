function getLocationFromGoogle() {
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();
        document.getElementById('location').value = place.name;
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();

    });
}

$.getJSON('https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&oauth_token=45MJAFS5HC2AB4DJMCA3K0RHK3EYWU5STFOOWXU0H5CBN3AS&v=20170817', function (data) {

});

$(document).ready(function () {
    getLocationFromGoogle();
    $('#location, #latitude, #longitude').val('');
})