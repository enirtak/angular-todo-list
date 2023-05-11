import { FormGroup, Validators } from "@angular/forms";

export function setFormValidation(form: FormGroup) {
    form.controls['TaskName'].setValidators([
      Validators.required,
      Validators.maxLength(500)
    ]);

    form.updateValueAndValidity({emitEvent: false});
}