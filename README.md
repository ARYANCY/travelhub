# Airbnb-Style Web Application

A full-stack Airbnb-style web application built with the **MERN stack** (MongoDB, Express.js, Node.js) using **EJS templates** for the frontend. Users can create, browse, and manage property listings with images, precise map coordinates, and reviews.

---
 **Live Demo:** [airbnb-clone-r8e6.onrender.com](https://airbnb-clone-r8e6.onrender.com)
---

## Features

- **CRUD Functionality**
  - **Listings:** Create, Read, Update, Delete property listings
  - **Reviews:** Create, Read, Update, Delete reviews with ratings
- **Interactive Maps:** Display property locations using Leaflet.js
- **Image Uploads:** Handle file uploads via Multer and store images securely in Cloudinary
- **RESTful API:** Smooth communication between frontend and backend
- **MVC Architecture:** Clean separation of concerns for maintainable code
- **Responsive Design:** Built with Bootstrap 5 for mobile-friendly layout

---

## Technologies Used

- **MongoDB Atlas** – Cloud database
- **Express.js** – Web framework
- **Node.js** – Server-side runtime
- **EJS Templates** – Server-side rendering
- **Cloudinary** – Image hosting
- **Multer** – File upload handling
- **Leaflet.js API** – Interactive maps
- **Bootstrap 5** – Responsive UI
- **RESTful API** – Smooth data flow
- **Server-side validation** – Secure and accurate data input

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/airbnb-clone.git
```
2.Install dependencies:
```bash
cd airbnb-clone
npm install
```
3.Set up environment variables (.env):
```bash
PORT=3000
MONGO_URI=<Your MongoDB Atlas URI>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
SESSION_SECRET=<Your Session Secret>
```
4.Run the application:
- For development (auto-reload on changes):
  ```bash
  npm run dev
  ```
- For normal start:
  ```bash
  npm start
  ```

---
## Usage

- **Create Listings:** Add new properties with title, price, images, and location.
- **Browse Listings:** View all available properties with map markers.
- **Reviews:** Add, edit, or delete reviews for properties.
- **Search & Filter:** Find properties by city, price, or rating.
---
