/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import BasicCheckBox from '../src/views/elements/inputs/checkbox/BasicCheckBox';


describe('CheckBox element', () => {
    let data;

    beforeEach(() => {
        data = {
            id: 'tags',
            element: 'input',
            type: 'checkbox',
            name: 'tag1',
            value: 'tag1',
            className: 'form-control',
            label: 'Tag 1',
            onChange: (event) => {
                console.log(`Tag: ${event.target.value}`);
            },
        };
    });


    describe('BasicCheckBox', () => {
        it('call setFieldValueState and onChange prop callbacks if field is valid ', () => {
            const setFieldValueStateMock = jest.fn();
            const onChangeMock = jest.fn();

            const wrapper = mount(
                <BasicCheckBox
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}
                />,
            );

            wrapper.instance().isFieldValid = () => true;

            const event = { target: { checked: true } };

            wrapper.find('input[type="checkbox"]').simulate('change', event);

            expect(setFieldValueStateMock).toHaveBeenCalledWith(true);

            wrapper.update();

            expect(wrapper.state().hasToShowErrorMessage).toBe(false);
        });

    });
});
