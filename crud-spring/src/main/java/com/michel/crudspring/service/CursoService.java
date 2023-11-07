package com.michel.crudspring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.michel.crudspring.dto.CursoPageDTO;
import com.michel.crudspring.dto.CursosDTO;
import com.michel.crudspring.dto.mapper.CursoMapper;
import com.michel.crudspring.exception.RecordNotFoundException;
import com.michel.crudspring.model.CursosModel;
import com.michel.crudspring.repository.CursosRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class CursoService {
	private final CursosRepository cursosRepo;
	private final CursoMapper cursoMapper;
	
	public CursoService(CursosRepository cursosRepo, CursoMapper cursoMapper) {
		this.cursosRepo = cursosRepo;
		this.cursoMapper = cursoMapper;
	}
	
	/* sem paginação
	 * 
	 * public List<CursosDTO> list() { return cursosRepo.findAll().stream()
	 * .map(cursoMapper::toDTO) .toList(); }
	 */
	
	//com paginação
	public CursoPageDTO list(@PositiveOrZero int pageNumber, @Positive @Max(100) int pageSize) {
		Page<CursosModel> page = cursosRepo.findAll(PageRequest.of(pageNumber, pageSize));
		List<CursosDTO> cursos = page.get()
				.map(cursoMapper::toDTO)
				.collect(Collectors.toList());
		
		return new CursoPageDTO(cursos, page.getTotalElements(), page.getTotalPages());
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
			CursosModel curso = cursoMapper.toEntity(cursoDTO);
			recordFound.setName(cursoDTO.name());
			recordFound.setCategory(this.cursoMapper.convertCategoryValue(cursoDTO.category()));
			recordFound.getAulas().clear();
			curso.getAulas().forEach(recordFound.getAulas()::add);
			return cursoMapper.toDTO(cursosRepo.save(recordFound));
		})
				.orElseThrow(() -> new RecordNotFoundException(id)) ;

	}
	
	public void delete(@NotNull @Positive Long id) {
		
		cursosRepo.delete(cursosRepo.findById(id)
				.orElseThrow(() -> new RecordNotFoundException(id)));
		
		}

}
