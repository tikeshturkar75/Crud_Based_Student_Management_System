package net.tikesh.springboot.controller;
import java.io.File;
import java.io.IOException;
import java.net.http.HttpHeaders;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



import jakarta.annotation.Resource;
import net.tikesh.springboot.exception.ResourceNotFoundException;
import net.tikesh.springboot.model.Employee;
import net.tikesh.springboot.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
@Validated

public class EmployeeController {
	private static final byte[] String = null;
	@Autowired
	private EmployeeRepository employeeRepository;
	
	
//================================================================================================================================================================
	@PostMapping("/employees/upload")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file){
		try {
			Employee employee = new Employee();
			employee.setFilename(file.getOriginalFilename());
			employee.setContentType(file.getContentType());
			employee.setData(file.getBytes());
			employeeRepository.save(employee);
			String message = "File uploaded successfully";
			HttpStatus httpStatus = HttpStatus.CREATED;
			return new ResponseEntity<>(message, httpStatus);
		} catch (IOException e) {
			// TODO: handle exception
			return ResponseEntity.status(500).build();
		}
	}
	
//=========================================================================================================================
	@GetMapping("/employees/files")
	public ResponseEntity<List<Employee>> getFile() {
		List<Employee> employees = employeeRepository.findAll();
		return ResponseEntity.ok(employees);
	}	
	
//===================================================================================================================================================================
//	@GetMapping("/downloadImage")
//	public ResponseEntity<byte[]> downloadImage(@RequestParam("imageName") String imageName, String contentType) {
//	    // Retrieve the image file from the storage (e.g., database, file system)
//	    byte[] imageData = // retrieve the image data;
//	    String; contentType = "image/png";
//	    org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
//	    headers.setContentType(MediaType.parseMediaType(contentType));
//	    headers.setContentDispositionFormData("attachment", imageName);
//	    return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
//	}
	
//	@GetMapping("/employees/downloadPdf")
//	public ResponseEntity<byte[]> downloadPdf(@RequestParam("pdfName") String pdfName, java.lang.String contentType) {
//	    // Retrieve the PDF file from the storage (e.g., database, file system)
//	    byte[] pdfData = // retrieve the PDF data;
//	    String; contentType = "application/pdf";
//	    org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
//	    headers.setContentType(MediaType.parseMediaType(contentType));
//	    headers.setContentDispositionFormData("attachment", pdfName);
//	    return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
//	}
	
	@GetMapping("/employees/download/{id}")
	public ResponseEntity<?> downloadFile(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id).orElse(null);
		if (employee != null) {
			org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
			headers.setContentType(MediaType.parseMediaType(employee.getContentType()));
			headers.setContentDisposition(ContentDisposition.attachment().filename(employee.getFilename()).build());
			ByteArrayResource resource = new ByteArrayResource(employee.getData());
			return ResponseEntity.ok().headers(headers).body(resource);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
//===============================================================================================================	
	//get all employees
	@GetMapping("/employees")
	public List<Employee> getEmployees(){
		return employeeRepository.findAll();
	}
		
	// create employee rest api
	
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
		}
	
	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		
		Employee employee = employeeRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Employee not exist with id :" +id));
		
		return ResponseEntity.ok(employee);
	}
	
	//update employee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		
		Employee employee = employeeRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Employee not exist with id :" +id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
		@DeleteMapping("/employees/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employeeRepository.delete(employee);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		
		@PostMapping("/employees/user")
		public ResponseEntity<Employee> registerUser(@Validated @RequestBody Employee employee) {
			
		 System.out.println("Controller called");
		 return ResponseEntity.ok(employeeRepository.save(employee));
			
			
		}
		
		@PostMapping("/employees/login")
		public ResponseEntity<?> loginUser(@RequestBody Employee employeeData){
			System.out.println(employeeData);
			Employee employee=employeeRepository.findByEmailId(employeeData.getEmailId());
			if (employee.getPassword().equals(employeeData.getPassword()))
				return ResponseEntity.ok(employee);
				
		
					return (ResponseEntity<?>) ResponseEntity.internalServerError();
		}
	
	

}
