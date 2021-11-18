import React, { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function CustomPagination({ setPage, count }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll({
      top: 450,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={Number(count)}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
