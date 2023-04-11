package com.example.tin_backend.User;

import lombok.extern.java.Log;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@Log
public class UserSampleDataLoader
{
    @Bean
    CommandLineRunner initDatabase(UserRepository appUserRepository)
    {
        log.info("Loaded sample user data to the database:");
        for (User appUser : appUserRepository.findAll())
        {

            log.info(appUser.toString());

        }

        if (appUserRepository.findAll().isEmpty())
        {
            return args -> {
                appUserRepository.save(new User("login1","password1","user1@gmail.com"));

                log.info("Loaded sample user data to the database:");
                for (User appUser : appUserRepository.findAll())
                {
                    log.info(appUser.toString());
                }
            };
        }
        else
        {
            return args -> {
                log.info("Database not empty - sample user data not loaded to the database.");
            };
        }
    }
}
