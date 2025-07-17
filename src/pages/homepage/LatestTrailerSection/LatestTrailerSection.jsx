import React, { useState, useEffect } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BsPlayCircle } from "react-icons/bs";
import api from "../../../utils/api";

const LatestTrailerSection = () => {
  const [filter, setFilter] = useState("popular");
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      key: "popular",
      label: "인기",
      endpoint: "/trending/all/week",
      description: "현재 가장 인기 있는 영화와 TV 프로그램입니다."
    },
    {
      key: "streaming",
      label: "스트리밍",
      endpoint: "/movie/popular",
      description: "스트리밍 중인 최신 콘텐츠입니다."
    },
    {
      key: "tv",
      label: "TV",
      endpoint: "/tv/on_the_air",
      description: "현재 방영 중인 TV 프로그램입니다."
    },
    {
      key: "rental",
      label: "대여",
      endpoint: "/movie/upcoming",
      description: "대여 가능한 최신 영화입니다."
    },
    {
      key: "theater",
      label: "극장",
      endpoint: "/movie/now_playing",
      description: "지금 극장에서 상영 중인 작품입니다."
    }
  ];

  const currentCategory = categories.find((c) => c.key === filter);

  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      setTrailers(res.data.results);
    } catch (err) {
      console.error("예고편 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentCategory) fetchData(currentCategory.endpoint);
  }, [filter]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 2 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  return (
    <section className="latest-trailer-section">
      <Container>{/* 탭 버튼 */}
      <ButtonGroup className="mb-3 trailer-tabs">
  {categories.map((cat) => (
    <Button
      key={cat.key}
      className={`tab-btn ${filter === cat.key ? "active" : ""}`}
      onClick={() => setFilter(cat.key)}
    >
      {cat.label}
    </Button>
  ))}
</ButtonGroup>

        {/* 현재 탭 설명글 */}
        <p className="category-desc">
          {currentCategory?.description}
        </p>

        {/* 로딩 표시 */}
        {loading && <p>로딩 중...</p>}

        {/* 슬라이드 */}
        {!loading && trailers.length > 0 && (
          <Carousel
            responsive={responsive}
            infinite
            autoPlay={false}
            containerClass="trailer-carousel"
          >
            {trailers.map((item) => {
              const title = item.title || item.name;
              const backdrop = item.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
                : "https://via.placeholder.com/500x281?text=No+Image";

              return (
                <div
                  key={item.id}
                  className="trailer-card wide"
                  style={{ backgroundImage: `url(${backdrop})` }}
                >
                  <div className="overlay">
                    <BsPlayCircle className="play-icon" />
                  </div>
                  <div className="info">
                    <h5>{title}</h5>
                    <p>{item.media_type === "movie" ? "영화" : "TV"}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </Container>
    </section>
  );
};

export default LatestTrailerSection;
