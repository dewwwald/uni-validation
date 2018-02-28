import { Validator } from './Validator';

export class StringValue extends Validator {
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
        return typeof this.data !== 'string' ? {
            message: this.config.message 
                || 'Only string characters allowed for this field.'
        } : null;
    }
}