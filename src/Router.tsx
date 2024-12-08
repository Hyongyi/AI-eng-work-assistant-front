import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent';
import Root from './Root';
import MainForm from './components/MainForm';
import App from './App';
import Word from './components/Word';
import PrivateRoute from './components/PrivateRoute';  // PrivateRoute 컴포넌트 가져오기

// Rourter처리
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorComponent />
      },
      {
        path: "/translate",
        element: <PrivateRoute element={<MainForm template='translate_template' sentence='AI 영어 번역기로 보다 자연스러운 <br/>한영 번역을 경험해 보세요' />} />,
        errorElement: <ErrorComponent />
      },
      {
        path: "/grammar-check",
        element: <PrivateRoute element={<MainForm template='correct_grammar_template' sentence='AI 영어 문법 검사기를 이용하여 <br />영어 논문, 이력서, 이메일에 대한 영문법과 맞춤법 검사를 받아보세요' />} />,
        errorElement: <ErrorComponent />
      },
      {
        path: "/summary",
        element: <PrivateRoute element={<MainForm template='summary_template' sentence='AI 영어 요약 기능을 이용하여 <br />논문, 기사 등을 요약하여 받아보세요.' />} />,
        errorElement: <ErrorComponent />
      },
      {
        path: "/vocaRecommend",
        element: <PrivateRoute element={<Word template='eng_word_template' sentence='' />} />,
        errorElement: <ErrorComponent />
      }
    ]
  }
]);

export default Router;
