package e2000575.vamk.fi.server.service;

import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import e2000575.vamk.fi.server.entity.BookingForm;
import e2000575.vamk.fi.server.entity.DTO.BookingRequestDTO;
import e2000575.vamk.fi.server.entity.DTO.BookingResponseDTO;
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

    public List<BookingResponseDTO> getAppointmentByEmail(String email) {
        List<BookingForm> appointments = bookingRepository.findByHashedEmail(hashEmail(email));
        return appointments.stream()
                .map(this::convertFormToResponseDTO)
                .toList();
    }

    public BookingResponseDTO getAppointmentById(String id, String email) {
        return getAppointmentByEmail(email)
                .stream()
                .filter(form -> form.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public BookingResponseDTO createAppointment(BookingRequestDTO requestBody) {
        if (requestBody == null)
            throw new IllegalArgumentException("RequestBody missing!");

        try {
            String encryptedEmail = EncryptionUtil.encrypt(requestBody.getEmail(), aesKey);
            String hashedEmail = hashEmail(requestBody.getEmail());

            BookingForm appointment = new BookingForm()
                    .setHospital(requestBody.getPlace())
                    .setName(requestBody.getName())
                    .setPhone(requestBody.getPhone())
                    .setTime(requestBody.getTime())
                    .setDate(requestBody.getDate())
                    .setReason(requestBody.getReason())
                    .setEncryptedEmail(encryptedEmail)
                    .setHashedEmail(hashedEmail);

            BookingForm saved = bookingRepository.save(appointment);

            return convertFormToResponseDTO(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to encrypt email", e);
        }
    }

    public BookingResponseDTO updateAppointmentById(String id, BookingRequestDTO requestBody) {
        BookingForm appointment = getAppointmentByIdEntity(id, requestBody.getEmail());

        if (appointment == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        appointment
                .setName(requestBody.getName())
                .setDate(requestBody.getDate())
                .setTime(requestBody.getTime())
                .setReason(requestBody.getReason());

        BookingForm saved = bookingRepository.save(appointment);
        return convertFormToResponseDTO(saved);
    }

    public void deleteAppointment(String id, String email) {
        BookingForm appointment = getAppointmentByIdEntity(id, email);

        if (appointment == null) {
            throw new IllegalArgumentException("Appointment not found");
        }

        bookingRepository.deleteById(id);
    }

    private BookingForm getAppointmentByIdEntity(String id, String email) {
        return bookingRepository.findByHashedEmail(email)
                .stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private BookingResponseDTO convertFormToResponseDTO(BookingForm form) {
        return new BookingResponseDTO(
                form.getId(),
                form.getHospital(),
                form.getName(),
                decryptEmailSafely(form.getEncryptedEmail()),
                form.getPhone(),
                form.getTime(),
                form.getDate(),
                form.getDate(),
                form.getCreatedAt());
    }

    private String hashEmail(String input) {
        return HashUtil.hashWithHmacSHA256(input, secretConfig.getSecretKey());
    }

    private String decryptEmailSafely(String encryptedEmail) {
        try {
            return EncryptionUtil.decrypt(encryptedEmail, aesKey);
        } catch (Exception e) {
            throw new RuntimeException("Fail decrypting Email", e);
        }
    }
}