// Worker
export default { 
  async fetch(request, env) {
      // We have received an HTTP request! Parse the URL and route the request.
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split('/');

      // We expect the path to include the player's name
      if (!path[0]) {
        return new Response("Not found", {status: 404});
      }

      // Handle CORS
      if (request.method === 'OPTIONS') {
        return handleOptions(request)
      }

      return handleRequest(request, env);
      // Add error handling
  }
}
  
  async function handleRequest(request, env) {
    // We'll just use one Durable Object instance for now but will support dynamicly generating new namespaces when making multi-tenant
    let BOARDID = 'baby-moeller-bingo'
    let id = env.BABYBINGO.idFromName(BOARDID)
    let boardObject = env.BABYBINGO.get(id);
    let res = await boardObject.fetch(request);
    return res;
  }

  function handleOptions(request) {
    console.log('handling options...')
    if (
        request.headers.get("Origin") !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null
    ) {
      console.log('handled')
        // Handle CORS pre-flight request.
        return new Response(null, {
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Client-Key"
          }
        });
    } else {
        // Handle standard OPTIONS request.
        return new Response(null, {
        headers: {
            Allow: "GET, HEAD, POST, PUT, OPTIONS"
        }
        });
    }
}
  
  // Durable Object Class
  export class BabyBingo {
    constructor(controller, env) {
      this.storage = controller.storage;  
      this.sessions = new Set();
    }

    // Handle HTTP requests from clients.
    async fetch(request) {
        const contentType = request.headers.get("content-type") || ""
        const trueClientIp = request.headers.get("cf-connecting-ip")
        const userAgent = request.headers.get("User-Agent")
        console.log(userAgent)
        if (userAgent.includes("bot")) {
          return new Response("Block User Agent containing bot", { status: 403 })
        }
        if (!trueClientIp || !userAgent) {
          return new Response("cf-connecting-ip and user-agent required", { status: 403 })
        }
        const playerId = trueClientIp + userAgent 

        const headers = {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }

        switch (request.method) {
          case 'GET':
            let board = await this.storage.get(playerId);
            if (!board) {
              board = {}
            }
            return new Response(JSON.stringify(board), {headers: headers});

          case 'POST':
          case 'PUT':
            if (contentType.includes("application/json")) {
              let data = JSON.stringify(await request.json())
              console.log(data)
              // VALIDATE DATA
              await this.storage.put(playerId, data)
              return new Response(JSON.stringify(data), {headers: headers});
            }
            return new Response("Content type must be application/json", { status: 403 });
          
          case 'DELETE':
            await this.storage.delete(playerId);
            return new Response(`Successfully deleted data for ${playerId}`, {headers: headers});

          default:
            return new Response("Method not allowed", { status: 405 });
        }

      // Error handling 
    }
  }
