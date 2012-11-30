function geoSuccess(position) {
    $.ajax({
        url: 'send_geolocation',
        data: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },
        success: function(data) {
            $("#attend_response").text("Pomyślnie zapisano twoją obecność.");
        },
	error: function(data) {
            $("#attend_response").text("Nie udało się zapisać twojej obecności. " + data.responseText);
        }
    });
}

function geoFailure(error) {
    switch(error.code)
    {
    case error.PERMISSION_DENIED:
        $("#attend_response").text("Użytkownik odmówił udostępnienia danych geolokacyjnych.");
        break;
    case error.POSITION_UNAVAILABLE:
        $("#attend_response").text("Brak danych geolokacyjnych. Prawdopodobnie GPS jest wyłączony.");
        break;
    case error.TIMEOUT:
        $("#attend_response").text("Przekroczono czas oczekiwania na dane geolokacyjne.");
        break;
    case error.UNKNOWN_ERROR:
        $("#attend_response").text("Napotkano nieznany błąd przy pobieraniu danych geolokacyjnych.");
        break;
    }
}

function attend() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoFailure,
            { enableHighAccuracy: true }
        );
    }
    else
    {
        $("#attend_response").text("Twoja przeglądarka nie obsługuje geolokacji.");
    }
}
