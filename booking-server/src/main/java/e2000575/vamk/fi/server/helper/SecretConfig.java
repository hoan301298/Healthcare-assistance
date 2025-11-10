package e2000575.vamk.fi.server.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecretConfig {
    @Value("${myapp.secret-key}")
    private String secretKey;

    public String getSecretKey() {
        return secretKey;
    }
}
