/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import BasicSelect from '../src/views/elements/select/BasicSelect';


describe('Input element', () => {
    let data;
    let wrapper;

    beforeEach(() => {
        data = {
            name: 'category',
            element: 'select',
            className: 'form-control',
            label: 'Category',
            value: 'category2',
            required: true,
            options: [
                {
                    value: '',
                    content: '-',
                },
                {
                    value: 'category1',
                    content: 'Category 1',
                }, {
                    value: 'category2',
                    content: 'Category 2',
                },
            ],
            onChange: (event) => {
                console.log(`Category: ${event.target.value}`);
            },
        };
        wrapper = mount(<BasicSelect {...data}/>);
    });

    describe('BasicSelect', () => {
        it('call setFieldValueState and onChange prop callbacks if field is valid ', () => {
            const setFieldValueStateMock = jest.fn();
            const onChangeMock = jest.fn();

            wrapper = mount(
                <BasicSelect
                    {...data}
                    onChange={onChangeMock}
                    setFieldValueState={setFieldValueStateMock}
                />,
            );

            wrapper.instance().isFieldValid = () => true;

            const event = { target: { value: 'category1' } };

            wrapper.find('select').simulate('change', event);

            expect(setFieldValueStateMock).toHaveBeenCalledWith('category1');

            wrapper.update();

            expect(wrapper.state().hasToShowErrorMessage).toBe(false);
        });

    });
});
