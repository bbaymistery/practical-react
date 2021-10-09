import { useGlobalContext } from "../context/context";

const SearchForm = () => {
  const { valueOfInput, handleSearch } = useGlobalContext();
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search Hacker News</h2>
      <input
        type="text"
        className="form-input"
        value={valueOfInput}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchForm;
