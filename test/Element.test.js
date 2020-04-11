/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */

import React from 'react';
import { mount } from 'enzyme';

import Element from '../src/views/elements/Element';


describe('Parent Element', () => {
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
        wrapper = mount(<Element {...data}/>);
    });

    describe('Element', () => {
        it('Render null', () => {
            expect(wrapper.html()).toBeNull();
        });
    });
});
