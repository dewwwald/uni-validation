import { Validator } from './Validator';
const validatorJs = require('validator');

export class EmailValue extends Validator {
    /**
     * { values: any[] }
     */
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get config() { return this._config; };
    set config(value) { this._config = value; }

    constructor(dataList, config, filename) {
        super();
        this.data = dataList[filename];
        this.config = config;
    }

    doValidation() {
        return !validatorJs.isEmail(this.data) ? {
            message: this.config.message || 'Field must contain a valid email address.'
        } : null;
    }
}