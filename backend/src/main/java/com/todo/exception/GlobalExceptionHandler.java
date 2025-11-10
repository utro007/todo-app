package com.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Globalni upravljalec napak (Exception Handler) za celotno aplikacijo.
 *
 * @RestControllerAdvice poskrbi, da se vse izjemne situacije, ki se pojavijo
 * v kateremkoli kontrolerju, obravnavajo centralizirano na enem mestu.
 *
 * Cilji:
 *  - bolj jasni in enotni odgovori API-ja ob napakah
 *  - manj podvajanja try/catch blokov v kontrolerjih
 *  - boljša uporabniška izkušnja (predvsem pri validacijskih napakah)
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Obravnava napak validacije (@Valid) – npr. ko polje ne ustreza zahtevam.
     *
     * MethodArgumentNotValidException se sproži, kadar podatki v request body-ju
     * ne prestanejo validacije v modelu (npr. @NotBlank, @Size, ...).
     *
     * Vrne:
     * - HTTP 400 (Bad Request)
     * - Mapo napak v obliki: { polje: sporočilo_o_napaki }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();        // ime lastnosti v modelu
            String errorMessage = error.getDefaultMessage();           // sporočilo iz validacijske anotacije
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    /**
     * Obravnava vseh ostalih (nepričakovanih) napak v aplikaciji.
     *
     * Namen:
     * - preprečimo vračanje stack trace-a ali internih podatkov uporabniku
     * - zagotovimo enotno napako na API nivoju
     *
     * Vrne:
     * - HTTP 500 (Internal Server Error)
     * - kratko sporočilo o napaki
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred: " + ex.getMessage());
    }
}
