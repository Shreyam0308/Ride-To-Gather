import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/Css/AddArea.css";

export const AddArea = () => {
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/get_all_cities')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/create_area', { name, city_id: cityId });
      setMessage('Area added successfully!');
      setName('');
      setCityId('');
    } catch (error) {
      console.error('Error adding area:', error);
      setMessage('Failed to add area.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-area-container">
      <h2 className="add-ride-heading">Add Area</h2>
      <form onSubmit={handleSubmit} className="add-area-form">
        <div className="form-group">
          <label htmlFor="name">Area Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter area name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            required
          >
            <option value="" disabled>Select a city</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Add Area</button>
      </form>
      {loading && <div className="loading-spinner"></div>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};
