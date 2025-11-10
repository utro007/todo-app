package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Get todo by ID
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Create new todo
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Update existing todo
    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();

            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setDescription(todoDetails.getDescription());
            existingTodo.setCompleted(todoDetails.getCompleted());

            return todoRepository.save(existingTodo);
        }

        return null;
    }

    // Delete todo
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get completed todos
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompletedTrue();
    }

    // Get incomplete todos
    public List<Todo> getIncompleteTodos() {
        return todoRepository.findByCompletedFalse();
    }

    // Search todos by title
    public List<Todo> searchTodos(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }

    // Toggle todo completion status
    public Todo toggleTodoCompletion(Long id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setCompleted(!todo.getCompleted());
            return todoRepository.save(todo);
        }

        return null;
    }
}