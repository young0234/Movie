import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap';
import { usePopularMoviesQuery } from '../../../hook/usePopularMoviesQuery';
import { useGenreListQuery } from '../../../hook/useGenreList'; 
import MovieCard from '../MovieCard/MovieCard';

const PopularMovieSlide = () => {
  const { data: moviesData, isLoading: moviesLoading, isError: moviesError, error: moviesErrorMsg } = usePopularMoviesQuery();
  const { data: genresData, isLoading: genresLoading, isError: genresError, error: genresErrorMsg } = useGenreListQuery();

  if (moviesLoading || genresLoading) return <h1>로딩중</h1>;
  if (moviesError) return <h1>{moviesErrorMsg.message}</h1>;
  if (genresError) return <h1>{genresErrorMsg.message}</h1>;

  const genresList = genresData?.data?.genres || [];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Container>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        draggable={true}
        swipeable={true}
      >
        {moviesData.data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genresList} />
        ))}
      </Carousel>
    </Container>
  );
};

export default PopularMovieSlide;
