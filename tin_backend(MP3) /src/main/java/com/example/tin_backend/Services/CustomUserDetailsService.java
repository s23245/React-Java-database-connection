package com.example.tin_backend.Services;

import com.example.tin_backend.User.User;
import com.example.tin_backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException
    {
        User user = this.userRepository.findByLogin(login);

        if(user == null)
            throw new UsernameNotFoundException(login);

        return user;
    }
}
