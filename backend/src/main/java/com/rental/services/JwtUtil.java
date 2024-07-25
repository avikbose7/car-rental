package com.rental.services;

//import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

//    @Value("${security.jwt.secret}")
    private String secret = "3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b";

//    @Value("${jwt.expiration}")
    private Long expiration = (long) 3600000;

    public String generateToken(String email) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes());
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

//    public String extractEmail(String token) {
//        return extractClaim(token).getSubject();
//    }
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

//    public Date extractExpirationDate(String token) {
//        return extractClaim(token).getExpiration();
//    }

    private Claims extractAllClaims(String token) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

//    public boolean isTokenExpired(String token) {
//        Date expirationDate = extractExpirationDate(token);
//        return expirationDate.before(new Date());
//    }

//    public boolean validateToken(String token, String email) {
//        String extractedUsername = extractEmail(token);
//        return (extractedUsername.equals(email) && !isTokenExpired(token));
//    }
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
