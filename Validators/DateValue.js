export { Validator } from './Validator';

export class RequiredValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get requiredConfig() { return this._requiredConfig; };
    set requiredConfig(value) { this._requiredConfig = value; }

    constructor(dataList, requiredConfig, filename) {
        this.data = dataList[filename];
        this.requiredConfig = requiredConfig;
    }

    doValidation() {
        const date = Date.parse(this.data);
        return isNaN(date) ? {
            message: this.requiredConfig.message || 'Field must be a valid date'
        } : null;
    }
}