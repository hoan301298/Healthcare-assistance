package e2000575.vamk.fi.server.helper;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {

    private static final String AES_GCM = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;
    private static final int TAG_LENGTH_BYTES = GCM_TAG_LENGTH / 8;

    private EncryptionUtil() {}

    /** Converts hex string to SecretKey for AES-256 */
    public static SecretKey keyFromHex(String hexKey) {
        byte[] keyBytes = hexToBytes(hexKey);
        if (keyBytes.length != 32) {
            throw new IllegalArgumentException("AES-256 key must be 32 bytes");
        }
        return new SecretKeySpec(keyBytes, "AES");
    }

    /** Encrypts plain text and returns Node.js-compatible format: iv:authTag:cipherText */
    public static String encrypt(String plainText, SecretKey key) throws Exception {
        byte[] iv = new byte[IV_LENGTH];
        new SecureRandom().nextBytes(iv);

        Cipher cipher = Cipher.getInstance(AES_GCM);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);

        byte[] cipherBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

        byte[] cipherText = new byte[cipherBytes.length - TAG_LENGTH_BYTES];
        byte[] authTag = new byte[TAG_LENGTH_BYTES];

        System.arraycopy(cipherBytes, 0, cipherText, 0, cipherText.length);
        System.arraycopy(cipherBytes, cipherText.length, authTag, 0, authTag.length);

        String ivBase64 = Base64.getEncoder().encodeToString(iv);
        String tagBase64 = Base64.getEncoder().encodeToString(authTag);
        String cipherBase64 = Base64.getEncoder().encodeToString(cipherText);

        return ivBase64 + ":" + tagBase64 + ":" + cipherBase64;
    }

    /** Decrypts Node.js-style iv:authTag:cipherText format */
    public static String decrypt(String encryptedText, SecretKey key) throws Exception {
        String[] parts = encryptedText.split(":");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid encrypted format, expected iv:authTag:cipherText");
        }

        byte[] iv = Base64.getDecoder().decode(parts[0]);
        byte[] authTag = Base64.getDecoder().decode(parts[1]);
        byte[] cipherText = Base64.getDecoder().decode(parts[2]);

        byte[] combined = new byte[cipherText.length + authTag.length];
        System.arraycopy(cipherText, 0, combined, 0, cipherText.length);
        System.arraycopy(authTag, 0, combined, cipherText.length, authTag.length);

        Cipher cipher = Cipher.getInstance(AES_GCM);
        cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(GCM_TAG_LENGTH, iv));

        byte[] plain = cipher.doFinal(combined);
        return new String(plain, StandardCharsets.UTF_8);
    }

    /** Hex string to byte array */
    private static byte[] hexToBytes(String hex) {
        int len = hex.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte)
                    ((Character.digit(hex.charAt(i), 16) << 4)
                    + Character.digit(hex.charAt(i + 1), 16));
        }
        return data;
    }
}