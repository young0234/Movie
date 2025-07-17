import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ 추가
import { usePopularMoviesQuery } from "../../../hook/usePopularMoviesQuery";
import { useMovieTrailer } from "../../../hook/useMovieTrailer";
import { Button, Modal, Badge } from "react-bootstrap"; // ✅ Badge 추가

const Banner = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.data?.results?.[0];
  const movieId = movie?.id;

  // ✅ Hook은 항상 최상단에서 실행해야 함
  const trailerQuery = useMovieTrailer(movieId, { enabled: !!movieId });
  const trailerKey = trailerQuery.data?.data?.results.find(
    (video) => video.type === "Trailer" && video.official === true
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDetail = () => navigate(`/movies/${movieId}`);

  if (isLoading) return <h2>로딩중...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
      }}
    >
      <div className="banner-overlay"></div>

      <div className="banner-content">
        <h1 className="banner-title">{movie.title}</h1>

        <div className="banner-meta">
          <Badge bg="warning" className="me-2">
            평점 {movie.vote_average.toFixed(1)}
          </Badge>
          <Badge bg="secondary">개봉일 {movie.release_date}</Badge>
        </div>

        <p className="banner-overview">{movie.overview}</p>

        <div className="banner-buttons">
          <Button variant="danger" onClick={handleShow} className="me-2">
            예고편 보기
          </Button>
          <Button variant="outline-light" onClick={handleDetail}>
            상세보기
          </Button>
        </div>
      </div>

      {/* 트레일러 모달 */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - 예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey.key}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>예고편이 없습니다.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Banner;
