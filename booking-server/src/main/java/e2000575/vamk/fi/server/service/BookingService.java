package e2000575.vamk.fi.server.service;

import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import e2000575.vamk.fi.server.entity.BookingForm;
import e2000575.vamk.fi.server.entity.DTO.BookingRequestDTO;
import e2000575.vamk.fi.server.helper.EncryptionUtil;
import e2000575.vamk.fi.server.helper.HashUtil;
import e2000575.vamk.fi.server.helper.SecretConfig;
import e2000575.vamk.fi.server.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SecretConfig secretConfig;
    private final SecretKey aesKey;

    @Autowired
    public BookingService(BookingRepository bookingRepository, SecretConfig secretConfig) throws Exception {
        this.bookingRepository = bookingRepository;
        this.secretConfig = secretConfig;
        this.aesKey = EncryptionUtil.deriveKeyFromSecret(secretConfig.getSecretKey());
    }

    public String hashEmail(String input) {
        return HashUtil.hashWithHmacSHA256(input, secretConfig.getSecretKey());
    }

    public Optional<BookingForm> getAppointmentByEmail(String email) {
        try {
            return bookingRepository.findByHashedEmail(hashEmail(email));
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting email", e);
        }
    }

    public BookingForm getAppointmentById(String id, String email) {
        return getAppointmentByEmail(email)
                .stream()
                .filter(form -> form.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public BookingForm createAppointment(BookingRequestDTO requestBody) {
        if (requestBody == null)
            throw new IllegalArgumentException("RequestBody missing!");

        BookingForm appointment = new BookingForm();
        
        try {
            String encryptedEmail = EncryptionUtil.encrypt(requestBody.getEmail(), aesKey);
            appointment
                    .setHospital(requestBody.getPlace())
                    .setName(requestBody.getName())
                    .setPhone(requestBody.getPhone())
                    .setTime(requestBody.getTime())
                    .setDate(requestBody.getDate())
                    .setReason(requestBody.getReason())
                    .setEncryptedEmail(encryptedEmail)
                    .setHashedEmail(hashEmail(requestBody.getEmail()));

            return bookingRepository.save(appointment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to encrypt email", e);
        }
    }

    public BookingForm updateAppointmentById(String id, BookingRequestDTO requestBody) {
        BookingForm appointment = getAppointmentById(id, requestBody.getEmail());

        if (appointment == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        appointment
                .setName(requestBody.getName())
                .setDate(requestBody.getDate())
                .setTime(requestBody.getTime())
                .setReason(requestBody.getReason());

        return bookingRepository.save(appointment);
    }

    public void deleteAppointment(String id, String email) {
        BookingForm appointment = getAppointmentById(id, email);

        if (appointment == null) {
            throw new IllegalArgumentException("Appointment not found");
        }

        bookingRepository.deleteById(id);
    }
}
