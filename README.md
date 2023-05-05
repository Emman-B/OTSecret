# OTSecret

A web app for sharing temporary secrets!

The frontend is hosted on GitHub Pages, and the backend is hosted on Heroku. I used the Heroku Postgres add-on for database storage.

![main_view_desktop](https://user-images.githubusercontent.com/34151856/131023835-7b37d05d-338e-4406-809d-599fd56cd406.png)

## How it Works
If you have a secret you would like to share with someone, you can use this web app to share a password-protected secret.

First, the sender creates a secret message with a password. The web app provides the sender with a URL to give to the recipient.

Then, the sender provides this URL and the password to the recipient, preferably in two different forms of communication (URL by email, password by phone).

Finally, the recipient goes to the URL and enters the password to retrieve the secret. The secret is then deleted from the server and the same URL and password cannot be reused again.

The secret has an expiration of 15 minutes, so after 15 minutes, the secret will be deleted.

## Implemented Features (Frontend & Backend)
- Creating password-protected secrets
- Retrieving secret messages when providing a password
- Encrypting passwords and messages on the backend
- Storing secrets into a Heroku Postgres Database

## Releases
This web app is accessible at this link: https://emman-b.github.io/OTSecret/#/

## Usage
The following instructions are for hosting the web app locally.

### Requirements
- Node version 14.15.0 (older versions may work)
- PostgreSQL Database (I used the PostgreSQL Windows installer v13.3)

### Installation
First, install the above required software. For PostgreSQL, keep track of the information you provided in the installation since you will need it when setting up environment variables.

Next, you need to create a `.env` file in the `backend/` directory. I have a `.env.example` file with example values, so you can use that as a template.

Afterwards, run `npm install` in both the `frontend/` and `backend/` directories.

### Running the web application
In the `frontend/` and `backend/` directories, run the following:
```bash
npm start
```

Note: On the frontend, if you happen to run into a `digital envelope routines::unsupported` error when running the frontend locally, then try running the following instead (frontend only):
```bash
npm run local
```

By default, the frontend web application is accessible here:
```
http://localhost:3000
```

To test the backend API, go to the following URL (make sure to replace `<PORT>` with the actual port number provided in the `.env` file):
```
http://localhost:<PORT>/v1/api-docs/
```
## What I Learned
This was a full-stack web application that taught me more about how to deploy a web application with a functioning frontend and backend. I learned more about HTML and CSS and having a mobile-first responsive web design. I also learned about best practices when dealing with communication between the frontend and backend in production environments.

## Screenshots
<details>
    <summary>Mobile Main View</summary>

![mobile_main_view](https://user-images.githubusercontent.com/34151856/131024235-b16eba42-7841-4416-8daa-90cab6c6643a.png)
</details>
<details>
    <summary>Mobile Get-Secret View</summary>

![mobile_getsecret_view](https://user-images.githubusercontent.com/34151856/131024090-ad07efcd-9aed-44a4-a362-3ad75c38973d.png)
</details>
