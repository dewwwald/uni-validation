# Universal Validation

A universal validation library to check values in an object. Alpha release is simple validation object mapping to object key value. 

##### todo
- Implement length checking as part of validation objects. Either Validation base class or by chaining validators.
- Option to make Observable emit the entire list of ValidationResults instead of 1 by 1
- cancellable opperation, with the async nature it is possible to open 0 - 100 connections as the user is typing, it is best to offset the processing time and run then but also cancel the previous operation when the next one starts

## Install
```
npm i --save uni-validation
```

## Usage
```
const { AsyncValue, EmailValue, Validation } = require('uni-validation');

let asyncTimer;
const delayValue = 1000;
const delayTime = 250;
const validationSchema = {
    email: {
        required: true,
        type: EmailValue
    },
    name: {
        required: true
    },
    delay: {
        type: AsyncValue,
        asyncFunction: (data, next) => {
            asyncTimer = setTimeout(() => {
                if (data === delayValue) {
                    next(null);
                } else {
                    next({
                        message: 'Validation failed, the data was not the delayValue'
                    });
                }
            }, delayTime);
        },
        cleanup: () => {
            clearTimeout(asyncTimer);
        }
    }
};

const data = {
    email: 'aaxbzsgher.developer@gmail.com',
    name: '',
    delay: delayValue
};

const validation = new Validation(validationSchema);
const results = [];
const obs$ = validation.validate(data);
obs$.subscribe(validationResult => {
    console.log('Validation result for ' + validationResult.fieldname);
    console.log('validation is valid ' + validationResult.isValid);
    console.log('errors ' + validationResult.errors);
});
```