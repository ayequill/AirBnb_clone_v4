$(document).ready(() => {
        const amenDict = {};
        $('input.amenity_name').on('change', function () {
            if ($(this).is(':checked')) {
                amenDict[$(this).data('name')] = $(this).data('id');
            }
            if (!$(this).is(':checked') && amenDict[$(this).data('name')]) {
                delete amenDict[$(this).data('name')];
            }
            const filter = Object.keys(amenDict).join(', ');
            $('.amenities_filter').text(filter);
        });
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/status/",
            type: "GET",
            success: (res) => {
                if (res.status === 'OK') {
                    $('#api_status').addClass('available')
                } else {
                    $('#api_status').removeClass('available')
                }
            }
        })
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            data: JSON.stringify({}),
            dataType: "json",
            success: (res) => {
                fetchAmenities(res)
            }
        })
        $('button').click(() => {
            $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            data: JSON.stringify({amenities: Object.values(amenDict)}),
            dataType: "json",
            success: (res) => {
                $('.places').children().remove()
                fetchAmenities(res)
            }
        })
        })
    }
);

const fetchAmenities = (res) => {
    for (let place of res) {
        const {
            name,
            price_by_night,
            max_guest,
            number_rooms,
            number_bathrooms,
            description
        } = place
        $('.places').append(
            `<article>
                  <div class="title_box">
                    <h2>${name}</h2>
                    <div class="price_by_night">$${price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${max_guest} Guests</div>
                        <div class="number_rooms">${number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">${description}</div>
            </article>`
        )
    }
}