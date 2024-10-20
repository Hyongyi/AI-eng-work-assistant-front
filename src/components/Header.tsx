import { Container, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNavLink = styled(Nav.Link)`
  margin-right: 100px;

  &:last-child {
    margin-right: 0; 
  }
`;


function Header(){
    return(
    <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark" style={{height:'90px', fontSize:'20px'}}>
            <Container>
                <Navbar.Brand href="/" style={{marginRight:'250px', fontSize:'32px'}}>AI Tutor</Navbar.Brand>
                <Nav className="me-auto">
                    <StyledNavLink href="/translate">영문 번역</StyledNavLink>
                    <StyledNavLink href="/grammar-check">작문 교정</StyledNavLink>
                    <StyledNavLink href="/summary">영문 요약</StyledNavLink>
                    <StyledNavLink href="/vocaRecommend">영단어 추천</StyledNavLink>
                </Nav>
            </Container>
        </Navbar>
    </>
    )
}

export default Header;