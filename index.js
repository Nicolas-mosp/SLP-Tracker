/** @format */
console.clear();

const Discord = require("discord.js");
const config = require("./src/data/config.json");
const intents = new Discord.Intents(32767);
const axios = require("axios");
const coinToken = 'smooth-love-potion';

const client = new Discord.Client({ intents });

client.login(config.token);

client.once('ready', () => {
  console.log('Ready!');
  client.user.setPresence({ activities: [{ name: 'SLP Track' }], status: 'online' });
  test();
});

function test() {
  setTimeout(function () {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinToken}`, {})
      .then(response => {
        const price = response.data.market_data.current_price.usd;
        const percentage = response.data.market_data.price_change_percentage_24h_in_currency.usd;
        if (percentage > 0) {
          client.user.setActivity(`$${price} ↗ ${Number(percentage).toFixed(2)}%`, { type: 'PLAYING' });
        } else if (percentage < 0) {
          client.user.setActivity(`$${price} ↘ ${Number(percentage).toFixed(2)}%`, { type: 'PLAYING' });
        } else {
          client.user.setActivity(`$${price} ${Number(percentage).toFixed(2)}%`, { type: 'PLAYING' });
        }
      })
    test();
  }, 15000);
}
