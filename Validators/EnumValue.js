export { Validator } from './Validator';

export class RequiredValue extends Validator {
    /**
     * { values: any[] }
     */
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get requiredConfig() { return this._requiredConfig; };
    set requiredConfig(value) { this._requiredConfig = value; }

    constructor(dataList, requiredConfig, filename) {
        this.data = dataList[filename];
        this.requiredConfig = requiredConfig;
    }

    doValidation() {
        return !this.requiredConfig.values.includes(this.data) ? {
            message: this.requiredConfig.message || 'Field does not match valid values.'
        } : null;
    }
}