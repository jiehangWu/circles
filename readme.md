# **Circles**

## **Project Introduction**
Do you want to share your hobby with other people, but you are also shy and do not want to reveal too much? Then Circles is exactly meant for you! By entering Circles, you will be able to share your interests, knowing and interacting people with similar interests while remaining totally anonymous!

## **Note Before Using**
Posts will only be customized based on users' tags. You can change your tags in your profile page. When you post, do not forget to include a hashtag! 

## **Project Task Requirements**
### **Minimal Requirements**
- [x] A clean, aestheticaly pleasing, and responsive web UI.
- [x] CURD API to perform login/logout/register.
- [x] The ability to store user information to the database. 
### **Standard Requirements**
- [x] The ability to allow users to post photos/texts to their circles.
- [ ] Posting should be in real time.
- [x] The backend should be able to generate a new name for user anonymity.
- [x] The backend should be able to assign users to different circles based on their interests and similarties.
- [x] The users can have private chat with other users in their circles.
### **Stretch Requirements**
- [x] The feature to read user's geolocation and assign the user to circles nearby.
- [x] Make the app more anonymous by having end-to-end encryption.

## **Technology Used**
### **HTML + CSS + JavaScript**
Main building pillar of our project. HTML is used together with React to define the structure of webpage. CSS is used in the format of independent files as well as Material-UI styles. Both frontend and backend are written in Javascript.
### **React + Redux**
React is the library we use exclusively for frontend development. It allows structures to be represented using components to achieve high reusability and better readability. It also makes building interactive components easier by allowing components to have state, data, and functions. As number of components and the amount of data increase, we store all the states in a centralized store to make state management easier by introducing Redux. For example, one reducer might hold the data of the current user, while another reducer might hold all posts currently displayed on the homepage.   
### **MongoDB**
MongoDB is the place where all data such as user information, posts, comments, messages, and chat sessions are persisted. We use it with Mongoose to provide a direct map from document to JavaScript object, which can be really convenient. 
### **Express**
Express is a web framework for Node.js. We used it to serve frontend requests and access database.
### **Release Engineering**
We deployed our App to Microsoft Azure using Docker. We want to practice using Docker, and Azure is more convenient to use for deploying docker files. Also, Azure seems to be a more popular choice in industry.


## **Above and Beyond Functionalities**
### **Recommendation and Searching System Using Elasticsearch**
Our recommendation and searching system is built upon Elasticsearch. It has three main usages. The first is that we recommend posts to users based on content of the post and tags of the user. The second is that we recommend similiar users to each other based on their tags. The third is the search bar on top right corner, where users can search posts based on the search term.
### **Geolocation Using Google Maps API**
We used Google Maps API to acquire users' geolocation after their consents. And afterwards calculated geo-distance for users nearby and allowing them to be viewed on google map. 
### **Text and Video Chat Using WebSocket**
The text chat system is based on WebSocket. Specifically, we implemented user status detection (online/offline) using polling and automatic reconnecting on close and errors events, making the chat system more robust. We also used WebSocket as signaling server to implement video chat function based on WebRTC. WebRTC is based on peer-to-peer connection of browsers and ideally will not require a server to handle mass data transmission. It is now supported by many browsers on different platforms and can be used for various purposes.
### **Image Uploading Using AWS S3**
We used AWS S3 to store user avatars and post images, and in our MongoDB, we only need to keep an URL of the avatars/images. By doing this, we can save space in our MongoDB and avoid slowing down query.  

## **Next Steps**
- Work on the notification functionality when other people add new posts, comment or like your posts. 
- Working on the depth of current functionalities, such as adding multiple images to a post, nested comments.
- Improve recommendation system using more advanced approach, such as machine learning.

## **List of Contributions**
### **Qian (Jerome) Ju**
- Created the profile page and the preference tags functionality with endpoints
- Implemented Circles feature on the side bar with Geolocation through Google API
- Encrypted password transmission and storage with both symmetric and unsymmetric encryption 
- Added new users' first-time guideline, loading spinner, particle.js and persistent app bar for the frontend

### **Xiaobo Qian**
- Implemented real-time messages transimission and online clients indications with WebSocket
- Implemented persistent storage of messages and unread messages reminders and sorting
- Encrypted chat messages content in tansmission with RSA and AES for safety
- Added video chat functionality based on WebRTC
- Implemented responsive UI of the chat part for small windows and mobiles

### **Yifan Wang**
- Created login form, register form, input area component, and comment section component.
- Connected login and register page to backend APIs.
- Implemented backend APIs for all posting related functionalities (adding, commenting, liking, deleting).
- Used AWS S3 APIs to enable attaching images to posts and avatar uploading.
- Implemented several utility functions such as random name generator, date formatter.
- Adjusted the styling of the App and tried to make it as responsive as possible.

### **Jiehang Wu**
- Created post component and side bar component.
- Implemented the backend for user login, register, and elastic search recommendation.
- Deployed the project on Azure using container.
- Designed backend architecture.