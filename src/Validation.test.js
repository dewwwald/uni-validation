const assert = require('assert');
const Validation = require('./Validation').Validation;
const { AsyncValue, EmailValue } = require('./Validators');

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

describe('Validation', () => {
    
    it('data should be considered invalid', function (done) {
        const results = [];
        const obs$ = validation.validate(data);
        obs$.subscribe(validationResult => {
            results.push(validationResult);
            if (results.length >= 3) {
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

    it('name should be considered invalid', function (done) {
        const obs$ = validation.validate({ name: data.name });
        obs$.subscribe(validationResult => {
            assert.equal(validationResult.isValid, false, 'name is invalid');
            assert.equal(validationResult.errors.length, 1, 'has error message: ' + validationResult.error);
            done();
        });
    });

    it('delay should be considered valid after a time', function (done) {
        const obs$ = validation.validate({ delay: data.delay });
        let complete = false;
        const subscription = obs$.subscribe(validationResult => {
            assert.equal(validationResult.isValid, true);
            complete = true;
            done();
        });    

        let tShouldNot = setTimeout(() => {
            if (complete) {
                subscription.unsubscribe();
                done(new Error('The delayed code should not have run yet.'));
            }
            clearTimeout(tShouldNot);
        }, delayTime - 10);

        let tShouldHave = setTimeout(() => {
            if (!complete) {
                subscription.unsubscribe();
                done(new Error('The delayed code did not run.'));
            }
            clearTimeout(tShouldHave);
        }, delayTime);
    });    

});
  