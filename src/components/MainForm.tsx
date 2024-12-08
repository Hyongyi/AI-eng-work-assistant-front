import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Modal, Navbar, Spinner } from 'react-bootstrap';
import Header from './Header';
import styled from 'styled-components';
import MainSentence from './MainSentence';

const StyledInputGroup = styled(InputGroup)`
    box-shadow: 4px 4px 10px rgba(118, 118, 118, 0.2);
    border-radius: 8px;

    .form-control {
    border-radius: 8px;
    }
`

const MainForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
`;

export interface MainFormProps {
    template: string; 
    sentence : string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;


//번역, 교정, 요약 화면을 그리고 백단 파이썬 API를 Streaming형태로 출력하는 모듈
const Test: React.FC<MainFormProps> = ({template, sentence}) => {

    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const PromptOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    //파이썬 백단 API를 호출하고 Streaming으로 출력하는 함수 
    const CallRestApi = async () => {
        setAnswer("");
        setLoading(true);
        
        try {
            const response = await fetch(`${BASE_URL}/callAIStreaming`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'promptTemplate': template, 'sentence': prompt , 'userAge': localStorage.getItem('userAge')}),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`서버 오류: ${errorDetails.detail || '알 수 없는 오류'}`);
            }
    
            if (response.body) {

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
    
                    const chunk = decoder.decode(value, { stream: true });
                    
                    setLoading(false);
                    
                    setAnswer((prev) => prev + chunk);
                    await new Promise(resolve => setTimeout(resolve, 0.1)); 
                }
            } else {
                throw new Error('응답 본체가 없습니다.');
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
        } finally {
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
                    placeholder="답변이 여기에 출력됩니다."
                    readOnly 
                    />
                </StyledInputGroup>
                <Modal show={loading} backdrop="static" centered>
                    <Modal.Body className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p>로딩 중입니다...</p>
                    </Modal.Body>
                </Modal>
            </MainForm>
        </>
      );
}

export default Test;