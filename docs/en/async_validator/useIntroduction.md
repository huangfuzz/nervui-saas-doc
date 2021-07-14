# async-validator

Validate form asynchronous. A variation of [https://github.com/freeformsystems/async-validate](https://github.com/freeformsystems/async-validate)  

<!-- ## Install
```
 npm i async-validator   
``` -->
## Usage
<br/>

Basic usage involves defining a descriptor, assigning it to a schema and passing the object to be validated and a callback function to the validate method of the schema:
@[code{2-38}](../code/validator-code.js)

## API

### Validate
```js
 function(source, [options], callback): Promise
```
- **source**: The object to validate (required).

- **options**: An object describing processing options for the validation (optional).

- **callback**: A callback function to invoke when validation completes (required).

The method will return a Promise object like:
- **then()**，validation passed
- **catch({ errors, fields })**，validation failed, errors is an array of all errors, fields is an object keyed by field name with an array of

### Options
<br/>

- **suppressWarning** : Boolean, whether to suppress internal warning about invalid value.

- **first**: Boolean, Invoke callback when the first validation rule generates an error, no more validation rules are processed. If your validation involves multiple asynchronous calls (for example, database queries) and you only need the first error use this option.

- **firstFields**: Boolean|String[], Invoke callback when the first validation rule of the specified field generates an error, no more validation rules of the same field are processed. true means all fields.

### Rules
<br/>

Rules may be functions that perform validation.
```js
 function(rule, value, callback, source, options)
```
- **rule**: The validation rule in the source descriptor that corresponds to the field name being validated. It is always assigned a field property with the name of the field being validated.

- **value**: The value of the source object property being validated.

- **callback**: A callback function to invoke once validation is complete. It expects to be passed an array of Error instances to indicate validation failure. If the check is synchronous, you can directly return a false or Error or Error Array.

- **source**: The source object that was passed to the validate method.

- **options**: Additional options.

- **options.messages**: The object containing validation error messages, will be deep merged with defaultMessages.

The options passed to validate or asyncValidate are passed on to the validation functions so that you may reference transient data (such as model references) in validation functions. However, some option names are reserved; if you use these properties of the options object they are overwritten. The reserved properties are messages, exception and error.

@[code{43-61}](../code/validator-code.js)

It is often useful to test against multiple validation rules for a single field, to do so make the rule an array of objects, for example:
@[code{64-76}](../code/validator-code.js)

#### Type
<br/>

Indicates the type of validator to use. Recognised type values are:

- **string**: Must be of type string. This is the default type.

- **number**: Must be of type number.

- **boolean**: Must be of type boolean.

- **method**: Must be of type function.

- **regexp**: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.

- **integer**: Must be of type number and an integer.

- **float**: Must be of type number and a floating point number.

- **array**: Must be an array as determined by Array.isArray.

- **object**: Must be of type object and not Array.isArray.

- **enum**: Value must exist in the enum.

- **date**: Value must be valid as determined by Date.

- **url**: Must be of type url.

- **hex**: Must be of type hex.

- **email**: Must be of type email.

- **any**: Can be any type.

#### Required
<br/>

The required rule property indicates that the field must exist on the source object being validated.

#### Pattern
<br/>

The pattern rule property indicates a regular expression that the value must match to pass validation.

#### Range
<br/>

A range is defined using the min and max properties. For string and array types comparison is performed against the length, for number types the number must not be less than min nor greater than max.

#### Length
<br/>

To validate an exact length of a field specify the len property. For string and array types comparison is performed on the length property, for the number type this property indicates an exact match for the number, ie, it may only be strictly equal to len.

<br/>

If the len property is combined with the min and max range properties, len takes precedence.

#### Enumerable
<br/>

>Since version 3.0.0 if you want to validate the values 0 or false inside enum types, you have to include them explicitly.
<br/>

To validate a value from a list of possible values use the enum type with a enum property listing the valid values for the field, for example:

```js
const descriptor = {
  role: { type: 'enum', enum: ['admin', 'user', 'guest'] },
};
```
#### Whitespace
<br/>

It is typical to treat required fields that only contain whitespace as errors. To add an additional test for a string that consists solely of whitespace add a whitespace property to a rule with a value of true. The rule must be a string type.
<br/>

You may wish to sanitize user input instead of testing for whitespace, see transform for an example that would allow you to strip whitespace.

#### Deep Rules
<br/>

If you need to validate deep object properties you may do so for validation rules that are of the object or array type by assigning nested rules to a fields property of the rule.
@[code{80-95}](../code/validator-code.js)
<br/>

Note that if you do not specify the required property on the parent rule it is perfectly valid for the field not to be declared on the source object and the deep validation rules will not be executed as there is nothing to validate against.
<br/>

Deep rule validation creates a schema for the nested rules so you can also specify the options passed to the schema.validate() method.
@[code{98-116}](../code/validator-code.js)
<br/>

The parent rule is also validated so if you have a set of rules such as:
@[code{120-131}](../code/validator-code.js)
<br/>

And supply a source object of { roles: ['admin', 'user'] } then two errors will be created. One for the array length mismatch and one for the missing required array entry at index 2.

#### defaultField
<br/>

The defaultField property can be used with the array or object type for validating all values of the container. It may be an object or array containing validation rules. For example:

```js
const descriptor = {
  urls: {
    type: 'array',
    required: true,
    defaultField: { type: 'url' },
  },
};
```
<br/>

Note that defaultField is expanded to fields, see [deep rules](#deep-rules).

#### Transform
<br/>

Sometimes it is necessary to transform a value before validation, possibly to coerce the value or to sanitize it in some way. To do this add a transform function to the validation rule. The property is transformed prior to validation and re-assigned to the source object to mutate the value of the property in place.

@[code{134-148}](../code/validator-code.js)

<br/>
Without the transform function validation would fail due to the pattern not matching as the input contains leading and trailing whitespace, but by adding the transform function validation passes and the field value is sanitized at the same time.

#### Messages
<br/>

Depending upon your application requirements, you may need i18n support or you may prefer different validation error messages.
<br/>

The easiest way to achieve this is to assign a message to a rule:

```js
{ name: { type: 'string', required: true, message: 'Name is required' } }
```
Message can be any type, such as jsx format.

```js
{ name: { type: 'string', required: true, message: '<b>Name is required</b>' } }
```
Message can also be a function, e.g. if you use vue-i18n:
 
```js
{ name: { type: 'string', required: true, message: () => this.$t( 'name is required' ) } }
```
Potentially you may require the same schema validation rules for different languages, in which case duplicating the schema rules for each language does not make sense.

<br/>
In this scenario you could just provide your own messages for the language and assign it to the schema:

@[code{152-160}](../code/validator-code.js)

If you are defining your own validation functions it is better practice to assign the message strings to a messages object and then access the messages via the options.messages property within the validation function.

#### validator
<br/>

You can custom validate function for specified field:

```js
const fields = {
  field: {
    validator(rule, value, callback) {
      return value === 'test';
    },
    message: 'Value is not equal to "test".',
  },

  field2: {
    validator(rule, value, callback) {
      return new Error(`${value} is not equal to 'test'.`);
    },
  },
 
  arrField: {
    validator(rule, value) {
      return [
        new Error('Message 1'),
        new Error('Message 2'),
      ];
    },
  },
};
```
## FAQ
### How to avoid warning
```js
import Schema from 'async-validator';
Schema.warning = function(){};
```
### How to check if it is true
<br/>

Use enum type passing true as option.
```js
{
  type: 'enum',
  enum: [true],
  message: '',
}
```
## Test Case

```
npm test
```

## Coverage

```
npm run coverage
```
Open coverage/ dir

## License
Everything is MIT.
