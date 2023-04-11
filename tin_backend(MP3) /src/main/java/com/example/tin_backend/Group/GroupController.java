package com.example.tin_backend.Group;

import com.example.tin_backend.Student.Student;
import com.example.tin_backend.Student.StudentRepository;
import com.example.tin_backend.config.AppConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(value = AppConfiguration.API_ENDPOINT)
public class GroupController
{
    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;

    @GetMapping("get/groups")
    public ResponseEntity<?> getAllGroups()
    {
        return ResponseEntity.ok(this.groupRepository.findAll());
    }

    @PostMapping("post/group")
    public ResponseEntity<Group> postGroup(@RequestBody CreateGroupRequest createGroupRequest)
    {
        Optional<Student> student = this.studentRepository.findById(createGroupRequest.getStudentId());

        if(student.isEmpty())
            return ResponseEntity.badRequest().build();


        Group group = new Group(
                student.get(),
                createGroupRequest.getName(),
                createGroupRequest.getSubject(),
                createGroupRequest.getLanguageOfStudying(),
                createGroupRequest.getLimitOfStudents()
        );

        return ResponseEntity.ok(this.groupRepository.save(group));
    }
    @CrossOrigin(origins = "*")
    @PutMapping("update/group/{id}")
    public ResponseEntity<Group> updateGroup(@RequestBody CreateGroupRequest newGroup, @PathVariable Long id)
    {
        Optional<Group> group = this.groupRepository.findById(id);

        if(group.isEmpty())
            return ResponseEntity.badRequest().build();

        this.groupRepository.findById(id)
                .map(e -> {
                    e.setName(newGroup.getName());
                    e.setSubject(newGroup.getSubject());
                    e.setLanguageOfStudying(newGroup.getLanguageOfStudying());
                    e.setLimitOfStudents(newGroup.getLimitOfStudents());
                    e.setStudent(this.studentRepository.findById(newGroup.getStudentId()).get());
                    return this.groupRepository.save(e);
                });

        return ResponseEntity.ok(this.groupRepository.findById(id).get());
    }
    @CrossOrigin(origins ="*")
    @DeleteMapping("delete/group/{id}")
    public ResponseEntity<Long> deleteGroup(@PathVariable Long id)
    {
        Optional<Group> group = this.groupRepository.findById(id);

        if(group.isEmpty())
            return ResponseEntity.badRequest().build();

        this.groupRepository.delete(group.get());
        return ResponseEntity.ok(id);
    }
}
