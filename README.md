# Sworte

Sworte will give people the chance to share their personal stories with the world.

This repository will contain all the codes that powers the application's functionalities.

### Sworte Features
* Users can signup and then login
* Authenticated (logged) users can request for password reset.
* Authenticated users can update profile
* Non-Authenticated users can access all/individual users' profiles
* Authenticated users can create as well as delete other user's testimonials
* Authenticated users can request user's to write their testimonials
* Authenticated users can comment on user's testimonials
* Authenticated users can upvote/downvote on user's testimonials
* Non-Authenticated users can access all/individual testimonials
* More will be added as see fit.

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

* [ExpressJS](https://www.expresjs.org/) This is the web application framework for NodeJS.

* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.


### Installation Guide
* Clone this repository [here](git@gitlab.com:sworte/sworte.git).
* The server branch is the most stable branch at any given time, ensure you're working with this. Checkout using `git checkout server`
* Please stick to the `git workflow` when working on branches. Raise PRs.
* Install the dependencies using `npm install`
* Download MongoDB if not available on your local computer [MongoDB](https://mongodb.com/download-center#community)
* Install and setup mongodb in your local computer or connect to mlab.
* Create a .env file in your project root to look like .env.sample provided also in this project root.


### Usage
##### On local computer
* Run `npm start:dev` to start the app.
* Connect to the app on `Postman` using port `4987` to test all endpoints.

### API Routes
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/users/signup | To create new user account |
| POST | /api/v1/users/login | To login user account |
| GET | /api/v1/users/ | To retrieve all users profile |
| GET | /api/v1/users/:userId | To retrieve an individual user profile |
| PUT | /api/v1/users/:userId/profile | To update user's profile |
| POST | /api/v1/users/:userId/testimonials | To create a new user's testimonials |
| GET | /api/v1/users/:userId/testimonials | To retrieve all testimonials for an individual testimonial |
| GET | /api/v1/users/:userId/testimonials/:testimonialId | To retrieve an user individual testimonial |
| DELETE | /api/v1/users/:userId/testimonials/:testimonialId | To delete an individual testimonial |
| POST | /api/v1/users/:userId/testimonials/:testimonialId/comments | To create a testimonial comment |
| GET | /api/v1/users/:userId/testimonials/:testimonialId/comments | To retrieve all testimonial comment |
| DELETE | /api/v1/users/:userId/testimonials/:testimonialId/comments/:commentId | To delete a testimonial comment |