package com.example.testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

public class BoothInputFuzzer {
    public static void main(String[] args) throws InterruptedException {
        String path = "C:\\sk yeh\\Elements of Software Construction\\";
        Fuzzer f = new Fuzzer(path + "input.txt", path + "output.txt");
        f.startFuzz();
        File file = new File("C:\\sk yeh\\Elements of Software Construction\\output.txt");
        BufferedReader br = null;
        ArrayList<String> boothIDArr = new ArrayList<>();
        ArrayList<String> breadthArr = new ArrayList<>();
        ArrayList<String> widthArr = new ArrayList<>();


        try {
            br = new BufferedReader(new FileReader(file));
            String st;
            while ((st = br.readLine()) != null){
                String boothID = null;
                String breadth = null;
                String width = null;

                String[] result = st.split(" ");
                int size = result.length;
                if (size>0) boothID = result[0];
                if (size>1) breadth= result[1];
                if (size>2) width = result[2];

                if(boothID != null){
                    boothIDArr.add(boothID);
                }else{
                    boothIDArr.add("");
                }
                if(breadth != null){
                    breadthArr.add(breadth);
                }else{
                    breadthArr.add("");
                }
                if(width != null){
                    widthArr.add(width);
                }else{
                    widthArr.add("");
                }

                System.out.println("BoothID: " + boothIDArr);
                System.out.println("Breadth: " + breadthArr);
                System.out.println("Width: " + widthArr);
            }
        }catch(Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }finally{
            if(br!=null){
                try {
                    br.close();
                }catch(IOException e) {
                    System.out.println("Error closing");
                }
            }
        }

        System.setProperty("webdriver.chrome.driver","/sk yeh/Elements of Software Construction/Lecture Slides/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 5);

        driver.get("http://localhost:3000/map/");

        for(int i=0; i<boothIDArr.size(); i++){
            WebElement boothID = driver.findElement(By.id("boothID"));
            WebElement width = driver.findElement(By.id("width"));
            WebElement breadth = driver.findElement(By.id("height"));
            boothID.clear();
            width.clear();
            breadth.clear();

            boothID.sendKeys(boothIDArr.get(i));
            Thread.sleep(1000);
            width.sendKeys(widthArr.get(i));
            Thread.sleep(1000);
            breadth.sendKeys(breadthArr.get(i));
            Thread.sleep(1000);

            wait.until(ExpectedConditions.elementToBeClickable(By.id("changebtn")));
            driver.findElement(By.id("changebtn")).click();
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
            Thread.sleep(2000);
        }
    }
}

class Fuzzer {
    String fileName;
    String outputFileName;
    Random rand = new Random();
    MutationOperators mut = new MutationOperators();

    Fuzzer(String fileName, String outputFileName){
        this.fileName = fileName;
        this.outputFileName = outputFileName;
    }
    public void startFuzz(){
        File file = new File(fileName);
        File file1 = new File(outputFileName);
        int op;
        String newString;
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            br = new BufferedReader(new FileReader(file));
            bw = new BufferedWriter(new FileWriter(file1));
            String st;
            do {
                st = br.readLine();
                if(st!=null) {
                    System.out.println("Line: "+st);
                    // randomly choose an operator
                    op = rand.nextInt(mut.getNumberOfMutationOp());
                    // start mutation
                    String st_trim = st.trim();
                    newString = mut.startMutating(op,st_trim);
                    // write into file1
                    bw.write(newString+"\n");
                }
            } while(st!=null);
        }catch(Exception e) {
            System.out.println("Error: "+e.getMessage());
        }finally{
            if(br!=null){
                try {
                    br.close();
                }catch(IOException e) {
                    System.out.println("Error closing");
                }
            } if(bw!=null){
                try {
                    bw.close();
                }catch(IOException e) {
                    System.out.println("Error closing");
                }
            }
        }
    }
}

class MutationOperators {
    // change this if there are more operators added
    private int numberOfMutationOp = 3;

    public int getNumberOfMutationOp() {
        return numberOfMutationOp;
    }

    public String startMutating(int i, String input) {
        String finalstring = "";
        // SWAP
        if (i == 0) {
            System.out.println("Swapping");
            if (input.length() == 1) {
                finalstring = input;
            } else {
                Random rand = new Random();
                int first = rand.nextInt(input.length());
                int second = rand.nextInt(input.length());
                // ensure that first and second position isnt the same -> ensures swapping happens
                while (second == first) {
                    second = rand.nextInt(input.length());
                }
                System.out.println("Between positions " + first + " and " + second);
                char[] ch = input.toCharArray();
                char t = ch[first];
                ch[first] = ch[second];
                ch[second] = t;
                finalstring = new String(ch);
            }
        }
        // BIT FLIP
        else if (i == 1) {
            System.out.println("Flipping bit");
            // choose a position
            Random rand = new Random();
            int position = rand.nextInt(input.length());
            // choose a bit position
            int bit_position = (rand.nextInt(5000)) % 7;
            System.out.println("position " + position + " in line and bit " + bit_position + " will be changed");
            char ch = input.charAt(position);
            int j = (int) ch;
            // get the binary string of the char
            String binStr = Integer.toBinaryString(j);
            // ensure the string is 7 in length
            if (binStr.length() != 7) {
                binStr = "0" + binStr;
            }
            char[] chAr = binStr.toCharArray();
            // flip the bit
            if (chAr[bit_position] == '1') {
                chAr[bit_position] = '0';
            } else {
                chAr[bit_position] = '1';
            }
            // all bytes bigger than 128 (2^7) are not valid ASCII characters.
            String newbinStr = new String(chAr);
            int parseInt = Integer.parseInt(newbinStr, 2);
            // get back the new char
            char newChar = (char) parseInt;
            char[] ori = input.toCharArray();
            // replace the char to the new one
            ori[position] = newChar;
            finalstring = new String(ori);
        }
        // TRIM
        else if (i == 2) {
            System.out.println("trimming");
            if (input.length() == 1) {
                finalstring = input;
            } else {
                Random rand = new Random();
                int position = rand.nextInt(input.length() - 1) + 1;
                System.out.println("Trimmed starts at position " + position);
                finalstring = input.substring(0, position);
            }
        }
        // add on else if if there are more operators
        else {
            System.out.println("ERROR: Pls update numberOfMutationOp accordingly");
        }
        System.out.println("Modified String: " + finalstring);
        return finalstring;
    }
}
