import React, { useState } from 'react';
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FaFacebookF, FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // console.log('로그인 시도:', { email, password, saveId, autoLogin });
  };

  return (
    <div className='login-wrap'>
      <div className="login-texts">
        <h2>로그인</h2>
        <p>MOVIE 306 계정으로 로그인</p>
      </div>
      <div className="login-inputs">
        <input
          type="text"
          placeholder='이메일 주소 또는 아이디'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-sub-buttons">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={saveId}
            onChange={() => setSaveId(!saveId)}
          />
          <span className="checkmark"></span>
          아이디 저장
        </label>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={() => setAutoLogin(!autoLogin)}
          />
          <span className="checkmark"></span>
          자동 로그인
        </label>
      </div>
      <button className="login-button" onClick={handleLogin}>로그인</button>
      <div className="find-login">
        <a href="#" className='find-id'>아이디 찾기</a>
        <div className='line'></div>
        <a href="#" className='resave-passward'>비밀번호 재설정</a>
        <div className='line'></div>
        <a href="#" className='sign-up'>회원가입</a>
      </div>
      <div className='more-login'>
        <div className='line'></div>
        <div className='line-text'>또는 다른 서비스 계정으로 로그인</div>
        <div className='line'></div>
      </div>
      <div className="more-options">
        <a className="kakao">
          <div className="icon"><RiKakaoTalkFill /></div>
        </a>
        <a className="naver">
          <div className="icon"><SiNaver /></div>
        </a>
        <a className="facebook">
          <div className="icon"><FaFacebookF /></div>
        </a>
        <a className="apple">
          <div className="icon"><FaApple /></div>
        </a>
      </div>
    </div>
  );
};

export default Login;
