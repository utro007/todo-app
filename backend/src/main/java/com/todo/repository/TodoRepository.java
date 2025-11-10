package com.todo.repository;

import com.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Custom query to find all completed todos
    List<Todo> findByCompletedTrue();

    // Custom query to find all incomplete todos
    List<Todo> findByCompletedFalse();

    // Custom query to find todos by title containing keyword
    List<Todo> findByTitleContainingIgnoreCase(String keyword);

    // Native query example
    @Query(value = "SELECT * FROM todos WHERE LOWER(title) LIKE LOWER(CONCAT('%', :keyword, '%'))",
            nativeQuery = true)
    List<Todo> searchByTitle(String keyword);
}