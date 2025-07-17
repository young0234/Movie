import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const TvCard = ({ tv }) => {
  const navigate = useNavigate(); // ✅ 초기화

  const poster = tv.poster_path
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card
      className="tv-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/tv/${tv.id}`)} // ✅ 클릭 시 상세페이지 이동
    >
      <Card.Img variant="top" src={poster} alt={tv.name} />
      <Card.Body>
        <Card.Title>{tv.name}</Card.Title>
        <Card.Text>
          <small>{tv.first_air_date}</small>
          <br />
          <Badge bg="warning" text="dark">
            ⭐ {tv.vote_average.toFixed(1)}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TvCard;
