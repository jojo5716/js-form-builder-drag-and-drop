import React from 'react';


export const FieldContainer = ({ label, children, helpText }) => (
    <div className="col">
        <label>
            {label}
        </label>
        {children}
        <small className="form-text text-muted">
            {helpText}
        </small>
    </div>
);


/**
 * Render fields group into a custom html block.
 */
export const fieldGroupContainer = ({ children, label }) => (
    <div className="row">
        {label}
        {children}
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
    <div className="form-row">
        <legend>{title}</legend>
        <p>{content}</p>
        {children}
    </div>
);

