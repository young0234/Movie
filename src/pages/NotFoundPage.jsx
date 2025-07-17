import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='notfound'>
      <button className='home-btn'><a href="/">홈으로 돌아가기</a></button>
      <div className='notfound-img'>
        <div className="notice-texts">
          <h2>페이지를 <strong>찾을 수 없습니다.</strong></h2>
          <p>
          해당 페이지는 경로가 변경되었거나, <br></br>
          서버에 존재하지 않아 요청하신 페이지를 찾을 수 없습니다.
          </p>
        </div>
      </div>
      <div className="popcorns-wrap01">
        <div className="popcorn01"></div>
        <div className="popcorn02"></div>
        <div className="popcorn03"></div>
      </div>
      <div className="popcorns-wrap02">
        <div className="popcorn04"></div>
        <div className="popcorn05"></div>
        <div className="popcorn06"></div>
      </div>
    </div>
  )
}

export default NotFoundPage