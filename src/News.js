import React, { useEffect, useRef, useState } from "react";
import NewsData from "./NewsData";
import "./App.css";

function News() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState("tesla");

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=e76622b4d45d49588714d715e0e6b51e`;

    const queryInput = useRef(null);
    const newQueryInput = useRef(null);

    const topicTags = [
        "Nature",
        "Movie",
        "Music",
        "Sports",
        "Cricket",
        "FootBall",
        "Fifa",
    ];

    useEffect(() => {
        fetchData();
    }, [query]);

    async function fetchData() {
        try {
            const res = await fetch(apiUrl);
            const jsonRes = await res.json();

            setNews(jsonRes.articles);
        } catch (e) {
            console.log(e, "Error");
        }
    }

    const updateData = (event) => {
        event.preventDefault();
        setQuery(queryInput.current.value);
        queryInput.current.value = "";
    };

    const handleClick = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    };

    return (
        <>
            <form onSubmit={updateData}>
                <input type="text" ref={queryInput} placeholder="Search News" />
                <button onClick={updateData}>Search</button>
            </form>

            <div className="topic">
                {topicTags.map((topic) => {
                    return (
                        <>
                            <input
                                className="topic-input"
                                type="submit"
                                value={topic}
                                onClick={handleClick}
                            />
                        </>
                    );
                })}
            </div>

            <div className="container">
                {news?.map((news) => {
                    return <NewsData key={news.url} newss={news} />;
                })}
            </div>
        </>
    );
}

export default News;
