package com.awesoft.cafe.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.SecretKey;
import java.util.function.Function;

@Service
public class jwtUtil {
    private String secret = "btechdays";

    public String extractUsername(String token){
        return extractClamis(token , Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClamis(token , Claims::getExpiration);
    }

    private <T> T extractClamis(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);

    }
    public Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
      return Jwts.parser().verifyWith(key) // Replaces setSigningKey
        .build()             // Creates the JwtParser
        .parseSignedClaims(token) // Replaces parseClaimsJws
        .getPayload();  
    }
    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String Username , String role){
        Map<String , Object> claims = new HashMap<>();
        claims.put("role" , role);
        return createtoken(claims, Username);
    }

    private String createtoken(Map<String , Object> claims , String subject){
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
                .signWith(key).compact();
    }
    public Boolean validatetoken(String token , UserDetails userDetails){
        final String Username = extractUsername(token);
        return (Username.equals(userDetails.getUsername()) && !isTokenExpired(token) );
    }

}
