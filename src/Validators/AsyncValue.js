import { Validator } from './Validator';
import { Observable } from 'rxjs/Observable';

export class AsyncValue extends Validator {
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
        return new Observable((observer) => {
            const next = observer.next;
            this.config.asyncFunction(this.data, (data) => {
                observer.next(data);
            });
            return this.config.cleanup;
        });
    }

    cleanup() {
        this.config.cleanup();
    }
}