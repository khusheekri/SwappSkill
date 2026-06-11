-- Create Database
CREATE DATABASE skillswap_ai;

-- Use Database
USE skillswap_ai;

-- Create Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    bio TEXT
);