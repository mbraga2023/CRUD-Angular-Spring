package com.michel.crudspring.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.crudspring.enums.Category;
import com.michel.crudspring.enums.StatusEnum;
import com.michel.crudspring.enums.converters.CategoryConverter;
import com.michel.crudspring.enums.converters.StatusConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name="cursos")
@SQLDelete(sql = "UPDATE cursos SET status = 'Inativo' WHERE id = ?") 
@Where(clause = "status = 'Ativo'")
public class CursosModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty("_id")
	private Long id;
	
	@NotBlank
	@NotNull
	@Length(min = 3, max = 100)
	@Column(length = 200, nullable = false)
	private String name;
	
	
	@NotNull
	@Column(length = 20, nullable = false)
	@Convert(converter = CategoryConverter.class)
	private Category category;
	
	@NotNull
	@Column(length = 10, nullable = false)
	@Convert(converter = StatusConverter.class)
	private StatusEnum status = StatusEnum.ACTIVE;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "curso")
	private List<Aulas> aulas = new ArrayList<>();
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public List<Aulas> getAulas() {
		return aulas;
	}

	public void setAulas(List<Aulas> aulas) {
		this.aulas = aulas;
	}
	
	

}
