package com.michel.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.michel.crudspring.dto.CursosDTO;
import com.michel.crudspring.service.CursoService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated //para validar o Long id @Positive por exemplo
@RestController
@RequestMapping("/api/cursos")
public class CursosController {

	
	private final CursoService cursoService;

	public CursosController(CursoService cursoService) {
		this.cursoService = cursoService;
	}

	@GetMapping
	public List<CursosDTO> list() {
		return cursoService.list();
	}

	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<CursosDTO> create(@RequestBody @Valid CursosDTO cursosDTO) {
		return ResponseEntity.status(HttpStatus.CREATED) // retorna status 201
				.body(cursoService.create(cursosDTO));// inclui no retorno os dados da requisicao
	}


	@GetMapping("/{id}")
	public CursosDTO findaById(@PathVariable @NotNull @Positive Long id) {
		return cursoService.findById(id);
				}

	@PutMapping("/{id}")
	public CursosDTO update(@PathVariable @NotNull @Positive Long id, 
			@RequestBody @Valid CursosDTO cursoDTO) {

		return cursoService.update(id, cursoDTO);
			}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id) {
		cursoService.delete(id);

	}
}
