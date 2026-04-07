const fs = require('fs');
const cheerio = require('cheerio');

const links = [
    "https://golkarpedia.com/menteri-maman-abdurrahman-buka-jalan-umkm-indonesia-masuk-rantai-pasok-global-china/",
    "https://golkarpedia.com/idrus-marham-kecam-narasi-provokatif-dan-tendensius-anti-prabowo-berpotensi-ganggu-stabilitas-nasional/",
    "https://golkarpedia.com/reformasi-besar-tkdn-dimulai-menperin-agus-gumiwang-luncurkan-lsp-untuk-tata-kelola-lebih-ketat/",
    "https://golkarpedia.com/program-b50-digeber-menteri-esdm-bahlil-lahadalia-klaim-indonesia-segera-surplus-solar/"
];

async function run() {
    const news = [];
    
    for (let i = 0; i < links.length; i++) {
        try {
            const res = await fetch(links[i]);
            const html = await res.text();
            const $ = cheerio.load(html);
            
            const title = $('meta[property="og:title"]').attr('content') || $('title').text();
            const image = $('meta[property="og:image"]').attr('content');
            
            // Mencari tanggal di Golkarpedia
            let date = $('.elementor-post-info__item--type-date').text().trim() || 'Baru Saja';
            
            // Clean title
            let cleanTitle = title.replace(' - Golkarpedia', '');
            
            let tag = 'Kabar Beringin';
            if (cleanTitle.toLowerCase().includes('maman')) tag = 'Menteri UMKM';
            if (cleanTitle.toLowerCase().includes('idrus')) tag = 'Tokoh Golkar';
            if (cleanTitle.toLowerCase().includes('agus gumiwang')) tag = 'Menperin';
            if (cleanTitle.toLowerCase().includes('bahlil')) tag = 'Menteri ESDM';

            news.push({
                id: i + 1,
                title: cleanTitle,
                tag: tag,
                date: date,
                url: links[i],
                image: image
            });
            console.log(`Berhasil mengekstrak: ${cleanTitle}`);
        } catch (e) {
            console.error(`Gagal ekstrak link ${i}: `, e);
        }
    }
    
    fs.writeFileSync('lib/news.json', JSON.stringify(news, null, 2));
    console.log("Sukses memperbarui news.json secara langsung dengan og:image asli!");
}

run();
