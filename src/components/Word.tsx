import React, { useEffect, useState } from 'react';
import { MainFormProps } from './MainForm';
import { Modal, Spinner } from 'react-bootstrap';
import Header from './Header';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Word: React.FC<MainFormProps> = ({ template, sentence }) => {
  const [words, setWords] = useState<string>('');  // words 상태를 string 타입으로 변경
  const [loading, setLoading] = useState(true);

  // 랜덤 단어 10개를 가져오는 함수
  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word', {
        method: 'GET',  // POST 방식
        // headers: {
        //   'Content-Type': 'application/json',  // 요청 헤더 설정
        // },
        // body: JSON.stringify({ 'promptTemplate': template, 'sentence': sentence }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();  // API 응답을 JSON 형태로 파싱
      console.log(data);

      // JSON 객체를 문자열로 변환하여 words 상태에 저장
      setWords(JSON.stringify(data));  // 데이터를 string으로 변환하여 저장
    } catch (error) {
      console.error('Error fetching word:', error);
      setWords('Error fetching data');  // 오류 발생 시 에러 메시지를 string으로 저장
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();  // 컴포넌트가 마운트될 때 단어를 가져옴
  }, []);  // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출됨

  return (

    <div>
        <Header />
      <h1>단어</h1>
      {loading ? (
        <p>단어를 불러오는 중...</p>
      ) : (
        <p>{words}</p>  // string으로 변환된 words 출력
      )}
      <button onClick={fetchWords}>새로운 단어 가져오기</button>
      <Modal show={loading} backdrop="static" centered>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>로딩 중입니다...</p>
            </Modal.Body>
        </Modal>
    </div>
  );
};

export default Word;
