import { TodoList } from "../todo-list/TodoList";

export function formValueToDTO(formvalue: any) : TodoList {
    return {
        id: formvalue.id,
        taskName: formvalue.TaskName,
        isCompleted: formvalue.IsCompleted,
        isEditing: formvalue.IsEditing
    }
}