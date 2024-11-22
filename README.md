# react-mysql-container
Repo to test container orchestration with react+node+mysql

> The docker-compose file was not properly tested yet

## The MySQl db
It will be needed:
- A db called koerber
- A table called devices 

In SQL:
```
CREATE TABLE `koerber`.`devices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `deviceName` VARCHAR(45) NOT NULL,
  `deviceType` VARCHAR(45) NOT NULL,
  `ownerName` VARCHAR(45) NOT NULL,
  `batteryStatus` INT NOT NULL DEFAULT 100,
  PRIMARY KEY (`id`));
```

## Backend
To start the server:
> cd back/
> npm i
> npm run dev

## Frontend
To start the react app:
> cd front/
> npm i
> npm run dev
