const assert = require('assert');
const EmailValue = require('./EmailValue').EmailValue;

const fieldname = 'email';
const validEmailList = [
    'test@foo.com'
];

describe('EmailValidator', () => {    
    validEmailList.forEach((validEmail) => {
        it('given a value inside enum list', () => {
            const validator = new EmailValue({ [fieldname]: validEmail }, { type: EmailValue }, fieldname);
            assert.equal(validator.doValidation(), null, 'Sould return null for valid emails');
        });
    });
});