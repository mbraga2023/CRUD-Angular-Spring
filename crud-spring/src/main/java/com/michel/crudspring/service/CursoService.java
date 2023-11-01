package com.michel.crudspring.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import com.michel.crudspring.dto.CursosDTO;
import com.michel.crudspring.dto.mapper.CursoMapper;
import com.michel.crudspring.exception.RecordNotFoundException;
import com.michel.crudspring.repository.CursosRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CursoService {
	private final CursosRepository cursosRepo;
	private final CursoMapper cursoMapper;
	
	public CursoService(CursosRepository cursosRepo, CursoMapper cursoMapper) {
		this.cursosRepo = cursosRepo;
		this.cursoMapper = cursoMapper;
	}
	
	public List<CursosDTO> list() {
		return cursosRepo.findAll().stream()
				.map(cursoMapper::toDTO)
				.toList();
}
	
	public CursosDTO findById(@NotNull @Positive Long id) {
		return cursosRepo.findById(id).map(cursoMapper::toDTO)
				.orElseThrow(() -> new RecordNotFoundException(id));
				
	}
	
	public CursosDTO create(@Valid @NotNull CursosDTO curso) {
		return cursoMapper.toDTO(cursosRepo.save(cursoMapper.toEntity(curso)));
	}
	
	public CursosDTO update(@NotNull @Positive Long id, 
			@Valid @NotNull CursosDTO cursoDTO) {
		return cursosRepo.findById(id)
				.map(recordFound -> {// se houver o registro
			recordFound.setName(cursoDTO.name());
			recordFound.setCategory(this.cursoMapper.convertCategoryValue(cursoDTO.category()));
			return cursoMapper.toDTO(cursosRepo.save(recordFound));
		})
				.orElseThrow(() -> new RecordNotFoundException(id)) ;

	}
	
	public void delete(@NotNull @Positive Long id) {
		
		cursosRepo.delete(cursosRepo.findById(id)
				.orElseThrow(() -> new RecordNotFoundException(id)));
		
		}

}
