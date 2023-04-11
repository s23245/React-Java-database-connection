package com.example.tin_backend.Teacher;

import com.example.tin_backend.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teacher")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Teacher
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private User user;

    private String name;
    private String surname;
    private String degree;

    public Teacher(User user, String name, String surname, String degree)
    {
        this.user = user;
        this.name = name;
        this.surname = surname;
        this.degree = degree;
    }
}
