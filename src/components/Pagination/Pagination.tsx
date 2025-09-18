import css from "./Pagination.module.css";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination() {
  const [page, setPage] = useState(1);

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}
