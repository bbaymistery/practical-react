import React, { useState } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

import Paginate from "./Utils";
function App() {
  const { loading, data } = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const [listNamePerPage] = useState(10);

  const indexOfLastListName = currentPage * listNamePerPage;
  const indexOfFirstListName = indexOfLastListName - listNamePerPage;
  const currentListName = data.slice(indexOfFirstListName, indexOfLastListName);
  const totalPageNum = Math.ceil(data.length / listNamePerPage);

  //
  return (
    <main>
      <div className="section-title">
        {loading ? <h1>Loading... </h1> : <h1>Pagination</h1>}
        <div className="underline"></div>
      </div>

      <section className="followers">
        <div className="container">
          {currentListName
            .sort((a, b) => a.login.localeCompare(b.login))
            .map((d) => {
              return <Follower {...d} key={d.id} />;
            })}
        </div>
      </section>

      <div className="btn-container">
        <Paginate pages={totalPageNum} setCurrentPage={setCurrentPage} />
      </div>
    </main>
  );
}

export default App;
