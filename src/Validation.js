import { Observable } from 'rxjs/Observable';
import { ValidationIteration } from './ValidationIteration'
import { RequiredValue } from './Validators';
export class Validation {
    /**
     * @var { required: boolean, type?: {} }
     */
    get validationSchema() { return this._validationSchema || {}; };
    set validationSchema(value) { this._validationSchema = value; }

    /** 
     * @var Array<Observable<ValidationResults>>
     */
    get validationIterations() { return this._validationIterations || []; }
    set validationIterations(value) { this._validationIterations = value; }

    constructor(validationSchema = {}) {
        this.validationSchema = validationSchema;
    }  

    createRequiredValidator(data, reqValidationConfig) {
        const requiredConfig = (typeof reqValidationConfig === 'boolean'
            ? { required: reqValidationConfig, message: 'Field is required.' }
            : reqValidationConfig);
        return new RequiredValue(data, requiredConfig);
    }

    createValidators(dataMap, validationConfig, fieldname) {
        if (!validationConfig) return [];
        let validators = [];
        if (validationConfig.required) {
            const requiredValidator = this.createRequiredValidator(
                dataMap[fieldname], validationConfig.required, fieldname);
            validators = [...validators, requiredValidator];
        }
        if (validationConfig.type) {
            validators = [...validators, new validationConfig.type(dataMap, validationConfig, fieldname)];
        }
        return validators;
    }

    validate(dataMap) {
        const observable$ = new Observable(observer => {
            const keys = Object.keys(dataMap);
            keys.forEach(key => {
                const validationConfig = this.validationSchema[key];
                const validators = this.createValidators(dataMap, validationConfig, key);
                const _validationIteration = new ValidationIteration(validators, validationResult => {
                    observer.next(validationResult);
                });
                this.validationIterations = [...this.validationIterations, _validationIteration];
                _validationIteration.doValidate();
            });
            return () => {
                this.validationIterations.forEach(validationIteration => {
                    validationIteration.cleanup();
                });
                this.validationIterations = [];
            };
        });

        return observable$;
    }

}