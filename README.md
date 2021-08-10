# myFlix React

The front end or client-side of my myFlix app making use of the existing server-side of the myFlix API that I built using **MongoDB**.

## Features ✅

---

**Main View**

- Return a list of ALL movies listed with an image, title, and description
- Search/filter movies
- Ability to select a movie for more details

**Single Movie View**

- Return data (description, genre, director, and image URL) about a single movie
- Allow users to add a movie to their list of favorites

**Login View**

- Allow users to log in with a username and password
- Allow user to register (username, password, email and DOB) with a seperate similar \
  **registration view**
- Authentication and authorization into API using basic HTTP authentication and JWT (token-based) authorization

**Genre View**

- Return data about a genre, with a name and description
- Display all movies of that genre

**Director View**

- Return data about a director
- Display all movies directed by that director

**Profile View**

- Allow users to update their user info(username, password, email, DOB)
- Allow users to deregister/delete their profile
- Display users favorite movies
- Allow users to remove movies from their favorites list

---

### User Stories

1. As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
2. As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Technologies

- Javascript
- Node.js
- React
- React Redux
- React Bootstrap
- Kanban ([Trello](https://trello.com/))

# Quick Start 🚀

### Install dependencies

```bash
npm install
```

### Build for development

```bash
parcel [path to index.html]
```

_By default path to index.html is 'src/index.html'_

```bash
parcel src/index.html
```

**Note:** If you do not have parcel installed globally, your terminal will tell you that the command 'parcel' is not found. If this is the case, simply follow the instructions on [how to install parcel.js](https://parceljs.org/getting_started.html)

### Run application in browser

Parcel will run a local server on port: 1234

Open the application in your browser

```
http://localhost:1234/
```

---

## Final Reflections

<!-- I cant remember much about this other than having a difficult time understanding the point of endpoints but everything seemed to click after I started using Postmans because i could see the tanghible results of what the endpoints and HTTP requests meant -->

### Author

[Aaron Keohane](https://aakeohane.github.io/Portfolio-Website/index.html)

### Version

**_1.0.0_**
