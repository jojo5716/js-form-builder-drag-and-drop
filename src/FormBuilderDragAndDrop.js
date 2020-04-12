import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';

import FieldSettings from './views/FieldSettings';
import {
    FieldDraggableContainer,
    FieldContainer,
    formErrorContainer,
    groupContainer,
} from './views/forms/fields.jsx';
import {
    setDragStateInformation,
    changeElementColor,
    findFieldByName,
    restoreElementColor,
    getElementById,
} from './helpers';



class FormBuilderDragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            fieldSelected: null,
            fieldDragging: null,
        };

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onClickField = this.onClickField.bind(this);
    }

    onDragStart(event) {
        const elementID = event.currentTarget.id;
        const field = getElementById(this.props.fields, elementID);

        this.setState({
            fieldDragging: field,
            fieldSelected: null,
        });

        setDragStateInformation(event);
        changeElementColor(event.currentTarget, 'yellow');
    }

    onDragOver(event) {
        event.preventDefault();

        return false;
    }

    onDragLeave(event) {
        event.preventDefault();

        if (event.target.className.indexOf('dynamicForm') !== -1) {
            event.target.style.background = "blue";
        }
    }

    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        const elementID = event.dataTransfer.getData('text');
        const field = this.state.fieldDragging;

        restoreElementColor(elementID);
        changeElementColor(event.target, '#fff4e6');

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
            fieldDragging: null,
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
            fieldsToDisplay = fields.map((fieldGroup) => {
                fieldGroup.fields.map((field) => {
                    field.extraData = { /* eslint-disable-line no-param-reassign */
                        onDragStart: this.onDragStart,
                        onDragLeave: this.onDragLeave,
                        onClick: this.onClickField,
                    };
                    return field;
                });

                return fieldGroup;
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
                hasToSubmit={false}
                showSubmitButton={hasToShowSubmitButton}
                fieldContainer={fieldContainer}
                formErrorContainer={formErrorContainer}
                groupContainer={groupContainer}
            />
        );
    }

    renderPage() {
        const fieldsStringify = JSON.stringify(this.state.fields, undefined, 2);
        return (
            <div className="flex-row-container">
                <div className="flex-row-item">
                    {this.renderFormBuilder(this.props.fields)}
                </div>
                <div
                    className="flex-row-item dynamicForm"
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    onDragLeave={this.onDragLeave}
                >
                    {this.renderFormBuilder(this.state.fields, false)}
                </div>
                <div className="flex-row-item">
                    <div className="half-containers">
                        <FieldSettings
                            fieldSelected={this.state.fieldSelected}/>

                    </div>
                    <div className="half-containers">
                        <div className="fields-stringify">
                            <pre>{fieldsStringify}</pre>
                        </div>
                    </div>
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


FormBuilderDragAndDrop
    .propTypes = {
    fields: PropTypes.array,
};

FormBuilderDragAndDrop
    .defaultProps = {
    fields: [],
};
