package com.example.tin_backend.TeacherGroup;

import com.example.tin_backend.Group.Group;
import com.example.tin_backend.Teacher.Teacher;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teacher_group")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TeacherGroup
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Teacher teacher;

    @ManyToOne
    @JoinColumn
    private Group group;

    public TeacherGroup(Teacher teacher, Group group)
    {
        this.teacher = teacher;
        this.group = group;
    }
}
