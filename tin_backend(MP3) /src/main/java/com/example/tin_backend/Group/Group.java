package com.example.tin_backend.Group;


import com.example.tin_backend.Student.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "`group`")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Group
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Student student;

    private String name;
    private String subject;
    private String languageOfStudying;
    private int limitOfStudents;

    public Group(Student student, String name, String subject, String languageOfStudying, int limitOfStudents)
    {
        this.student = student;
        this.name = name;
        this.subject = subject;
        this.languageOfStudying = languageOfStudying;
        this.limitOfStudents = limitOfStudents;
    }
}
