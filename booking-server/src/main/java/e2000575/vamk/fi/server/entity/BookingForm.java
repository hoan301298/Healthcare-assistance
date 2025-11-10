package e2000575.vamk.fi.server.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "appointment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingForm {
    @Id
    private String id;  // MongoDB will auto-generate if null
    private String username;
    private String email;
    private String hospital;
    private String phone;
    private String date;
    private String time;
    private LocalDateTime createdAt = LocalDateTime.now();
}
