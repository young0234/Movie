import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Pagination,
  Button,
  Card,
} from "react-bootstrap";

import { usePopularMoviesQuery } from "../../hook/usePopularMoviesQuery";
import { useSearchMovieQuery } from "../../hook/useSearchMovieQuery";
import { useGenreListQuery } from "../../hook/useGenreList";
import MovieCard from "../homepage/MovieCard/MovieCard";

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { data: genreData } = useGenreListQuery();
  const genreList = genreData?.data?.genres || [];

  const [sortOrder, setSortOrder] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [scoreRange, setScoreRange] = useState(0);
  const [runtimeRange, setRuntimeRange] = useState(240);

  const [page, setPage] = useState(1);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchMovieQuery(keyword, {
    enabled: !!keyword,
  });

  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
  } = usePopularMoviesQuery({
    enabled: !keyword,
  });

  const movieList = keyword
    ? searchData?.data?.results
    : popularData?.data?.results;

  if (isSearchLoading || isPopularLoading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  if (isSearchError)
    return <Alert variant="danger">{searchError.message}</Alert>;
  if (isPopularError)
    return <Alert variant="danger">{popularError.message}</Alert>;

  const filteredMovies = (movieList || [])
    .filter((m) =>
      selectedGenre ? m.genre_ids?.includes(selectedGenre) : true
    )
    .filter((m) => m.vote_average >= scoreRange)
    .filter((m) => (m.runtime ? m.runtime <= runtimeRange : true))
    .sort((a, b) => {
      if (sortOrder === "popularity.desc") return b.popularity - a.popularity;
      if (sortOrder === "popularity.asc") return a.popularity - b.popularity;
      if (sortOrder === "vote.desc") return b.vote_average - a.vote_average;
      if (sortOrder === "vote.asc") return a.vote_average - b.vote_average;
      return 0;
    });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const pagedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="my-5">
      <h3 className="mb-4">
        {keyword ? `"${keyword}" 검색 결과` : "인기 영화"}
      </h3>

      {/* ✅ 필터 영역 (디자인 강화) */}
      <Card className="mb-4 shadow-sm filter-card">
        <Card.Header className="bg-dark text-white fw-bold">
          필터 옵션
        </Card.Header>
        <Card.Body>
          <Row className="gy-4">
            {/* 정렬 */}
            <Col xs={12} md={4}>
              <Form.Label className="fw-bold">정렬 방식</Form.Label>
              <Form.Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popularity.desc">인기도 높은순</option>
                <option value="popularity.asc">인기도 낮은순</option>
                <option value="vote.desc">평점 높은순</option>
                <option value="vote.asc">평점 낮은순</option>
              </Form.Select>
            </Col>

            {/* 장르 버튼 */}
            <Col xs={12} md={8}>
              <Form.Label className="fw-bold">장르 선택</Form.Label>
              <div className="d-flex flex-wrap gap-2 genre-btn-wrap">
                {/* 전체 보기 버튼 추가 */}
                <Button
                  size="sm"
                  variant={selectedGenre === null ? "primary" : "outline-primary"}
                  onClick={() => setSelectedGenre(null)}
                >
                  전체
                </Button>
                {genreList.map((g) => (
                  <Button
                    key={g.id}
                    size="sm"
                    variant={
                      selectedGenre === g.id ? "primary" : "outline-primary"
                    }
                    onClick={() =>
                      setSelectedGenre(selectedGenre === g.id ? null : g.id)
                    }
                  >
                    {g.name}
                  </Button>
                ))}
              </div>
            </Col>

            {/* 사용자 점수 Range */}
            <Col xs={12} md={6}>
              <Form.Label className="fw-bold">사용자 점수</Form.Label>
              <Form.Range
                min={0}
                max={10}
                step={0.5}
                value={scoreRange}
                onChange={(e) => setScoreRange(Number(e.target.value))}
              />
              <div className="text-info fw-bold mt-1">
                {scoreRange}점 이상 (높은 점수만 보기)
              </div>
            </Col>

            {/* 상영시간 Range */}
            <Col xs={12} md={6}>
              <Form.Label className="fw-bold">상영시간</Form.Label>
              <Form.Range
                min={0}
                max={240}
                step={10}
                value={runtimeRange}
                onChange={(e) => setRuntimeRange(Number(e.target.value))}
              />
              <div className="text-info fw-bold mt-1">
                {runtimeRange}분 이하 영화만 보기
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ✅ 영화 목록 */}
      <Row>
        {pagedMovies?.length > 0 ? (
          pagedMovies.map((movie) => (
            <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <p className="text-muted text-center">결과가 없습니다.</p>
        )}
      </Row>

      {/* ✅ 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === page}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default MoviePage;
