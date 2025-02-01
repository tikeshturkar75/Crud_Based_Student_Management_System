package net.tikesh.springboot.model;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;


@Entity
@Table(name = "employees")
 
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "father_name")
	private String fathername;
	
	@Column(name = "aadhar_no")
	private String aadhar;
	
	@Column(name = "pan_no")
	private String pan;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "email_id")
	private String emailId;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "file_name")
	private String filename;
	
	@Column(name = "content_type")
	private String contentType;
	
	@Column(name = "dob")
	private LocalDate dob;
	
	@Column(name = "contact_no")
	private String  contact;
	
	@Lob
	@Column(name = "file")
	private byte[] data;
	
	public Employee() {
		
	}
	
	
	public Employee(String firstName, String lastName, String fathername, String aadhar, String pan, String address,
			String gender, String emailId, String password, String filename, String contentType, LocalDate dob,
			String contact) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.fathername = fathername;
		this.aadhar = aadhar;
		this.pan = pan;
		this.address = address;
		this.gender = gender;
		this.emailId = emailId;
		this.password = password;
		this.filename = filename;
		this.contentType = contentType;
		this.dob = dob;
		this.contact = contact;
	}


	public String getContact() {
		return contact;
	}


	public void setContact(String contact) {
		this.contact = contact;
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	
	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
	
	public String getFathername() {
		return fathername;
	}
	public String getAadhar() {
		return aadhar;
	}
	public String getPan() {
		return pan;
	}
	public String getAddress() {
		return address;
	}
	public String getGender() {
		return gender;
	}
	public String getPassword() {
		return password;
	}
	public void setFathername(String fathername) {
		this.fathername = fathername;
	}
	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String Filename) {
		// TODO Auto-generated method stub
		this.filename = Filename;
	}
	
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		// TODO Auto-generated method stub
		this.contentType = contentType;
	}
	
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] bytes) {
		// TODO Auto-generated method stub
		this.data = bytes;
	}
	
}
