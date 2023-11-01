package com.michel.crudspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}
	/*
	 * @Bean CommandLineRunner initDatabase(CursosRepository cursosRepo) { return
	 * args -> { cursosRepo.deleteAll();
	 * 
	 * CursosModel c = new CursosModel(); c.setName("Angular com Spring");
	 * c.setCategory("front-end"); cursosRepo.save(c); }; }
	 */
}
