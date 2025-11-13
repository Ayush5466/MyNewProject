// export const environment = {
//   production: false,
//   apiBaseUrl: 'https://localhost:7265/api',
//   apiBaseUrlQR: 'https://localhost:7265/api/GenerateQR'
// };

const isLocal = window.location.hostname === 'localhost';

export const environment = {
  production: false,
  apiBaseUrl: isLocal
    ? 'https://localhost:7265/api/Login'
    : 'https://31a6dee123a2.ngrok-free.app',
  apiBaseUrlQR: isLocal
    ? 'https://localhost:7265/api/GenerateQR'
    : 'https://31a6dee123a2.ngrok-free.app/GenerateQR'
};

