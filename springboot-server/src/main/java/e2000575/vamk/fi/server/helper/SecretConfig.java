package e2000575.vamk.fi.server.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecretConfig {

    private final String secretKey;

    public SecretConfig(@Value("${myapp.secret-key}") String secretKey) {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new IllegalStateException("SECRET_KEY not defined");
        }

        if (secretKey.length() != 64) {
            throw new IllegalStateException("SECRET_KEY must be 64 hex characters (32 bytes)");
        }

        this.secretKey = secretKey;
    }

    public String getSecretKey() {
        return secretKey;
    }
}