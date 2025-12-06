package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service (poslovna logika) sloj.
 *
 * Ta razred predstavlja vmesno plast med kontrolerjem in repozitorijem.
 * V njem izvajamo:
 *  - poslovna pravila,
 *  - validacije na nivoju aplikacije,
 *  - obdelavo podatkov pred shranjevanjem,
 *  - odločanje o rezultatih, ki jih vrnemo kontrolerju.
 *
 * Controller NE dostopa neposredno do baze → vedno uporablja ta Service sloj.
 */
@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    /**
     * Vrne vse shranjene naloge.
     */
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    /**
     * Vrne nalogo glede na ID.
     * Uporablja Optional, ker naloga morda ne obstaja.
     */
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    /**
     * Ustvari novo nalogo in jo shrani v bazo.
     */
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    /**
     * Posodobi obstoječo nalogo.
     * Če naloga obstaja → posodobimo polja in shranimo.
     * Če ne obstaja → vrnemo null (Controller bo to prevedel v 404).
     */
    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();

            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setDescription(todoDetails.getDescription());
            existingTodo.setCompleted(todoDetails.getCompleted());
            existingTodo.setDeadline(todoDetails.getDeadline());

            return todoRepository.save(existingTodo);
        }

        return null;
    }

    /**
     * Izbriše nalogo po ID.
     * Vrne true, če je bila naloga uspešno izbrisana.
     * Vrne false, če naloga ne obstaja.
     */
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Vrne vse dokončane naloge.
     */
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompletedTrue();
    }

    /**
     * Vrne vse aktivne (nedokončane) naloge.
     */
    public List<Todo> getIncompleteTodos() {
        return todoRepository.findByCompletedFalse();
    }

    /**
     * Iskanje nalog po naslovu (ignorira velikost črk).
     */
    public List<Todo> searchTodos(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }

    /**
     * Preklopi status naloge (completed ↔ not completed).
     * Če naloga obstaja → spremeni status in shrani.
     * Če ne → vrne null.
     */
    public Todo toggleTodoCompletion(Long id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setCompleted(!todo.getCompleted()); // Toggle status
            return todoRepository.save(todo);
        }

        return null;
    }

    /**
     * Vrne vse naloge z rokom za določen mesec in leto.
     * Uporablja se za koledarski prikaz.
     */
    public List<Todo> getTodosByMonth(int year, int month) {
        return todoRepository.findByDeadlineYearAndMonth(year, month);
    }
}
