module.exports = (props) => {
    // console.log(props)
    return [
        {
            title: 'Basic',
            fields: [
                [
                    {
                        element: 'input',
                        type: 'text',
                        name: 'name',
                        value: props.name,
                        className: 'form-control',
                        placeholder: 'Write unique field name',
                        required: true,
                        label: 'Input field name',
                        helpText: 'helpText',
                    },
                    {
                        element: 'input',
                        type: 'text',
                        name: 'className',
                        className: 'form-control',
                        label: 'Field class name',
                        helpText: 'helpText',
                        value: props.className,
                    },
                    {
                        element: 'input',
                        type: 'number',
                        name: 'maxLength',
                        className: 'form-control',
                        label: 'Max length',
                        placeholder: 'Max length',
                        value: props.maxLength,
                    },
                ],
                [
                    {
                        element: 'input',
                        type: 'number',
                        name: 'minLength',
                        checked: false,
                        className: 'form-control',
                        label: 'Min length',
                        placeholder: 'Min length',
                        props: props.minLength,
                    },
                    {
                        element: 'input',
                        type: 'text',
                        name: 'pattern',
                        className: 'form-control',
                        label: 'Pattern',
                        placeholder: 'Pattern',
                        value: props.pattern,
                    },
                ],
                [
                    {
                        element: 'input',
                        type: 'text',
                        name: 'placeholder',
                        className: 'form-control',
                        label: 'Placeholder',
                        placeholder: 'Placeholder',
                        value: props.placeholder,
                    },
                    {
                        element: 'input',
                        type: 'text',
                        name: 'label',
                        className: 'form-control',
                        label: 'Label',
                        placeholder: 'Label',
                        value: props.label,
                    },
                    {
                        element: 'input',
                        type: 'checkbox',
                        name: 'readOnly',
                        checked: props.readOnly,
                        className: 'form-control',
                        label: 'Read only',
                    },
                    {
                        element: 'input',
                        type: 'checkbox',
                        name: 'required',
                        checked: props.required,
                        className: 'form-control',
                        label: 'Is input field required?',
                        helpText: 'helpText',
                    },
                ],
            ],
        },
    ]
};
