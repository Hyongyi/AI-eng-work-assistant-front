// src/components/Cards.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface CardsProps {
  bg: string; 
  textColor : string;
  img : string;
  title : string;
  body : string;
}

const Cards: React.FC<CardsProps> = ({ bg, textColor, img, title, body }) => {
  return (
    <Card style={{ width: '20rem', borderRadius:'17px'}} bg={bg} text={textColor}> {/* 배경색 설정 */}
      <Card.Img variant="top" src={img} style={{ borderRadius:'15px 15px 0 0'}}/>
      <Card.Body  style={{textAlign:"left"}} >
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {body}
        </Card.Text>
        <Button variant="primary">{title}</Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
