package com.example.tin_backend.Student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateStudentRequest
{
    private String name;
    private String surname;
    private float yearOfStudy;

    private Long userId;
}
