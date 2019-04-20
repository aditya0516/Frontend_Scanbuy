import React from "react";

import defaultPic from "../assets/default.png";
import axios from "axios";

export default function BookItem({ books }) {
  return books.map(book => {
    const {
      id,
      volumeInfo: { authors, title, pageCount, imageLinks, infoLink }
    } = book;
  // console.log(book);
    axios.post(`http://localhost:4000/books`,
    {book}).then(res=>{
      console.log(res)
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
    
    return (
      <div className="book" key={id}>
        <img src={displayImageSrc(imageLinks)} alt={title} />
        <div className="book__author">By: {displayAuthor(authors)}</div>
        <div className="book__title">{displayTitle(title)}</div>
        <div className="book__pages">
          No. Of Pages: {displayPages(pageCount)}
        </div>
        <a
          href={infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="book__btn"
        >
          See this Book
        </a>
      </div>
    );
  });

  function displayImageSrc(imageLinks) {
    return imageLinks ? imageLinks.thumbnail : defaultPic;
  }

  function displayAuthor(authors) {
    return authors
      ? authors
          .slice(0, 3)
          .join(", ")
          .slice(0, 60)
      : "N/A";
  }

  function displayTitle(title) {
    return title ? title.slice(0, 60) : "N/A";
  }

  function displayPages(pageCount) {
    return pageCount ? pageCount : "N/A";
  }
}
