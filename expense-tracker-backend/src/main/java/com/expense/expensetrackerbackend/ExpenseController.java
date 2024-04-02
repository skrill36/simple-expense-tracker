package com.expense.expensetrackerbackend;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;


    @GetMapping("/getAll")
    public ResponseEntity<List <Expense>> getAllExpenses(){

        try{
            List<Expense> expenseList = new ArrayList<>();
            expenseRepository.findAll().forEach(expenseList::add);

            if (expenseList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(expenseList, HttpStatus.OK);

        }
        catch(Exception ex){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id){

        Optional<Expense> expenseObj = expenseRepository.findById(id);
        if (expenseObj.isPresent()) {
            return new ResponseEntity<>(expenseObj.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/addExpense")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense){

        try {

            Expense expenseObj= expenseRepository.save(expense);
            return new ResponseEntity<>(expenseObj, HttpStatus.CREATED);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PostMapping("/updateById/{id}")
    public ResponseEntity<Expense> updateExpenseById(@PathVariable Long id, @RequestBody Expense expense){

        try {

            Optional<Expense> expenseData= expenseRepository.findById(id);

            if(expenseData.isPresent()){
                Expense updatedExpense=expenseData.get();
                updatedExpense.setName(expense.getName());
                updatedExpense.setDescription(expense.getDescription());
                updatedExpense.setAmount(expense.getAmount());
                updatedExpense.setDate(expense.getDate());

                Expense expenseObj = expenseRepository.save(updatedExpense);
                return new ResponseEntity<>(expenseObj, HttpStatus.CREATED);

            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteExpense(@PathVariable Long id) {
        try {
            expenseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAllExpenses() {
        try {
            expenseRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    
   
    
}
