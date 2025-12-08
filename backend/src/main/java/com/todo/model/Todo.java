package com.todo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Entiteta, ki predstavlja posamezno "Todo" nalogo v podatkovni bazi
 * Razred je povezan s tabelo 'todos'
 */
@Entity
@Table(name = "todos")
public class Todo {

    /**
     * Primarni ključ (avtomatsko generiran s pomočjo AUTO_INCREMENT / SERIAL)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Naslov naloge je obvezen
     * @NotBlank zagotovi da ni prazen
     */
    @NotBlank(message = "Title is mandatory")
    @Column(nullable = false)
    private String title;

    /**
     * Opcijski opis naloge.
     * TEXT definicija omogoča shranjevanje daljših opisov.
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Status naloge: true = dokončana, false = aktivna
     */
    @Column(nullable = false)
    private Boolean completed = false;

    /**
     * Datum ustvarjanja (nastavi se samodejno ob prvem shranjevanju)
     */
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /**
     * Datum zadnje posodobitve (posodobi se ob vsaki spremembi entitete)
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Rok za dokončanje naloge (opcijsko)
     */
    @Column(name = "deadline")
    private LocalDateTime deadline;

    // Konstruktorji

    public Todo() {
    }

    public Todo(String title, String description) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


    /**
     * Klicano samodejno pred INSERT operacijo
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Klicano samodejno pred UPDATE operacijo.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }


    // Getterji in Setterji


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // CreatedAt ne spreminjaj
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
        this.updatedAt = LocalDateTime.now();
    }

    // Debug izpis za logiranje
    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", deadline=" + deadline +
                '}';
    }
}
