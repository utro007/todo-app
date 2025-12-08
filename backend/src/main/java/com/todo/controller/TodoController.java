package com.todo.controller;

import com.todo.model.Todo;
import com.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST kontroler izpostavlja API za upravljanje Todo nalog.
 * Prejema HTTP zahteve.
 */
@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend:3000"})
public class TodoController {

    @Autowired
    private TodoService todoService;

    /**
     * Vrne seznam vseh nalog.
     */
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        try {
            List<Todo> todos = todoService.getAllTodos();
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Vrne posamezno nalogo po ID.
     * Če naloga ne obstaja → vrne 404 Not Found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        try {
            Optional<Todo> todo = todoService.getTodoById(id);
            return todo.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Ustvari novo nalogo.
     * @Valid poskrbi za validacijo podatkov v modelu
     * ID mora biti null → generira ga baza avtomatsko.
     */
    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        try {
            todo.setId(null);
            Todo createdTodo = todoService.createTodo(todo);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Posodobi obstoječo nalogo.
     * Če naloga ne obstaja → vrne 404.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todoDetails) {
        try {
            Todo updatedTodo = todoService.updateTodo(id, todoDetails);
            if (updatedTodo != null) {
                return ResponseEntity.ok(updatedTodo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Izbriše nalogo po ID.
     * Če naloga ne obstaja → vrne 404.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            boolean deleted = todoService.deleteTodo(id);
            if (deleted) {
                return ResponseEntity.noContent().build(); // 204 No Content
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Vrne vse opravljene naloge.
     */
    @GetMapping("/completed")
    public ResponseEntity<List<Todo>> getCompletedTodos() {
        try {
            List<Todo> completedTodos = todoService.getCompletedTodos();
            return ResponseEntity.ok(completedTodos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Vrne vse neopravljene naloge.
     */
    @GetMapping("/incomplete")
    public ResponseEntity<List<Todo>> getIncompleteTodos() {
        try {
            List<Todo> incompleteTodos = todoService.getIncompleteTodos();
            return ResponseEntity.ok(incompleteTodos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Iskanje nalog po ključni besedi (v naslovu ali opisu).
     */
    @GetMapping("/search")
    public ResponseEntity<List<Todo>> searchTodos(@RequestParam String keyword) {
        try {
            List<Todo> foundTodos = todoService.searchTodos(keyword);
            return ResponseEntity.ok(foundTodos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Preklopi stanje naloge (opravljena ↔ neopravljena).
     * Če naloga ne obstaja → vrne 404.
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodoCompletion(@PathVariable Long id) {
        try {
            Todo toggledTodo = todoService.toggleTodoCompletion(id);
            if (toggledTodo != null) {
                return ResponseEntity.ok(toggledTodo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Vrne vse naloge z rokom za trenutni mesec in leto.
     * Uporablja se za koledarski prikaz.
     * @param year Leto
     * @param month Mesec
     */
    @GetMapping("/calendar")
    public ResponseEntity<List<Todo>> getTodosForCalendar(
            @RequestParam int year,
            @RequestParam int month) {
        try {
            // Validacija meseca
            if (month < 1 || month > 12) {
                return ResponseEntity.badRequest().build();
            }
            
            List<Todo> todos = todoService.getTodosByMonth(year, month);
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
