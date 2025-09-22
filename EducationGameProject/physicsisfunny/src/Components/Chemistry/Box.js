import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { increment, addDropResult, selectDropResults, fetchCurrentDropResults } from './ScoreSlice';
import './Box.css';

const Box = ({ name, type }) => {
    const dispatch = useDispatch();
     
    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && monitor.didDrop()) {
                const currentDropResults = dispatch(fetchCurrentDropResults());              
                if (!currentDropResults.includes(dropResult.id)) {
                     // Store drop result id in Redux store table
                     dispatch(addDropResult(dropResult.id));
                    dispatch(increment());
                }
            
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