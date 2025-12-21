package e2000575.vamk.fi.server.entity;

import lombok.*;
import lombok.experimental.Accessors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "appointments")
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class BookingForm {

    @Id
    private String id;
    private String name;

    @Indexed
    private String hashedEmail;
    private String encryptedEmail;
    private Hospital hospital;
    private String phone;
    private String date;
    private String time;
    private String reason;
    private String notes;
    private LocalDateTime createdAt = LocalDateTime.now();
    
}
