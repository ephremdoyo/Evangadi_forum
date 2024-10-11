
CREATE TABLE IF NOT EXISTS users (
    userid INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,  
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userid)
);
CREATE TABLE IF NOT EXISTS questions (
    id INT NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    tag VARCHAR(20),
    PRIMARY KEY (id,questionid),  
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
    CREATE TABLE IF NOT EXISTS answers (
    answerid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    questionid VARCHAR(100) NOT NULL, 
    answer TEXT NOT NULL,  
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);