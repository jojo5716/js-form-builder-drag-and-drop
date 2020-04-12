import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from 'js-form-builder';

import {
    FieldContainer,
    groupContainer,
    fieldGroupContainer,
} from './forms/settings.jsx';
import { EMPTY_CALLBACK } from '../constants/containers';

const fieldSettingsMap = require('./settings');

class FieldSettings extends React.Component {
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
            />
        );
    }

    render() {
        const hasFieldSelected = !!this.props.fieldSelected;
        const title = hasFieldSelected ? this.props.name : 'Any field selected';

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
};

FieldSettings.defaultProps = {
    onChange: EMPTY_CALLBACK,
};
