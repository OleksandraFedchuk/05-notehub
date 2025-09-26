import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../servecies/noteService";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["note", page],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

        <SearchBox
          text={text}
          onChange={(value) => {
            setText(value);
            debouncedSearch(value);
          }}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination page={page} totalPage={totalPages} setPage={setPage} />
        )}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {isModalOpen && <Modal onClose={closeModal} />}
      </header>
    </div>
  );
}
