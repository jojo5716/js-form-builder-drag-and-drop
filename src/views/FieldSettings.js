import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';

import {
    FieldContainer,
    groupContainer,
    fieldGroupContainer,
} from './forms/settings.jsx';
import { EMPTY_CALLBACK } from '../constants/containers';

const isEqual = require('lodash.isequal');
const fieldSettingsMap = require('./settings');


class FieldSettings extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(attributeToChange, newValue) {
        const newFieldState = {
            ...this.props.fieldSelected,
            [ attributeToChange ]: newValue,
        };

        this.props.onChangeFieldSettings(newFieldState);
    }

    renderFieldSettings() {
        const { element, type } = this.props.fieldSelected;
        const calculateFieldSettings = fieldSettingsMap[ element ][ type ] || fieldSettingsMap[ element ].default;
        const fieldSettings = calculateFieldSettings(this.props.fieldSelected);

        return (
            <FormBuilder
                fields={fieldSettings}
                fieldContainer={FieldContainer}
                groupContainer={groupContainer}
                fieldGroupContainer={fieldGroupContainer}
                onChange={this.onChange}
            />
        );
    }

    render() {
        const hasFieldSelected = this.props.fieldSelected && !!Object.keys(this.props.fieldSelected).length;
        const title = hasFieldSelected ? this.props.fieldSelected.name : 'Any field selected';

        return (
            <React.Fragment>
                <h1>Field settings</h1>
                <small>({title})</small>
                {hasFieldSelected ? this.renderFieldSettings() : null}
            </React.Fragment>
        );
    }
}

export default FieldSettings;

FieldSettings.propTypes = {
    onChange: PropTypes.func,
    onChangeFieldSettings: PropTypes.func,
};

FieldSettings.defaultProps = {
    onChange: EMPTY_CALLBACK,
    onChangeFieldSettings: EMPTY_CALLBACK,
};
