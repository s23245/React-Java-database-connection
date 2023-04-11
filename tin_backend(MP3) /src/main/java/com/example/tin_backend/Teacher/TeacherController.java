package com.example.tin_backend.Teacher;

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
public class TeacherController
{

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;


    @GetMapping("get/teachers")
    public ResponseEntity<?> getAllTeachers()
    {
        return ResponseEntity.ok(this.teacherRepository.findAll());
    }

    @CrossOrigin(origins = "*")
    @PutMapping("update/teacher/{id}")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody CreateTeacherRequest newTeacher, @PathVariable Long id)
    {
        Optional<Teacher> teacher = this.teacherRepository.findById(id);

        if(teacher.isEmpty())
            return ResponseEntity.badRequest().build();

        this.teacherRepository.findById(id)
                .map(e -> {
                    e.setName(newTeacher.getName());
                    e.setSurname(newTeacher.getSurname());
                    e.setDegree(newTeacher.getDegree());
                    e.setUser(this.userRepository.findById(newTeacher.getUserId()).get());
                    return this.teacherRepository.save(e);
                });

        return ResponseEntity.ok(this.teacherRepository.findById(id).get());
    }

    @PostMapping("post/teacher")
    public ResponseEntity<Teacher> postTeacher(@RequestBody CreateTeacherRequest createTeacherRequest)
    {
        Optional<User> user = this.userRepository.findById(createTeacherRequest.getUserId());

        if(user.isEmpty())
            return ResponseEntity.badRequest().build();


        Teacher teacher = new Teacher(
                user.get(),
                createTeacherRequest.getName(),
                createTeacherRequest.getSurname(),
                createTeacherRequest.getDegree()
        );

        return ResponseEntity.ok(this.teacherRepository.save(teacher));
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("delete/teacher/{id}")
    public ResponseEntity<Long> deleteTeacher(@PathVariable Long id)
    {
        Optional<Teacher> teacher = this.teacherRepository.findById(id);

        if(teacher.isEmpty())
            return ResponseEntity.badRequest().build();

        this.teacherRepository.delete(teacher.get());
        return ResponseEntity.ok(id);
    }
}
