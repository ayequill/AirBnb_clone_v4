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
    }
);
