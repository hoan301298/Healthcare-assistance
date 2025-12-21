package e2000575.vamk.fi.server.helper;

import java.nio.charset.StandardCharsets;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class HashUtil {

    public static String hashWithHmacSHA256(String input, String secretKey) {
        try {
            String normalizedInput = input.toLowerCase().trim();

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(
                    secretKey.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );

            mac.init(keySpec);
            byte[] hashBytes = mac.doFinal(
                    normalizedInput.getBytes(StandardCharsets.UTF_8)
            );

            return bytesToHex(hashBytes);

        } catch (Exception e) {
            throw new RuntimeException("Error hashing input", e);
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hex = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}
