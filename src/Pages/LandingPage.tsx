import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [msg, setMsg] = useState('' as string);
  const test = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/hello');
      console.log(response.data);
      setMsg(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <>
      <h1>Landing Page</h1>
      <h2>{msg}</h2>
    </>
  );
};
export default LandingPage;
