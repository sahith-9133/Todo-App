package com.example.todo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TodoRequest {

    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;

    private Boolean completed = false;
}
