# Documentation for fields props  
Each field accepts as prop all the native attributes of html5 (minLength, maxLength, required, name, placeholder, etc ...) and also accepts some additional props:
#### HTML element attributes
[See input html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

[See select html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)

[See textarea html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

#### Additional props for each field
|    Prop name   | Required | Default value | Prop value type |                                                                                          Description                                                                                          |
|:--------------:|:--------:|:-------------:|:---------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    onChange    |     -    | Empty funcion |     Function    |                                                                               Return field value on change value                                                                              |
| fieldContainer |     -    |      null     |       Jsx       | It is allowed to specify this prop at the component root level and render each field in a container or override this prop at the field level and customize the container of a specific field. |
|     element    |     -    |     input     |      String     |                                                                     Valid HTML form element name (input, select, textarea)                                                                    |
|      type      |     -    |      text     |      String     |                                          ONLY for input elements. Type of input to render(text, password, radio, checkbox, color, url, email, etc...)                                         |


  
# Fields can be grouped in different ways.  
  

 1. As an array of objects where each object represents an html5 field
    for form.
```javascript  
const fields = [ { ...field1 }, { ...field2 },]  
```
 2. Array of arrays where each array represents a container of fields
    and each item will be the html field.
    
```javascript  
const fields = [ 
    [{...field1}, {...field2}], // First block container with 2 fields (Fields 1 and Field 2) 
    [{...field3}, {...field4}], // Second block container with 2 fields (Fields 3 and Field 4)] 
```
 3. Array of objects where each object has a Fields attribute that
    represents the html fields of the form. The difference between the
    first way is because this object can be passed additional attributes
    of the container and rendered in a separate container with specific
    content.

 ```javascript  
const fields = [ 
    { 
        title: 'Container title', 
        content: 'Container title', 
        fields: [{ ...field1, ...field2 }], 
    }
];  
```

# Examples
## Basic fields
```javascript
const fields = [
    {
        id: 'name',
        element: 'input',
        type: 'text',
        name: 'name',
        value: 'JhonDoe',
        minLength: 4,
        className: 'form-control',
        required: true,
        placeholder: 'Name',
        onChange: (event) => {
            console.log(`Name: ${event.target.value}`);
        },
    },
];

ReactDOM.render(  
  <FormBuilder fields={fields}/>,  
  document.getElementById('root'),  
);
```
#### Results
```html
<form>
	<label>Name</label>
	<input id="name" element="input" type="text" name="name" minlength="4" class="form-control" required="" placeholder="Name" value="JhonDoe"/>
	<input type="submit" value="Submit"/>
</form>
```

## Group fields by blocks
```javascript
/**  
 * Render fields group into a custom html block. */
 const fieldGroupContainer = ({ children, label, groupName }) => (  
    <div className="form-group">  
	  {label}  
      {children}  
    </div>  
);

const fields = [  
    [  
        {  
	     id: 'name',  
	     element: 'input',  
	     type: 'text',  
	     name: 'name',  
	     value: 'JhonDoe',  
	     minLength: 4,  
	     className: 'form-control',  
	     required: true,  
	     placeholder: 'Name',  
	     onChange: (event) => {  
	 	 console.log(`Name: ${event.target.value}`);  		  
	     },  
	},  
	{  
            element: 'input',  
	    type: 'email',  
	    name: 'email',  
	    className: 'form-control',  
	    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',  
	    required: true,  
	    placeholder: 'Write your email',  
	    onChange: (event) => {  
		console.log(`Email: ${event.target.value}`);  
	    },  
	},  
    ],  
];

ReactDOM.render(  
  <FormBuilder 
      fields={fields}
      fieldGroupContainer={fieldGroupContainer}
  />,  
  document.getElementById('root'),  
);
```

#### Results

```html
<form>
    <div class="form-group">
	<label>Name</label>
	<input id="name" element="input" type="text" name="name" minlength="4" class="form-control" required="" laceholder="Name" value="JhonDoe"/>
	<label>Email</label>
	<input element="input" type="email" name="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" required="" placeholder="Write your email" value=""/>
    </div>
    <input type="submit" value="Submit">
</form>
```

## Render field into custom container
```javascript
/**  
 * Render field into a custom html block. */
 const fieldContainer = ({ children, label, errorMessage }) => (  
    <div className={`input-group ${errorMessage ? 'error' : ''}`}>  
		  {label}  
          {children}  
          <div className="error-message">{errorMessage}</div>  
	</div>
);

ReactDOM.render(  
    <FormBuilder fields={fields} fieldContainer={fieldContainer}/>,  
  document.getElementById('root'),  
);
```
#### Results

```html
<form>
	<div class="form-group">
		<div class="input-group ">
			<label>Name</label>
			<input id="name" element="input" type="text" name="name" minlength="4" class="form-control" required="" placeholder="Name" value="JhonDoe"/>
			<div class="error-message"></div>
		</div>
	
		<div class="input-group ">
			<label>Email</label>
			<input element="input" type="email" name="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" required="" placeholder="Write your email" value=""/>
			<div class="error-message"></div>
		</div>
	</div>
	<input type="submit" value="Submit">
	</form>
```

# Other container to customize elements
##  Form container
```javascript
  
/**  
 * Render all fields into a custom html block. */
 const Container = ({ children }) => (  
    <div className="container-form">  
	  {children}  
    </div>  
);

ReactDOM.render(  
  <FormBuilder fields={fields} container={Container}/>,  
  document.getElementById('root'), 
)
```
#### Results

```html
<div class="container-form">
	<form>
		<label>Name</label>
		<input id="name" element="input" name="name" minlength="4" type="text" class="form-control" required="" placeholder="Name" value="JhonDoe">
		<input type="submit" value="Submit"/>
	</form>
	</div>
```
##  Group content container
```javascript
/**  
 * Render group into a custom html block. */
 const groupContainer = ({ children, title, content }) => (  
    <div className="group-container">  
		 <fieldset> 
			 <legend>{title}</legend>  
			 <p>{content}</p>  
			 {children}  
	     </fieldset>  
	 </div>
 );
 
 const fields = [
	{  
	    title: 'Custom title for container',  
	    content: 'Custom content for container',  
	    fields: [{...field1}, {...field2}, {...field3}],  
	},
];

ReactDOM.render(  
  <FormBuilder fields={fields} groupContainer={groupContainer}/>,  
  document.getElementById('root'), 
)
```
#### Results

```html
<form>
	<div class="group-container">
		<fieldset>
			<legend>Post status</legend>
			<p>Select an status</p>
			<input name="status" element="input" required="" type="radio" class="form-control" label="Private" value="private">
			<input name="status" element="input" type="radio" class="form-control" label="Public" value="public" checked=""/>
		</fieldset>
	</div>
	<input type="submit" value="Submit">
</form>
```

##  Field label
```javascript
/**  
 * Render label field into a custom html block. */
 const labelContainer = ({ children }) => (  
    <label className="label">  
	  {children}  
    </label>  
);

ReactDOM.render(  
  <FormBuilder fields={fields} labelContainer={labelContainer}/>,  
  document.getElementById('root'), 
)
```

##  Form error message container
```javascript
/**  
 * Render fields error message into a custom html block. */
 const formErrorContainer = ({ children }) => (  
    <div className="error">  
	  {children}  
    </div>  
);

ReactDOM.render(  
  <FormBuilder fields={fields} formErrorContainer={formErrorContainer}/>,  
  document.getElementById('root'), 
)
```
#### Results

```html
<div class="error">Invalid fields</div>
<form>
	...
</form>
```
