import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Modal, Navbar, Spinner } from 'react-bootstrap';
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

    // const PromptOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    //     setPrompt(e.target.value);
    // } 

    // const CallRestApi = async () => {
    //     setLoading(true); 
    //     const data = await fetchData(template);
    //     const responseString = data.response; 
    //     const words = responseString.split(' ');
    //     for (let i = 0; i < words.length; i++) {
    //         setTimeout(() => {
    //             setAnswer(prev => prev + (i === 0 ? '' : ' ') + words[i]); // 이전 내용에 현재 단어 추가
    //         }, i * 100);  // 500ms 간격으로 업데이트
    //     }
    // };


    // const fetchData = async (template: string) => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/callAI`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ 'promptTemplate': template, 'sentence': prompt }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('네트워크 응답이 좋지 않습니다.');
    //         }
    
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('데이터를 가져오는 중 오류 발생:', error);
    //     } finally{
    //         setLoading(false);
    //     }
    // };
    const PromptOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const CallRestApi = async () => {
        setAnswer("");
        setLoading(true);
        
        try {
            const response = await fetch(`${BASE_URL}/callAI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'promptTemplate': template, 'sentence': prompt }),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`서버 오류: ${errorDetails.detail || '알 수 없는 오류'}`);
            }
    
            if (response.body) {
                

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
    
                let result = ""; // 전체 결과를 저장할 변수
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
    
                    const chunk = decoder.decode(value, { stream: true });
                    result += chunk;
                    setLoading(false);
                    // 결과를 업데이트하는 비동기 작업
                    setAnswer((prev) => prev + chunk);
                    await new Promise(resolve => setTimeout(resolve, 0.1)); // 약간의 지연 추가
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