const assert = require('assert');
const AsyncValue = require('./AsyncValue').AsyncValue;
const fieldname = 'name';
describe('AsyncValidator', () => {
    const validator = new AsyncValue(
        'yella',
        { 
            type: AsyncValue,
            asyncFunction: (data, next) => {
                setTimeout(() => {
                    next(null);
                }, 100);
            },
            cleanup: () => {}
        },
        fieldname);

    it('constructing an Async Validator with no asyncFunctin or cleanup on config', () => {
        try {
            const failValidator = new AsyncValue(
                'yella',
                { type: AsyncValue },
                'name');
        } catch (e) {
            assert.equal(e.constructor.name, 'Error');
        }
    });

    it('doValidation called with null next should', function (done) {
        const observable$ = validator.doValidation()
        assert.equal(observable$.constructor.name, 'Observable', 'return Observable');
        
        observable$.subscribe((response) => {
            assert.equal(response, null, 'result in null');
            done();
        })
    });

});