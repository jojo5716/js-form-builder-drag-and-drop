/* eslint-env node, jest */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */
require('../src/polyfills/arrays');


describe('Polyfills', () => {

    describe('Array', () => {
        it('Check array object', () => {
            expect(Array.isArray([])).toBe(true);
        });

        it('Check string object', () => {
            expect(Array.isArray('')).toBe(false);
        });
    });
});
