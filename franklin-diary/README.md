# Franklin Diary

A simple Franklin-style diary web application with Google OAuth login. Diary entries are stored on the server side so you can access them from any device. The calendar highlights days with existing entries.

## Setup

1. Install dependencies (requires Node.js):

```bash
npm install
```

2. Configure Google OAuth credentials. Create a project in the Google Developer Console and set the environment variables:

```bash
export GOOGLE_CLIENT_ID=your_client_id
export GOOGLE_CLIENT_SECRET=your_client_secret
```

3. Start the server:

```bash
npm start
```

The app runs on `http://localhost:3000`. Browse to that address and log in with Google to start using the diary.

Data is saved in `data.json` in the project directory.
