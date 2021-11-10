import Pagination from "@material-ui/lab/Pagination";
const CustomPagination = ({ setPageNumber, numOfPages }) => {
  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <div>
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
};

export default CustomPagination;
