import React, { useEffect, useState } from 'react';
import { MainFormProps } from './MainForm';
import { Button, Modal, Spinner } from 'react-bootstrap';
import Header from './Header';
import styled from 'styled-components';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
  gap: 2rem;

`;

const Voca = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const CardContainer = styled.div`
  perspective: 1000px; /* 3D 효과를 위한 원근 설정 */
`;

const FlipCard = styled.div`
  width: 18rem;
  height: 25rem;  /* 카드 높이 설정 */
  transition: transform 0.6s ease; /* 회전 애니메이션 */
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    transform: rotateY(180deg); /* 마우스를 올리면 카드가 180도 회전 */
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 회전 시 뒷면이 보이지 않도록 */
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFront = styled(CardFace)`
  /* 카드 앞면 스타일 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardBack = styled(CardFace)`
  /* 카드 뒷면 스타일 */
  background-color: #f8f9fa;
  transform: rotateY(180deg); /* 뒤집어진 상태로 시작 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h5`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
`;

const CardSubtitle = styled.h6`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const Word: React.FC<MainFormProps> = ({ template, sentence }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 랜덤 단어 가져오는 함수
  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/callAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptTemplate: template, sentence: sentence }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data", data);

      setData(data);
    } catch (error) {
      console.error('Error fetching word:', error);
      setData('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();  // 컴포넌트가 마운트될 때 단어를 가져옴
  }, []);

  return (
    <>
      <Header />
      <Voca>Voca Study</Voca>
      <MainForm>
        {loading ? (
          <p>단어를 불러오는 중...</p>
        ) : (
          data && ( // 데이터가 존재할 경우 카드에 데이터를 바인딩
            <CardContainer>
              <FlipCard>
                <CardFront>
                  <CardTitle>{data.word}</CardTitle>
                  <CardSubtitle>[{data.pronunciation}]</CardSubtitle>
                </CardFront>
                <CardBack>
                  <CardTitle>{data.word}</CardTitle>
                  <CardText>
                    <br />
                    <strong>Definition:</strong><br /> {data.definition}
                    <br />
                    <br />
                    <strong>Translation:</strong><br /> {data.translation}
                    <br />
                    <br />
                    <strong>Example:</strong><br /> {data.examples}
                  </CardText>
                </CardBack>
              </FlipCard>
            </CardContainer>
          )
        )}
        <Button variant="primary" onClick={fetchWords}>새로운 단어 가져오기</Button>
      </MainForm>
      <Modal show={loading} backdrop="static" centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>로딩 중입니다...</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Word;
