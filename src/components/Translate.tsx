import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Navbar } from 'react-bootstrap';
import Header from './Header';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup)`
    box-shadow: 4px 4px 10px rgba(118, 118, 118, 0.2);
    border-radius: 8px; /* 전체 InputGroup에 border-radius 추가 */

/* InputControl에 border-radius 추가 */
    .form-control {
    border-radius: 8px; /* 같은 값을 적용하거나 원하는 값으로 조정 */
    }
`


function Test(){

    const [prompt, setPrompt] = useState<string>("");
    const [answer, getAnswer] = useState<string>("");

    const PromptOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setPrompt(e.target.value);
    } 

    return (
        <>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
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
                    value={answer}
                    />
                </StyledInputGroup>
            </div>
        </>
      );
}

export default Test;