package e2000575.vamk.fi.server.service;

import java.util.List;
import java.util.Objects;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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
        this.aesKey = EncryptionUtil.keyFromHex(secretConfig.getEncryptKey());
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
        try {
            String encryptedEmail = EncryptionUtil.encrypt(requestBody.getEmail(), aesKey);
            String hashedEmail = hashEmail(requestBody.getEmail());

            BookingForm appointment = new BookingForm()
                    .setHospital(requestBody.getHospital())
                    .setName(requestBody.getName())
                    .setPhone(requestBody.getPhone())
                    .setTime(requestBody.getTime())
                    .setDate(requestBody.getDate())
                    .setReason(requestBody.getReason())
                    .setNotes(requestBody.getNotes())
                    .setEncryptedEmail(encryptedEmail)
                    .setHashedEmail(hashedEmail);

            @SuppressWarnings("null")
            BookingForm saved = Objects.requireNonNull(
                bookingRepository.save(appointment),
                "MongoDB failed to save appointment"
            );

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
                .setReason(requestBody.getReason())
                .setNotes(requestBody.getNotes());

        BookingForm saved = bookingRepository.save(appointment);
        return convertFormToResponseDTO(saved);
    }

    public void deleteAppointment(@NonNull String id, @NonNull String email) {
        BookingForm appointment = getAppointmentByIdEntity(id, email);

        if (appointment == null) {
            throw new IllegalArgumentException("Appointment not found");
        }

        bookingRepository.deleteById(id);
    }

    private BookingForm getAppointmentByIdEntity(String id, String email) {
        return bookingRepository.findByHashedEmail(hashEmail(email))
                .stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private BookingResponseDTO convertFormToResponseDTO(BookingForm form) {
        BookingResponseDTO response = new BookingResponseDTO();
        response
            .setId(form.getId())
            .setHospital(form.getHospital())
            .setName(form.getName())
            .setEmail(decryptEmailSafely(form.getEncryptedEmail()))
            .setPhone(form.getPhone())
            .setTime(form.getTime())
            .setDate(form.getDate())
            .setReason(form.getReason())
            .setNotes(form.getNotes())
            .setCreatedAt(form.getCreatedAt())
        ;
        return response;
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