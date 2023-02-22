import React from "react";
import "./App.css";
import dummyImg from "./assets/dummyImg.jpg";

function NewsData({ newss }) {
    return (
        <div className="news-container">
            <img
                src={newss.urlToImage ? newss.urlToImage : dummyImg}
                alt={newss.title}
            />
            <h2>{newss.title}</h2>
            <p>{newss.description}</p>
            <button onClick={() => window.open(newss.url)}>Read More</button>
        </div>
    );
}

export default NewsData;
