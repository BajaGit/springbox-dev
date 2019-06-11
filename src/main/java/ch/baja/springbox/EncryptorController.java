package ch.baja.springbox;


import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jasypt")
public class EncryptorController {

	@GetMapping(value = "/encrypt", produces= MediaType.TEXT_PLAIN_VALUE)
	public String encrypt(String text, String password) {
		BasicTextEncryptor encryptor = new BasicTextEncryptor();
		encryptor.setPassword(password);
		return encryptor.encrypt(text);
	}
	
	@GetMapping(value = "/decrypt", produces= MediaType.TEXT_PLAIN_VALUE)
	public String decrypt(String text, String password) {
		BasicTextEncryptor encryptor = new BasicTextEncryptor();
		encryptor.setPassword(password);
		return encryptor.decrypt(text);
	}
}
