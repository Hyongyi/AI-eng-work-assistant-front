import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Navbar } from 'react-bootstrap';
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

interface RestApiProps {
    endpoint: string; 
}

interface ApiResponse {
    translatedText: string; 
}

const BASE_URL = process.env.REACT_APP_BASE_URL;


const Test: React.FC<RestApiProps> = ({endpoint}) => {

    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const PromptOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setPrompt(e.target.value);
    } 

    const CallRestApi = async () => {
        const data = await fetchData('/translate');
        setAnswer(data.translatedText);
    };


    const fetchData = async (endpoint: string) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: prompt }),
            });
    
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    };

    return (
        <>
            <Header />
            <MainSentence text = "영어 번역기를 이용하여 <br/>자연스러운 한영, 영한 번역을 경험해 보세요" />
            <MainForm>
                <StyledInputGroup style={{ width: '35%', margin: '0 50px', height:'40vh' }}>
                    <Form.Control
                    as="textarea"
                    value={prompt}
                    onChange={PromptOnChange}
                    placeholder="번역할 문장을 입력해주세요."
                    />
                </StyledInputGroup>
                <Button variant="primary" style={{ margin: '0 20px' }}>
                    Translate
                </Button>
                <StyledInputGroup style={{ width: '35%', margin: '0 50px', height:'40vh'  }}>
                    <Form.Control
                    as="textarea"
                    value = {answer}
                    />
                </StyledInputGroup>
            </MainForm>
        </>
      );
}

export default Test;