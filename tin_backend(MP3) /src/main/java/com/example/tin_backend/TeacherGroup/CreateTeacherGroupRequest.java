package com.example.tin_backend.TeacherGroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateTeacherGroupRequest
{
    private Long groupId;
    private Long teacherId;
}
