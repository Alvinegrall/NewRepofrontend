// export default function (env = 'local') {
    export default function (env = 'prod1') {
        if (env === 'prod') {
          return {
            WEBSITE_BASE_URL: 'http://farotygo.com',
            AUTH_BASE_URL: 'https://auth.faroty.com',
            DASHBOARD_URL: 'https://business.faroty.com/admin',
            API_URL: 'https://api.faroty.com/index.php/api',
          }
        } else if (env === 'dev') {
          return {
            WEBSITE_BASE_URL: 'http://farotygo.com',
            AUTH_BASE_URL: 'https://auth.farotygo.com',
            DASHBOARD_URL: 'https://business.farotygo.com/admin',
            API_URL: 'https://api.farotygo.com/index.php/api',
          }
        } else {
          return {
            WEBSITE_BASE_URL: 'http://farotygo.com',
            AUTH_BASE_URL: 'http://localhost:5173',
            DASHBOARD_URL: 'http://localhost:5174/admin',
            API_URL: 'https://api.faroty.com/index.php/api',
            // API_URL: 'https://api.farotygo.com/index.php/api',
          }
        }
      }
      
      