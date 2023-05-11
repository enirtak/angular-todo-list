import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoList } from './TodoList';
import { createNameInputFormGroup, createTodoListFormGroup } from './todo-list-formgroup.create';
import { setFormValidation } from './todo-list-formgroup.handler';
import { formValueToDTO } from './todo-list-formgroup.patchvalue';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoListFormGroup!: FormGroup;
  nameInputFormGroup!: FormGroup;

  todoList: Array<TodoList> = [];
  selectedTask?: TodoList;

  showInputNameField: boolean = false;
  showTodoListForm: boolean = false;

  nameInput: string = '';

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.todoListFormGroup) this.todoListFormGroup = createTodoListFormGroup(this.fb);
    if (!this.nameInputFormGroup) this.nameInputFormGroup = createNameInputFormGroup(this.fb);
    setFormValidation(this.todoListFormGroup);

    this.getTodoList();
    this.getUserName();
  }

  getTodoList() {
    this.todoList = this.getLocalStorageValue("list");
  }

  getUserName() {
    this.nameInput = this.getLocalStorageValue("todo-name");
    if (this.nameInput) 
      this.showTodoListForm = true;
    else
      this.onShowInputNameField();
  }

  onShowInputNameField(){
    this.showInputNameField = !this.showInputNameField;
  }

  onInputName() {
    this.onShowInputNameField();
    
    this.nameInput = this.nameInputFormGroup.controls['Name'].value;
    if (!this.nameInput) this.nameInput = "User";

    this.nameInputFormGroup.patchValue({ name: this.nameInput });
    this.showTodoListForm = !this.showTodoListForm;

    localStorage.setItem("todo-name", JSON.stringify(this.nameInput));
  }

  saveToLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }

  onAddTask() {
    let values = formValueToDTO(this.todoListFormGroup.value);

    if (this.selectedTask) {
      this.todoList[this.selectedTask.id].taskName = values.taskName;
      this.todoList[this.selectedTask.id].isEditing = false;
      this.todoList[this.selectedTask.id].isCompleted = false;
    } else {
      this.todoList.push(values);
    }

    this.saveToLocalStorage();
    this.todoListFormGroup.reset();
    this.selectedTask = undefined;
  }

  onEditTask(id: number) {
    this.todoList[id].id = id;
    this.todoList[id].isEditing = true;
    this.selectedTask = this.todoList[id];

    this.todoListFormGroup.patchValue({TaskName: this.selectedTask.taskName});
    this.saveToLocalStorage();
  }

  onDeleteTask(id: number) {
    this.todoList.splice(id, 1);
    this.saveToLocalStorage();
  }

  onCheckTask(id: number) {
    this.todoList[id].isCompleted = !this.todoList[id].isCompleted;
    this.saveToLocalStorage();
  }

  onResetList() {
    this.todoList = [];
    this.saveToLocalStorage();
  }

  getLocalStorageValue(key: string) {
    let value = localStorage.getItem(key);
    return (value && value !== null && typeof value !== "undefined") ? JSON.parse(value) : undefined;
  }
}
