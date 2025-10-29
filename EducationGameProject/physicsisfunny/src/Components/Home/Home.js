import React from 'react';
import './Home.css';
import ScientistQuoteCard from './ScientistQuoteCard';
import einstein from '../../assets/images/cards/einstein.png';
import marie from '../../assets/images/cards/marie_curie.png';
import feynmann from '../../assets/images/cards/Feynmann.png';
import newton from '../../assets/images/cards/newton.png';
import galelei from '../../assets/images/cards/galilei.png';

const scientists = [
  {
    image: einstein,
    quote: 'Imagination is more important than knowledge.',
    name: 'Albert Einstein'
  },
  {
    image: marie,
    quote: 'Nothing in life is to be feared, it is only to be understood.',
    name: 'Marie Curie'
  },
  {
    image: feynmann,
    quote: 'If I have seen further it is by standing on the shoulders of Giants.',
    name: 'Isaac Newton'
  },
  {
    image: newton,
    quote: 'The present is theirs; the future, for which I really worked, is mine.',
    name: 'Nikola Tesla'
  },
  {
    image: galelei,
    quote: 'You cannot teach a man anything; you can only help him find it within himself.',
    name: 'Galileo Galilei'
  }
];

const Home = () => (
  <div className="home-page">
    <div className="home-page__cards">
      {scientists.map((sci, idx) => (
        <ScientistQuoteCard key={`${sci.name}-${idx}`} image={sci.image} quote={sci.quote} name={sci.name} />
      ))}
    </div>
  </div>
);

export default Home;
