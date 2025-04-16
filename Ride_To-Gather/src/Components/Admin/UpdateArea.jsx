import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/Css/UpdateArea.css";

export const UpdateArea = () => {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [newAreaName, setNewAreaName] = useState("");

  // Fetch all cities on component mount
  useEffect(() => {
    axios.get("/get_all_cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  // Fetch areas when a city is selected
  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    axios.get(`/find_area_by_city_id/${cityId}`).then((response) => {
      setAreas(response.data);
    });
  };

  // Update area name
  const handleUpdateArea = () => {
    if (!selectedAreaId || !newAreaName || !selectedCityId) {
      alert("Please fill all fields.");
      return;
    }
    const data = {
      areaid: selectedAreaId,
      new_name: newAreaName,
      cityid: selectedCityId,
    };
    axios
      .put(`/update_area_name/${selectedAreaId}`, data, {
        headers: {
          "Content-Type": "application/json", // Ensure the request body is sent as JSON
        },
      })
      .then(() => {
        alert("Area name updated successfully!");
        setNewAreaName("");
        setSelectedAreaId("");
      })
      .catch((error) => {
        console.error("Error updating area:", error);
        alert("Failed to update area name.");
      });
  };

  return (
    <div className="update-area-container">
      <h2>Update Area</h2>
      <div className="form-group">
        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          value={selectedCityId}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="area">Select Area:</label>
        <select
          id="area"
          value={selectedAreaId}
          onChange={(e) => setSelectedAreaId(e.target.value)}
          disabled={!selectedCityId}
        >
          <option value="">-- Select Area --</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="newName">New Area Name:</label>
        <input
          type="text"
          id="newName"
          value={newAreaName}
          onChange={(e) => setNewAreaName(e.target.value)}
          placeholder="Enter new area name"
        />
      </div>
      <button onClick={handleUpdateArea} disabled={!selectedAreaId || !newAreaName}>
        Update Area
      </button>
    </div>
  );
};
