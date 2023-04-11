package com.example.tin_backend.User;

import com.example.tin_backend.config.AppConfiguration;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = AppConfiguration.API_ENDPOINT)
@Log
public class UserController
{
    @Autowired
    private final UserRepository userRepository;

    @GetMapping("get/users")
    public ResponseEntity<?> getAllUsers()
    {
        return ResponseEntity.ok(this.userRepository.findAll());
    }

    @PostMapping("post/user")
    public ResponseEntity<User> postUser(@RequestBody CreateUserRequest newUser)
    {

        User user = new User(
                newUser.getLogin(),
                newUser.getPassword(),
                newUser.getEmail()
        );
        return ResponseEntity.ok(this.userRepository.save(user));
    }
    @CrossOrigin(origins = "*")
    @PutMapping("update/user/{id}")
    public ResponseEntity<User> updateUser(@RequestBody CreateUserRequest newUser, @PathVariable Long id)
    {
        Optional<User> user = this.userRepository.findById(id);

        if(user.isEmpty())
            return ResponseEntity.badRequest().build();

         this.userRepository.findById(id)
                .map(e -> {
                    e.setLogin(newUser.getLogin());
                    e.setPassword(newUser.getPassword());
                    e.setEmail(newUser.getEmail());
                    return this.userRepository.save(e);
                });

         return ResponseEntity.ok(this.userRepository.findById(id).get());
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("delete/user/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long id)
    {
        Optional<User> user = this.userRepository.findById(id);

        if(user.isEmpty())
            return ResponseEntity.badRequest().build();

        this.userRepository.delete(user.get());
        return ResponseEntity.ok(id);
    }
}
