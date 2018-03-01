import { Validator } from './Validator';
import { Observable } from 'rxjs/Observable';

export class AsyncValue extends Validator {
    get data() { return this._data; };
    set data(value) { this._data = value; }

    get config() { return this._config; };
    set config(value) { this._config = value; }

    configSchemaCheck() {
        if (typeof this.config.asyncFunction !== 'function') {
            throw new Error('must define an asyncFunction for type AsyncValue validator.');
        }
        if (typeof this.config.cleanup !== 'function') {
            throw new Error('must define an cleanup function for type AyncValue validator.');
        }
    }

    resultSchemaCheck(data) {
        if (data !== null && (typeof data !== 'object' || !data.message)) {
            throw new Error('Must return an object with message defined or null.');
        }
    }

    constructor(dataList, config, fieldname) {
        super();
        this.data = dataList[fieldname];
        this.config = config;
        this.configSchemaCheck();
    }

    doValidation() {
        return new Observable((observer) => {
            const next = observer.next;
            this.config.asyncFunction(this.data, (data) => {
                this.resultSchemaCheck(data);
                observer.next(data);
            });
            return this.config.cleanup;
        });
    }

    cleanup() {
        this.config.cleanup();
    }
}