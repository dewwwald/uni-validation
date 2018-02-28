export class ValidationResult {
    get unTouched() { return this._unTouched || true; }
    set unTouched(value) { this._unTouched = value; }

    get errors() { return this._errors || []; }
    set errors(value) { this._errors = value; } 

    get error() { this.errors.join(' '); }

    get isValid() { return this.errors.length <= 0; }

    get fieldname() { return this._fieldname; }
    set fieldname(value) { this._fieldname = value; }
}
