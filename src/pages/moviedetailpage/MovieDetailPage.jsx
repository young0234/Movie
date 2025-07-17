import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

/* Hooks */
import { useMovieTrailer } from "../../hook/useMovieTrailer";
import { useMovieDetail } from "../../hook/useMovieDetail";
import { useMovieReviews } from "../../hook/useMovieReviews";
import { useMovieCredits } from "../../hook/useMovieCredits";
import { useMovieSimilar } from "../../hook/useMovieSimilar";
import { useMovieRecommendations } from "../../hook/useMovieRecommendations";

/* UI */
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import {
  BsShieldCheck,
  BsExclamationTriangle,
  BsPlayCircle,
  BsClock,
  BsGlobeAmericas,
  BsTranslate,
} from "react-icons/bs";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useMovieDetail(id);
  const { data: reviewsData } = useMovieReviews(id);
  const { data: creditsData } = useMovieCredits(id);
  const { data: trailerData } = useMovieTrailer(id);
  const { data: recommendData } = useMovieRecommendations(id);
  const { data: similarData } = useMovieSimilar(id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 페이지네이션 상태
  const [recPage, setRecPage] = useState(1);
  const [simPage, setSimPage] = useState(1);

  const itemsPerPage = 4;

  if (isLoading) return <h2><BarLoader className="loader" /></h2>;
  if (isError) return <h2>{error.message}</h2>;

  const movie = data?.data;

  const trailer = trailerData?.data?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const backdropStyle = {
    backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    position: "relative",
  };

  // 추천영화 페이지네이션 계산
  const recMovies = recommendData?.data?.results || [];
  const recTotalPages = Math.ceil(recMovies.length / itemsPerPage);
  const recStart = (recPage - 1) * itemsPerPage;
  const pagedRecMovies = recMovies.slice(recStart, recStart + itemsPerPage);

  // 비슷한 영화 페이지네이션 계산
  const simMovies = similarData?.data?.results || [];
  const simTotalPages = Math.ceil(simMovies.length / itemsPerPage);
  const simStart = (simPage - 1) * itemsPerPage;
  const pagedSimMovies = simMovies.slice(simStart, simStart + itemsPerPage);

  return (
    <div>
      
      {/* 상단 상세 정보 */}
      <div className="movie-detail-back" style={backdropStyle}>
        <Container>
          <Row className="align-items-center">
            <Col sm={4}>
              <img
                src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col sm={8} className="ml-5">
              <h2 className="mb-2">{movie.title}</h2>
              <p>개봉일: {movie.release_date}</p>
              <p>{movie.overview}</p>

              {/* 관람등급 */}
              <p>
                {movie.adult ? (
                  <span><BsExclamationTriangle className="me-2" /> 성인 관람가</span>
                ) : (
                  <span><BsShieldCheck className="me-2" /> 전체 관람가</span>
                )}
              </p>

              {/* 평점 */}
              <div className="mb-2">
                <strong>평점:</strong>
                <Badge
                  bg={movie.vote_average >= 7 ? "success" : "warning"}
                  className="ms-2"
                >
                  {movie.vote_average.toFixed(1)}
                </Badge>
              </div>

              {/* 장르 */}
              <div className="mb-2">
                <strong>장르:</strong>{" "}
                {movie.genres?.map((g) => g.name).join(", ")}
              </div>

              {/* 러닝타임 */}
              <div className="mb-2">
                <strong>
                  <BsClock className="me-2" /> 러닝타임:
                </strong>{" "}
                {movie.runtime}분
              </div>

              {/* 국가 */}
              <div className="mb-2">
                <strong>
                  <BsGlobeAmericas className="me-2" /> 국가:
                </strong>{" "}
                {movie.production_countries?.map((c) => c.name).join(", ")}
              </div>

              {/* 언어 */}
              <div className="mb-2">
                <strong>
                  <BsTranslate className="me-2" /> 언어:
                </strong>{" "}
                {movie.original_language?.toUpperCase()}
              </div>

              {/* 예고편 버튼 */}
              <div className="mt-4">
                {trailer ? (
                  <Button variant="danger" onClick={handleShow}>
                    <BsPlayCircle className="me-2" />
                    예고편 보기
                  </Button>
                ) : (
                  <p>
                    <BsPlayCircle className="me-2" /> 예고편이 제공되지 않습니다.
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {/* 예고편 모달 */}
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{movie.title} - 예고편</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {trailer ? (
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube trailer"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>예고편을 불러올 수 없습니다.</p>
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* 출연진 */}
      {creditsData?.data?.cast?.length > 0 && (
        <Container className="movie-cast mt-5">
          <h4 className="mb-4">출연진</h4>
          <Row>
            {creditsData.data.cast.slice(0, 8).map((actor) => (
              <Col
                key={actor.id}
                xs={6}
                sm={4}
                md={3}
                className="mb-4 text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://media.themoviedb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="mt-2">
                  <strong>{actor.name}</strong>
                  <br />
                  <small className="text-muted">({actor.character})</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* 리뷰 */}
      {reviewsData?.data?.results?.length > 0 && (
        <Container className="movie-reviews mt-5">
          <h4 className="mb-4">리뷰</h4>
          {reviewsData.data.results.map((review) => (
            <div
              key={review.id}
              className="p-3 mb-3 border rounded bg-light text-dark"
            >
              <h6 className="mb-1">{review.author}</h6>
              <small className="text-muted">
                작성일: {review.created_at.slice(0, 10)}
              </small>
              <p className="mt-2">
                {review.content.length > 300
                  ? review.content.slice(0, 300) + "..."
                  : review.content}
              </p>
            </div>
          ))}
        </Container>
      )}

      {/* 추천 영화 */}
      <Container className="movie-recommend mt-5">
        <h4 className="mb-4">추천 영화</h4>
        <Row>
          {pagedRecMovies.map((rec) => (
            <Col key={rec.id} xs={12} md={6} className="mb-4">
              <div
                className="movie-bg-card"
                style={{
                  backgroundImage: `url(https://media.themoviedb.org/t/p/w780${rec.backdrop_path})`,
                  height: "180px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => navigate(`/movies/${rec.id}`)}
              >
                {/* 오버레이 */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                    color: "#fff",
                    padding: "15px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <h5 style={{ marginBottom: "5px" }}>{rec.title}</h5>
                    <small>⭐ {rec.vote_average.toFixed(1)}</small>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* 페이지네이션 유지 */}
        {recTotalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            {[...Array(recTotalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === recPage}
                onClick={() => setRecPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Container>
{/* 비슷한 영화 */}
{simMovies.length > 0 && (
  <Container className="movie-similar mt-5">
    <h4 className="mb-4">비슷한 영화</h4>
    <Row>
      {pagedSimMovies.map((sim) => (
        <Col key={sim.id} xs={12} md={6} className="mb-4">
          <div
            className="movie-bg-card"
            style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/w780${sim.backdrop_path})`,
              height: "180px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              position: "relative",
              cursor: "pointer",
              overflow: "hidden",
            }}
            onClick={() => navigate(`/movies/${sim.id}`)}
          >
            {/* 오버레이 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                color: "#fff",
                padding: "15px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div>
                <h5 style={{ marginBottom: "5px" }}>{sim.title}</h5>
                <small>⭐ {sim.vote_average.toFixed(1)}</small>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>

    {/* 페이지네이션 */}
    {simTotalPages > 1 && (
      <Pagination className="justify-content-center mt-3">
        {[...Array(simTotalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === simPage}
            onClick={() => setSimPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )}
  </Container>
)}

    </div>
  );
};

export default MovieDetailPage;
