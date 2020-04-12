/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
import React from 'react';
import ReactDOM from 'react-dom';

import FormBuilderDragAndDrop from '../src';
import fieldsFixtures from './fixtures';


import './style.less';

ReactDOM.render(
    <FormBuilderDragAndDrop fields={fieldsFixtures}/>,
    document.getElementById('root'),
);
