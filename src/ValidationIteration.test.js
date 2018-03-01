const assert = require('assert');
const ValidationIteration = require('./ValidationIteration').ValidationIteration;

describe('ValidationIteration', () => {
    
    it('given no validators', function (done) {
        const validationIteration = new ValidationIteration([], 'dummy', (valRes) => {
            assert.equal(valRes.isValid, true, 'validationResponse.isValid Equals true');
            done();
        });
        validationIteration.doValidate();
    });

});
  