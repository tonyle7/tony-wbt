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

function render(data) {
    $.each(data.response.groups, function (idx, val) {
        $('.results').prepend('<div class="results__length"><em>' + val.items.length + '</em>' + ' recommended places found</div>')
        $.each(val.items, function (idx2, val2) {
            if (val2.venue.url && val2.venue.name) {
                $('.recommended').append('<li class="recommended__item">' + '<a class="recommended__item--link" target="_blank" href="' + val2.venue.url + '">' + val2.venue.name + '</a></li>')
            } else if (val2.venue.name) {
                $('.recommended').append('<li class="recommended__item">' + val2.venue.name + '</li>')
            } else {
                $('.recommended').html('No results found')
            }
        })

    });
}

$(document).on('click', '#search', function (e) {
    e.preventDefault();

    $('.results').html('').append('<ul class="recommended"></ul>');

    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();

    $.getJSON('https://api.foursquare.com/v2/venues/explore?ll=' + latitude + ',' + longitude + '&oauth_token=IPH0S4EQYP24AUC0WHRZI0JBHJ1J1QSTXPGXEDH5SGTSEREP&v=20170821', function (data) {
        render(data);
    });
})

$(document).ready(function () {
    getLocationFromGoogle();
    $('#location, #latitude, #longitude').val('');
})