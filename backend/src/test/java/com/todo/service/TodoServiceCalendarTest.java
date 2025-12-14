package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit testi za TodoService – koledarska funkcionalnost
 *
 * Testira metodo getTodosByMonth(), ki vrača naloge glede na mesec in leto.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("TodoService – Koledarska funkcionalnost")
class TodoServiceCalendarTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    /**
     * Negativen scenarij:
     * Če za določen mesec ni nalog, mora metoda vrniti prazen seznam.
     */
    @Test
    @DisplayName("Brez nalog v mesecu – vrne prazen seznam")
    void getTodosByMonth_noTodos_returnsEmptyList() {
        // Arrange
        int year = 2025;
        int month = 1;

        when(todoRepository.findByDeadlineYearAndMonth(year, month))
                .thenReturn(new ArrayList<>());

        // Act
        List<Todo> result = todoService.getTodosByMonth(year, month);

        // Assert
        assertNotNull(result, "Rezultat ne sme biti null");
        assertTrue(result.isEmpty(), "Rezultat mora biti prazen seznam");

        verify(todoRepository, times(1))
                .findByDeadlineYearAndMonth(year, month);
    }

    /**
     * Pozitiven scenarij:
     * Če obstaja več nalog v istem mesecu, jih mora metoda vse vrniti.
     */
    @Test
    @DisplayName("Več nalog v istem mesecu – vrne vse naloge")
    void getTodosByMonth_multipleTodos_returnsAllTodos() {
        // Arrange
        int year = 2025;
        int month = 3;

        List<Todo> todos = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Todo todo = new Todo("Naloga " + i, "Opis " + i);
            todo.setId((long) i);
            todo.setDeadline(LocalDateTime.of(2025, 3, i * 5, 10, 0));
            todos.add(todo);
        }

        when(todoRepository.findByDeadlineYearAndMonth(year, month))
                .thenReturn(todos);

        // Act
        List<Todo> result = todoService.getTodosByMonth(year, month);

        // Assert
        assertNotNull(result);
        assertEquals(5, result.size(), "Vrnjeno mora biti 5 nalog");

        for (int i = 0; i < result.size(); i++) {
            assertEquals("Naloga " + (i + 1), result.get(i).getTitle(),
                    "Naslov naloge mora biti pravilen");
        }

        verify(todoRepository, times(1))
                .findByDeadlineYearAndMonth(year, month);
    }
}
