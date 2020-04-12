import React from 'react';

class FieldSettings extends React.Component {
    renderFieldSettings() {
        return <h1>field</h1>
    }

    render() {
        const hasFieldSelected = !!Object.keys(this.props).length;
        const title = hasFieldSelected ? this.props.name : 'Any field selected';

        return (
            <React.Fragment>
                <h1>Field settings</h1>
                <sma>({title})</sma>
                {hasFieldSelected ? this.renderFieldSettings() : null}
            </React.Fragment>
        );
    }
}

export default FieldSettings;
