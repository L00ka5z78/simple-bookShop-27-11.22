import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Display() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async (id) => {
      try {
        const res = await axios.get('http://localhost:8800/books' + id);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);

  const navigate = useNavigate();
  //   const location = useLocation();

  const handleClick = async (e) => {
    e.preventDefault(); // to avoid refreshing the page after clicking the button
    try {
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Details</h1>
      <div className="book">
        <h2>title</h2>
        <p>description</p>
        <span>$$$</span>
      </div>

      <button className="formButton" onClick={handleClick}>
        Home page
      </button>
    </div>
  );
}
