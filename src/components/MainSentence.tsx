import React from 'react';
import styled from 'styled-components';

const SentenceContainer = styled.div`
    text-align: center;
    margin-top: 100px;
`;

// 기능별 상단 문구 그려주는 모듈
const MainSentence: React.FC<{ text: string }> = ({ text }) => {
    return (
        <SentenceContainer>
            <h1 dangerouslySetInnerHTML={{ __html: text }} />
        </SentenceContainer>
    );
};

export default MainSentence;