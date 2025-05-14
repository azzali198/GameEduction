import React from 'react';
import { useDrop } from 'react-dnd';
import './Container.css';

const Containers = ({ name, accept }) => {
    const [containerName, setContainerName] = React.useState(name);
    const [backgroundColor, setBackgroundColor] = React.useState('blue');
    
    const [{ canDrop, isOver, didDrop }, drop] = useDrop(() => ({
        accept: accept,
        drop: (item, monitor) => {
            setContainerName(item.name);
            setBackgroundColor('green');
            return { name: item.name };
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