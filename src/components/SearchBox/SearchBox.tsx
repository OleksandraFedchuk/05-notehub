import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ text, onChange }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <input
        onChange={handleSearch}
        defaultValue={text}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
