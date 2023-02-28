const PROXY_CONFIG = [
    {
        context: [
            "/api/repositories"
        ],
        // target: "http://localhost:8888",
        target: "http://10.10.1.187:8082",
        secure: false,
        logLevel : "debug"
    },
    {
      context: [
          "/api/real-estate-projects"
      ],
      // target: "http://localhost:8880",
      target: "http://10.10.1.187:8083",
      secure: false,
      logLevel : "debug"
   }
  ]
  
  module.exports = PROXY_CONFIG;