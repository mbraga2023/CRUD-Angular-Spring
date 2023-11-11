# CRUD Project using Angular and Spring Boot

This repository contains a CRUD (Create, Read, Update, Delete) project created by following the tutorial by [Loiane Groner](https://www.youtube.com/@loianegroner) on YouTube, with adaptations The project utilizes Angular and Spring Boot, focusing on RESTful APIs, DTO (Data Transfer Object) usage, lazy loading with routing, controller advice for exception handling, the mapper pattern, Angular Material for user interface components, form validations, and enum persistence.

## Original Tutorial by Loiane Groner

The foundation of this project is based on the YouTube tutorial by Loiane Groner. You can find the tutorial series on her YouTube channel:

- [Loiane Groner's YouTube Channel](https://www.youtube.com/@loianegroner)

## Repository

The code for this project is hosted on the following repository:

- [GitHub Repository](https://github.com/mbraga2023/CRUD-Angular-Spring)

## Technologies Used

- Angular: A modern, front-end JavaScript framework.
- Spring Boot: A Java-based framework for building robust and scalable back-end applications.
- Angular Material: A Material Design component library for Angular.
- DTO (Data Transfer Object): Used for transferring data between the client (Angular) and server (Spring Boot) while minimizing data transfer.
- Enum Persistence: Storing enum values in a database for efficient and structured data handling.

## Features

1. **Create, Update, and Delete Operations**: The project allows users to create, update, and delete records through a user-friendly interface.

2. **RESTful API**: The backend is designed using RESTful API principles, providing endpoints for these CRUD operations.

3. **Lazy Loading with Routing**: Angular's lazy loading and routing mechanisms are employed to enhance application performance by loading only the required modules and components.

4. **Exception Handling with Controller Advice**: Custom exception handling is implemented using Spring Boot's Controller Advice to provide informative and user-friendly error messages in case of errors.

5. **Mapper Pattern**: The mapper pattern is used to efficiently convert between DTOs and domain objects, ensuring a clear separation of concerns.

6. **Angular Material**: The user interface is designed using Angular Material components, providing a modern and responsive design.

7. **Form Validations**: Forms are validated on the client-side to ensure data integrity and provide a better user experience.

8. **Enum Persistence**: Enum values are stored and retrieved from the database, allowing for structured data handling.

## Getting Started

Follow these steps to get the project up and running:

1. Clone the repository:

   ```
   git clone https://github.com/mbraga2023/CRUD-Angular-Spring.git
   ```

2. Navigate to the Angular client folder and install the dependencies:

   ```
   cd angular-client
   npm install
   ```

3. Start the Angular development server:

   ```
   ng serve
   ```

4. Open a web browser and access the Angular application at [http://localhost:4200](http://localhost:4200).

5. Open the Spring Boot project in your preferred IDE (e.g., IntelliJ IDEA, Eclipse) and run the application.

6. Access the RESTful API at [http://localhost:8080/api](http://localhost:8080/api).

## Contributors

- Michel Braga (https://github.com/mbraga2023)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Loiane Groner](https://www.youtube.com/@loianegroner)) for providing the educational content and inspiration for this project.

Feel free to customize this README with additional details specific to your project. Happy coding!
