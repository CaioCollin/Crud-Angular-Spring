package com.caio.crudspring.model;


import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.validator.constraints.Length;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?  ")
@Where(clause = "status = 'Ativo'")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@NotEmpty
	@Length(min = 5 , max = 100)
	@Column(length = 150,nullable = false)
	private String name;
	
	
	@NotNull
	@Length(max = 15 )
	@Pattern(regexp = "Back-end|Front-end")
	@Column(length = 10,nullable = false)
	private String category;
	
	
	@NotNull
	@Length(max = 10 )
	@Pattern(regexp = "Ativo|Inativo")
	@Column(length = 10,nullable = false)
	private String status = "Ativo";


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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
