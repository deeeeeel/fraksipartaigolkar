const fs = require('fs');
const cheerio = require('cheerio');

async function scrapeGoogleNews() {
  console.log("Mencari sinyal satelit Google News...");
  try {
    const rssUrl = 'https://news.google.com/rss/search?q=fraksi+golkar+when:7d&hl=id&gl=ID&ceid=ID:id';
    
    // 1. Ambil Data RSS XML
    const rssResponse = await fetch(rssUrl);
    const xmlData = await rssResponse.text();
    
    // 2. Parse XML menggunakan Cheerio
    const $ = cheerio.load(xmlData, { xmlMode: true });
    const articles = [];

    // Ambil 4 berita teratas
    const items = $('item').slice(0, 4).toArray();
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = $(item).find('title').text().replace(/ - .*/, '').trim(); // Hapus nama media di akhir judul
        const rawLink = $(item).find('link').text().trim();
        const pubDateStr = $(item).find('pubDate').text().trim();
        
        // Ubah format string date jadi "X Hari Lalu" atau biarkan format aslinya sementara
        const pubDate = new Date(pubDateStr);
        const hariLalu = Math.floor((new Date() - pubDate) / (1000 * 60 * 60 * 24));
        const dateFormatted = hariLalu === 0 ? "Hari Ini" : hariLalu === 1 ? "Kemarin" : `${hariLalu} Hari Lalu`;

        console.log(`Menelusuri foto HD untuk: ${title}...`);
        
        let imageUrl = 'https://pict.sindonews.net/dyn/850/pena/news/2024/09/25/12/1460592/bahlil-tegaskan-pentingnya-transformasi-industri-hijau-xdw.jpg'; // fallback
        
        // 3. Masuk ke link berita aslinya untuk menyedot 'og:image' (Gambar Utama)
        try {
            const articleRes = await fetch(rawLink, { redirect: 'follow' });
            const articleHtml = await articleRes.text();
            const $article = cheerio.load(articleHtml);
            const ogImage = $article('meta[property="og:image"]').attr('content') || $article('meta[name="twitter:image"]').attr('content');
            if (ogImage) imageUrl = ogImage;
        } catch (e) {
            console.log("Gagal menembus origin foto, pakai fallback sementara.");
        }

        articles.push({
            id: i + 1,
            title: title,
            tag: 'Media Lokal',
            date: dateFormatted,
            url: rawLink,
            image: imageUrl
        });
    }

    // Tulis ke JSON
    fs.writeFileSync('lib/news.json', JSON.stringify(articles, null, 2));
    console.log("✅ SUKSES! 4 Berita Terbaru dari Google News berhasil diinjeksikan!");
    
    // Update next.config.ts agar otomatis whitelist semua external url
    console.log("\nHarap gunakan parameter ini pada next.config.ts remotePatterns:\n{ protocol: 'https', hostname: '**' }");

  } catch (err) {
    console.error("Gagal melakukan scraping Google News:", err);
  }
}

scrapeGoogleNews();
