import React, { useState, useEffect } from 'react';
import axios from 'axios';
const LandingPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hello');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Landing Page</h1>
      <div>{data}</div>
    </div>
  );
};
export default LandingPage;
