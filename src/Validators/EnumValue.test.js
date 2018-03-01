const assert = require('assert');
const EnumValue = require('./EnumValue').EnumValue;

const fieldname = 'foodie';
describe('EnumValidator', () => {
    
    it('doValidation should return null', () => {
        const validator = new EnumValue({ [fieldname]: 'Apple' }, {
            type: EnumValue,
            values: ['Apple', 'Pie']
        }, fieldname);
        assert.equal(validator.doValidation(), null);
    });

    it('doValidation should return error', () => {
        const validator = new EnumValue({ [fieldname]: 'Rocks' }, {
            type: EnumValue,
            values: ['Apple', 'Pie']
        }, fieldname);
        const x = validator.doValidation();
        assert.equal(!!x && !!x.message, true);
    })
});