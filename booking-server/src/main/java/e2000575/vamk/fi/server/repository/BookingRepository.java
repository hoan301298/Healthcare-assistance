package e2000575.vamk.fi.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import e2000575.vamk.fi.server.entity.BookingForm;

@Repository
public interface BookingRepository extends MongoRepository<BookingForm, String> {
    List<BookingForm> findByHashedEmail(String hashedEmail);
}
