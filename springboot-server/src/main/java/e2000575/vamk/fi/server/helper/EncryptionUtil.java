package e2000575.vamk.fi.server.helper;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {

    private static final String AES_GCM = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    private EncryptionUtil() {}

    public static SecretKey keyFromHex(String hexKey) {
        byte[] keyBytes = hexToBytes(hexKey);
        if (keyBytes.length != 32) {
            throw new IllegalArgumentException("AES-256 key must be 32 bytes");
        }
        return new SecretKeySpec(keyBytes, "AES");
    }

    public static String encrypt(String plainText, SecretKey key) throws Exception {
        byte[] iv = new byte[IV_LENGTH];
        new SecureRandom().nextBytes(iv);

        Cipher cipher = Cipher.getInstance(AES_GCM);
        cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(GCM_TAG_LENGTH, iv));

        byte[] cipherTextWithTag = cipher.doFinal(
                plainText.getBytes(StandardCharsets.UTF_8)
        );

        byte[] combined = new byte[iv.length + cipherTextWithTag.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(cipherTextWithTag, 0, combined, iv.length, cipherTextWithTag.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    public static String decrypt(String base64Combined, SecretKey key) throws Exception {
        byte[] combined = Base64.getDecoder().decode(base64Combined);

        byte[] iv = new byte[IV_LENGTH];
        byte[] cipherTextWithTag = new byte[combined.length - IV_LENGTH];

        System.arraycopy(combined, 0, iv, 0, IV_LENGTH);
        System.arraycopy(combined, IV_LENGTH, cipherTextWithTag, 0, cipherTextWithTag.length);

        Cipher cipher = Cipher.getInstance(AES_GCM);
        cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(GCM_TAG_LENGTH, iv));

        byte[] plain = cipher.doFinal(cipherTextWithTag);
        return new String(plain, StandardCharsets.UTF_8);
    }

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
