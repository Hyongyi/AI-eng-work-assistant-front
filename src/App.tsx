import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/Cards';
import styled from 'styled-components';
import { Container, Navbar } from 'react-bootstrap';


const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 배치 가능 */
  justify-content: center; /* 카드 간의 간격 조절 */
  padding: 10px; /* 여백 추가 */
`;

const CardWrapper = styled.div`
  margin: 30px; /* 카드 간의 간격 조정 */
`;


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">영어 학습 도우미</Navbar.Brand>
        </Container>
      </Navbar>
      <AppContainer>
        <CardWrapper>
          <Cards bg="dark" textColor="white" img="/img/translator.jpg" title="영문 번역" body="문장 또는 내용이 영어라서 어렵다면? 영어 번역 기능을 사용하여 영어를 번역해보세요."/>
        </CardWrapper>
        <CardWrapper>
          <Cards bg="dark" textColor="white" img="/img/grammer_blue.jpg" title="문법 및 작문 교정" body="내가 쓴 문장의 문법이 올바른지 확인하고 싶다면 문법 및 작문 교정 기능을 통해 올바른 문장으로 만들어 보세요."/>
        </CardWrapper>
        <CardWrapper>
          <Cards bg="dark" textColor="white" img="/img/summary.jpg" title="영문 요약 및 설명" body="복잡하고 긴 영어 문장을 요약하여 보고 싶을 땐, 영문 요약 및 설명 기능을 사용해보세요."/>
        </CardWrapper>
        <CardWrapper>
          <Cards bg="dark" textColor="white" img="/img/voca.jpg" title="영단어 추천" body="여러분의 영어 실력을 높이고 싶다면 영어 단어 공부는 필수! 영단어 추천을 통해 영어 실력을 높여보세요."/>
        </CardWrapper>
      </AppContainer>
    </div>
  );
}

export default App;
