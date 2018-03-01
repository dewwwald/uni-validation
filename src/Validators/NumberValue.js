import { Validator } from './Validator';

export class NumberValue extends Validator {
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
        return typeof this.data !== 'number' && this.config.value ? {
            message: this.config.message || 'Field must be number only.'
        } : null;
    }
}