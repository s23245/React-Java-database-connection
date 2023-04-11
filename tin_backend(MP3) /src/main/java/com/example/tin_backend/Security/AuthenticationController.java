package com.example.tin_backend.Security;

import com.example.tin_backend.User.CreateUserRequest;
import com.example.tin_backend.config.AppConfiguration;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = AppConfiguration.API_ENDPOINT)
@Log
public class AuthenticationController
{
    @Autowired
    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateUserRequest loginRequest) throws Exception
    {

        return ResponseEntity.ok(service.login(loginRequest));
    }

    @PostMapping("/registration")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> register(@RequestBody CreateUserRequest createUserRequest)
    {

        return ResponseEntity.ok(service.register(createUserRequest));
    }

    @GetMapping("/testPoint")
    public ResponseEntity<?> hello(@RequestBody CreateUserRequest createUserRequest)
    {
        return ResponseEntity.ok("hello " + createUserRequest.getLogin());
    }



}
