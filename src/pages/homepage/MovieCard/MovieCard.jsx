import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdEvent, MdCategory, MdAccessTime, MdOutlineChildCare } from "react-icons/md";

const MovieCard = ({ movie, genres = [] }) => {
  const navigate = useNavigate();
  const imageUrl = `https://media.themoviedb.org/t/p/w500${movie.poster_path}`;

  // 평점을 10점에서 5점 만점으로 환산
  const rating = movie.vote_average / 2;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="#FFD700" />
      ))}
      {hasHalfStar && <FaStarHalfAlt color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#FFD700" />
      ))}
    </>
  );

  // 관람 등급
  const audienceRating = movie.adult ? "성인 전용" : "청소년 관람 가능";

  // 장르 문자열 변환
  const genreNames =
    genres.length > 0
      ? genres
        .filter((g) => movie.genre_ids?.includes(g.id))
        .map((g) => g.name)
        .join(" / ")
      : "장르 정보 없음";

  // 개봉일
  const releaseDate = movie.release_date || "미정";

  // 러닝타임(분)을 시간+분으로 변환
  const runtimeToHourMin = (runtime) => {
    if (!runtime) return "미정";
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hours}시간 ${mins}분`;
  };
  const runtime = runtimeToHourMin(movie.runtime);

  return (
    <div
      className="movie-card-wrap"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <Card
        className="movie-card"
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.4s ease",
        }}
      >
        <div className="overlay">
          <div className="text-wrap">
            <h4>{movie.title}</h4>

            {/* 별점 + 평점 수치 */}
            <div className="rating">
              {renderStars()} <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>

            {/* 개봉일 */}
            <p>
              <MdEvent size={20} /> {releaseDate}
            </p>

            {/* 장르 */}
            <p>
              <MdCategory size={20} /> {genreNames}
            </p>
            <div style={{ margin: "8px 0" }}>
              <Badge bg={movie.adult ? "danger" : "success"}>
                <MdOutlineChildCare size={16} />
                {movie.adult ? "성인 전용" : "일반 관람 가능"}
              </Badge>

              {/* runtime 있을 때만 출력 */}
              {movie.runtime && (
                <Badge bg="info" style={{ marginLeft: "6px" }}>
                  <MdAccessTime size={16} /> {runtime}
                </Badge>
              )}
            </div>

            {/* 줄거리 (4줄까지만 표시) */}
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      </Card>
      <h5 className="movie_title">{movie.title}</h5>
    </div>
  );
};

export default MovieCard;
