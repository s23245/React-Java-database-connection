package com.example.tin_backend.Group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateGroupRequest
{
    private String name;
    private String subject;
    private String languageOfStudying;
    private int limitOfStudents;

    private Long studentId;

}

