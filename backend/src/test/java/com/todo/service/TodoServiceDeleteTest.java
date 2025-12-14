package com.todo.service;

import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit testi za TodoService - funkcionalnost brisanja nalog
 *
 * Testira metodo deleteTodo(), ki briše nalogo glede na ID
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("TodoService - Brisanje nalog")
class TodoServiceDeleteTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        todoService = new TodoService();
        try {
            java.lang.reflect.Field field = TodoService.class.getDeclaredField("todoRepository");
            field.setAccessible(true);
            field.set(todoService, todoRepository);
        } catch (Exception e) {
            fail("Napaka pri nastavitvi mock repozitorija: " + e.getMessage());
        }
    }

    /**
     * Pozitivni test:
     * Naloga obstaja → metoda mora vrniti true in poklicati deleteById().
     */
    @Test
    @DisplayName("Brisanje obstoječe naloge - uspešno brisanje")
    void testDeleteTodo_WhenTodoExists_ReturnsTrue() {
        // Arrange
        Long todoId = 1L;
        when(todoRepository.existsById(todoId)).thenReturn(true);

        // Act
        boolean result = todoService.deleteTodo(todoId);

        // Assert
        assertTrue(result, "Metoda mora vrniti true, če naloga obstaja");
        verify(todoRepository, times(1)).deleteById(todoId);
    }

    /**
     * Negativni test:
     * Naloga ne obstaja → metoda mora vrniti false in NE sme brisati.
     */
    @Test
    @DisplayName("Brisanje neobstoječe naloge - brisanje ni izvedeno")
    void testDeleteTodo_WhenTodoDoesNotExist_ReturnsFalse() {
        // Arrange
        Long todoId = 99L;
        when(todoRepository.existsById(todoId)).thenReturn(false);

        // Act
        boolean result = todoService.deleteTodo(todoId);

        // Assert
        assertFalse(result, "Metoda mora vrniti false, če naloga ne obstaja");
        verify(todoRepository, never()).deleteById(anyLong());
    }
}
