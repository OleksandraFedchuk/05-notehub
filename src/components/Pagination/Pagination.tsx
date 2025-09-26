import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  page,
  totalPage,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
