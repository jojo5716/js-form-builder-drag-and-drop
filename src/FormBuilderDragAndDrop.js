import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';


const FieldDraggableContainer = ({ label, id, children, onDragStart, name }) => (
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

const FieldContainer = ({ label, children }) => (
    <div>
        <label>{label}</label>
        {children}
    </div>
);


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
        event
            .dataTransfer
            .setData('text/plain', event.target.id);

        event
            .currentTarget
            .style
            .backgroundColor = 'yellow';
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        const id = event.dataTransfer.getData('text');
        const fieldName = id.split('-').slice(-1)[ 0 ];
        const field = this.props.fields.find(fieldData => fieldData.name === fieldName);

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
