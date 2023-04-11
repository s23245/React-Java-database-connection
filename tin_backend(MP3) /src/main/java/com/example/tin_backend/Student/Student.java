package com.example.tin_backend.Student;

import com.example.tin_backend.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "student")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Student
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private User user;

    private String name;
    private String surname;
    private float yearOfStudy;

    public Student(User user, String name, String surname,float yearOfStudy)
    {
        this.user = user;
        this.name = name;
        this.surname = surname;
        this.yearOfStudy = yearOfStudy;
    }

}
