package e2000575.vamk.fi.server.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OriginCheckFilter extends OncePerRequestFilter {
    
    @Value("${cors.allowed.origin}")
    private String ALLOWED_ORIGIN;

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        if (origin == null && referer == null) {
            response.sendError(HttpStatus.FORBIDDEN.value(), "Direct access blocked");
            return;
        }

        if (origin != null && !ALLOWED_ORIGIN.equals(origin)) {
            response.sendError(HttpStatus.FORBIDDEN.value(), "Origin blocked");
            return;
        }

        if (referer != null && !referer.startsWith(ALLOWED_ORIGIN)) {
            response.sendError(HttpStatus.FORBIDDEN.value(), "Referer blocked");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
