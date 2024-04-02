package com.expense.expensetrackerbackend;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="expenses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter



public class Expense{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


    private String description;


    private BigDecimal amount;



    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

}

