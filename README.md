# [REST API](https://rest-api-treehouse-project-9.herokuapp.com/)
## **Grade:** :heavy_check_mark: Exceeds Expectations
### **Premise** 
> In this project, you’ll create a REST API using Express. The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database.

> In addition, the project will require users to create an account and log-in to make changes to the database.

> To complete this project, you’ll use your knowledge of REST API design, Node.js, and Express to create API routes, along with the Mongoose ORM for data modeling, validation, and persistence. To test your application, you'll use Postman, a popular application for exploring and testing REST APIs.
### **Project Instructions**
1. Install Node modules and get the database setup 
2. Install and Configure Mongoose
   - #### Reviewer Comments:
   - > Great! Everything has been connected and I see the message assuring me of the connection. It's up and running now!
3. Create your Mongoose schema and models
   - #### Reviewer Comments:
   - > I have to put in the names, email and password, or else......!!!
   - > Haha, yes this is working perfectly.
   - > Your schema is following the guidelines of what should be included. There are other options that can be done in addition to what you have here, so definitely try them out when you get the chance!
4. Create the user routes
   - #### Reviewer Comments:
   - > Great job finding the issue here and getting it fixed. I am able to both successfully create a user and return the user who is logged in. Fabulous!
5. Create the course routes
6. Update User and Course routes
7. Hashing the password
   - Update the POST /api/users route to hash the user's password before persisting the user to the database.
   - #### Reviewer Comments:
   - > It looks like you were able to figure out the issue here. The user's password is successfully being hashed. Awesome!
8. Set up permissions to require users to be signed in
   - #### Reviewer Comments:
   - > Looks like the authentication is working well here. I'm not able to get user info or post, put, and delete courses without having a logged in user. Great job!
9. Test the routes
10. Add good code comments
### Extra Credit
1. Add additional user email address validations to the POST /api/users route
   - Validate that the provided email address value is in fact a valid email address.
   - Validate that the provided email address isn't already associated with an existing user record.
   - #### Reviewer Comments:
   - > Awesome job here! The POST and PUT routes validate that the required information is provided for each of the routes. And when creating a user, it checks to see if the email is a valid format. Fabulous!
2. Ensure that a user can only edit and delete their own courses
3. Course routes
   - When returning a list of courses using the GET /api/courses route or a single course using the GET /api/courses/:id route, use Mongoose deep population to return only the firstName and lastName properties of the related user on the course model. This will hide the user’s private details, like passwords and emails, from other users.
   - #### Reviewer Comments:
   - > Great job on this section! I am able to see a list of courses and an individual course, as well as create, update, and delete courses.
### Overall Comments
> Fabulous job creating your first REST API! You've done a great job putting everything together here and it's a huge accomplishment! Go ahead, sit back, and smile at what you've done. You're only 1 project away from being done! It's an exciting time.

> I want to make sure to say that your code is really well organized. It has lots of great comments and it's easy to follow along with. Awesome job!
