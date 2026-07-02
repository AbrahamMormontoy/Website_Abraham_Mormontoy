# Personal Portfolio Website

This is a frontend personal portfolio website styled after the classic Windows 95 OS. Built to showcase my projects, skills, and contact information, this project aims for more than that, as I have added features to make the experience of visiting a personal website feel more interactive without losing its purpose.

## Live
The website is deployed, and you can check it out with the URL [here](https://www.abrahammormontoy.com/)

## Features
- **Window Management System**: The About, Links, Works, Contact, Music and Wordafall pages are draggable windows. Multiple windows can be opened at the same time, overlap and follow the z-index hierarchy bringing the active window to the front.
- **Game and Global Leaderboard**: A custom-built typing game page build in React using hooks. The game features a fully integrated Node.js/Express backend and a PostgreSQL database to track and display the player name, a message and the score.
- **Dynamic Theme**: A responsive Dark Mode that alters the system UI, background and icons. It adjust automatically of the system appearance or via de manual toggle in the taskbar.
- **Animated Cloud Environment**: A custom-modified animated cloud background (adapted from react-cloud-animation) providing a dynamic, aesthetic backdrop to the retro UI.

- And more hidden features like a image viewer, direct messaging or ambient music.

## Pages Information
1. **Welcome Page**: Introduction to the portfolio with direct access to all of the other pages/tabs.
2. **About Page**: Introduction, educational background, tech interests and concentrations.
3. **Links Page**: Links to my Github, LinkedIn and current CV that are open in another tab.
4. **Work Page**: A card-style gallery of my skills and projects, complete with images, descriptions, technology stacks, and repository links.
5. **Contact Page**: A form that can be filled to contact me that uses EmailJS to send a message to my personal email.

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React-Draggable**: For making the pages draggable across the screen.
- **React-cloud-animation**: Adding the animated clouds in the background (this was modified to suit my project).
- **Vite**: Lightning-fast fronted build tool.

### Backend
- **Node.js & Express.js**: REST API handling leaderboard data and database communication (server.js).
- **PostgreSQL**: Relational database storing name, message and player score for the typing game integrated.
- **Neon**: Managed cloud database platform hosting the PostgreSQL instance.
- **pg(Node-Postgres)**: Connection pooling and SQL querying

### Deployment
- **Frontend**: Vercel and Cloudflare for the deployment and cloud storage
- **Backend**: Render (Continues deployment of server.js)

## Getting started (Local Development)

### Prerequisites  
- **Node.js**: v14 or above
- **npm** or **yarn** for managing dependencies
- A **PostgreSQL** database (Local or Cloud/Neon)

1. Clone the repository

```bash
git clone https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy.git
cd Website_Abraham_Mormontoy/my_website
```

2. Frontend Setup
Make sure you are in my_website and open a terminal  and run the following commands to start the React UI:

```bash
npm install
npm run dev
```

The frontend will run on *http://localhost:5173*
3. Backend Setup 
Open a second terminal window in my_website, navigate to the backend folder, and start the Express server:

```bash
cd backend
npm install
```

Create a *.env* file inside the *backend* directory and add your database connection string:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
```

or you can set it up locally with a database you are hosting:

```bash
DB_USER=<user>
DB_HOST=localhost
DB_NAME=<databaseName>
DB_PASSWORD=<password>
DB_PORT=5432
```

and start the backend server

```bash
node server.js
```

The backend API will run on *http://localhost:3000*

## Design Reference

The initial conceptual design and wireframe were built in Figma. The design evolved significantly during development for better UX and performance.
[Design](https://www.figma.com/design/BFeH8knoNLnylHtkmxnInx/Personal-Website?node-id=1-385&t=P1ibkDIG1r2GnCFW-1)

For the assets, build some of them but the core of them is in [Windows 95 UI Kit](https://www.figma.com/community/file/1254078490904184073)   

## Audio Credits
All of the audio, ambient sound, sound effects, music for the gameplay, was taken from [Zapsplat](https://www.zapsplat.com/license-type/standard-license/)

