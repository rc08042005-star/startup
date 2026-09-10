# Kaiwa

[My Notes](notes.md)

Kaiwa is a text-focused communication platform where users can share thoughts, opinions, research, articles, and educational discussions. The application is designed to encourage meaningful written communication rather than focusing on media-heavy features such as videos, audio, or photo sharing.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.


### Elevator pitch

Kaiwa is a text-focused communication platform for sharing thoughts, research, articles, and educational discussions. Users can publish written content, respond to others, and participate in meaningful conversations. Unlike media-heavy social platforms, Kaiwa focuses primarily on writing, discussion, and learning.

### Design
[Previous]
![Kaiwa-Design](kaiwa-design.png) 
![Kaiwa-Design](design1.png)

[New Made with Figma]
![Kaiwa-Design](login.png) 
![Kaiwa-Design](page.png)

The design will show the basic layout of Kaiwa, including the login page, home feed, post creation area, and user profile. The goal is to keep the interface simple and focused on reading, writing, and interacting with text-based content.



### Key features

Users can register, log in, and log out.
Users can create and publish text-based posts, articles, and discussions.
Users can view posts created by other users.
Users can comment on and respond to other users' posts.
Users can view profiles and interact with other users.
Users can receive real-time updates when new activity occurs.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - HTML will be used to create the structure of Kaiwa, including the login page, navigation, feed, posts, profile pages, and forms.
- **CSS** - CSS will be used to style the application and make the layout clean, readable, responsive, and visually appealing on different screen sizes.
- **React** -React will be used to create reusable components such as the login form, post cards, navigation, profile sections, and post creation forms. React routing will also be used to move between different views of the application.
- **Service** -  A backend service will provide endpoints for registering users, logging in, logging out, creating posts, retrieving posts, and managing comments. Kaiwa will also use the [DummyJSON Quotes API](https://dummyjson.com/docs/quotes) as a third-party API to retrieve random quotes that can be displayed as discussion prompts for users.
- **DB/Login** - A database will store user account information, posts, comments, and profile data. Login and authentication will be used so that users can securely access their accounts and create or interact with content.

- **WebSocket** - WebSocket will be used to send real-time updates from the server to connected users. For example, when a new post or comment is created, other users can see the update without refreshing the page.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [] I completed the prerequisites for this deliverable (Git commit requirement)
- [ x] Proper use of Markdown
- [x ] A concise and compelling elevator pitch
- [ x] Description of key features
- [x ] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [ x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
