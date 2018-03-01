import { Validator } from './Validator';

export class DateValue extends Validator {
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
        const date = Date.parse(this.data);
        return isNaN(date) ? {
            message: this.config.message || 'Field must be a valid date'
        } : null;
    }
}