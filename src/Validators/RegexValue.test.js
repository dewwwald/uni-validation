const assert = require('assert');
const RegexValue = require('./RegexValue').RegexValue;

const fieldname = 'regex';
describe('RegExpValidator', () => { 
    it('doValidation should return null', () => {
        const validator = new RegexValue({
            [fieldname]: 'a'
        }, {
            type: RegexValue,
            regexp: /[a-c]/
        }, fieldname);
        assert.equal(validator.doValidation(), null);
    })
});