package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index"; // Loads index.html from templates
    }

    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }

    @PostMapping("/submitOrder")
    @ResponseBody
    public String submitOrder(@RequestParam String name,
                              @RequestParam String phone,
                              @RequestParam String email,
                              @RequestParam String address,
                              @RequestParam String paymentMethod) {
        // Save to MongoDB here
        return "Order received successfully";
    }
}
