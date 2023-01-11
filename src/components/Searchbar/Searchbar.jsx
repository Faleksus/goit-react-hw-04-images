import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component  {

  state = {
    query: '',
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);
    this.reset();
  }

  reset = () => {
    this.setState({ query: '' });
  }

  render() {
    const { handleSubmit, handleInputChange } = this;
    // Забув дописати state, на 29 рядку, з-за чого не очищався input )))
    // Деструктуризція зіграла проти мене )))
    const { query } = this.state;

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
    )
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  query: PropTypes.string,
  handleInputChange: PropTypes.func,
};
