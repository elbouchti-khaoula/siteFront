const PROXY_CONFIG = [
    {
        context: [
            "/api/repositories"
        ],
        target: "http://localhost:8888",
        secure: false,
        logLevel : "debug"
    },
    {
      context: [
          "/api/real-estate-projects"
      ],
      target: "http://localhost:8880",
      secure: false,
      logLevel : "debug"
   }
  ]
  
  module.exports = PROXY_CONFIG;