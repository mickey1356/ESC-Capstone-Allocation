package com.example.testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;


public class StudentTesting {

    //login page
    static String[] myUserName = new String[]{"@&^@@mymail.sutd.edu.sg", "sweekhim_yeh@mymail.sutd.edu.sg"};
    static String[] myPassword = new String[] {"pass", "password"};

    //form page
    static String[] idArr = new String[]{"", "e04"};
    static String[] groupNameArr = new String[]{"", "Project e04 - OCBC Management"};
    static Integer[] prototypeArr = new Integer[] {0, 1};
    static Integer[] categoryArr = new Integer[] {0, 6};
    static String[] companyArr = new String[] {"" , "OCBC"};
    static String[] widthArr = new String[] {"" , "10"};
    static String[] breadthArr = new String[] {"" , "10"};
    static String[] heightArr = new String[] {"" , "10"};
    static String[] sizeNweightArr = new String[]{"" , "1m x 1m x 1m"};
    static String[] powerpointsArr = new String[]{"", "3"};
    static String[] pedestalArr = new String[]{"" , "1 Long"};
    static String[] otherRequestArr = new String[]{"", "2 Tables, 1 Chair"};

    //map allocation page
    static String[] boothArr = new String[] {"s07"};

    //reset password page
    static String[] studentIDArr = new String[]{"1003775"};
    static String[] newPasswordArr = new String[] {"newPassword"};
    static String[] confirmPasswordArr = new String[] {"newPassword"};
    //login page
    static String[] resetUserName = new String[]{"student@mymail.sutd.edu.sg"};
    static String[] resetPassword = new String[] {"password"};


    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.gecko.driver","/sk yeh/Elements of Software Construction/Lecture Slides/geckodriver.exe");
        WebDriver driver = new FirefoxDriver();

        driver.get("http://localhost:3000/#");
        WebDriverWait wait = new WebDriverWait(driver, 5); //explicit wait

        //testing login page
        for(int i=0; i<myUserName.length; i++){
            WebElement username = driver.findElement(By.id("email"));
            WebElement password = driver.findElement(By.id("password"));
            username.clear();
            password.clear();

            username.sendKeys(myUserName[i]);
            Thread.sleep(1000);
            password.sendKeys(myPassword[i]);
            Thread.sleep(1000);


            driver.findElement(By.id("submit")).click();

            try {
                Thread.sleep(3000);
                driver.switchTo().alert().accept();
                wait.until(ExpectedConditions.elementToBeClickable(By.linkText("CONTACT")));
                System.out.println("login successful");
                Thread.sleep(1000);
                break;
            } catch (Exception NoSuchElementException) {
                System.out.println("username/password invalid");
            }
        }

        //testing the buttons on the form page
        Thread.sleep(5000);
        driver.findElement(By.linkText("CONTACT")).click();
        System.out.println("contact button clicked");
        Thread.sleep(5000);

        driver.findElement(By.linkText("FORM")).click();
        System.out.println("form button clicked");
        Thread.sleep(2000);

        driver.findElement(By.linkText("HOME")).click();
        System.out.println("home button clicked");
        Thread.sleep(2000);

        //fill up form
        for(int i=0; i<groupNameArr.length; i++){
            WebElement id = driver.findElement(By.id("id"));
            WebElement groupName = driver.findElement(By.id("groupName"));
            WebElement prototype = driver.findElement(By.id("prototype"));
            Select dropdown = new Select(prototype);
            WebElement category = driver.findElement(By.id("category"));
            Select dropdown1 = new Select(category);
            WebElement company = driver.findElement(By.id("company"));
            WebElement width = driver.findElement(By.id("width"));
            WebElement breadth = driver.findElement(By.id("breadth"));
            WebElement height = driver.findElement(By.id("height"));
            WebElement sizeNweight = driver.findElement(By.id("sizeNweight"));
            WebElement powerpoints = driver.findElement(By.id("powerpoints"));
            WebElement pedestal = driver.findElement(By.id("pedestal"));
            WebElement otherRequest = driver.findElement(By.id("otherRequest"));
            id.clear();
            groupName.clear();
            company.clear();
            width.clear();
            breadth.clear();
            height.clear();
            sizeNweight.clear();
            powerpoints.clear();
            pedestal.clear();
            otherRequest.clear();

            id.sendKeys(idArr[i]);
            Thread.sleep(1000);
            groupName.sendKeys(groupNameArr[i]);
            Thread.sleep(1000);
            dropdown.selectByIndex(prototypeArr[i]);
            Thread.sleep(1000);
            dropdown1.selectByIndex(categoryArr[i]);
            Thread.sleep(1000);
            company.sendKeys(companyArr[i]);
            Thread.sleep(1000);
            width.sendKeys(widthArr[i]);
            Thread.sleep(1000);
            breadth.sendKeys(breadthArr[i]);
            Thread.sleep(1000);
            height.sendKeys(heightArr[i]);
            Thread.sleep(1000);
            sizeNweight.sendKeys(sizeNweightArr[i]);
            Thread.sleep(1000);
            powerpoints.sendKeys(powerpointsArr[i]);
            Thread.sleep(1000);
            pedestal.sendKeys(pedestalArr[i]);
            Thread.sleep(1000);
            otherRequest.sendKeys(otherRequestArr[i]);
            Thread.sleep(1000);

            driver.findElement(By.id("submit")).click();

            try {
                wait.until(ExpectedConditions.urlToBe("http://localhost/formCheck.php"));
                System.out.println("form has been submitted successful");
                Thread.sleep(3000);
                driver.navigate().back();
                Thread.sleep(1000);
                break;
            } catch (Exception NoSuchElementException) {
                System.out.println("invalid inputs");
            }
        }

        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("CONTACT")));
        Thread.sleep(5000);

        //map allocation page
        driver.findElement(By.id("mapAllocation")).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.id("viewbtn")));
        WebElement viewBooth = driver.findElement(By.id("boothID2"));
        WebElement viewBtn = driver.findElement(By.id("viewbtn"));
        Thread.sleep(15000);
        for(int i=0; i<boothArr.length; i++){
            viewBooth.sendKeys(boothArr[i]);
            viewBtn.click();
            System.out.println("booth viewed successfully");
            Thread.sleep(10000);
        }
        driver.navigate().back();

        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("CONTACT")));
        Thread.sleep(5000);

        //testing reset password
        wait.until(ExpectedConditions.elementToBeClickable(By.id("btnChangePw")));
        driver.findElement(By.id("btnChangePw")).click();

        for(int i=0; i<studentIDArr.length; i++){
            WebElement studentID = driver.findElement(By.id("studentID"));
            WebElement newPassword = driver.findElement(By.id("new_password"));
            WebElement confirmPassword = driver.findElement(By.id("confirm_password"));
            studentID.clear();
            newPassword.clear();
            confirmPassword.clear();

            studentID.sendKeys(studentIDArr[i]);
            Thread.sleep(1000);
            newPassword.sendKeys(newPasswordArr[i]);
            Thread.sleep(1000);
            confirmPassword.sendKeys(confirmPasswordArr[i]);
            Thread.sleep(1000);

            driver.findElement(By.id("submit")).click();

            try {
                wait.until(ExpectedConditions.urlToBe("http://localhost:3000/form"));
                System.out.println("password changed successfully");
                Thread.sleep(3000);
                break;
            } catch (Exception NoSuchElementException) {
                System.out.println("password changed unsuccessfully");
            }
        }

        wait.until(ExpectedConditions.elementToBeClickable(By.id("btnLogout")));
        driver.findElement(By.id("btnLogout")).click();
        System.out.println("logged out successfully");

        //check if password reset was effective
        for(int i=0; i<resetUserName.length; i++){
            WebElement username = driver.findElement(By.id("email"));
            WebElement password = driver.findElement(By.id("password"));
            username.clear();
            password.clear();

            username.sendKeys(resetUserName[i]);
            Thread.sleep(1000);
            password.sendKeys(resetPassword[i]);
            Thread.sleep(1000);

            driver.findElement(By.id("submit")).click();
            Thread.sleep(3000);

            try {
                wait.until(ExpectedConditions.urlToBe("http://localhost:3000/form"));
                System.out.println("login successful");
                Thread.sleep(1000);
                break;
            } catch (Exception NoSuchElementException) {
                System.out.println("username/password invalid");
            }
        }
    }
}
