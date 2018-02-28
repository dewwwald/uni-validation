export { Validator } from './Validator';

export class RequiredValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get requiredConfig() { return this._requiredConfig; };
    set requiredConfig(value) { this._requiredConfig = value; }

    constructor(data, requiredConfig) {
        this.data = data;
        this.requiredConfig = requiredConfig;
    }

    doValidation() {
        return !this.data && this.requiredConfig.value ? {
            message: this.requiredConfig.message || 'Field is required.'
        } : null;
    }
}