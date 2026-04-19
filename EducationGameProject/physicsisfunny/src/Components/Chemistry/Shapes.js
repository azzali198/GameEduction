import React, { useRef, useState, useEffect } from "react";
import { Rectangle } from 'react-shapes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Containers from './Container.js';
import './Shapes.css';

// ResponsiveLine must be declared before Shapes so it's available at render time.
export const ResponsiveLine = ({ orientation = 'horizontal', count = 1, fills = ['gray'], className = '' }) => {
    const wrapperRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
        update();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', update);
            return () => window.removeEventListener('resize', update);
        }

        const ro = new ResizeObserver(() => update());
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const thickness = Math.max(3, Math.round(Math.min(12, (orientation === 'horizontal' ? size.height : size.width) * 0.15)));

    const items = [];
    for (let i = 0; i < Math.max(1, count); i++) {
        const fill = fills[i % fills.length] || fills[0];
        if (orientation === 'horizontal') {
            const w = Math.max(8, size.width - 4);
            items.push(
                <Rectangle
                    key={i}
                    width={w}
                    height={thickness}
                    fill={{ color: fill }}
                    className={className}
                />
            );
        } else {
            const h = Math.max(8, size.height - 4);
            items.push(
                <Rectangle
                    key={i}
                    width={thickness}
                    height={h}
                    fill={{ color: fill }}
                    className={className}
                />
            );
        }
    }

    const wrapperStyle = orientation === 'horizontal'
        ? { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', height: '100%' }
        : { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', height: '100%' };

    return (
        <div ref={wrapperRef} style={wrapperStyle}>
            {items}
        </div>
    );
};

const Shapes = ({ Data }) => {
    return (
        <Container fluid className="shapes-container">
            {Data.map((row, rowIndex) => (
                <Row key={`row-${rowIndex}`} className="shape-row">
                    {row.map((col, colIndex) => {
                        if (col === 'LH1') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`} style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell">
                                    <ResponsiveLine orientation="horizontal" count={1} fills={[ 'gray' ]} className="horizontal-line" />
                                </Col>
                            );
                        }
                        else if (col === 'LH2') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`} style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell">
                                    <ResponsiveLine orientation="horizontal" count={3} fills={[ 'gray', 'white', 'gray' ]} className="horizontal-line" />
                                </Col>
                            );
                        }
                        else if (col === 'LV1') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`}  style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell">
                                    <ResponsiveLine orientation="vertical" count={1} fills={[ 'gray' ]} className="vertical-line" />
                                </Col>
                            );
                        }
                        else if (col === 'LV2') {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}`}  style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell">
                                    <ResponsiveLine orientation="vertical" count={3} fills={[ 'gray', 'white', 'gray' ]} className="vertical-line" />
                                </Col>
                            );
                        } else if (col) {
                            return (
                                <Col key={`col-${rowIndex}-${colIndex}-${col}`}  style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell">
                                    <Containers
                                        name=""
                                        accept={col}
                                        className="element-container"
                                    />
                                </Col>
                            );
                        }
                        return <Col key={`col-${rowIndex}-${colIndex}`}  style={{ display: 'flex', flexDirection: 'column' }} className="shape-cell" />;
                    })}
                </Row>
            ))}
        </Container>
    );
};

export default Shapes;
