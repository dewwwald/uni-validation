const assert = require('assert');
const Validation = require('./Validation').Validation;
const { AsyncValue, EmailValue } = require('./Validators');

let asyncTimer;
const delayValue = 1000;
const validationSchema = {
    email: {
        required: true,
        type: EmailValue
    },
    name: {
        required: true
    },
    // delay: {
    //     type: AsyncValue,
    //     asyncFunction: (data, next) => {
    //         asyncTimer = setTimeout(() => {
    //             console.log(data);
    //             if (data === delayValue) {
    //                 next(null);
    //             } else {
    //                 next({
    //                     message: 'Validation failed, the data was not the delayValue'
    //                 });
    //             }
    //         }, 500);
    //     },
    //     cleanup: () => {
    //         clearTimeout(asyncTimer);
    //     }
    // }
};

const data = {
    email: 'aaxbzsgher.developer@gmail.com',
    name: '',
    delay: delayValue
};

const validation = new Validation(validationSchema);

describe('Validation', () => {
    
    it('data should be considered invalid', function (done) {
        const results = [];
        const obs$ = validation.validate(data);
        obs$.subscribe(validationResult => {
            results.push(validationResult);
            if (results.length >= 2) {
                assert.equal(results.reduce((pre, result) => {
                    return pre && result.isValid;
                }, true), false);
                done();
            }
        });
    });

    it('email should be considered valid', function (done) {
        const obs$ = validation.validate({ email: data.email });
        obs$.subscribe(validationResult => {
            assert.equal(validationResult.isValid, true);
            done();
        });
    });
});
  