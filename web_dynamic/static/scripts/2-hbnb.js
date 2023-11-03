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
            url: "http://0.0.0.0:5000/api/v1/status/",
            type: "GET",
            success: (res) => {
                console.log(res)
            }
        })
    }
);
