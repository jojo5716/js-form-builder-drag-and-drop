const inputFields = require('../fixtures/fields/input');
const selctFields = require('../fixtures/fields/select');


module.exports = [
    {
        title: 'Input fields',
        fields: [...inputFields],
    }, {
        title: 'Select fields',
        fields: [...selctFields],
    },
];
