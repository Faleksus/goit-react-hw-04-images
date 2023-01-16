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
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    const getImages = async () => {
      try {
        const { hits, totalHits } = await pixabayGetImages(query, page);
        setImages(
          (prevPage) => (page === 1 ? hits : [...prevPage, ...hits]),
          setTotalHits(totalHits)
        );

        if (!totalHits) {
          Notiflix.Notify.success(`Images with this name not found :${query}`);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
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
