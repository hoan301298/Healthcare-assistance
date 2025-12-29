package e2000575.vamk.fi.server.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecretConfig {

    private final String secretKey;
    private final String encryptKey;

    public SecretConfig(
        @Value("${myapp.secret-key}") String secretKey,
        @Value("${myapp.encrypt-key}") String encryptKey 
    ) {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new IllegalStateException("SECRET_KEY not defined");
        }
        
        if (secretKey.length() != 64) {
            throw new IllegalStateException("SECRET_KEY must be 64 hex characters (32 bytes)");
        }

        if (encryptKey == null || encryptKey.isEmpty()) {
            throw new IllegalStateException("ENCRYPT_KEY not defined");
        }
        
        if (encryptKey.length() != 64) {
            throw new IllegalStateException("ENCRYPT_KEY must be 64 hex characters (32 bytes)");
        }

        this.secretKey = secretKey;
        this.encryptKey = encryptKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getEncryptKey() {
        return encryptKey;
    }
}