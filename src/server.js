// starts our server on an appropriate port
const app = require('../src/app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})

