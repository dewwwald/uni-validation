const assert = require('assert');
const Validator = require('./Validator').Validator;


describe('Validator', () => {
    const validator = new Validator();

    it('doValidation should return null', () => {
        assert.equal(validator.doValidation(), null);
    })
});