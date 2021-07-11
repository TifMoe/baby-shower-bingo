# BabyShower Bingo Online

Small React web app to host a virtual bingo game using Cloudflare Workers + Durable Objects!

## Technologies
Frontend: **[React](https://create-react-app.dev/) app deployed with [Cloudflare Workers](https://workers.cloudflare.com/)**

Backend: **[Cloudflare Workers](https://workers.cloudflare.com/) + [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects) backend**

Check out these cool blogs to learn more about Durable Objects and why they're awesome:
- https://blog.cloudflare.com/introducing-workers-durable-objects/
- https://blog.cloudflare.com/building-real-time-games-using-workers-durable-objects-and-unity/

CI/CD with [Github Actions](https://help.github.com/en/actions)

[![Deploy to Production](https://github.com/TifMoe/baby-shower-bingo/actions/workflows/deploy.yml/badge.svg)](https://github.com/TifMoe/baby-shower-bingo/actions/workflows/deploy.yml)

### API Usage
The API is deployed using Cloudflare workers and uses Durable Objects for state. 

You can tail logs by logging into Wrangler and running:
```
wrangler tail --format=pretty
```