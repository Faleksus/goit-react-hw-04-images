import PropTypes from "prop-types";
import { useState } from "react";
import css from "./Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery("");
  };

  return (
    <header className={css.searchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.btn}>
          <span className={css.btnLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  query: PropTypes.string,
  handleInputChange: PropTypes.func,
};