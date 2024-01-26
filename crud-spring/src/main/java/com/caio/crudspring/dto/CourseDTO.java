package com.caio.crudspring.dto;

import org.hibernate.validator.constraints.Length;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;



public record CourseDTO(
		
	Long id,
	@NotEmpty @Length(min = 5 , max = 100) String name,
	@NotEmpty @Length(max = 15 ) @Pattern(regexp = "Back-end|Front-end") String category
	) {
	

	
}
