package com.example.demo.entitites;

public class BreedtypeReg {
	private int breedtypeid;
	private String breedname;
	private int typeid;
	public BreedtypeReg() {
		super();
	}
	public BreedtypeReg(int breedtypeid, String breedname, int typeid) {
		super();
		this.breedtypeid = breedtypeid;
		this.breedname = breedname;
		this.typeid = typeid;
	}
	public int getBreedtypeid() {
		return breedtypeid;
	}
	public void setBreedtypeid(int breedtypeid) {
		this.breedtypeid = breedtypeid;
	}
	public String getBreedname() {
		return breedname;
	}
	public void setBreedname(String breedname) {
		this.breedname = breedname;
	}
	public int getTypeid() {
		return typeid;
	}
	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}

}
