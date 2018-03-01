const assert = require('assert');
const RequiredValue = require('./RequiredValue').RequiredValue;

describe('RequiredValidator', () => {
    it('doValidation should return null', () => {
        const validator = new RequiredValue('somethings', {
            required: true
        });
        assert.equal(validator.doValidation(), null, 'should validate and return null');
    });

    it('doValidation should return error with ""', () => {
        const validator = new RequiredValue('', {
            required: true
        });
        const x = validator.doValidation();
        assert.equal(!!x && !!x.message, true);
    });

    it('doValidation should return error with undefined', () => {
        const validator = new RequiredValue(undefined, {
            required: true
        });
        const x = validator.doValidation();
        assert.equal(!!x && !!x.message, true);
    });

    it('doValidation should return error with null', () => {
        const validator = new RequiredValue(null, {
            required: true
        });
        const x = validator.doValidation();
        assert.equal(!!x && !!x.message, true);
    });

    it('doValidation should return null with 0', () => {
        const validator = new RequiredValue(0, {
            required: true
        });
        assert.equal(validator.doValidation(), null, 'should validate and return null');
    });

    it('doValidation should return null invalid value and required: false', () => {
        const validator = new RequiredValue(undefined, {
            required: false
        });
        assert.equal(validator.doValidation(), null, 'should validate and return null');
    });
});
