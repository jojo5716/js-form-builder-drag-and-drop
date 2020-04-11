import React from 'react';

export const EMPTY_CONTAINER = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export const EMPTY_FIELD_CONTAINER = ({ children, label, errorMessage }) => (
    <React.Fragment>
        {label}
        {children}
        {errorMessage}
    </React.Fragment>
);
export const EMPTY_LABEL_CONTAINER = ({ children }) => <label>{children}</label>;
export const EMPTY_CALLBACK = () => {
};
