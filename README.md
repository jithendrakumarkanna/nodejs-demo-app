# nodejs-demo-app

DevOps Internship - Task 1: Automate code deployment using a CI/CD pipeline (GitHub Actions)

This is a small Node.js web app. I used it to set up a CI/CD pipeline with GitHub Actions that tests the code, builds a Docker image and pushes it to Docker Hub every time I push to the `main` branch.

## Tools used

- GitHub and GitHub Actions
- Node.js (Express)
- Docker and Docker Hub

## Project structure

```
nodejs-demo-app/
├── .github/workflows/main.yml   # CI/CD workflow
├── test/app.test.js             # tests
├── app.js                       # express app and routes
├── server.js                    # starts the server
├── Dockerfile
├── package.json
└── README.md
```

## About the app

It has two routes:

- `/` returns a hello message
- `/health` returns `{ "status": "ok" }`

## How the pipeline works

The workflow is in `.github/workflows/main.yml` and runs on every push to `main`. It has two jobs:

1. **test**: checks out the code, installs Node.js 20, runs `npm ci` and then `npm test`.
2. **build-and-push**: runs only if the test job passes. It logs in to Docker Hub, builds the image from the Dockerfile and pushes it with two tags, `latest` and the commit SHA.

So the flow is test -> build -> push.

## Secrets

I added these two secrets in the repo under Settings > Secrets and variables > Actions:

| Name | What it is |
|------|------------|
| `DOCKERHUB_USERNAME` | my Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (Read & Write) |

I used an access token instead of my real password because it is safer and can be deleted anytime.

## Run it locally

Without Docker:

```
npm install
npm test
npm start
```

Then open http://localhost:3000

With Docker:

```
docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app
```

## Pull the image from Docker Hub

```
docker pull jithendra93/nodejs-demo-app:latest
docker run -p 3000:3000 jithendra93/nodejs-demo-app:latest
```

## What I learned

- How a workflow file is written with triggers, jobs and steps
- How to keep credentials safe using GitHub secrets
- How the Docker build and push process works inside a pipeline
- How `needs` makes sure the image is built only when the tests pass

## Screenshots

Screenshots of the successful workflow run and the image on Docker Hub are in the `screenshots` folder.
