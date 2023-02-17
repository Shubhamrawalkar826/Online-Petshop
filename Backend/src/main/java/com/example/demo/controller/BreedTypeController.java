package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entitites.Breedtype;
import com.example.demo.entitites.BreedtypeReg;
import com.example.demo.entitites.TypeId;
import com.example.demo.repository.TypeIdRepository;
import com.example.demo.service.BreedtypeService;

@CrossOrigin(origins = "http://localhost:3100")
@RestController
public class BreedTypeController {

	@Autowired
	BreedtypeService bserv;
	
	@Autowired
	TypeIdRepository tprepo;
	
	
	@GetMapping("/showdata/{id}")
	public List<Breedtype> getAll(@PathVariable("id") int typeid)
	{
		return bserv.getAll(typeid);
	}
	
	@GetMapping("/allbreeds")
	public List<Breedtype> getBreeds(){
		return bserv.getAll();
	}
	
	@PostMapping("/savebreed")
	public ResponseEntity<?> save(@RequestBody BreedtypeReg b)
	{ 
		TypeId tp = tprepo.findByTypeid(b.getTypeid());
		Breedtype bd = bserv.getByBreedname(b.getBreedname());
		if(bd==null) {
		Breedtype bt = new Breedtype(b.getBreedtypeid(),b.getBreedname(),tp); 
		return ResponseEntity.ok().body(bserv.addData(bt));
		}
		else {
			return ResponseEntity.badRequest().body("Already exists");
		}
	}
	
}
