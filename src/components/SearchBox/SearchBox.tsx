import css from "./SearchBox.module.css";

// const handleSearch = (note: string) => {
//   console.log(note);
// };

export default function SearchBox() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
