package edu.tolikhalas.jquerycaptchaboot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
@RequestMapping("/")
public class FormController implements WebMvcConfigurer {


    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("results").setViewName("results");
    }

    @GetMapping
    public String renderForm() {
        return "index";
    }

    @PostMapping
    public String redirectToResults() {
        return "redirect:/results";
    }


}
