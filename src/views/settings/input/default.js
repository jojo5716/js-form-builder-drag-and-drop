module.exports = ({ name }) => ([
    {
        title: 'Basic',
        fields: [
            {
                element: 'input',
                type: 'text',
                name: `settings_${name}`,
                value: name,
                className: 'form-control',
                placeholder: 'Write unique field name',
                required: true,
                label: 'Input field name',
                helpText: 'helpText',
            },
            {
                element: 'input',
                type: 'checkbox',
                name: `settings_${name}`,
                checked: name,
                className: 'form-control',
                label: 'Is input field required?',
                helpText: 'helpText',
            },
        ],
    },
]);
