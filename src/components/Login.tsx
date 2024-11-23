import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // useAuth 사용하여 로그인 상태 관리

interface LoginProps {
  onClose: () => void; // 모달 닫기 함수
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { login } = useAuth(); // 로그인 상태를 관리하는 함수

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: id, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwt', data.access_token); // JWT 토큰 저장
        login(); // 로그인 상태 변경

        setSuccessMessage('로그인 성공');
        setErrorMessage('');

        onClose(); // 모달 닫기
        navigate('/', { replace: true });
      } else {
        setErrorMessage('로그인 실패');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('서버와 연결할 수 없습니다.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-2">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
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
        <Button variant="primary" type="submit" className="mt-3 w-100">
          로그인
        </Button>
      </Form>
    </div>
  );
};

export default Login;
