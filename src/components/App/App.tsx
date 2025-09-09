import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <NoteList />
        <SearchBox />
        {/* <Pagination /> */}
        <NoteForm />
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
}
