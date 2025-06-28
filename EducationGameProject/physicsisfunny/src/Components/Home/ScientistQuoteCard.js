import React from 'react';
import './ScientistQuoteCard.css';

const ScientistQuoteCard = ({ image, quote, name }) => (
  <div className="scientist-card">
    <img className="card-image" src={image} alt={name} />
    <div className="card-content">
      <p className="quote">"{quote}"</p>
      <div className="name">{name}</div>
    </div>
  </div>
);

export default ScientistQuoteCard;