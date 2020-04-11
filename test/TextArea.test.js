/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import BasicTextArea from '../src/views/elements/textarea/BasicTextArea';


describe('Input element', () => {
    let data;
    let wrapper;

    beforeEach(() => {
        data = {
            id: 'comment',
            element: 'textarea',
            name: 'comment',
            // value: 'JhonDoe',
            // minLength: 4,
            // type: 'text',
            className: 'form-control',
            required: true,
            placeholder: 'Your comment',
            onChange: (event) => {
                console.log(`Comment: ${event.target.value}`);
            },
        };
        wrapper = mount(<BasicTextArea {...data}/>);
    });

    describe('BasicTextArea', () => {
        it('set hasToShowErrorMessage state true if field is not valid ', () => {
            const event = { target: { value: 's' } };

            wrapper.find('textarea').simulate('change', event);

            expect(wrapper.state().hasToShowErrorMessage).toBe(true);
        });
    });
});
