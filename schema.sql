-- Tables needed: projects, blogs, 
CREATE TABLE projects (
  project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title STRING NOT NULL,
);

CREATE TABLE project_paragraphs (

);

CREATE TABLE blog_posts (
  post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title STRING NOT NULL,
  description STRING NOT NULL,
  url STRING NOT NULL,
);

CREATE TABLE authorized_users (
  user_id INT NOT NULL,
  username VARCHAR(255),
  password VARCHAR(255),
  CONSTRAINT user_constraint PRIMARY KEY (user_id,username)
)

CREATE TABLE authorized_sessions (
  session_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  expiration_time DATETIME DEFAULT CURRENT_TIMESTAMP + INTERVAL 15 MINUTE,
  user_id INT NOT NULL,
  client_id VARCHAR(36), --Need to generate cookie for this
);



/*
-- create "users" table
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NULL,
  PRIMARY KEY (`id`)
);

-- create "blog_posts" table
CREATE TABLE `blog_posts` (
  `id` int NOT NULL,
  `title` varchar(100) NULL,
  `body` text NULL,
  `author_id` int NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `author_fk` FOREIGN KEY (`author_id`) REFERENCES `example`.`users` (`id`)
);
*/