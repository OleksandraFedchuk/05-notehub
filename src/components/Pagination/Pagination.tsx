import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  function handlePageChange(selectedItem: { selected: number }) {
    onPageChange(selectedItem.selected + 1);
  }

  return (
    <nav aria-label="Notes pagination" className={css.wrapper}>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        forcePage={
          typeof currentPage === "number" ? currentPage - 1 : undefined
        }
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        previousLabel="←"
        nextLabel="→"
        breakLabel="…"
        containerClassName={css.pagination}
        pageClassName={css.page}
        pageLinkClassName={css.link}
        previousClassName={css.page}
        nextClassName={css.page}
        previousLinkClassName={css.link}
        nextLinkClassName={css.link}
        breakClassName={css.page}
        breakLinkClassName={css.link}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </nav>
  );
}
