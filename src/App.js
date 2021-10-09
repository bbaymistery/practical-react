import SearchForm from "./components/SearchForm";
import Button from "./components/Button";
import { useGlobalContext } from "./context/context";
import Story from "./components/Story";
function App() {
  const { loading, stories } = useGlobalContext();

  return (
    <>
      <SearchForm />
      <Button />
      {loading || (
        <div className="stories">
          <Story stories={stories} />
        </div>
      )}

      {loading ? <div className="loading"></div> : null}
    </>
  );
}

export default App;
