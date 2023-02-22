import React, { useEffect, useRef, useState } from "react";
import NewsData from "./NewsData";
import "./App.css";

function News() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState("tesla");

    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_17640069902c5dd5c852eaed6122d8e3768f0&q=${query}`;

    const queryInput = useRef(null);

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

            console.log(jsonRes.results);
            setNews(jsonRes.results);
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
                {news.map((news) => {
                    return <NewsData key={news.url} newss={news} />;
                })}
            </div>
        </>
    );
}

export default News;
