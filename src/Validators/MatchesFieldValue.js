import { Validator } from './Validator';

export class MatchesFieldValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get config() { return this._config; };
    set config(value) { this._config = value; }

    constructor(dataList, config, filename) {
        super();
        this.data = dataList[filename];
        this.dataMatch = dataList[config.fieldname];
        this.config = config;
    }

    doValidation() {
        return this.data === this.dataMatch ? {
            message: this.config.message || 'Field must be number only.'
        } : null;
    }
}