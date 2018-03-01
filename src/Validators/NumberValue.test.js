const assert = require('assert');
const NumberValue = require('./NumberValue').NumberValue;

const fieldname = 'number';
describe('NumberValidator', () => {
    it('doValidation should return null', () => {
        const validator = new NumberValue({
            [fieldname]: 123
        }, {
            type: NumberValue
        }, fieldname);
        assert.equal(validator.doValidation(), null);
    })
});