# BUILDLOG

## Phase 0

After reading the PDF, I sent the it to Claude so I can have a step-by-step break down of what I should do. Also did some setup like adding .env, some packages, and tsconfig.

## Phase 1

Together with Claude, I created a `DESIGN.MD` file that provides a high-level overview of how the api, and its guarding rules, would function. I also had Claude make a script that fetches 50 images of my selected category from Unsplash.

## Phase 2

I asked Claude to draft the phase 2 but it did everything. But it was on some goofy shenanigans. It was doing too much, and had some deprecated imports. It also used a different LLM SDK than I told it to. But I understood that the goal of this phase was to asked a vision model to tag the image so we can embed the tags to be used for processing later. I rewrote everyting in to Vercel AI SDK docs.

I containerized the database and moved the initialization to image fetching to start of server. Had to change how the server starts as well, I automatically fetched the images on server start and placed in on a volume so the fetching does not happen everytime. I also added the images to the database while they are being fetched.

By accessing /api/jobs/run-batch, all images in the database where fetched using their filename and converted to base64 to be sent to a vision model for tagging. The LLM response was then added to image_metadata table. I had to change the system prompt multiple times and add structured output to make this happen successfully most of the time. However, I used openrouter/free which sometimes did not support structured output. In the end, I settled for nex-agi/nex-n2.5-pro:free

# Phase 3

I moved to Claude code due to context issues. I added a statment about how I want to learn from doing this project and I will not give write access in the CLAUDE.MD file. With this, I am able to learn, allow Claude to give accurate responses, and track what Claude suggests.

I also changed the server startup. Instead of requireing a route call to process the images, I made it happen before server startup. Basically, the fetch, classify, and embed happens before server startup. In that manner, when the server starts, the only thing the client needs to worry about is whats going to happen to his posts/images.

I added a posts route, controller, service, and model; as well as a validator middleware. Once the database has vectors of the images, I can perform cosine similarity on each vector against the post title and body. Then I rank the values and return the top 5 closest image metadata.
