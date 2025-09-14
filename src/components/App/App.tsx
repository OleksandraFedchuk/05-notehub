import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../servecies/noteService";

import Modal from "../Modal/Modal";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["note", page],
    queryFn: () => fetchNotes(page, 12),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* {data && <NoteList />} */}
        <NoteList />

        <SearchBox />
        {/* <Pagination /> */}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {isModalOpen && <Modal onClose={closeModal} />}
      </header>
    </div>
  );
}
