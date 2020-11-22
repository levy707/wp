export default {
  getJoke: () => fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json()),
};
