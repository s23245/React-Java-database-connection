package com.example.tin_backend.Teacher;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateTeacherRequest
{
    private String name;
    private String surname;
    private String degree;

    private Long userId;
}