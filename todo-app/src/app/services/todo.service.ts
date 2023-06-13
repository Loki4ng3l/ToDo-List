import { Injectable } from '@angular/core';
import { ITodo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://localhost:3000/todos';

  constructor() { }

  getTodos(): Promise<ITodo[]> {
    return fetch(this.baseUrl)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

  createTodo(title: string): Promise<ITodo> {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

  updateTodo(id: number, title: string, completed: boolean): Promise<ITodo> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, completed })
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }
}
