const assert = require('assert');
const Validation = require('./Validation').Validation;
const { AsyncValue, EmailValue } = require('./Validators');

const delayTime = 250;
const validationSchema = {
    email: {
        required: true,
        type: EmailValue
    },
    name: {
        required: {
            required: true,
            message: 'custom'
        }
    }
};

const data = {
    email: 'aaxbzsgher.developer@gmail.com',
    name: '',
};

const validation = new Validation(validationSchema);

describe('ValidationResults', () => {

    it('should contain fieldname of email and name respectively', function (done) {
        const obs$ = validation.validate(data);
        let counter = 0;
        obs$.subscribe(validationResult => {
            console.log(validationResult);
            assert.equal(['email', 'name'].includes(validationResult.fieldname), true);
            counter++;
            if (counter === 2) {
                done();
            }
        });
    });

    it('should contain message "custom"', function (done) {
        const obs$ = validation.validate({ name: data.name });
        obs$.subscribe(validationResult => {
            assert.equal(validationResult.errors[0], 'custom');
            done();
        });
    });
});
