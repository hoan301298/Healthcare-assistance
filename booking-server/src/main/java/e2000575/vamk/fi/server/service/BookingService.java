package e2000575.vamk.fi.server.service;

import java.util.ArrayList;
import java.util.List;

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

    List<BookingForm> appointments = new ArrayList<BookingForm>();
    BookingForm appointment = new BookingForm();

    public String hashing(String input) {
        return HashUtil.hashWithHmacSHA256(input, secretConfig.getSecretKey());
    }

    private List<BookingForm> getAllAppointment() {
        return bookingRepository.findAll();
    }

    public List<BookingForm> getAppointmentByEmail(String email) {
        try {
            for (BookingForm form : getAllAppointment()) {
                String decryptedEmail = EncryptionUtil.decrypt(form.getEmail(), aesKey);
                if (decryptedEmail.equals(email)) {
                    appointments.add(form);
                }
            }
            return appointments;
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting email", e);
        }
    }

    public BookingForm getAppointmentById(String id, String email) {
        for (BookingForm form : getAppointmentByEmail(email)) {
            if (form.getId().equals(id)) {
                appointment = form;
            }
        }
        return appointment;
    }

    public BookingForm createAppointment(BookingRequestDTO requestBody) {
        if (requestBody == null)
            throw new IllegalArgumentException("RequestBody missing!");

        String emailPlain = requestBody.getEmail();

        try {
            String encryptedEmail = EncryptionUtil.encrypt(emailPlain, aesKey);

            BookingForm form = new BookingForm()
                    .setHospital(requestBody.getPlace())
                    .setName(requestBody.getName())
                    .setPhone(requestBody.getPhone())
                    .setTime(requestBody.getTime())
                    .setDate(requestBody.getDate())
                    .setReason(requestBody.getReason())
                    .setEmail(encryptedEmail);

            return bookingRepository.save(form);
        } catch (Exception e) {
            throw new RuntimeException("Failed to encrypt email", e);
        }
    }

    public BookingForm updateAppointmentById(String id, BookingRequestDTO requestBody) {
        appointment = getAppointmentById(id, requestBody.getEmail());

        if (appointment == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        if (appointment.getHospital().equals(requestBody.getPlace())) {
            appointment.setName(requestBody.getName());
            appointment.setDate(requestBody.getDate());
            appointment.setTime(requestBody.getTime());
            appointment.setReason(requestBody.getReason());

            bookingRepository.save(appointment);
        }
        return appointment;
    }

    public void deleteAppointment(String id, String email) {
        appointment = getAppointmentById(id, email);

        if (appointment == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        bookingRepository.deleteById(id);
    }
}
