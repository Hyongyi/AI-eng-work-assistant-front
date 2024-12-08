import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// PrivateRoute 컴포넌트
const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');  // JWT 토큰 확인

  useEffect(() => {
    if (!token) {
      // 인증되지 않으면 로그인 페이지로 리디렉션
      alert('로그인이 필요한 서비스입니다.');
      navigate("/", { replace: true });
    }
  }, [token, navigate]); 

  // 인증된 사용자에게만 해당 element를 렌더링
  if (!token) {
    return null;  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  }

  return element;
};

export default PrivateRoute;
