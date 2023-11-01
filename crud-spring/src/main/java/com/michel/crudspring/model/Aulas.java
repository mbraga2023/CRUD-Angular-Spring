package com.michel.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Aulas {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(length = 100, nullable = false)
	private String name;
	
	@Column(length = 11, nullable = false)
	private String youtubeUrl;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "curso_id", nullable=false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private CursosModel curso;
	

	public CursosModel getCurso() {
		return curso;
	}

	public void setCurso(CursosModel curso) {
		this.curso = curso;
	}

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

	public String getYoutubeUrl() {
		return youtubeUrl;
	}

	public void setYoutubeUrl(String youtubeUrl) {
		this.youtubeUrl = youtubeUrl;
	}

	
}
