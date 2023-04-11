package com.example.tin_backend.Security;

import com.example.tin_backend.User.CreateUserRequest;
import com.example.tin_backend.User.User;
import com.example.tin_backend.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService
{
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Object login(CreateUserRequest loginRequest) 
    {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getLogin(),
                        loginRequest.getPassword()
                )
        );
        var user = repository.findByLogin(loginRequest.getLogin());

        var jwtToken = jwtService.generateToken(user);
        return jwtToken;
    }


    public Object register(CreateUserRequest createUserRequest)
    {
        User user = new User(
                createUserRequest.getLogin(),
                passwordEncoder.encode(createUserRequest.getPassword()),
                createUserRequest.getEmail());

        this.repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return jwtToken;
    }
}
