const mineflayer = require('mineflayer')

const host = process.env.HOST;
const email = process.env.EMAIL;
const port = process.env.PORT;
const password = process.env.PASSWORD;

if (!host || !email || !port || !password) {
  throw new Error('Please set the HOST, EMAIL, PORT, and PASSWORD environment variables before running the script.');
}

function createBot(){
  const bot = mineflayer.createBot({
    host: host,
    username: email,
    auth: 'microsoft',
    port: parseInt(port), // Parse port as an integer
    version: '1.20.2',
    password: password
  });


  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`)
  })

  bot.on('kicked', reason => {
    console.log(`Kicked for: ${reason}`);
    setTimeout(() => {
      createBot();
    }, 10000);
  });

  bot.on('kicked', console.log)
  bot.on('error', console.log)
}

createBot();
