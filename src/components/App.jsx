import PropTypes from "prop-types";
import Notiflix from "notiflix";
import { useState, useEffect } from "react";

import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { pixabayGetImages } from "services/api";
import { Section } from "./Section/Section";

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      componentDidUpdate()
    }
 
  async function componentDidUpdate(_, prevState) {
    // const { query, page, images } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page
    ) {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await pixabayGetImages(
          query,
          page
        );
        setImages(page === 1 ? hits : [...images, ...hits],
          setTotalHits(totalHits)
        );

        if (!totalHits) {
          Notiflix.Notify.success(`Images with this name not found :${query}`);
          return;
        }

      } catch (error) {
        setError(error)
      } finally {
          setIsLoading(true)
      }
    }
  }
}, [query, page, images, error, totalHits]);

  const handleSubmit = query => {
    // this.setState({ query, page: 1 });
    setQuery(query);
    setPage(1)
  };

  // const handleLoadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };

  const handleLoadMore = (event) => {
    event.preventDefault()
    setPage(prevState => prevState + 1);
  };

  return (
    <Section>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {totalHits > images.length && <Button onLoadMore={handleLoadMore} />}
    </Section>
  );
};

App.propTypes = {
  handleSubmit: PropTypes.func,
  images: PropTypes.string,
  isLoading: PropTypes.bool,
  handleLoadMore: PropTypes.string,
};