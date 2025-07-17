import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

/* TV Hooks */
import { useTVDetailQuery } from "../../hook/useTVDetailQuery";
import { useTVRecommendationsQuery } from "../../hook/useTVRecommendationsQuery";
import { useTVSimilarQuery } from "../../hook/useTVSimilarQuery";
import { useTVCreditsQuery } from "../../hook/useTVCreditsQuery";
import { useTVReviewsQuery } from "../../hook/useTVReviewsQuery";
import { useTVTrailerQuery } from "../../hook/useTVTrailerQuery";

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

const TVDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useTVDetailQuery(id);
  const { data: recommendData } = useTVRecommendationsQuery(id);
  const { data: similarData } = useTVSimilarQuery(id);
  const { data: creditsData } = useTVCreditsQuery(id);
  const { data: reviewsData } = useTVReviewsQuery(id);
  const { data: trailerData } = useTVTrailerQuery(id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [recPage, setRecPage] = useState(1);
  const [simPage, setSimPage] = useState(1);
  const itemsPerPage = 4;

  if (isLoading) return <h2><BarLoader className="loader" /></h2>;
  if (isError) return <h2>{error.message}</h2>;

  const tv = data?.data;

  const trailer = trailerData?.data?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const backdropStyle = {
    backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${tv.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    position: "relative",
  };

  // 추천 TV 페이지네이션
  const recTV = recommendData?.data?.results || [];
  const recTotalPages = Math.ceil(recTV.length / itemsPerPage);
  const recStart = (recPage - 1) * itemsPerPage;
  const pagedRecTV = recTV.slice(recStart, recStart + itemsPerPage);

  // 비슷한 TV 페이지네이션
  const simTV = similarData?.data?.results || [];
  const simTotalPages = Math.ceil(simTV.length / itemsPerPage);
  const simStart = (simPage - 1) * itemsPerPage;
  const pagedSimTV = simTV.slice(simStart, simStart + itemsPerPage);

  return (
    <div>
      {/* 상단 상세 정보 */}
      <div className="movie-detail-back" style={backdropStyle}>
        <Container>
          <Row className="align-items-center">
            <Col sm={4}>
              <img
                src={`https://media.themoviedb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col sm={8} className="ml-5">
              <h2 className="mb-2">{tv.name}</h2>
              <p>방영 시작: {tv.first_air_date}</p>
              <p>{tv.overview}</p>

              {/* TV는 관람등급 adult가 거의 없음 */}
              <p>
                {tv.adult ? (
                  <span><BsExclamationTriangle className="me-2" /> 성인 관람가</span>
                ) : (
                  <span><BsShieldCheck className="me-2" /> 전체 관람가</span>
                )}
              </p>

              {/* 평점 */}
              <div className="mb-2">
                <strong>평점:</strong>
                <Badge bg={tv.vote_average >= 7 ? "success" : "warning"} className="ms-2">
                  {tv.vote_average.toFixed(1)}
                </Badge>
              </div>

              {/* 장르 */}
              <div className="mb-2">
                <strong>장르:</strong>{" "}
                {tv.genres?.map((g) => g.name).join(", ")}
              </div>

              {/* 한 에피소드 평균 러닝타임 */}
              <div className="mb-2">
                <strong><BsClock className="me-2" /> 평균 러닝타임:</strong>{" "}
                {tv.episode_run_time?.[0] || "정보 없음"}분
              </div>

              {/* 국가 */}
              <div className="mb-2">
                <strong><BsGlobeAmericas className="me-2" /> 제작 국가:</strong>{" "}
                {tv.production_countries?.map((c) => c.name).join(", ")}
              </div>

              {/* 언어 */}
              <div className="mb-2">
                <strong><BsTranslate className="me-2" /> 언어:</strong>{" "}
                {tv.original_language?.toUpperCase()}
              </div>

              {/* 예고편 버튼 */}
              <div className="mt-4">
                {trailer ? (
                  <Button variant="danger" onClick={handleShow}>
                    <BsPlayCircle className="me-2" />
                    예고편 보기
                  </Button>
                ) : (
                  <p><BsPlayCircle className="me-2" /> 예고편이 제공되지 않습니다.</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {/* 예고편 모달 */}
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{tv.name} - 예고편</Modal.Title>
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
              <Col key={actor.id} xs={6} sm={4} md={3} className="mb-4 text-center">
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
            <div key={review.id} className="p-3 mb-3 border rounded bg-light text-dark">
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

      {/* 추천 TV */}
      <Container className="movie-recommend mt-5">
        <h4 className="mb-4">추천 TV 프로그램</h4>
        <Row>
          {pagedRecTV.map((rec) => (
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
                onClick={() => navigate(`/tv/${rec.id}`)}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                    color: "#fff",
                    padding: "15px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <h5 style={{ marginBottom: "5px" }}>{rec.name}</h5>
                    <small>⭐ {rec.vote_average.toFixed(1)}</small>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

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

      {/* 비슷한 TV */}
      {simTV.length > 0 && (
        <Container className="movie-similar mt-5">
          <h4 className="mb-4">비슷한 TV 프로그램</h4>
          <Row>
            {pagedSimTV.map((sim) => (
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
                  onClick={() => navigate(`/tv/${sim.id}`)}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                      color: "#fff",
                      padding: "15px",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <h5 style={{ marginBottom: "5px" }}>{sim.name}</h5>
                      <small>⭐ {sim.vote_average.toFixed(1)}</small>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

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

export default TVDetailPage;
