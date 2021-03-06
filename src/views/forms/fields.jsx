import React from 'react';


export const FieldDraggableContainer = (
    {
        label,
        id,
        children,
        onDragStart,
        onDragLeave,
        name,
    },
) => (
    <div
        id={`field-draggable-${id}-${name}`}
        className='draggableField'
        draggable='true'
        onDragStart={onDragStart}
        onDragLeave={onDragLeave}
    >
        <label>{label}</label>
        {children}

    </div>
);

export const FieldContainer = ({ label, name, children, errorMessage, onClick }) => (
    <div className="field-generated" onClick={() => onClick(name)}>
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

/**
 * Render group into a custom html block.
 */
export const groupContainer = ({ children, title, content }) => (
    <div className="group-container">
        <fieldset>
            <legend>{title}</legend>
            <p>{content}</p>
            {children}
        </fieldset>
    </div>
);
