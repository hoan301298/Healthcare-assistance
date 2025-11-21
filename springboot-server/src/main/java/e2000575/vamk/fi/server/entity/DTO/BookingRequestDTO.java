package e2000575.vamk.fi.server.entity.DTO;

import e2000575.vamk.fi.server.entity.Hospital;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookingRequestDTO {
    private Hospital place;
    private String name;
    private String email;
    private String phone;
    private String time;
    private String date;
    private String reason;
    private String notes;
}
