import { FormBuilder } from "@angular/forms";

export function createTodoListFormGroup(fb: FormBuilder) {
    return fb.group({
        Id: 0,
        TaskName: '',
        IsCompleted: false,
        IsEditing: false
      });
}

export function createNameInputFormGroup(fb: FormBuilder) {
  return fb.group({
    Name: ''
  })
}