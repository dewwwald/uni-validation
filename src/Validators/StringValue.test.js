const assert = require('assert');
const StringValue = require('./StringValue').StringValue;

const fieldname = 'stringValidation';
describe('StringValidator', () => {
    it('doValidation should return null', () => {
        const validator = new StringValue({
            [fieldname]: 'something stringy'
        }, {
            type: StringValue
        }, fieldname);
        assert.equal(validator.doValidation(), null);
    })
});