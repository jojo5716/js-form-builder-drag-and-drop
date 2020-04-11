/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */

import React from 'react';
import { mount } from 'enzyme';

import { fields, form } from '../example/fixtures';
import FormBuilderDragAndDrop from '../src';


describe('FormBuilder', () => {

    let fieldFixtures;
    let wrapper;

    beforeEach(() => {
        fieldFixtures = [...fields];
        wrapper = mount(<FormBuilderDragAndDrop fields={fieldFixtures} form={form}/>);
    });

    describe('Render element', () => {
        it('Form', () => {
            expect(wrapper.find('form').length).toEqual(1);
        });

        it('Dont render anything if fields prop is not an array', () => {
            wrapper = mount(<FormBuilderDragAndDrop fields={{}}/>);

            expect(wrapper.find('form').length).toEqual(0);
        });

        it('Inputs', () => {
            expect(wrapper.find('input').length).toEqual(10);
        });

        it('Custom container', () => {
            const Container = ({ children, onSubmit }) => (
                <div className="container-form">
                    {children}

                    <button onClick={onSubmit}>Custom submit form</button>
                </div>
            );
            wrapper = mount(<FormBuilderDragAndDrop fields={fieldFixtures} container={Container}/>);

            expect(wrapper.find('.container-form').length).toEqual(1);
        });

        it('Default container', () => {
            wrapper = mount(<FormBuilderDragAndDrop fields={fieldFixtures} container={null}/>);
            expect(wrapper.find('EMPTY_CONTAINER').length).toEqual(9);
            expect(wrapper.find('EMPTY_FIELD_CONTAINER').length).toEqual(11);
        });

        it('Submit button', () => {
            wrapper = mount(<FormBuilderDragAndDrop fields={fieldFixtures} showSubmitButton={false}/>);

            expect(wrapper.find('input[type="submit"]').length).toEqual(0);
        });

        describe('Input', () => {
            it('Text', () => {
                expect(wrapper.find('input[type="text"]').length).toEqual(2);
            });

            it('Invalid type dont will be rendered', () => {
                const newForm = [...fieldFixtures, { type: 'invalid-type' }];
                wrapper = mount(<FormBuilderDragAndDrop fields={newForm} showSubmitButton={false}/>);

                expect(wrapper.find('input').length).toEqual(10);
            });

        });

        describe('onClick submit button', () => {
            it('onSuccess prop is called and hasToShowFormError state is change to false if fields is valid', () => {
                const onSuccessMock = jest.fn();
                const customFields = [{
                    name: 'name',
                    type: 'text',
                    value: 'Jhon',
                }];

                wrapper = mount(<FormBuilderDragAndDrop fields={customFields} onSuccess={onSuccessMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                expect(buttonElement.length).toEqual(1);

                expect(onSuccessMock.mock.calls.length).toBe(1);

                expect(onSuccessMock).toHaveBeenCalledWith({ name: 'Jhon' });

            });

            it('show fields error message if fields is not valid', () => {
                const onSubmitMock = jest.fn();
                const fieldsProps = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilderDragAndDrop.prototype.isValidForm = () => false;
                wrapper = mount(<FormBuilderDragAndDrop fields={fieldsProps} onSubmit={onSubmitMock} hasToSubmit={false}/>);

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                expect(buttonElement.length).toEqual(1);

                expect(onSubmitMock.mock.calls.length).toBe(0);

                expect(wrapper.state().hasToShowFormError).toBe(true);
            });

            it('onSuccess do anything if showFormErrorMessage is false and fields is invalid', () => {
                const onSubmitMock = jest.fn();
                const fieldsProps = [{
                    name: 'name',
                    type: 'text',
                    value: '',
                }];

                FormBuilderDragAndDrop.prototype.isValidForm = () => false;
                wrapper = mount(
                    <FormBuilderDragAndDrop
                        fields={fieldsProps}
                        onSubmit={onSubmitMock}
                        hasToSubmit={false}
                        showFormErrorMessage={false}
                    />,
                );

                const buttonElement = wrapper.find('button');

                buttonElement.simulate('click');

                expect(buttonElement.length).toEqual(1);

                expect(wrapper.state().hasToShowFormError).toBe(false);
            });
        });
    });
});
