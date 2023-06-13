import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().then((todos) => {
      this.todos = todos;
    });
  }

  addTodo(title: string) {
    const trim = title.trim();
    if (trim.length == 0) {
      alert('Debes ingresar un titulo')
    }else{
      this.todoService.createTodo(title).then((newTodo) => {
        this.todos.push(newTodo);
      });
    }

  }

  updateTodo(id: number, title: string, completed: boolean) {
    this.todoService.updateTodo(id, title, completed).then((updatedTodo) => {
      const index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index] = updatedTodo;
    });
  }
}
