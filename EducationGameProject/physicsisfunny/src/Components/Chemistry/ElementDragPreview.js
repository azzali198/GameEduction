import React from 'react';
import { createPortal } from 'react-dom';
import { useDragLayer } from 'react-dnd';
import './Box.css';

export default function ElementDragPreview() {
    const { item, offset, isDragging } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        offset: monitor.getClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !offset || !item) return null;

    // Keep the preview outside the game's transformed and clipped containers.
    return createPortal(
        <div className="element-drag-preview" aria-hidden="true"
            style={{ left: offset.x, top: offset.y }}>
            <span className="element-text">{item.name}</span>
        </div>,
        document.body
    );
}
