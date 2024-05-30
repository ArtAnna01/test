# Blog Application

This is a simple blog application built with React, Ant Design, Zustand, and React Query. The application allows users to register, log in, view a list of blog posts, view individual blog posts, add, edit, and delete blog posts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ArtAnna01/test.git
    ```

2. Navigate to the project directory:

    ```bash
    cd blog_app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the JSON server:

    ```bash
    npx json-server --watch db.json --port 3000
    ```

5. Start the development server:

    ```bash
    npm start
    ```

## Usage

- Open your browser and navigate to `http://localhost:5173`.
- Register a new user.
- Log in with your registered credentials.
- View the list of blog posts.
- Click on a blog post title to view the post details.
- Add a new blog post.
- Edit an existing blog post.
- Delete a blog post.


## Features

- **Authentication**: Users can register and log in.
- **View Posts**: View a list of all blog posts.
- **View Post Details**: Click on a post to view its details.
- **Add Post**: Add a new blog post.
- **Edit Post**: Edit an existing blog post.
- **Delete Post**: Delete a blog post.
- **Styling**: Follows BEM conventions for SCSS.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Ant Design**: A React UI library with a set of high-quality components.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **React Query**: Hooks for fetching, caching, and updating asynchronous data in React.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
