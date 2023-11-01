package com.michel.crudspring.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.michel.crudspring.dto.AulaDTO;
import com.michel.crudspring.dto.CursosDTO;
import com.michel.crudspring.enums.Category;
import com.michel.crudspring.model.CursosModel;

@Component
public class CursoMapper {
	
	public CursosDTO toDTO(CursosModel curso) {
		if (curso == null) {
			return null;
		}
		List<AulaDTO> aulas = curso.getAulas()
				.stream()
				.map(aula -> new AulaDTO(aula.getId(), aula.getName(), aula.getYoutubeUrl()))
				.collect(Collectors.toList());
		return new CursosDTO(curso.getId(),
				curso.getName(),
				curso.getCategory().getValue(),
				aulas);
	}
	
	public CursosModel toEntity(CursosDTO cursoDTO) {
		if (cursoDTO == null) {
			return null;
		}
		CursosModel curso = new CursosModel();
		if (cursoDTO.id() != null) {
			curso.setId(cursoDTO.id());
		}
		curso.setName(cursoDTO.name());
		curso.setCategory(convertCategoryValue(cursoDTO.category()));

		return curso;
		//builder patter
	}
	
	public Category convertCategoryValue (String value) {
		if (value == null) {
			return null;
		}
		//expressão Switch
		return switch(value) {
		case "Front-end" -> Category.FRONTEND;
		case "Back-end" -> Category.BACKEND;
		default -> throw new IllegalArgumentException ("Categoria inválida: " + value);
		
		};
	}
}
