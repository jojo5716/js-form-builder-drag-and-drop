/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */

import React from 'react';
import { mount } from 'enzyme';

import BasicRadio from '../src/views/elements/inputs/radio/BasicRadio';


describe('BasicRadio', () => {
    let data;
    let wrapper;

    beforeEach(() => {
        data = {
            elementType: 'input',
            type: 'radio',
            value: 'female',
            name: 'gender',
            label: 'Gender',
            required: true,
        };
        wrapper = mount(<BasicRadio {...data}/>);
    });

    describe('BasicRadio', () => {
        it('Render radio button', () => {
            expect(wrapper.find('input[type="radio"]').length).toEqual(1);
        });

        it('Calling onChange and setFieldValueState props on click radio button', () => {
            const onChangeMock = jest.fn();
            const setFieldValueStateMock = jest.fn();
            const clickEvent = { target: { value: 'female', checked: true } };

            wrapper = mount(
                <BasicRadio
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}
                />,
            );
            wrapper.find('input[type="radio"]').simulate('click', clickEvent);

            expect(onChangeMock).toHaveBeenCalled();
            expect(setFieldValueStateMock).toHaveBeenCalled();
        });

        it('Calling onChange and setFieldValueState props on click radio button', () => {
            const onChangeMock = jest.fn();
            const setFieldValueStateMock = jest.fn();
            const clickEvent = { target: { value: 'female', checked: true } };

            wrapper = mount(
                <BasicRadio
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}/>,
            );
            wrapper.find('input[type="radio"]').simulate('click', clickEvent);

            expect(onChangeMock).toHaveBeenCalled();
            expect(setFieldValueStateMock).toHaveBeenCalled();
        });
    });
});
