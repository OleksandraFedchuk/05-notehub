import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../servecies/noteService";

import Modal from "../Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";

export default function App() {
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["note", page],
    queryFn: () => fetchNotes(page, 12),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

        <SearchBox />
        {/* {isSuccess && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )} */}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {isModalOpen && <Modal onClose={closeModal} />}
      </header>
    </div>
  );
}
