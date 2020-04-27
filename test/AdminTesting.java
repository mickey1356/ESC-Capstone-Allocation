package com.example.testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AdminTesting {

    //login page
    static String[] myAdmin = new String[]{"admin@mymail.sutd.edu.sg"};
    static String[] myPassword = new String[] {"password"};

    //change booth data
    static String[] boothIDArr = new String[]{"asf", "s07"};
    static String[] breadthArr = new String[] {"asf", "13"};
    static String[] widthArr = new String[]{"asf", "13"};

    //view booth
    static String[] boothArr = new String[] {"s07"};

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver","/sk yeh/Elements of Software Construction/Lecture Slides/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000/adminLogin");
        WebDriverWait wait = new WebDriverWait(driver, 5);

        //login page
        for(int i=0; i<myAdmin.length; i++){
            WebElement username = driver.findElement(By.id("email"));
            WebElement password = driver.findElement(By.id("password"));
            username.clear();
            password.clear();

            username.sendKeys(myAdmin[i]);
            Thread.sleep(1000);
            password.sendKeys(myPassword[i]);
            Thread.sleep(1000);

            driver.findElement(By.id("submit")).click();

            try {
                Thread.sleep(3000);
                driver.switchTo().alert().accept();
                wait.until(ExpectedConditions.elementToBeClickable(By.id("runalgo")));
                System.out.println("login successful");
                Thread.sleep(1000);
            } catch (Exception NoSuchElementException) {
                System.out.println("login/password name invalid");
            }
        }

        //access database
        Thread.sleep(11000);
        driver.findElement(By.id("accessdb")).click();
        System.out.println("database accessed");
        Thread.sleep(8000);
        driver.navigate().back();
        Thread.sleep(3000);

        //export to excel
        driver.findElement(By.id("submitForm")).click();
        System.out.println("export to excel successfully");
        Thread.sleep(8000);
        driver.navigate().back();


        //run algorithm
        Thread.sleep(3000);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("runalgo")));
        driver.findElement(By.id("runalgo")).click();
        System.out.println("run algo clicked");
        Thread.sleep(5000);

        //view booth
        WebElement viewBooth = driver.findElement(By.id("boothID2"));
        WebElement viewBtn = driver.findElement(By.id("viewbtn"));
        Thread.sleep(5000);
        for(int i=0; i<boothArr.length; i++){
            viewBooth.sendKeys(boothArr[i]);
            viewBtn.click();
            System.out.println("booth viewed successfully");
            Thread.sleep(5000);
            viewBooth.clear();
        }

        //adjusting booth data
        for(int i=0; i<boothIDArr.length; i++){
            WebElement boothID = driver.findElement(By.id("boothID"));
            WebElement width = driver.findElement(By.id("width"));
            WebElement breadth = driver.findElement(By.id("height"));
            boothID.clear();
            width.clear();
            breadth.clear();

            boothID.sendKeys(boothIDArr[i]);
            Thread.sleep(1000);
            width.sendKeys(widthArr[i]);
            Thread.sleep(1000);
            breadth.sendKeys(breadthArr[i]);
            Thread.sleep(1000);

            Thread.sleep(1000);
            driver.findElement(By.id("changebtn")).click();
            Thread.sleep(5000);
            driver.switchTo().alert().accept();
            System.out.println("adjust booth successfully");
        }

        //add admin
        Thread.sleep(8000);
        driver.findElement(By.id("addAdmin")).click();
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("email"));
        Thread.sleep(2000);
        WebElement submit = driver.findElement(By.id("submitbtn"));
        email.sendKeys("sweekhim_yeh@mymail.sutd.edu.sg");
        Thread.sleep(2000);
        submit.click();
        Thread.sleep(8000);
        System.out.println("Add admin successfully");
        Thread.sleep(5000);

        //reset password
        wait.until(ExpectedConditions.elementToBeClickable(By.id("runalgo")));
        driver.findElement(By.id("resetPw")).click();
        Thread.sleep(8000);
        System.out.println("Reset password successfully");
        driver.navigate().back();
        Thread.sleep(5000);

        //logout
        Thread.sleep(1000);
        driver.findElement(By.id("btnLogout")).click();
        System.out.println("Logout successfully");
    }
}
