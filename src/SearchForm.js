import { useGlobalContext } from "./context";
import React, { useEffect } from "react";
const SearchForm = () => {
  const { setQuery, query, error } = useGlobalContext();

  return (
    <form className="search-form">
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="error">{error.show && error.msg}</div>
    </form>
  );
};

export default SearchForm;
