import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { increment } from './ScoreSlice';
import './Box.css';

const Box = ({ name, type }) => {
    const Dispatch = useDispatch();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && monitor.didDrop()) {
                dropResult.name = item.name;
                Dispatch(increment());
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="element-box"
            style={{ opacity: isDragging ? 0.4 : 1 }}
            data-testid={`box`}
        >
            <h3 className="element-text">{name}</h3>
        </div>
    );
};

export default Box;