import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class test {
	
	public static void main(String[] args) {		
		
		// set the firefox driver
		System.setProperty("webdriver.gecko.driver","/sk yeh/Elements of Software Construction/Lecture Slides/geckodriver.exe");
		//System.setProperty("webdriver.chrome.driver","/Users/sudiptac/sudiptac/teaching/SUTD/50.003@2018/Test/chromedriver");
		WebDriver driver = new FirefoxDriver();
		//WebDriver driver = new ChromeDriver();

		// open my webpage
		driver.get("http://localhost:3000/#");
				
		/* class 'By' */

		// click the link with name "press release"
		driver.findElement(By.id("button")).click();

		/* driver shifts to another page */
		
		// click the link name "Event"
		driver.findElement(By.linkText("HOME")).click();
		
		// click the link name "Publications"
		driver.findElement(By.className("btnLogout")).click();

	}
}
