const venom = require('venom-bot');
const axios = require('axios');

venom.create().then((client) => start(client)).catch((err) => console.log(err));

async function start(client) {
  client.onMessage(async (message) => {
    let text = message.body;

    if (text.startsWith('.tiktok/')) {
      let url = text.split('/')[1];
      if (!url) return client.sendText(message.from, 'Masukkan URL TikTok!');

      let apiUrl = `https://api.akuari.my.id/downloader/tiktok?link=${url}`;
      downloadVideo(client, message.from, apiUrl, 'TikTok');
    }

    if (text.startsWith('.fb/')) {
      let url = text.split('/')[1];
      if (!url) return client.sendText(message.from, 'Masukkan URL Facebook!');

      let apiUrl = `https://api.akuari.my.id/downloader/fb?link=${url}`;
      downloadVideo(client, message.from, apiUrl, 'Facebook');
    }

    if (text.startsWith('.youtube/')) {
      let url = text.split('/')[1];
      if (!url) return client.sendText(message.from, 'Masukkan URL YouTube!');

      let apiUrl = `https://api.akuari.my.id/downloader/youtube2?link=${url}`;
      downloadVideo(client, message.from, apiUrl, 'YouTube');
    }
  });
}

async function downloadVideo(client, chatId, apiUrl, platform) {
  try {
    let { data } = await axios.get(apiUrl);
    if (data.status) {
      await client.sendFile(chatId, data.result.video, 'video.mp4', `Berikut video dari ${platform}`);
    } else {
      client.sendText(chatId, `Gagal mengunduh video dari ${platform}`);
    }
  } catch (err) {
    console.log(err);
    client.sendText(chatId, `Terjadi kesalahan saat mengunduh video dari ${platform}`);
  }
}
