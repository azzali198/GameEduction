import React from "react";
import { Rectangle } from 'react-shapes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Containers from './Container.js';
import './Shapes.css';

const Shapes = ({ Data }) => {
    return (
        <Container fluid className="shapes-container">
            {Data.map((row, rowIndex) => (
                <Row key={`row-${rowIndex}`} className="shape-row">
                    {row.map((col, colIndex) => {
                        if (col === 'LH') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`} className="shape-cell">
                                    <Rectangle
                                        width={window.innerWidth < 768 ? 80 : 120}
                                        height={5}
                                        fill={{ color: 'gray' }}
                                        className="horizontal-line"
                                    />
                                </Col>
                            );
                        } else if (col === 'LV') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`} className="shape-cell">
                                    <Rectangle
                                        width={5}
                                        height={window.innerWidth < 768 ? 60 : 80}
                                        fill={{ color: 'gray' }}
                                        className="vertical-line"
                                    />
                                </Col>
                            );
                        } else if (col) {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`} className="shape-cell">
                                    <Containers
                                        name=""
                                        accept={col}
                                        className="element-container"
                                    />
                                </Col>
                            );
                        }
                        return <Col key={`col-${rowIndex}-${colIndex}`} className="shape-cell" />;
                    })}
                </Row>
            ))}
        </Container>
    );
};

export default Shapes;