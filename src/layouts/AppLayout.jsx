import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BsSun, BsMoon } from "react-icons/bs";
import Footer from "./Footer";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  // 첫 로드시 다크모드 적용
  useEffect(() => {
    document.body.classList.add("dark-theme");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      navigate(`/movies?keyword=${keyword}`);
      setKeyword("");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(!isDarkMode ? "dark-theme" : "light-theme");
  };


  const location = useLocation();  // 여기 추가
  const noFooterPaths = ["/login"];
  const noFooterOn404 = location.pathname === "/404";  // 404 경로가 별도로 있을 때 처리

  const showFooter = !noFooterPaths.includes(location.pathname) && !noFooterOn404;

  return (
    <div className="app-layout">
      {/*  네비게이션 */}
      <Navbar
        expand="lg"
        variant={isDarkMode ? "dark" : "light"}
        bg={isDarkMode ? "dark" : "light"}
      >
        <Container className="nav-header">
          {/* 로고 */}
          <Navbar.Brand as={Link} to="/">YOUNG MOVIE</Navbar.Brand>

          {/* 다크모드 토글 */}
          <div
            className={`theme-toggle ${isDarkMode ? "dark" : "light"} nav-theme-toggle`}
            onClick={toggleTheme}
          >
            <BsSun className={`icon sun ${!isDarkMode ? "active" : ""}`} />
            <BsMoon className={`icon moon ${isDarkMode ? "active" : ""}`} />
            <div className="toggle-thumb"></div>
          </div>

          {/* 햄버거 메뉴 */}
          <Navbar.Toggle aria-controls="navbarScroll" id="navbar-toggler" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/tv">TV Shows</Nav.Link>
              <Nav.Link as={Link} to="/mypage">My Page</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>

            {/* 검색폼 */}
            <Form className="d-flex me-3" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="영화/TV 검색"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*  메인 컨텐츠 출력 */}
      <main>
        <Outlet />
      </main>

      {/*  모든 페이지 공통 Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
