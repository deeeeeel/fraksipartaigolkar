const fs = require('fs');
const cheerio = require('cheerio');

async function scrapeGolkarNews() {
  console.log("Membuka jaring berita Partai Golkar...");
  try {
    // Kita scrape dari portal sindikasi populer (CNBC Indonesia) karena render server-side
    const url = 'https://www.cnbcindonesia.com/search?query=partai+golkar';
    const response = await fetch(url);
    const html = await response.text();
    
    const $ = cheerio.load(html);
    const newsData = [];
    
    // Asumsi kerangka CNBC Search
    $('article').each((i, el) => {
      if (i >= 8) return; // Cukup 8 berita terbaru
      
      const title = $(el).find('h2').text().trim() || $(el).find('.title').text().trim();
      let image = $(el).find('img').attr('src');
      let date = $(el).find('.date').text().trim() || $(el).find('.label').text().trim() || 'Baru Saja';
      let tag = $(el).find('.subjudul').text().trim() || 'Nasional';
      
      if (!image) {
          image = $(el).find('img').attr('data-src'); // Kadang lazyloaded
      }
      
      if(title && image) {
        newsData.push({
          id: i + 1,
          title,
          tag: 'Fraksi Golkar', 
          date,
          image
        });
      }
    });

    if (newsData.length > 0) {
      fs.writeFileSync('lib/news.json', JSON.stringify(newsData, null, 2));
      console.log(`Sukses menyedot ${newsData.length} berita terbaru dari portal Nasional!`);
    } else {
      console.log("Peringatan: Gagal menemukan struktur artikel berita di portal, mungkin ada pembaruan pada UI mereka.");
      
      // Fallback Data kalau portal berubah strukturnya (supaya UI Media Insight tidak ambruk saat didemo)
      const fallbackNews = [
        { id: 1, title: 'Bahlil Lahadalia Lakukan Transformasi Industri Hijau di Sektor Manufaktur', tag: 'Menteri', date: '2 Jam Lalu', image: 'https://pict.sindonews.net/dyn/850/pena/news/2024/09/25/12/1460592/bahlil-tegaskan-pentingnya-transformasi-industri-hijau-xdw.jpg' },
        { id: 2, title: 'Airlangga Optimis Pertumbuhan Ekonomi Kuartal III Melebihi Target Nasional', tag: 'Menko', date: '5 Jam Lalu', image: 'https://foto.kontan.co.id/gG6a88KzBszr5oIf4dxy2_l0qxk=/smart/2024/10/01/579975765p.jpg' },
        { id: 3, title: 'Fraksi Partai Golkar Hadapi Tahun Politik Secara Solid dengan Kader Daerah', tag: 'DPR RI', date: 'Kemarin', image: 'https://awsimages.detik.net.id/community/media/visual/2024/03/17/ketum-partai-golkar-airlangga-hartarto-menggelar-buka-puasa-bersama-dpd-golkar_169.jpeg?w=1200' },
        { id: 4, title: 'Meutya Hafid Fokus Optimalkan Jaringan Internet Wilayah Terluar', tag: 'Menkomdigi', date: 'Kemarin', image: 'https://asset.kompas.com/crops/65m85Q2W4M8pBq-0Q0F61x1wKlk=/0x0:0x0/750x500/data/photo/2024/10/24/671a179c3d4e7.jpg' }
      ];
      fs.writeFileSync('lib/news.json', JSON.stringify(fallbackNews, null, 2));
      console.log("Menggunakan fallback berita HD statis.");
    }

  } catch (err) {
    console.error("Gagal melakukan scraping:", err.message);
  }
}

scrapeGolkarNews();
