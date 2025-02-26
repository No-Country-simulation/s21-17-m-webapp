package com.cdavinci.backend_cdavinci.config;


import com.cdavinci.backend_cdavinci.jwt.JwtAuthenticationFilter;
import com.cdavinci.backend_cdavinci.jwt.JwtEntryPoint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http.cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                                
                                                "/swagger-ui/**",
                                                "/v3/api-docs/**",
                                                "/swagger-resources/**",
                                                "/webjars/**",
                                                "/**" // ✅ Todas las rutas bajo /api/ son públicas
                                  
                                )
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .httpBasic(Customizer.withDefaults())
                                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtEntryPoint()))
                                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }

        @Bean
        public JwtAuthenticationFilter jwtTokenFilter() {
                return new JwtAuthenticationFilter();
        }

        @Bean
        public JwtEntryPoint jwtEntryPoint() {
                return new JwtEntryPoint();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(List.of("https://cdavinci.vercel.app/", "http://localhost:3000", "http://localhost:5173"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}