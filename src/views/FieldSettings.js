import React from 'react';
import FormBuilder from 'js-form-builder';
import {
    FieldContainer,
    groupContainer,
    fieldGroupContainer,
} from '../views/forms/settings.jsx';

const fieldSettingsMap = require('./settings');

class FieldSettings extends React.Component {
    renderFieldSettings() {
        const { element, type } = this.props;
        const calculateFieldSettings = fieldSettingsMap[ element ][ type ] || fieldSettingsMap[ element ].default;
        const fieldSettings = calculateFieldSettings(this.props);

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
        const hasFieldSelected = !!Object.keys(this.props).length;
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
