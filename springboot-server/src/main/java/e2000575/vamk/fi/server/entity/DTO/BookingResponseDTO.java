package e2000575.vamk.fi.server.entity.DTO;

import java.time.LocalDateTime;

import e2000575.vamk.fi.server.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookingResponseDTO {
    private String id;
    private Hospital hospital;
    private String name;
    private String email;
    private String phone;
    private String time;
    private String date;
    private String reason;
    private String notes;
    private LocalDateTime createdAt;
}
