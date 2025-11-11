package e2000575.vamk.fi.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import e2000575.vamk.fi.server.entity.BookingForm;
import e2000575.vamk.fi.server.entity.DTO.BookingRequestDTO;
import e2000575.vamk.fi.server.service.BookingService;

@RestController
@RequestMapping("/v2")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/get-appointment/{email}")
    public ResponseEntity<?> getAppointmentByEmail(@PathVariable String email) {
        Optional<BookingForm> appointments = bookingService.getAppointmentByEmail(email);
        if (appointments == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/get-appointment/{email}/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable String email, @PathVariable String id) {
        BookingForm appointment = bookingService.getAppointmentById(id, email);
        if(appointment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody BookingRequestDTO requestBody) {
        try {
            BookingForm createdForm = bookingService.createAppointment(requestBody);
            return ResponseEntity.ok(createdForm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable String id, @RequestBody BookingRequestDTO requestBody) {
        try {
            BookingForm updatedForm = bookingService.updateAppointmentById(id, requestBody);
            return ResponseEntity.ok(updatedForm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/delete/{username}/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String id, @PathVariable String username) {
        try {
            bookingService.deleteAppointment(id, username);
            return ResponseEntity.ok("Appointment deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}