const assert = require('assert');
const MatchesFieldValue = require('./MatchesFieldValue').MatchesFieldValue;

const fieldname = 'matchpass';
const matchToFieldname = 'pass';
describe('MatchesFieldValidator', () => {
    it('doValidation should return null', () => {
        const validator = new MatchesFieldValue({
            [fieldname]: 'Apple',
            [matchToFieldname]: 'Apple'
        }, {
            type: MatchesFieldValue,
            fieldname: matchToFieldname
        }, fieldname);
        assert.equal(validator.doValidation(), null, 'Sould validate as match');
    });

    it('doValidation should return null', () => {
        const validator = new MatchesFieldValue({
            [fieldname]: 'Apple',
            [matchToFieldname]: 'Apples'
        }, {
            type: MatchesFieldValue,
            fieldname: matchToFieldname
        }, fieldname);
        const x = validator.doValidation();
        assert.equal(!!x && !!x.message, true, 'Sould invalidate as mismatch');
    });
});