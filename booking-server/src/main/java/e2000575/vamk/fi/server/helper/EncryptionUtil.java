package e2000575.vamk.fi.server.helper;

import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {
    private static final String AES = "AES";
    private static final String AES_GCM_NO_PADDING = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;
    private static final int KEY_LENGTH = 256;
    private static final int PBKDF2_ITERATIONS = 65536;

    private EncryptionUtil() {}

    public static SecretKey deriveKeyFromSecret(String secret) throws Exception {
        byte[] salt = "fixed-or-env-salt".getBytes();
        PBEKeySpec spec = new PBEKeySpec(secret.toCharArray(), salt, PBKDF2_ITERATIONS, KEY_LENGTH);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        byte[] keyBytes = skf.generateSecret(spec).getEncoded();
        return new SecretKeySpec(keyBytes, AES);
    }

    public static String encrypt(String input, SecretKey key) throws Exception {
        byte[] iv = new byte[IV_LENGTH];
        SecureRandom sr = new SecureRandom();
        sr.nextBytes(iv);

        Cipher cipher = Cipher.getInstance(AES_GCM_NO_PADDING);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);

        byte[] ciphertext = cipher.doFinal(input.getBytes("UTF-8"));

        byte[] combined = new byte[iv.length + ciphertext.length];
        System.arraycopy(iv, 0, combined, iv.length, ciphertext.length);
        System.arraycopy(ciphertext, 0, combined, iv.length, ciphertext.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    public static String decrypt(String b64Combined, SecretKey key) throws Exception {
        byte[] combined = Base64.getDecoder().decode(b64Combined);
        byte[] iv = new byte[IV_LENGTH];
        System.arraycopy(combined, 0, iv, 0, IV_LENGTH);
        byte[] ciphertext = new byte[combined.length - IV_LENGTH];
        System.arraycopy(combined, IV_LENGTH, ciphertext, 0, ciphertext.length);

        Cipher cipher = Cipher.getInstance(AES_GCM_NO_PADDING);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);

        byte[] plain = cipher.doFinal(ciphertext);

        return new String(plain, "UTF-8");
    }
}
