package e2000575.vamk.fi.server.controller;

import java.util.List;

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

    @GetMapping("/{username}")
    public ResponseEntity<?> getAppointmentByUsername(@PathVariable String username){
        List<BookingForm> appointments = bookingService.getAppointmentByUsername(username);
        if(appointments.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(appointments);
        }
    }

    @GetMapping("/{username}/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable String username, @PathVariable String id) {
        BookingForm appointment = bookingService.getAppointmentById(username, id);
        if(appointment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody BookingRequestDTO requestBody) {
        BookingForm createdForm = bookingService.createAppointment(requestBody);
        System.out.println(requestBody);
        if(createdForm == null) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(createdForm);
    }

    @PutMapping("/update/{username}/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable String id, @PathVariable String username, @RequestBody BookingForm receivedForm) {
        BookingForm updatedForm = bookingService.updateAppointmentById(id, username, receivedForm);
        if(updatedForm == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Appointment updated successfully");
    }
    
    @DeleteMapping("/delete/{username}/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String id, @PathVariable String username) {
        String result = bookingService.deleteAppointment(username, id);
        return ResponseEntity.ok(result);
    }
}
