export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/',
  clientId: 'isystem',
  getUrl(url) {
    return this.apiUrl + url;
  }
};
