import { useState, useEffect } from "react";

const useFetch = (queryValue) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([null]);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setData(data.results);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: "Incorrect IMDb ID." });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${mainUrl}${apikeyAndLanguage}&query=${queryValue}${page}`);
  }, [queryValue]);
  return { loading, data, error };
};

export default useFetch;
