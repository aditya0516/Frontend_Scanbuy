import React, { useContext, useState, useRef, useEffect } from "react";

import "../styles/search.scss";
import { DataContext } from "./Context";
//import axios from 'axios';

export default function Search() {
  const { query, setQuery, setData, setLoading } = useContext(DataContext);
  const [isEmpty, setIsEmpty] = useState(false);
  const inputText = useRef();

  useEffect(() => {
    inputText.current.focus();
  });

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  });

  return (
    <form onSubmit={handleSubmit} className="search">
      <label>SCANBOOK</label>
      <input
        className="search__input--text"
        maxLength="50"
        onChange={handleChange}
        placeholder="Search by ISBN..."
        ref={inputText}
        type="number"
        pattern="/^97[89][0-9]{10}$/"
        value={query}
      />
      {query.length !== 0 && (
        <button onClick={handelClick} className="closeBtn">
          &times;
        </button>
      )}
      <input className="search__input--submit" type="submit" value="Search" />
      {isEmpty && <span>Error: Please provide a search query first</span>}
    </form>
  );
  function checkISBN(value) {
    var regex = /9[0-9]{12}/;

    if (regex.test(value)) {
      var chars = value.split("");
      //console.log(chars)
      
      var last = chars.pop();

      parseInt(last, 10);
      // console.log(last);
      var sum = 0;
      var check;
      var i;

      // Compute the ISBN-13 check digit
      for (i = 0; i < chars.length; i++) {
        sum += ((i % 2) * 2 + 1) * parseInt(chars[i], 10);
      }
      check = 10 - (sum % 10);
      parseInt(check);
      if (check === 10) {
        check = "0";
      }
      //console.log(check);
      //console.log("helo")

      if (check != last) {
        console.log("Invalid ISBN");

        alert("InValid ISBN");
        return false;
      } else {
        console.log("Valid ISBN");
        return true;
        //alert("Invalid ISBN check digit");
      }
    } else {
      console.log("Invalid ISBN");

      alert("Invalid ISBN");
      return false;
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") handleSubmit(e);
  }

  function handelClick(e) {
    e.preventDefault();
    setQuery("");
  }

  function handleChange(e) {
    const { value } = e.target;
    setQuery(value);
   // checkISBN(value);
  }
  
  

  function handleSubmit(e) {
    e.preventDefault();
    checkISBN(query)
    if (!query.length && !checkISBN(query)) {
      setIsEmpty(true);
      console.log("Its Empty");
    } else {
      console.log("Fetching from Google");
      setLoading(true);
      setIsEmpty(false);
      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${query}`)
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          setData(data);
          //console.log(data)
        })
        .catch(err => {
          console.log(`Fetch api error: ${err}`);
        });
    }
  }
}
