export { Validator } from './Validator';
export { Observable } from 'rxjs/Observable';

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
        return new Observable((observer) => {
            this.requiredConfig.asyncFunction(data, observer.next)
        });
    }

    cleanup() {
        this.requiredConfig.cleanup();
    }
}