import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';


const FieldContainer = ({label, children}) => (
    <div className='draggableField' draggable='true'>
        <label>label</label>
        {children}
    </div>
);


class FormBuilderDragAndDrop extends React.Component {
    onDragStart(event) {
        event
            .dataTransfer
            .setData('text/plain', event.target.id);

        event
            .currentTarget
            .style
            .backgroundColor = 'yellow';
    }

    renderField(field, index) {
        return (
            <Field key={index}>
                <input type="text" placeholder="Input text"/>
            </Field>
        );
    }

    render() {
        return (
            <div className='parent'>
                <FormBuilder
                    fields={this.props.fields}
                    createFormElement={false}
                    fieldContainer={FieldContainer}
                />
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
