package com.todo.repository;

import com.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository omogoča dostop do podatkovne baze
 * Razširja JpaRepository, ki vsebuje standardne CRUD metode (findAll, save, deleteById)
 * Spring Data JPA samodejno generira poizvedbe na podlagi imen metod 
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    /**
     * Vrne vse naloge, ki so opravljene
     * SQL: SELECT * FROM todos WHERE completed = true
     */
    List<Todo> findByCompletedTrue();

    /**
     * Vrne vse naloge, ki so aktivne (completed = false)
     */
    List<Todo> findByCompletedFalse();

    /**
     * Iskanje nalog po naslovu (case-insensitive)
     * Uporablja LIKE poizvedbo: WHERE LOWER(title) LIKE LOWER('%keyword%')
     */
    List<Todo> findByTitleContainingIgnoreCase(String keyword);

    /**
     * Alternativno ročno definirana SQL poizvedba (nativeQuery)
     */
    @Query(
            value = "SELECT * FROM todos WHERE LOWER(title) LIKE LOWER(CONCAT('%', :keyword, '%'))",
            nativeQuery = true
    )
    List<Todo> searchByTitle(String keyword);

    /**
     * Vrne vse naloge z rokom v določenem mesecu in letu za prikaz v koledaru
     */
    @Query(
            value = "SELECT * FROM todos WHERE deadline IS NOT NULL " +
                    "AND YEAR(deadline) = :year AND MONTH(deadline) = :month",
            nativeQuery = true
    )
    List<Todo> findByDeadlineYearAndMonth(@Param("year") int year, @Param("month") int month);

    /**
     * Vrne vse naloge ustvarjene v določenem časovnem obdobju
     */
    List<Todo> findByCreatedAtBetween(LocalDateTime from, LocalDateTime to);

}
