import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner/Banner";
import PopularMovieSlide from "./PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./UpcomingMovieSlide/UpcomingMovieSlide";
import NowPlayingMovieSlide from "./NowPlayingMovieSlide/NowPlayingMovieSlide";
import LatestTrailerSection from "./LatestTrailerSection/LatestTrailerSection";
import OnAirTVSlide from "./OnAirTVSlide/OnAirTVSlide";
import TopRatedTVSlide from "./TopRatedTVSlide/TopRatedTVSlide";
import PopularTVSlide from "./PopularTVSlide/PopularTVSlide";

import { Container } from "react-bootstrap";

const HomePage = () => {
  const navigate = useNavigate();

  const homeSections = [
    {
      id: "latestTrailers",
      title: "최신 예고편",
      description: "",
      component: <LatestTrailerSection />,
    },
    {
      id: "nowPlaying",
      title: "현재 상영중인 영화",
      description: "지금 극장에서 만나보세요",
      component: <NowPlayingMovieSlide />,
    },
    {
      id: "popular",
      title: "인기영화",
      description: "많은 사람들이 즐겨보는 영화",
      component: <PopularMovieSlide />,
    },
    {
      id: "topRated",
      title: "평점 높은 영화",
      description: "많은 사람들에게 사랑받은 영화입니다.",
      component: <TopRatedMovieSlide />,
    },
    {
      id: "upcoming",
      title: "상영 예정 영화",
      description: "곧 개봉할 영화들을 소개합니다.",
      component: <UpcomingMovieSlide />,
    },
    {
      id: "popularTV",
      title: "📺 인기 TV 프로그램",
      description: "많은 사람들이 시청하는 TV 프로그램",
      component: <PopularTVSlide />,
    },
    {
      id: "onAirTV",
      title: "방영 중인 TV 프로그램",
      description: "지금 방영 중인 TV 시리즈",
      component: <OnAirTVSlide />,
    },
    {
      id: "topRatedTV",
      title: "평점 높은 TV 프로그램",
      description: "가장 높은 평점을 받은 TV 시리즈",
      component: <TopRatedTVSlide />,
    },
  ];

  return (
    <div className="home-page">
      <Banner />

      {homeSections.map((section, index) => (
        <React.Fragment key={section.id}>
          <Container className="home-section">
            <h2>{section.title}</h2>
            {section.description && <p>{section.description}</p>}
            {section.component}
          </Container>

          {/* 최신 예고편 뒤 → 영화 배너 삽입 */}
          {index === 0 && (
            <div className="custom-banner movie-banner">
              <div className="overlay" />
              <div className="banner-text">
                <h2>🎬 지금 극장에서 화제작을 만나보세요!</h2>
                <button onClick={() => navigate("/movies")}>영화 더보기</button>
              </div>
            </div>
          )}

          {/* 상영 예정 영화 뒤 → TV 배너 삽입 */}
          {section.id === "upcoming" && (
            <div className="custom-banner tv-banner">
              <div className="overlay" />
              <div className="banner-text">
                <h2>방영 중인 인기 TV 시리즈</h2>
                <button onClick={() => navigate("/tv")}>TV 전체보기</button>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HomePage;
