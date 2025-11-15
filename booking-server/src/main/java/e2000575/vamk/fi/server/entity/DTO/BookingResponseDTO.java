package e2000575.vamk.fi.server.entity.DTO;

import java.time.LocalDateTime;

import e2000575.vamk.fi.server.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDTO {
    private String id;
    private Hospital place;
    private String name;
    private String email;
    private String phone;
    private String time;
    private String date;
    private String reason;
    private String notes;
    private LocalDateTime createAt;
}
