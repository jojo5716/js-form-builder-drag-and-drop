import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';

import FieldSettings from './FieldSettings';
import {
    FieldDraggableContainer,
    FieldContainer,
    formErrorContainer,
} from './views/fields.jsx';
import {
    setDragStateInformation,
    changeElementColor,
    findFieldByName,
    restoreElementColor,
} from './helpers';


class FormBuilderDragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            fieldSelected: null,
        };

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onClickField = this.onClickField.bind(this);
    }

    onDragStart(event) {
        setDragStateInformation(event);
        changeElementColor(event, 'yellow');
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        const elementID = event.dataTransfer.getData('text');
        const fieldName = elementID.split('-').slice(-1)[ 0 ];
        const field = findFieldByName(this.props.fields, fieldName);

        restoreElementColor(elementID);

        this.setState({
            fields: [
                ...this.state.fields,
                {
                    ...field,
                    id: `${field.id}${Date.now()}`,
                    name: `${field.name}${Date.now()}`,
                    label: `${field.name}${Date.now()}`,
                },
            ],
        });
    }

    onClickField(fieldName) {
        this.setState({
            fieldSelected: findFieldByName(this.state.fields, fieldName),
        });

    }

    renderFormBuilder(fields, setAsDraggable = true) {
        let fieldsToDisplay;
        let fieldContainer;
        if (setAsDraggable) {
            fieldContainer = FieldDraggableContainer;
            // Attach onDragStart event on each field
            fieldsToDisplay = fields.map((field) => {
                field.extraData = { /* eslint-disable-line no-param-reassign */
                    onDragStart: this.onDragStart,
                    onClick: this.onClickField,
                };

                return field;
            });
        } else {
            fieldContainer = FieldContainer;
            fieldsToDisplay = fields;
        }
        const hasToShowSubmitButton = !setAsDraggable && !!fieldsToDisplay.length;

        return (
            <FormBuilder
                fields={fieldsToDisplay}
                createFormElement={false}
                fieldContainer={fieldContainer}
                formErrorContainer={formErrorContainer}
                hasToSubmit={false}
                showSubmitButton={hasToShowSubmitButton}
            />
        );
    }

    renderPage() {
        return (
            <div className="flex-row-container">
                <div className="flex-row-item">
                    {this.renderFormBuilder(this.props.fields)}
                </div>
                <div className="flex-row-item" onDragOver={this.onDragOver} onDrop={this.onDrop}>
                    {this.renderFormBuilder(this.state.fields, false)}
                </div>
                <div className="flex-row-item">
                    {this.state.fieldSelected ? <FieldSettings {...this.state.fieldSelected}/> : null}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='parent'>
                {this.renderPage()}
            </div>
        );
    }
}

export default FormBuilderDragAndDrop;


FormBuilderDragAndDrop.propTypes = {
    fields: PropTypes.array
};

FormBuilderDragAndDrop.defaultProps = {
    fields: [],
};
