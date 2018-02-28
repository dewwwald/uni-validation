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
        return typeof this.data !== 'string' ? {
            message: this.requiredConfig.message 
                || 'Only string characters allowed for this field.'
        } : null;
    }
}