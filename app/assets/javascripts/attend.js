function geoSuccess(position) {
    alert("Your position: " + position.coords.latitude
	 + ", " + position.coords.longitude);
}

function geoFailure(error) {
    switch(error.code)
    {
    case error.PERMISSION_DENIED:
      alert("Użytkownik odmówił udostępnienia danych geolokacyjnych.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Brak danych geolokacyjnych. Prawdopodobnie GPS jest wyłączony.");
      break;
    case error.TIMEOUT:
      alert("Przekroczono czas oczekiwania na dane geolokacyjne.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Napotkano nieznany błąd przy pobieraniu danych geolokacyjnych.");
      break;
    }
}

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
    alert("Twoja przeglądarka nie obsługuje geolokacji.");
}
