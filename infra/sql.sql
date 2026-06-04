-- MySQL Workbench Forward Engineering
-- PostgreSQL Migration

CREATE SCHEMA IF NOT EXISTS cafesystem;
SET search_path TO cafesystem;

-- -----------------------------------------------------
-- Table `cafesystem`.`bill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bill (
  id INT NOT NULL,
  contactnumber VARCHAR(25) DEFAULT NULL,
  createdby VARCHAR(25) DEFAULT NULL,
  email VARCHAR(25) DEFAULT NULL,
  name VARCHAR(50) DEFAULT NULL,
  paymentmethod VARCHAR(10) DEFAULT NULL,
  productdetails JSONB DEFAULT NULL,
  total INT DEFAULT NULL,
  uuid VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id)
);


-- -----------------------------------------------------
-- Table `cafesystem`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS category (
  id INT NOT NULL,
  name VARCHAR(25) DEFAULT NULL,
  PRIMARY KEY (id)
);


-- -----------------------------------------------------
-- Table `cafesystem`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS hibernate_sequence (
  next_val BIGINT DEFAULT NULL
);


-- -----------------------------------------------------
-- Table `cafesystem`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS product (
  id INT NOT NULL,
  description VARCHAR(100) DEFAULT NULL,
  status VARCHAR(25) DEFAULT NULL,
  name VARCHAR(25) DEFAULT NULL,
  price INT DEFAULT NULL,
  category_fk INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK275nu1ncohhfur6qhxiwrm3go
    FOREIGN KEY (category_fk)
    REFERENCES category (id)
);

-- Indexes in PostgreSQL are created as separate statements
CREATE INDEX IF NOT EXISTS FK275nu1ncohhfur6qhxiwrm3go_idx ON product (category_fk);


-- -----------------------------------------------------
-- Table `cafesystem`.`user`
-- -----------------------------------------------------
-- "user" is a reserved keyword in PostgreSQL
CREATE TABLE IF NOT EXISTS "user" (
  id INT NOT NULL,
  contact_number VARCHAR(15) DEFAULT NULL,
  email VARCHAR(25) DEFAULT NULL,
  name VARCHAR(25) DEFAULT NULL,
  password VARCHAR(30) DEFAULT NULL,
  role VARCHAR(15) DEFAULT NULL,
  status VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (id)
);
