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
        this.state = {
            fieldSelected: { ...props.fieldSelected },
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!(isEqual(this.props.fieldSelected, prevState.fieldSelected)) && this.props.fieldSelected) {
            this.setState({
                fieldSelected: this.props.fieldSelected,
            });
        }
    }

    onChange(fieldName, newProps) {
        this.setState({
            fieldSelected: {
                ...this.state.fieldSelected,
                [ fieldName ]: newProps,
            }
        });
    }

    renderFieldSettings() {
        const { element, type } = this.state.fieldSelected;
        const calculateFieldSettings = fieldSettingsMap[ element ][ type ] || fieldSettingsMap[ element ].default;
        const fieldSettings = calculateFieldSettings(this.state.fieldSelected);

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
        const hasFieldSelected = !!Object.keys(this.state.fieldSelected).length;
        const title = hasFieldSelected ? this.state.fieldSelected.name : 'Any field selected';

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
