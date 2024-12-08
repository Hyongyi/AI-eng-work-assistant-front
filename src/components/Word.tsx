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
  perspective: 1000px; 
`;

const FlipCard = styled.div`
  width: 18rem;
  height: 25rem; 
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    transform: rotateY(180deg); 
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; 
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFront = styled(CardFace)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardBack = styled(CardFace)`
  background-color: #f8f9fa;
  transform: rotateY(180deg); 
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

// API를 Call해서 Random 단어를 가져오고 카드 형태로 그려주는 모듈
const Word: React.FC<MainFormProps> = ({ template, sentence }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 백단 파이썬 쪽 API호출해서 랜덤 단어 가져오는 함수
  const getRandomWord = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/callAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'promptTemplate': template, 'sentence': sentence}),
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
    getRandomWord(); 
  }, []);

  return (
    <>
      <Header />
      <Voca>Voca Study</Voca>
      <MainForm>
        {loading ? (
          <p>단어를 불러오는 중...</p>
        ) : (
          data && ( 
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
        <Button variant="primary" onClick={getRandomWord}>새로운 단어 가져오기</Button>
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
