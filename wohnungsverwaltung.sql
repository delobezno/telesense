CREATE DATABASE wohnungsverwaltung;

USE wohnungsverwaltung;

CREATE TABLE wohnungen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adresse VARCHAR(255) NOT NULL,
    groesse FLOAT NOT NULL,
    mietpreis DECIMAL(10, 2) NOT NULL
);

CREATE TABLE mieter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    wohnung_id INT,
    FOREIGN KEY (wohnung_id) REFERENCES wohnungen(id)
        ON DELETE SET NULL
);
