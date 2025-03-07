# Property Management System

## Project Summary
This project involves building a simple CRUD (Create, Read, Update, Delete) system to manage real estate properties. The system allows users to manage property listings, including creating new properties, viewing property details, updating existing properties, and deleting properties. The backend is implemented using **Spring Boot** and communicates with a **MySQL** database for persistent data storage. The frontend is designed using **HTML** and **JavaScript** with **AJAX** or **Fetch API** to interact with the backend.

### Main Functionality:
- **Create**: Allows users to add new property listings with information such as address, price, size, and description.
- **Read**: Users can view a list of all properties or individual property details by ID.
- **Update**: Users can modify the information of existing properties.
- **Delete**: Users can remove a property listing from the database.

## System Architecture

### Frontend
- **Technology**: HTML, JavaScript, AJAX or Fetch API.
- **Responsibilities**:
  - Provides the user interface for interacting with the system.
  - Displays forms for creating and updating properties.
  - Shows a list of all properties with options to view, update, or delete each property.
  - Sends HTTP requests to the backend using AJAX or Fetch API for CRUD operations.
  - Validates user input on the client-side before sending data to the backend.
  
### Backend
- **Technology**: Spring Boot (Java).
- **Responsibilities**:
  - Exposes RESTful endpoints for CRUD operations on properties.
  - Handles incoming requests from the frontend to create, read, update, or delete properties.
  - Communicates with the MySQL database to store and retrieve property data.
  - Manages error handling, such as invalid inputs or requests for non-existent properties.

### Database
- **Technology**: MySQL with JPA/Hibernate.
- **Responsibilities**:
  - Stores property data including property ID, address, price, size, and description.
  - Uses **JPA/Hibernate** for mapping Java objects to database entities.
  - Supports CRUD operations for persistence and retrieval of property information.
 


# Diagrama de Clases
```
    +-----------------------------------------------------------------+
    |                       PropertyService                           |
    +-----------------------------------------------------------------+
    | - logger: Logger                                                |
    | - propertyRepository: PropertyRepository                        |
    +-----------------------------------------------------------------+
    | + createProperty(property: Property): Property                  |
    | + getAllProperties(): List<Property>                            |
    | + getPropertyById(id: Long): Optional<Property>                 |
    | + updateProperty(id: Long, updatedProperty: Property): Property |
    | + deleteProperty(id: Long): void                                |
    +-----------------------------------------------------------------+
                                     |
                                     | uses
                                     V
                +------------------------------------------+
                |             PropertyRepository           |
                +------------------------------------------+
                | + save(property: Property): Property     |
                | + findAll(): List<Property>              |
                | + findById(id: Long): Optional<Property> |
                | + deleteById(id: Long): void             |
                +------------------------------------------+
                                     |
                                     | modeled by
                                     V
              +---------------------------------------------+
              |                   Property                  |
              +---------------------------------------------+
              | - id: Long                                  |
              | - address: String                           |
              | - price: Double                             |
              | - size: Double                              |
              | - description: String                       |
              +---------------------------------------------+
              | + getId(): Long                             |
              | + getAddress(): String                      |
              | + getPrice(): Double                        |
              | + getSize(): Double                         |
              | + getDescription(): String                  | 
              | + setId(id: Long): void                     |
              | + setAddress(address: String): void         |
              | + setPrice(price: Double): void             |
              | + setSize(size: Double): void               |
              | + setDescription(description: String): void |
              +---------------------------------------------+
```

# Diagrama de Despliegue en AWS

```
                        +----------------------------+
                        |       Usuario Final        |
                        +----------------------------+
                                      |
                                      | HTTP / Fetch Data
                                      |
                                      V
                        +---------------------------+
                        |   EC2 - Backend/Front     ||
                        +---------------------------+
                        |  - Servidor Web (Apache)  |
                        |  - API REST (Spring Boot) |
                        |  - Archivos estáticos     |
                        +---------------------------+
                                      |
                                      | JDBC
                                      |
                                      V
                          +-----------------------+
                          |   EC2 - MySQL         |
                          |   (Base de Datos)     |
                          +-----------------------+
                          |  - MySQL Database     |
                          |  - MySQL Server       |
                          +-----------------------+
```

# Deployment Instructions

## 1. Generate Docker Image for Backend
First, create a `Dockerfile` in the root of your Spring Boot project:

```dockerfile
FROM openjdk:22-jdk-slim
WORKDIR /usrapp/bin

ENV PORT=8080
EXPOSE 8080

COPY target/classes /usrapp/bin/classes/
COPY target/dependency /usrapp/bin/dependency/
COPY src/main/resources/static /usrapp/bin/static/

CMD ["java", "-cp", "/usrapp/bin/classes:/usrapp/bin/dependency/*", "[ROUTE TO YOUR MAIN FILE]"
```
## 2. Build the Docker image:
```
docker build -t property-management 
```

## 3. Set Up MySQL Database in AWS
Launch a MySQL instance using a MySQL container on AWS EC2.

Configure the application.properties file in the Spring Boot project to connect to the MySQL instance.

```
spring.datasource.url=jdbc:mysql://[PUBLIC IP MYSQL INSTANCE]/[NAME OF THE TABLE TO USE]
spring.datasource.username=[USER]
spring.datasource.password=[PASSWORD]
spring.web.resources.static-locations=classpath:/static/
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 4. Deploy the Application to AWS EC2
Create a repository in Docker Hub.

In the root of your project run the following lines fo code to create an image of your app.
```
mvn clean install
docker build -t [DOCKER HUB USERNAME]/[REPOSITORY] .
docker push [DOCKER HUB USERNAME]/[REPOSITORY]
```

Launch an EC2 instance and install Docker.

Transfer the Docker image to EC2 and run the container:
```
docker pull [DOCKER HUB USERNAME]/[REPOSITORY]
docker run -d -p 80:8080 [DOCKER HUB USERNAME]/[REPOSITORY]
```


## 5. Accessing the Application
Once the backend is deployed and running, the application can be accessed via the public IP address of the EC2 instance, at:
```
http://<EC2_IP>
```


# Evidence
### Web Running

https://github.com/user-attachments/assets/aed44d1c-ec47-495b-8eec-c259724bcf7f



### Deployment

https://github.com/user-attachments/assets/49f3649a-8f92-45cc-8828-f49e38fbde37


