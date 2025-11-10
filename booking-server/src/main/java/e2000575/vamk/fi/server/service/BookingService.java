package e2000575.vamk.fi.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import e2000575.vamk.fi.server.entity.BookingForm;
import e2000575.vamk.fi.server.entity.DTO.BookingRequestDTO;
import e2000575.vamk.fi.server.helper.HashUtil;
import e2000575.vamk.fi.server.helper.SecretConfig;
import e2000575.vamk.fi.server.repository.BookingRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final SecretConfig secretConfig;

    public BookingService(BookingRepository bookingRepository, SecretConfig secretConfig) {
        this.bookingRepository = bookingRepository;
        this.secretConfig = secretConfig;
    }

    List<BookingForm> appointments = new ArrayList<BookingForm>();
    BookingForm appointment = new BookingForm();

    public String hashing (String input) {
        return HashUtil.hashWithHmacSHA256(input, secretConfig.getSecretKey());
    }
    
    private List<BookingForm> getAllAppointment() {
        return bookingRepository.findAll();
    }

    public List<BookingForm> getAppointmentByEmail (String email) {
        for (BookingForm form : getAllAppointment()) {
            if(form.getEmail().equals(hashing(email))) {
                appointments.add(appointment);
            }
        }
        return appointments;
    }

    public BookingForm getAppointmentById(String id, String email) {
        for (BookingForm form : getAppointmentByEmail(email)) {
            if(form.getId().equals(id)) {
                appointment = form;
            }
        }
        return appointment;
    }
    
    public BookingForm createAppointment(BookingRequestDTO requestBody) {
        if (requestBody == null) {
            throw new IllegalArgumentException("RequestBody missing!");
        }

        BookingForm form = new BookingForm()
            .setHospital(requestBody.getPlace())
            .setName(requestBody.getName())
            .setPhone(requestBody.getPhone())
            .setTime(requestBody.getTime())
            .setDate(requestBody.getDate())
            .setReason(requestBody.getReason())
            .setEmail(hashing(requestBody.getEmail()));

        BookingForm savedForm = bookingRepository.save(form);
        return savedForm;
    }

    public BookingForm updateAppointmentById(String id, BookingRequestDTO requestBody) {
        BookingForm form = getAppointmentById(id, requestBody.getEmail());

        if (form == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        if(form.getHospital().equals(requestBody.getPlace())) {
            form.setName(requestBody.getName());
            form.setDate(requestBody.getDate());
            form.setTime(requestBody.getTime());
            form.setReason(requestBody.getReason());
            
            bookingRepository.save(form);
        }
        return form;
    }

    public void deleteAppointment(String id, String email) {
        BookingForm form = getAppointmentById(id, email);

        if (form == null) {
            throw new IllegalArgumentException("No appointment found!");
        }

        bookingRepository.deleteById(id);
    }
}
