# Local Authentication Lab - Username/Password

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

We've seen how to implement an authentication manually using `bcrypt`. This can be valid for a simple auth system, but if you want to implement a secure and scalable auth system inside a Node app, you should use passport.js.

This lab is about implementing a login system and limit the access of some pages to authenticated users.

You do not need to put everything in controllers - if the route handlers are in app.js it's fine. The main goal for this lab is to create the auth strategy with passport.

## Exercise

#### Requirements

- Create a login form with email & password
- Use passport-local to find User & verify password
- Restrict access to API without an authenticated user
- The app should have 4 route with methods and views:
  - Home (/)
  - Login (/login)
  - Signup (/signup)
  - Profile (/profile)

**Bonus:**
- Create a CRUD resource, then authorise index and show to all users and limit access to create, update and delete to only authenticated users.
- Add twitter bootstrap.
- Move the route handlers in a separate controller.
- Add a navbar that displays different links if the user is signed in or not

#### Starter code

Please find the starter code including all the files that you need for this app and some comments about which bits of code should be in which file.

#### Deliverable

Here are few screenshots of a potential solution:

![Node authentication lab screenshot](http://s15.postimg.org/fkcql2he3/Screen_Shot_2015_08_05_at_15_09_28.png)
![Node authentication lab screenshot](http://s15.postimg.org/3mfrkx30r/Screen_Shot_2015_08_05_at_15_09_34.png)
![Node authentication lab screenshot](http://s15.postimg.org/7g97u2kcr/Screen_Shot_2015_08_05_at_15_09_37.png)
![Node authentication lab screenshot](http://s15.postimg.org/7uajto4gb/Screen_Shot_2015_08_05_at_15_09_40.png)

## Additional Resources

- [PassportJS website](http://passportjs.org/)
