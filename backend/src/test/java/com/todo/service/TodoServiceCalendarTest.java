package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
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
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

/**
 * Unit testi za TodoService - funkcionalnost koledarja
 * 
 * Ta razred testira metodo getTodosByMonth(), ki vrača vse naloge z rokom
 * za določen mesec in leto. Testi pokrivajo pozitivne in negativne scenarije.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("TodoService - Koledarska funkcionalnost")
class TodoServiceCalendarTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    /**
     * Metoda, ki se izvede pred vsakim testom.
     * Inicializira novo instanco TodoService.
     */
    @BeforeEach
    void setUp() {
        todoService = new TodoService();
        // Nastavimo repository preko refleksije, ker TodoService uporablja @Autowired
        try {
            java.lang.reflect.Field field = TodoService.class.getDeclaredField("todoRepository");
            field.setAccessible(true);
            field.set(todoService, todoRepository);
        } catch (Exception e) {
            fail("Napaka pri nastavitvi mock repozitorija: " + e.getMessage());
        }
    }

    /**
     * Test za primer, ko ni nalog za določen mesec.
     * Preverja, da metoda pravilno vrača prazen seznam.
     */
    @Test
    @DisplayName("Pridobivanje nalog za mesec brez nalog - vrača prazen seznam")
    void testGetTodosByMonth_NoTodos_ReturnsEmptyList() {
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
        assertEquals(0, result.size(), "Velikost seznama mora biti 0");
        
        verify(todoRepository, times(1)).findByDeadlineYearAndMonth(year, month);
    }

    /**
     * Test za primer z več nalogami v istem mesecu.
     * Preverja, da metoda pravilno vrača vse naloge.
     */
    @Test
    @DisplayName("Pridobivanje več nalog za isti mesec")
    void testGetTodosByMonth_MultipleTodos_ReturnsAllTodos() {
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
        assertEquals(5, result.size(), "Mora vrniti 5 nalog");
        for (int i = 0; i < 5; i++) {
            assertEquals("Naloga " + (i + 1), result.get(i).getTitle(), 
                "Naloga " + (i + 1) + " mora imeti pravilen naslov");
        }
    }
}

