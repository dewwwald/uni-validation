import { ValidationResult } from './ValidationResult';
import { Observable } from 'rxjs/Observable';

export class ValidationIteration {
    /**
     * Validator 
     */
    get validators() { return this._validators; }
    set validators(value) { this._validators = value; }

    get counter() { return this._counter || 0; }
    set counter(value) { this._counter = value; }

    constructor(validators, callback) {
        this.validators = validators;
        this.callback = callback;
        this.validationResult = new ValidationResult();
    }

    handler(response) {
        if (response) {
            this.validationResult.errors = [
                ...this.validationResult.errors,
                response.message
            ];
        }
        this.counter = this.counter + 1;
        if (this.validators.length === this.counter) {
            this.callback(this.validationResult);
        }
    }

    doValidate() {
        if (this.validators.length === 0) {
            this.callback(this.validationResult);
        }
        this.validators.forEach(validator => { 
            const value = validator.doValidation();
            if (value && value.constructor.name === 'Promise') {
                value.then(this.handler.bind(this));
            } else if (value && value.constructor.name === 'Observable') {
                value.subscribe(this.handler.bind(this));
            } else {
                this.handler(value);
            }
        });

    }

    cleanup() {
        this.validators.forEach(validator => { 
            validator.cleanup();
        });
    }
}
