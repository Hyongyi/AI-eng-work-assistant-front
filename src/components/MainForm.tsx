import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Navbar, Spinner } from 'react-bootstrap';
import Header from './Header';
import styled from 'styled-components';
import MainSentence from './MainSentence';

const StyledInputGroup = styled(InputGroup)`
    box-shadow: 4px 4px 10px rgba(118, 118, 118, 0.2);
    border-radius: 8px; /* 전체 InputGroup에 border-radius 추가 */

/* InputControl에 border-radius 추가 */
    .form-control {
    border-radius: 8px; /* 같은 값을 적용하거나 원하는 값으로 조정 */
    }
`

const MainForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
`;

interface MainFormProps {
    template: string; 
    sentence : string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;


const Test: React.FC<MainFormProps> = ({template, sentence}) => {

    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const PromptOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setPrompt(e.target.value);
    } 

    const CallRestApi = async () => {
        setLoading(true); 
        const data = await fetchData(template);
        const responseString = data.response; 
        const words = responseString.split(' ');
        for (let i = 0; i < words.length; i++) {
            setTimeout(() => {
                setAnswer(prev => prev + (i === 0 ? '' : ' ') + words[i]); // 이전 내용에 현재 단어 추가
            }, i * 100);  // 500ms 간격으로 업데이트
        }
    };


    const fetchData = async (template: string) => {
        try {
            const response = await fetch(`${BASE_URL}/callAI`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'promptTemplate': template, 'sentence': prompt }),
            });
    
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        } finally{
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <MainSentence text = {sentence} />
            <MainForm>
                <StyledInputGroup style={{ width: '35%', margin: '0 50px', height:'40vh' }}>
                    <Form.Control
                    as="textarea"
                    value={prompt}
                    onChange={PromptOnChange}
                    placeholder="문장을 입력해주세요."
                    />
                </StyledInputGroup>
                <Button variant="primary" style={{ margin: '0 20px' }} onClick={CallRestApi}>
                    실행
                </Button>
                <StyledInputGroup style={{ width: '35%', margin: '0 50px', height:'40vh'  }}>
                    <Form.Control
                    as="textarea"
                    value = {answer}
                    />
                </StyledInputGroup>
                {loading && (
                    <div style={{
                        position: 'fixed',  // 절대 위치
                        top: '50%',        // 세로 중앙
                        left: '50%',       // 가로 중앙
                        transform: 'translate(-50%, -50%)', // 중앙 정렬
                        zIndex: 1000       // 다른 요소 위에 표시
                    }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </MainForm>
        </>
      );
}

export default Test;