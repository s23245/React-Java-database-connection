package com.example.tin_backend.TeacherGroup;

import com.example.tin_backend.Group.Group;
import com.example.tin_backend.Group.GroupRepository;
import com.example.tin_backend.Teacher.Teacher;
import com.example.tin_backend.Teacher.TeacherRepository;
import com.example.tin_backend.config.AppConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(value = AppConfiguration.API_ENDPOINT)
public class TeacherGroupController
{
    private final TeacherRepository teacherRepository;
    private final GroupRepository groupRepository;
    private final TeacherGroupRepository teacherGroupRepository;


    @GetMapping("get/teacherGroups")
    public ResponseEntity<?> getAllTeacherGroups()
    {
        return ResponseEntity.ok(this.teacherGroupRepository.findAll());
    }

    @CrossOrigin(origins = "*")
    @PutMapping("update/teacherGroup/{id}")
    public ResponseEntity<TeacherGroup> updateTeacherGroup(@RequestBody CreateTeacherGroupRequest newTeacherGroup, @PathVariable Long id)
    {
        Optional<TeacherGroup> teacherGroup = this.teacherGroupRepository.findById(id);

        if(teacherGroup.isEmpty())
            return ResponseEntity.badRequest().build();

        this.teacherGroupRepository.findById(id)
                .map(e -> {
                    e.setTeacher(this.teacherRepository.findById(newTeacherGroup.getTeacherId()).get());
                    e.setGroup(this.groupRepository.findById(newTeacherGroup.getGroupId()).get());
                    return this.teacherGroupRepository.save(e);
                });

        return ResponseEntity.ok(this.teacherGroupRepository.findById(id).get());
    }
    @PostMapping("post/teacherGroup")
    public ResponseEntity<TeacherGroup> postTeacherGroup(@RequestBody CreateTeacherGroupRequest createTeacherGroupRequest)
    {
        Optional<Teacher> teacher = this.teacherRepository.findById(createTeacherGroupRequest.getTeacherId());
        Optional<Group> group = this.groupRepository.findById(createTeacherGroupRequest.getGroupId());

        if(teacher.isEmpty() || group.isEmpty())
            return ResponseEntity.badRequest().build();


        TeacherGroup teacherGroup = new TeacherGroup(
                teacher.get(),
                group.get()
        );

        return ResponseEntity.ok(this.teacherGroupRepository.save(teacherGroup));
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("delete/teacherGroup/{id}")
    public ResponseEntity<Long> deleteGroup(@PathVariable Long id)
    {
        Optional<TeacherGroup> teacherGroup = this.teacherGroupRepository.findById(id);

        if(teacherGroup.isEmpty())
            return ResponseEntity.badRequest().build();

        this.teacherGroupRepository.delete(teacherGroup.get());
        return ResponseEntity.ok(id);
    }
}
