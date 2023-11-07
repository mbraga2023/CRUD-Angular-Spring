package com.michel.crudspring.dto;

import java.util.List;

public record CursoPageDTO(List<CursosDTO> cursos, long totalElements, int totalPages) {
	
}