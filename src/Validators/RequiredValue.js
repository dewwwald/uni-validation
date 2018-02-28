import { Validator } from './Validator';

export class RequiredValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get config() { return this._config; };
    set config(value) { this._config = value; }

    constructor(data, config) {
        super();
        this.data = data;
        this.config = config;
    }

    doValidation() {
        return !this.data && this.config.value ? {
            message: this.config.message || 'Field is required.'
        } : null;
    }
}