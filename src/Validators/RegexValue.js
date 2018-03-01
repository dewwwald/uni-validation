import { Validator } from './Validator';

export class RegexValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get config() { return this._config; };
    set config(value) { this._config = value; }

    constructor(dataList, config, fieldname) {
        super();
        this.data = dataList[fieldname];
        this.config = config;
    }

    doValidation() {
        return !this.config.regexp.test(this.data) ? {
            message: this.config.message || 'Field has an invalid pattern.'
        } : null;
    }
}