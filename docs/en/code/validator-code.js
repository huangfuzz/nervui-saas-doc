//Usage-code
import Schema from 'async-validator';
const descriptor = {
  name: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  age: {
    type: 'number',
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 18) {
          reject('too young');  // reject with error message
        } else {
          resolve();
        }
      });
    },
  },
};
const validator = new Schema(descriptor);
validator.validate({ name: 'muji' }, (errors, fields) => {
  if (errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    return handleErrors(errors, fields);
  }
  // validation passed
});

// PROMISE USAGE
validator.validate({ name: 'muji', age: 16 }).then(() => {
  // validation passed or without error message
}).catch(({ errors, fields }) => {
  return handleErrors(errors, fields);
});



//rules-code-1
import Schema from 'async-validator';
const descriptor = {
  name(rule, value, callback, source, options) {
    const errors = [];
    if (!/^[a-z0-9]+$/.test(value)) {
      errors.push(new Error(
        util.format('%s must be lowercase alphanumeric characters', rule.field),
      ));
    }
    return errors;
  },
};
const validator = new Schema(descriptor);
validator.validate({ name: 'Firstname' }, (errors, fields) => {
  if (errors) {
    return handleErrors(errors, fields);
  }
  // validation passed
});

//rules-code-2
const descriptor = {
  email: [
    { type: 'string', required: true, pattern: Schema.pattern.email },
    { 
      validator(rule, value, callback, source, options) {
        const errors = [];
        // test if email address already exists in a database
        // and add a validation error to the errors array if it does
        return errors;
      },
    },
  ],
};


//rules-Deep Rules
const descriptor = {
  address: {
    type: 'object',
    required: true,
    fields: {
      street: { type: 'string', required: true },
      city: { type: 'string', required: true },
      zip: { type: 'string', required: true, len: 8, message: 'invalid zip' },
    },
  },
  name: { type: 'string', required: true },
};
const validator = new Schema(descriptor);
validator.validate({ address: {} }, (errors, fields) => {
  // errors for address.street, address.city, address.zip
});

//rules-Deep Rules-code-2
const descriptor = {
  address: {
    type: 'object',
    required: true,
    options: { first: true },
    fields: {
      street: { type: 'string', required: true },
      city: { type: 'string', required: true },
      zip: { type: 'string', required: true, len: 8, message: 'invalid zip' },
    },
  },
  name: { type: 'string', required: true },
};
const validator = new Schema(descriptor);

validator.validate({ address: {} })
  .catch(({ errors, fields }) => {
    // now only errors for street and name    
  });


//deep rules-parent rule-code
const descriptor = {
  roles: {
    type: 'array',
    required: true,
    len: 3,
    fields: {
      0: { type: 'string', required: true },
      1: { type: 'string', required: true },
      2: { type: 'string', required: true },
    },
  },
};

//transform-code-1
import Schema from 'async-validator';
const descriptor = {
  name: {
    type: 'string',
    required: true,
    pattern: /^[a-z]+$/,
    transform(value) {
      return value.trim();
    },
  },
};
const validator = new Schema(descriptor);
const source = { name: ' user  ' };
validator.validate(source)
  .then(() => assert.equal(source.name, 'user'));


//Messages-code-1
import Schema from 'async-validator';
const cn = {
  required: '%s 必填',
};
const descriptor = { name: { type: 'string', required: true } };
const validator = new Schema(descriptor);
// deep merge with defaultMessages
validator.messages(cn);
// ...




  