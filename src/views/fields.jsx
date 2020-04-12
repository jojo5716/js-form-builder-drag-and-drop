import React from 'react';


export const FieldDraggableContainer = ({ label, id, children, onDragStart, name }) => (
    <div
        id={`field-draggable-${id}-${name}`}
        className='draggableField'
        draggable='true'
        onDragStart={onDragStart}
    >
        <label>{label}</label>
        {children}
    </div>
);

export const FieldContainer = ({ label, children, errorMessage }) => (
    <div>
        <label>{label}</label>
        {children}
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
    </div>
);

/**
 * Render fields error message into a custom html block.
 */
export const formErrorContainer = ({ children }) => (
    <div className="error">
        {children}
    </div>
);
