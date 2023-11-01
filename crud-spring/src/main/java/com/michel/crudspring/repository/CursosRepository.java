package com.michel.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.michel.crudspring.model.CursosModel;

@Repository
public interface CursosRepository extends JpaRepository<CursosModel, Long>{

}
