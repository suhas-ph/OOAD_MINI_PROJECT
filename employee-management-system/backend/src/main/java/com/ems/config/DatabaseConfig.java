package com.ems.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/ems_db")
                .username("root")
                .password("Suhas@1390")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
