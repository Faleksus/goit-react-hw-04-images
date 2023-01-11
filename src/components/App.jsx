import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { Component } from "react";
import { pixabayGetImages } from "services/api";
import { Section } from './Section/Section';

export class App extends Component {

  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const { hits, totalHits } = await pixabayGetImages(
          query,
          page
        );
        this.setState({
          images:
            page === 1 ? hits : [...images, ...hits],
          totalHits: totalHits,
        });

        if (!totalHits) {
          Notiflix.Notify.success(`Images with this name not found :${query}`);
          return;
        }

      } catch (error) {
        this.setState({
          error: error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { handleSubmit, handleLoadMore } = this;
    const { images, isLoading, totalHits } = this.state;

    return (
      <Section>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {totalHits > images.length && (<Button onLoadMore={handleLoadMore} />)}
      </Section>

    );
  }
};

App.propTypes = {
  handleSubmit: PropTypes.func,
  images: PropTypes.string,
  isLoading: PropTypes.bool,
  handleLoadMore: PropTypes.string,
}
