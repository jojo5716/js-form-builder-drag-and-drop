import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';

import {
    FieldDraggableContainer,
    FieldContainer,
    formErrorContainer,
} from './views/fields.jsx';
import {
    setDragStateInformation,
    changeElementColor,
} from './helpers';


class FormBuilderDragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
        };

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDragStart(event) {
        setDragStateInformation(event);
        changeElementColor(event, 'yellow');
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        const id = event.dataTransfer.getData('text');
        const fieldName = id.split('-').slice(-1)[ 0 ];
        const field = this.props.fields.find(fieldData => fieldData.name === fieldName);
        const draggableElement = document.getElementById(id);

        changeElementColor({ currentTarget: draggableElement });

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

    renderFormBuilder(fields, setAsDraggable = true) {
        let fieldsToDisplay;
        let fieldContainer;
        if (setAsDraggable) {
            fieldContainer = FieldDraggableContainer;
            // Attach onDragStart event on each field
            fieldsToDisplay = fields.map((field) => {
                field.extraData = { /* eslint-disable-line no-param-reassign */
                    onDragStart: this.onDragStart,
                };

                return field;
            });
        } else {
            fieldContainer = FieldContainer;
            fieldsToDisplay = fields;
        }

        return (
            <FormBuilder
                fields={fieldsToDisplay}
                createFormElement={false}
                fieldContainer={fieldContainer}
                formErrorContainer={formErrorContainer}
                hasToSubmit={false}
            />
        );
    }

    renderPage() {
        return (
            <React.Fragment>
                <div className="split left">
                    {this.renderFormBuilder(this.props.fields)}
                </div>

                <div className="split right">
                    <div
                        className="centered"
                        onDragOver={this.onDragOver}
                        onDrop={this.onDrop}
                    >
                        {this.renderFormBuilder(this.state.fields, false)}

                    </div>
                </div>
            </React.Fragment>
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
