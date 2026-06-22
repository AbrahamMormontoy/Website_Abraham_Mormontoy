# Personal Portfolio Website

This is a frontend personal portfolio website, based in the Windows 95 style, built to showcase my projects, skills, and contact information. The project uses a React-based UI and in the future I am planning to add more features.

## Live Demo
The website is currently running on Vercel for now as there are features that I still wanna add, the link is [here](https://website-abraham-mormontoy.vercel.app/).

## Pages Information
1. **Welcome Page**: Introduction to the portfolio with direct access to all of the other pages/tabs.
2. **About Page**: Information about me like a introduction, education, interests, concentrations (tentative).
3. **Links Page**: Links to my Github, LinkedIn and CV that are open in another tab.
4. **Work Page**: Information about my skills and projects in a card-style. For my projects I display images, descriptions and the technologies used. Also includes links to the respective github repository.
5. **Contact Page**: A form that can be filled to contact me. This form at this moment uses EmailJS and send a message to my personal email.

## Features
- **Tab movement**: The pages About, Links, Works and Contact can be moved around the screen. They can also overlap over each other which mean that there can be multiple tabs open at the same time. The tab that you move is the one that has the highest z-index which means that is in the front. There are bounds set using the window size.

- **Animated Cloud Background**: The background behind the Welcome Page is a group of clouds animated modified from this github repository [here](https://github.com/akashleo/react-cloud-animation). I decided to build the Cloud background again because the component imported from npm didn't work for my project.

- **DarkMode**: The background, pages and icons are all design to have a dark mode variant that changes depending on the time of the day or the button in the taskbar.

- **Wordafall**: Added a typing game to add more dynamic to the website. This is bounded and work as a tab like the other.

- **Adding more features in the future like a database in which you can see a leaderboard for the Wordafall game with your name, score and a quote**

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React-Draggable**: For making the pages draggable across the screen.
- **React-cloud-animation**: Adding the animated clouds in the background (this was modified to suit my project)

### Deployment
- Frontend: Deployed on **Vercel**

## Getting started
### Prerequisites
- **Node.js**: v14 or above
- **npm** or **yarn** for managing dependencies
- Vercel CLI (optional)

### Installation
1. Clone the repository
```bash
git clone https://github.com/AbrahamMormontoy/Website_Abraham_Mormontoy.git
```
2. Install the dependencies

```bash
cd my_website
npm install
```

3. Run 
s
```bash
npm run dev
```

## Design
The initial design of the website can be found here. This is not final and was changed over and over for better UX and UI practice.
https://www.figma.com/design/BFeH8knoNLnylHtkmxnInx/Personal-Website?node-id=1-385&t=P1ibkDIG1r2GnCFW-1

## Music
Ambient sound https://www.zapsplat.com/music/chapter-calm-downtempo-documentary-style-track-featuring-soft-piano-and-ambient-textures/