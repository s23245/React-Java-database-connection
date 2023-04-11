package com.example.tin_backend.Student;

import com.example.tin_backend.User.User;
import com.example.tin_backend.User.UserRepository;
import com.example.tin_backend.config.AppConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(value = AppConfiguration.API_ENDPOINT)
public class StudentController
{

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;


    @GetMapping("get/students")
    public ResponseEntity<?> getAllStudents()
    {
        return ResponseEntity.ok(this.studentRepository.findAll());
    }

    @PostMapping("post/student")
    public ResponseEntity<Student> postStudent(@RequestBody CreateStudentRequest createStudentRequest)
    {
        Optional<User> user = this.userRepository.findById(createStudentRequest.getUserId());

        if(user.isEmpty())
            return ResponseEntity.badRequest().build();


        Student student = new Student(
                user.get(),
                createStudentRequest.getName(),
                createStudentRequest.getSurname(),
                createStudentRequest.getYearOfStudy()
        );

        return ResponseEntity.ok(this.studentRepository.save(student));
    }
    @CrossOrigin(origins = "*")
    @PutMapping("update/student/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody CreateStudentRequest newStudent, @PathVariable Long id)
    {

        Optional<Student> student = this.studentRepository.findById(id);

        if(student.isEmpty())
            return ResponseEntity.badRequest().build();
        this.studentRepository.findById(id)
                .map(e -> {
                    e.setName(newStudent.getName());
                    e.setSurname(newStudent.getSurname());
                    e.setYearOfStudy(newStudent.getYearOfStudy());
//                    e.setUser(this.userRepository.findById(newStudent.getUserId()).get());
                    return this.studentRepository.save(e);
                });

        return ResponseEntity.ok(this.studentRepository.findById(id).get());
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("delete/student/{id}")
    public ResponseEntity<Long> deleteStudent(@PathVariable Long id)
    {
        Optional<Student> student = this.studentRepository.findById(id);

        if(student.isEmpty())
            return ResponseEntity.badRequest().build();

        this.studentRepository.delete(student.get());
        return ResponseEntity.ok(id);
    }
}
