import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUpcomingMoviesQuery } from '../../../hook/useUpcomingMoviesQuery';
import { useGenreListQuery } from '../../../hook/useGenreList'; 
import MovieCard from '../MovieCard/MovieCard';
import { Container } from 'react-bootstrap';

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  const { data: genresData, isLoading: genresLoading, isError: genresError } = useGenreListQuery();

  if (isLoading || genresLoading) {
    return <h1>로딩중</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (genresError) {
    return <h1>장르 정보를 불러올 수 없습니다.</h1>;
  }

  const genresList = genresData?.data?.genres || [];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
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
        {data.data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} genres={genresList} />
        ))}
      </Carousel>
    </Container>
  );
};

export default UpcomingMovieSlide;
