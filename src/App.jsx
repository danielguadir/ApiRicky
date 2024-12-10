import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]); // Para almacenar los datos de la API
  const [search, setSearch] = useState(""); // Para la búsqueda
  const [filteredData, setFilteredData] = useState([]); // Para los datos filtrados
  const [selectedItem, setSelectedItem] = useState(null); // Para los detalles del elemento

  // Consumir la API y cargar los datos
  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api")  // Reemplaza con la URL de la API que estás utilizando
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Inicializa los datos filtrados con todos los datos
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos de la API:", error);
      });
  }, []);

  // Manejar la búsqueda
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);
    filterData(query);
  };

  // Filtrar los datos según la búsqueda
  const filterData = (query) => {
    const result = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) // Cambia 'name' por la propiedad adecuada de tu API
    );
    setFilteredData(result);
  };

  // Manejar clic en un elemento para mostrar detalles
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h1>Lista de Elementos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar..."
      />

      {/* Mostrar lista filtrada */}
      <ul>
        {filteredData.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.name} {/* Cambia 'name' por el campo que desees mostrar */}
          </li>
        ))}
      </ul>

      {/* Mostrar detalles del elemento seleccionado */}
      {selectedItem && (
        <div>
          <h2>Detalles del Elemento</h2>
          <p>{selectedItem.name}</p> {/* Cambia 'name' por el campo que desees mostrar */}
          {/* Aquí puedes agregar más detalles */}
        </div>
      )}
    </div>
  );
};

export default App;
