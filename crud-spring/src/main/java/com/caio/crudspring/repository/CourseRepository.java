package com.caio.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.caio.crudspring.model.Course;


public interface CourseRepository extends JpaRepository<Course, Long> {

}
