package com.caio.crudspring.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.caio.crudspring.dto.CourseDTO;
import com.caio.crudspring.dto.mapper.copy.CourseMapper;
import com.caio.crudspring.exception.RecordNotFoundException;
import com.caio.crudspring.model.Course;
import com.caio.crudspring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
	
	@Autowired
	private CourseRepository courseRepository;

	private final CourseMapper courseMapper;
	
	
	public CourseService(CourseRepository courseRepository , CourseMapper courseMapper) {
		this.courseRepository = courseRepository;
		this.courseMapper = courseMapper;
	}
	
	
	public List<CourseDTO> list(){
		 return courseRepository.findAll()
				 .stream()
				 .map(courseMapper::toDTO)
				 .collect(Collectors.toList());
		
	}
	
	public CourseDTO findById(@PathVariable @NotNull @Positive Long id) {
		return courseRepository.findById(id).map(courseMapper::toDTO)
				.orElseThrow(() -> new  RecordNotFoundException(id));
	}
	
	
	
	public CourseDTO create(@Valid @NotNull CourseDTO course ) {
		return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
					
	}
	
	
	
	public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO course) {
	    return courseRepository.findById(id)
	            .map(recordFound -> {
	                recordFound.setName(course.name());
	                recordFound.setCategory(course.category());
	                return courseMapper.toDTO(courseRepository.save(recordFound));
	            })
	            .orElseThrow(() -> new RecordNotFoundException(id));
	}

	

	public void delete(@PathVariable @NotNull @Positive Long id) {
		courseRepository.delete(courseRepository.findById(id)
				.orElseThrow(() -> new  RecordNotFoundException(id)));
		
	}
	
	
	
}
