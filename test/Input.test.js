/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import BasicInput from '../src/views/elements/inputs/BasicInput';


describe('Input element', () => {
    let data;
    let wrapper;

    beforeEach(() => {
        data = {
            type: 'text',
            elementType: 'input',
            name: 'name',
            label: 'NAME',
            minLength: 5,
            required: true,
        };
        wrapper = mount(<BasicInput {...data}/>);
    });

    describe('BasicInput', () => {
        it('Render input element', () => {
            expect(wrapper.find('input[type="text"]').length).toEqual(1);
        });

        it('Render custom container', () => {
            const customContainer = ({ children }) => <h1>{children}</h1>;

            wrapper = mount(<BasicInput {...data} fieldContainer={customContainer}/>);

            expect(wrapper.find('h1').length).toEqual(1);
        });

        it('Render default container', () => {
            wrapper = mount(<BasicInput {...data} />);

            expect(wrapper.find('EMPTY_CONTAINER').length).toEqual(0);
            expect(wrapper.find('EMPTY_FIELD_CONTAINER').length).toEqual(1);
        });

        it('Render label', () => {
            wrapper = mount(<BasicInput {...data} />);

            expect(wrapper.find('label').length).toEqual(1);
        });

        it('Render label container', () => {
            const labelContainer = ({ children }) => <div className='label-container-test'>{children}</div>;
            wrapper = mount(<BasicInput {...data} labelContainer={labelContainer}/>);

            expect(wrapper.find('.label-container-test').length).toEqual(1);
            expect(wrapper.find('.label-container-test').text()).toEqual('Name');
            expect(wrapper.find('.label-container-test label').length).toEqual(0);

        });

        it('Render field error', () => {
            wrapper = mount(<BasicInput {...data} />);

            wrapper.instance().setState({
                hasToShowErrorMessage: true,
            });

            wrapper.update();

            expect(wrapper.find('EMPTY_CONTAINER').length).toEqual(1);
        });

        it('Hide field error', async () => {
            wrapper.instance().hideErrorMessage();

            wrapper.update();
            expect(wrapper.find('span').length).toEqual(0);
        });

        describe('onChange', () => {
            it('call setFieldValueState and onChange prop callbacks if field is valid ', () => {
                const setFieldValueStateMock = jest.fn();
                const onChangeMock = jest.fn();

                wrapper = mount(
                    <BasicInput
                        {...data}
                        onChange={onChangeMock}
                        setFieldValueState={setFieldValueStateMock}
                    />,
                );

                wrapper.instance().isFieldValid = () => true;

                const event = { target: { value: 'Jhon Doe' } };

                wrapper.find('input[type="text"]').simulate('change', event);

                expect(setFieldValueStateMock).toHaveBeenCalledWith('Jhon Doe');

                wrapper.update();

                expect(wrapper.state().hasToShowErrorMessage).toBe(false);
            });

            it('set hasToShowErrorMessage state true if field is not valid ', () => {
                wrapper = mount(<BasicInput {...data}/>);

                const event = { target: { value: 's' } };

                wrapper.find('input[type="text"]').simulate('change', event);

                expect(wrapper.state().hasToShowErrorMessage).toBe(true);
            });
        });
    });
});
