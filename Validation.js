import { Observable } from 'rxjs/Observable';
import { ValidationIteration } from './ValidationIteration'
import { RequiredValue } from 'Validators';
export class Validation {
    /**
     * @var { required: boolean, type?: {} }
     */
    get validationSchema() { return {}; };
    set validationSchema(value) { this._validationSchema = value; }

    /** 
     * @var Array<Observable<ValidationResults>>
     */
    get validationIterations() { return this._validationIterations; }
    set validationIterations(value) { this._validationIterations = value; }

    constructor(validationSchema = {}) {
        this.validationSchema = validationSchema;
    }  

    createRequiredValidator(data, reqValidationConfig) {
        const requiredConfig = (typeof reqValidationConfig === 'boolean'
            ? { value: reqValidationConfig, message: 'Field is required.' }
            : reqValidationConfig);
        return new RequiredValue(data, requiredConfig);
    }

    createValidators(dataList, validationConfig, fieldname) {
        let validators = [];
        if (validationConfig.required) {
            const requiredValidator = this.createRequiredValidator(
                dataList[fieldname], validationConfig.required, fieldname);
            validators = [...validators, requiredValidator];
        }
        if (validationConfig.type) {

        } else if (this.validationConfig.async 
            && this.validationConfig.async.callback 
            && this.validationConfig.async.cleanup) {

        } else if (validationConfig.regexp) {
            const validator = validationConfig.regexp
        }
        return validators;
    }

    validate(dataList) {
        const observable$ = new Observable(observer => {
            const keys = Object.keys(this.validationSchema);
            keys.forEach(key => {
                const validationConfig = this.validationSchema[key];
                const validators = this.createValidators(dataList, validationConfig, key);
                const _validationIteration = new ValidationIteration(validators, validationResult => {
                    observer.next(validationResult);
                });
                this.validationIterations = [...this.validationIterations, _validationIteration];
                _validationIteration.doValidate();
            })
        });

        observable$.finally(() => {
            this.validationIterations.forEach(validationIteration => {
                validationIteration.cleanup();
            });
            this.validationIterations = [];
        });

        return observable$;
    }

}