package com.michel.crudspring.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.crudspring.enums.Category;
import com.michel.crudspring.enums.validation.ValueOfEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CursosDTO(
		@JsonProperty("_id") Long id, 
		@NotBlank @NotNull 	@Length(min = 3, max = 100) String name, 
		@NotNull @Length(max = 100)
		//@ValueOfEnum(enumClass = Category.class) 
		String category,
		List<AulaDTO> aulas) {

}
