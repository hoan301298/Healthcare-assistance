package e2000575.vamk.fi.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import e2000575.vamk.fi.server.entity.BookingForm;
import e2000575.vamk.fi.server.repository.BookingRepository;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    List<BookingForm> appointments = new ArrayList<BookingForm>();
    BookingForm appointment = new BookingForm();

    private List<BookingForm> getAllAppointment() {
        return bookingRepository.findAll();
    }

    public List<BookingForm> getAppointmentByUsername (String username) {
        for (BookingForm form : getAllAppointment()) {
            if(form.getUsername().equals(username)) {
                appointments.add(appointment);
            }
        }
        return appointments;
    }

    public BookingForm getAppointmentById(String username, String id) {
        for (BookingForm form : getAppointmentByUsername(username)) {
            if(form.getId().equals(id)) {
                appointment = form;
            }
        }
        return appointment;
    }
    
    public BookingForm createAppointment(String username, BookingForm receivedForm) {
        // for (BookingForm form : getAppointmentByUsername(username)) {
        //     if(!form.getHospital().equals(receivedForm.getHospital()) && !form.getDate().equals(receivedForm.getDate())) {
        //         appointment = receivedForm;
        //     }
        // }
        bookingRepository.save(receivedForm);
        return receivedForm;
    }

    public BookingForm updateAppointmentById (String username, String id, BookingForm receivedForm) {
        BookingForm form = getAppointmentById(username, id);
        if(form.getHospital().equals(receivedForm.getHospital()) && form.getDate().equals(receivedForm.getDate())) {
            appointment = receivedForm;
            bookingRepository.save(appointment);
            return appointment;
        }
        return appointment;
    }

    public String deleteAppointment(String username, String id) {
        BookingForm form = getAppointmentById(username, id);
        if(form == null) {
            return "Cannot find your appointment!";
        }
        return "Cancel Successfully!";
    }
}
