import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";

  const API_KEY = "e75d2ece7e76aad055890bf08ba6acd5";

  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");

  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=sp`
      );
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.log("Ocurrió el siguiente problema: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleCambioCiudad}></input>
        <button type="submit" value={ciudad}>
          Buscar
        </button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
          <p>Condición Meteorlógica: {dataClima.weather[0].description}</p>
          <p>
            Sensación Térmica:{" "}
            {parseInt(dataClima?.main?.feels_like - difKelvin)}°C
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
