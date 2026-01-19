package e2000575.vamk.fi.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import e2000575.vamk.fi.server.entity.DTO.BookingRequestDTO;
import e2000575.vamk.fi.server.entity.DTO.BookingResponseDTO;
import e2000575.vamk.fi.server.service.BookingService;

@RestController
@RequestMapping("/v2")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/get-appointment/{email}")
    public ResponseEntity<?> getAppointmentByEmail(@NonNull @PathVariable String email) {
        List<BookingResponseDTO> appointments = bookingService.getAppointmentByEmail(email);
        if (appointments == null || appointments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/get-appointment/{email}/{id}")
    public ResponseEntity<?> getAppointmentById(
            @NonNull @PathVariable String email,
            @NonNull @PathVariable String id) {
        BookingResponseDTO appointment = bookingService.getAppointmentById(id, email);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(
            @NonNull @RequestBody BookingRequestDTO requestBody) {
        try {
            BookingResponseDTO createdForm = bookingService.createAppointment(requestBody);
            return ResponseEntity.ok(createdForm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAppointment(
            @NonNull @PathVariable String id,
            @NonNull @RequestBody BookingRequestDTO requestBody) {
        try {
            BookingResponseDTO updatedForm = bookingService.updateAppointmentById(id, requestBody);
            return ResponseEntity.ok(updatedForm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{email}/{id}")
    public ResponseEntity<?> deleteAppointment(
            @NonNull @PathVariable String id,
            @NonNull @PathVariable String email) {
        try {
            bookingService.deleteAppointment(id, email);
            return ResponseEntity.ok("Appointment deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}