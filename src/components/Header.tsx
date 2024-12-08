import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useAuth } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';

const StyledNavLink = styled(Nav.Link)`
  margin-right: 100px;
  &:last-child {
    margin-right: 0;
  }
`;

const LoginModal = styled(Modal)`
  & .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
  }
  & .modal-content {
    max-width: 450px;
    width: 100%;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  & .modal-backdrop.show {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

//회원가입과 로그인 모달을 구분하기 위한 처리
const SignUpModal = styled(LoginModal)``;

//화면 최상단 Header를 그리는 
const Header: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };


  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowSignupModal = () => setShowSignupModal(true);
  const handleCloseSignupModal = () => setShowSignupModal(false);

  return (
    <>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark" style={{ height: '90px', fontSize: '20px' }}>
        <Container>
          <Navbar.Brand href="/" style={{ marginRight: '250px', fontSize: '32px' }}>
            AI Tutor
          </Navbar.Brand>
          <Nav className="me-auto">
            <StyledNavLink href="/translate">영문 번역</StyledNavLink>
            <StyledNavLink href="/grammar-check">작문 교정</StyledNavLink>
            <StyledNavLink href="/summary">영문 요약</StyledNavLink>
            <StyledNavLink href="/vocaRecommend">영단어 공부</StyledNavLink>
          </Nav>
          <Nav style={{ position: 'absolute', top: '15px', right: '20px' }}>
            {isLoggedIn ? (
              <Nav.Link>
                <Button variant="danger" onClick={handleLogout}>
                  로그아웃
                </Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link>
                  <Button variant="light" style={{ marginRight: '10px' }} onClick={handleShowLoginModal}>
                    로그인
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="primary" onClick={handleShowSignupModal}>
                    회원가입
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* 로그인 모달 */}
      <LoginModal show={showLoginModal} onHide={handleCloseLoginModal} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Login onClose={handleCloseLoginModal} />
        </Modal.Body>
      </LoginModal>

      {/* 회원가입 모달 */}
      <SignUpModal show={showSignupModal} onHide={handleCloseSignupModal} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup onClose={handleCloseSignupModal} />
        </Modal.Body>
      </SignUpModal>
    </>
  );
};

export default Header;
