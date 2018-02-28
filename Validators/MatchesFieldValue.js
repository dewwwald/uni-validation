export { Validator } from './Validator';

export class MatchesFieldValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get requiredConfig() { return this._requiredConfig; };
    set requiredConfig(value) { this._requiredConfig = value; }

    constructor(dataList, requiredConfig, filename) {
        this.data = dataList[filename];
        this.dataMatch = dataList[requiredConfig.fieldname];
        this.requiredConfig = requiredConfig;
    }

    doValidation() {
        return this.data === this.dataMatch ? {
            message: this.requiredConfig.message || 'Field must be number only.'
        } : null;
    }
}