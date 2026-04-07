const fs = require('fs');
const cheerio = require('cheerio');

async function scrapeAntaraNews() {
  console.log("Membuka jalur API ke Antara News...");
  try {
    // URL pencarian portal terpercaya
    const url = 'https://www.antaranews.com/search?q=fraksi+golkar';
    const response = await fetch(url);
    const html = await response.text();
    
    const $ = cheerio.load(html);
    const articles = [];

    // Cari element <article> di dalam hasil pencarian Antara News
    $('article.simple-post').slice(0, 4).each((i, el) => {
      const title = $(el).find('h2 a').text().trim();
      const rawLink = $(el).find('h2 a').attr('href');
      let image = $(el).find('picture img').attr('src') || $(el).find('img').attr('data-src');
      let date = $(el).find('.text-secondary').text().trim() || 'Baru Saja';
      
      // Bersihkan waktu (buang spasi kosong/newline berlebih kalau ada)
      date = date.replace(/\n(.*)/, '').trim();

      if (title && rawLink) {
        articles.push({
            id: i + 1,
            title,
            tag: 'Nasional',
            date,
            url: rawLink,
            image: image || 'https://pict.sindonews.net/dyn/850/pena/news/2024/09/25/12/1460592/bahlil-tegaskan-pentingnya-transformasi-industri-hijau-xdw.jpg'
        });
      }
    });

    if (articles.length > 0) {
      fs.writeFileSync('lib/news.json', JSON.stringify(articles, null, 2));
      console.log(`Sukses! ${articles.length} berita organik dari ANTARA berhasil direkam.`);
    } else {
        console.log("Gagal membedah Antara, mencoba scraping alternatif SINDOnews...");
        
        // Coba SINDOnews Search kalau Antara ganti UI
        const sindoUrl = 'https://search.sindonews.com/search?q=fraksi+golkar';
        const sRes = await fetch(sindoUrl);
        const sHtml = await sRes.text();
        const $s = cheerio.load(sHtml);

        $s('.news').slice(0, 4).each((i, el) => {
            const title = $s(el).find('.news-title a').text().trim() || $s(el).find('.news-content a').text().trim();
            const rawLink = $s(el).find('.news-title a').attr('href') || $s(el).find('.news-content a').attr('href');
            const image = $s(el).find('img').attr('src');
            const date = $s(el).find('.news-date').text().trim();

            if (title && rawLink && image) {
                articles.push({
                    id: i + 1,
                    title, tag: 'Nasional', date, url: rawLink, image
                });
            }
        });

        if (articles.length > 0) {
            fs.writeFileSync('lib/news.json', JSON.stringify(articles, null, 2));
            console.log(`Sukses! ${articles.length} berita organik dari SINDONews berhasil direkam.`);
        }
    }
  } catch (err) {
    console.error("Gagal melakukan scraping Nasional:", err.message);
  }
}

scrapeAntaraNews();
