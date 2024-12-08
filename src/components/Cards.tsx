// src/components/Cards.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

interface CardsProps {
  bg: string; 
  textColor : string;
  img : string;
  title : string;
  body : string;
  url : string;
}

//홈 화면에 카드를 그리는 모듈
const Cards: React.FC<CardsProps> = ({ bg, textColor, img, title, body, url }) => {
  return (
    <Card style={{ width: '20rem', borderRadius:'17px'}} bg={bg} text={textColor}> {/* 배경색 설정 */}
      <Card.Img variant="top" src={img} style={{ borderRadius:'15px 15px 0 0'}}/>
      <Card.Body  style={{textAlign:"left"}} >
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {body}
        </Card.Text>
        <Link to={url}>
          <Button variant="primary">{title}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Cards;
