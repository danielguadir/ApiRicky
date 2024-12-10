// src/components/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/apiConfig";  // Asegúrate de tener la URL en este archivo

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Para mostrar detalles

  // Consumir la API de Rick and Morty
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log("Datos de la API:", response.data); // Verifica los datos recibidos
        setData(response.data.results); // Los resultados de personajes están en 'results'
        setFilteredData(response.data.results);  // Filtramos inicialmente los datos
      })
      .catch(error => {
        setError("Hubo un problema al cargar los datos.");
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Función para filtrar personajes por nombre
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);
    filterData(query);  // Llama a la función para filtrar la lista
  };

  const filterData = (query) => {
    const result = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) // Filtra por nombre
    );
    setFilteredData(result);
  };

  // Función para manejar el clic en un personaje y mostrar detalles
  const handleItemClick = (item) => {
    setSelectedItem(item);  // Guarda el personaje seleccionado
  };

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar personaje..."
      />

      {/* Mostrar mensaje de error si no se pueden cargar los datos */}
      {error && <p>{error}</p>}

      {/* Mostrar lista de personajes */}
      <ul>
        {filteredData.length === 0 ? (
          <p>No se encontraron personajes.</p>
        ) : (
          filteredData.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.name}
            </li>
          ))
        )}
      </ul>

      {/* Mostrar detalles del personaje seleccionado */}
      {selectedItem && (
        <div>
          <h2>Detalles de {selectedItem.name}</h2>
          <img src={selectedItem.image} alt={selectedItem.name} />
          <p>Estado: {selectedItem.status}</p>
          <p>Especie: {selectedItem.species}</p>
          <p>Género: {selectedItem.gender}</p>
          <p>Origen: {selectedItem.origin.name}</p>
          <p>Ubicación: {selectedItem.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default App;
