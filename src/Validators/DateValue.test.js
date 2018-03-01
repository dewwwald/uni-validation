const assert = require('assert');
const DateValue = require('./DateValue').DateValue;

const fieldname = 'date'
describe('DateValueValidator', () => {
    const validDateList = [
        '12/12/2017',
        '12 Jan 2017'
    ];

    validDateList.forEach(validDate => {
        it('given valid date', () => {
            const validator = new DateValue(
                { [fieldname]: validDate },
                { type: DateValue },
                fieldname);
            const value = validator.doValidation();
            assert.equal(value, null, 'should be null');
        });
    })

    it('given invalid date', () => {
        const validator = new DateValue(
            { date: '121/12/2017' },
            { type: DateValue },
            fieldname);
        const value = validator.doValidation();
        assert.equal(!!(value && value.message), true, 'should be invalid');
    });
});