import { Validator } from './Validator';

export class EnumValue extends Validator {
    /**
     * { values: any[] }
     */
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
        return !this.config.values.includes(this.data) ? {
            message: this.config.message || 'Field does not match valid values.'
        } : null;
    }
}