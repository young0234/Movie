import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useUpcomingMoviesQuery } from '../hook/useUpcomingMoviesQuery';
import { useTopRatedMoviesQuery } from '../hook/useTopRatedMoviesQuery'; // 추가해야 함
import MovieCard from './homepage/MovieCard/MovieCard';

const MyPage = () => {
  const { data: upcomingData, isLoading: isLoadingUpcoming, isError: isErrorUpcoming, error: errorUpcoming } = useUpcomingMoviesQuery();
  const { data: topRatedData, isLoading: isLoadingTop, isError: isErrorTop, error: errorTop } = useTopRatedMoviesQuery();

  if (isLoadingUpcoming || isLoadingTop) return <h1>로딩중</h1>;
  if (isErrorUpcoming || isErrorTop) return <h1>{errorUpcoming?.message || errorTop?.message}</h1>;

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  
  return (
    <div className="mypage-wrap">
      <div className="mypage-left">
        <h1>Profile</h1>
        <div className="img"></div>
        <div className="info-texts">
          <div className="name"><p>이름</p><p>Young</p></div>
          <div className="price"><p>이용권</p><p>광고형 스탠다드 정기권</p></div>
          <div className="email"><p>이메일</p><p>123@email.com</p></div>
          <div className="phone"><p>전화번호</p><p>010-1234-5678</p></div>
        </div>
        <div className="sub-btn">
          <button>고객센터</button>
          <button>공지사항</button>
          <button>이벤트</button>
        </div>
        <a className="logout">로그아웃</a>
      </div>
      <div className="mypage-right">
        <h1>Favorite List</h1>
        <div className="list-wrap">
          <div className="heart-list">
            <div className="title">
              <h2>찜한 영화</h2>
            </div>
            <Carousel
              responsive={responsive}
              infinite
              draggable
              swipeable
            >
              {upcomingData.data.results.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))}
            </Carousel>

          </div>
          <div className="review-list">
            <div className="title">
              <h2>평점 남긴 영화</h2>
            </div>
            <Carousel 
            responsive={responsive} infinite draggable swipeable>
              {topRatedData.data.results.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
