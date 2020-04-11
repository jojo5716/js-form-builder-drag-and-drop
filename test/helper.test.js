/* eslint-env node, jest */
import {
    buildFormState,
    isObjectArray,
    convertStringToCamelCase,
    removeInternalProps,
} from '../src/helpers';
import { fields } from '../example/fixtures';


describe('Helpers', () => {
    describe('Index', () => {
        it('buildFormState return fields initial state', () => {
            const expectedState = {
                birthday: '',
                category: 'category2',
                comment: '',
                email: '',
                lastName: '',
                mobile: '',
                name: 'JhonDoe',
                status: 'public',
                tag1: false,
                tag2: true,
            };

            const fieldsState = buildFormState({ fields });

            expect(fieldsState).toEqual(expectedState);
        });

        it('isObjectArray return true if args is a instance of Array', () => {
            expect(isObjectArray([])).toEqual(true);
            expect(isObjectArray(new Array())).toEqual(true); // eslint-disable-line no-array-constructor
        });

        it('isObjectArray return false if args is a instance of Array', () => {
            expect(isObjectArray({})).toEqual(false);
            expect(isObjectArray('')).toEqual(false);
            expect(isObjectArray('[]')).toEqual(false);
            expect(isObjectArray(null)).toEqual(false);
            expect(isObjectArray(undefined)).toEqual(false);
            expect(isObjectArray(0)).toEqual(false);
        });

        it('convertStringToCamelCase returns first character of string in upper case', () => {
            expect(convertStringToCamelCase('jhon')).toEqual('Jhon');
            expect(convertStringToCamelCase('JHON')).toEqual('Jhon');
            expect(convertStringToCamelCase('JHON-doe')).toEqual('Jhon-doe');
            expect(convertStringToCamelCase('JHON- doe')).toEqual('Jhon- doe');
        });

        it('removeInternalProps remove specific props from object', () => {
            const props = {
                name: 'name',
                value: 'Jhon',
                setFieldContainer: () => {
                }, // Prop to delete
            };
            const attributesToDelete = ['setFieldContainer'];
            const expectedProps = {
                name: 'name',
                value: 'Jhon',
            };

            expect(removeInternalProps(props, attributesToDelete)).toEqual(expectedProps);
        });

        it('removeInternalProps do anything if prop to remove does not exist', () => {
            const props = {
                name: 'name',
                value: 'Jhon',
            };
            const attributesToDelete = ['setFieldContainer'];
            const expectedProps = {
                name: 'name',
                value: 'Jhon',
            };

            expect(removeInternalProps(props, attributesToDelete)).toEqual(expectedProps);
        });
    });
});
