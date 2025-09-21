import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addDropResult, selectDropResults } from './ScoreSlice';
import './Container.css';

const Containers = ({ name, accept }) => {
    const [containerName, setContainerName] = React.useState(name);
    const [backgroundColor, setBackgroundColor] = React.useState('blue');
    const dispatch = useDispatch();
    const dropResults = useSelector(selectDropResults);

    const [{ canDrop, isOver, didDrop }, drop] = useDrop(() => ({
        accept: accept,
        drop: (item, monitor) => {
            // Use dropResults from above
   
                setContainerName(item.name);
                setBackgroundColor('green');
                // Store drop result id in Redux store table
                dispatch(addDropResult(monitor.targetId));
                return { name: item.name, id: monitor.targetId };
            
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            didDrop: monitor.didDrop()
        }),
    }));

    const isActive = canDrop && isOver;
    const containerClass = `drop-container ${isActive ? 'active' : ''} ${canDrop ? 'can-drop' : ''}`;

    return (
        <div 
            ref={drop}
            className={containerClass}
            data-testid="dustbin"
        >
            <h3 className="container-text">{containerName}</h3>
        </div>
    );
};

export default Containers;