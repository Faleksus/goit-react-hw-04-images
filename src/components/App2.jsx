// import PropTypes from "prop-types";
// import Notiflix from "notiflix";
// import { useState, useEffect } from "react";

// import { Button } from "./Button/Button";
// import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Searchbar } from "./Searchbar/Searchbar";
// import { Loader } from "./Loader/Loader";
// import { pixabayGetImages } from "services/api";
// import { Section } from "./Section/Section";

// export const App = () => {
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState("");
//   const [totalHits, setTotalHits] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (query !== '') {
//       onImageUpdate()
//     }
//     async function onImageUpdate() {
//       setIsLoading(true);
//       if (page > 1) {
        
//         try {
//           const images = await pixabayGetImages(query, page);
//           setImages(prevState => prevState.concat(images.hits));

//           // if (!totalHits) {
//           //   Notiflix.Notify.success(
//           //     `Images with this name not found :${query}`
//           //   );
//           //   return;
//           // }
//         } catch (error) {
//           setError(error);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         try {
//           const result = await pixabayGetImages(query, page);
//           if (totalHits === 0) {
//               Notiflix.Notify.success(
//                 `Images with this name not found :${query}`
//               );
//               return;
//           } else {
//             setImages(result.hits)
//             setTotalHits(result.totalHits)
//             return
//           }
//         } catch (error) {
//           setError(error)
//         } finally {
//           setIsLoading(false)
//         }
//       }
//     };
//   }, [query, page, images, error, totalHits]);

//   const handleSubmit = (event) => {
//     // event.preventDefault()
//     setQuery(event);
//     setPage(1);
//   };

//   const handleLoadMore = (event) => {
//     event.preventDefault()
//     setPage(prevState => prevState + 1);
//   };

//   return (
//     <Section>
//       <Searchbar onSubmit={handleSubmit} />
//       <ImageGallery images={images} />
//       {isLoading && <Loader />}
//       {totalHits > images.length && <Button onLoadMore={handleLoadMore} />}
//     </Section>
//   );
// };

// App.propTypes = {
//   handleSubmit: PropTypes.func,
//   images: PropTypes.string,
//   isLoading: PropTypes.bool,
//   handleLoadMore: PropTypes.string,
// };