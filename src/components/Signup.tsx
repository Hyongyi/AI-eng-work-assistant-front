import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalProps } from './Login';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 회원가입하는 화면을 그리고 파이썬쪽 회원가입 API 호출하여 회원가입 처리하는 모듈
const Signup: React.FC<ModalProps> = ({ onClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');

  // 아이디 중복 확인하는 REST API
  const checkIdDuplication = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('아이디 중복 확인 요청에 실패했습니다.');
      }

      const data = await response.json();
      alert(data.message); // 서버에서 반환한 메시지를 alert로 표시
  
    } catch (error) {
      console.error('아이디 중복 확인 중 오류 발생:', error);
      alert('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 처리 함수
  const userSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버로 POST 요청 보내기
    const userData = {
      userid: id,
      password,
      name,
      age,
      occupation,
    };

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('회원가입 요청에 실패했습니다.');
      }

      const data = await response.json();
      if(data.message){
        alert(data.message); 
        onClose();
      } else {
        alert(data.error); 
      }
      
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Form onSubmit={userSignUp}>
      <Form.Group controlId="formId" className="mb-2">
        <Form.Label>ID</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            type="id"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Button
            variant="primary"
            onClick={checkIdDuplication}
            className="w-30 ms-2"
            disabled={!id}
            style={{ width: '30%' }}
          >
            중복확인
          </Button>
        </div>
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-2">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPasswordConfirm" className="mb-2">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 확인하세요"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formName" className="mb-2">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAge" className="mb-2">
        <Form.Label>나이</Form.Label>
        <Form.Control
          type="number"
          placeholder="나이를 입력하세요"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formOccupation" className="mb-2">
        <Form.Label>직종</Form.Label>
        <Form.Control
          as="select"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          required
        >
          <option value="">직종을 선택하세요</option>
          <option value="developer">개발</option>
          <option value="manager">매니저</option>
          <option value="teacher">교사</option>
          <option value="engineer">엔지니어</option>
          <option value="analyst">분석가</option>
          <option value="scientist">과학자</option>
          <option value="doctor">의사</option>
          <option value="nurse">간호사</option>
          <option value="artist">예술가</option>
          <option value="writer">작가</option>
          <option value="student">학생</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3 w-100">
        회원가입
      </Button>
    </Form>
  );
};

export default Signup;
