-- Database initialization file. Executed on the Docker container first start.
-- See: https://hub.docker.com/_/mysql#initializing-a-fresh-instance
CREATE TABLE IF NOT EXISTS student (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), birthdate VARCHAR(30), hobbies VARCHAR(255), photo VARCHAR(255)) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO student(firstname, lastname, birthdate, photo) VALUES ("Douglas", "Muraoka", "06/21/1990", "http://www.google.com");