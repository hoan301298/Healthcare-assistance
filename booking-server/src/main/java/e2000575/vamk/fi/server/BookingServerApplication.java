package e2000575.vamk.fi.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookingServerApplication {

    public static void main(String[] args) {
        
        Dotenv dotenv = Dotenv.load();
        System.setProperty("SPRING_DATA_MONGODB_URI", dotenv.get("SPRING_DATA_MONGODB_URI"));
        System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT"));

        SpringApplication.run(BookingServerApplication.class, args);
    }
}