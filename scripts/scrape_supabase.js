const fs = require('fs');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const { loadEnvConfig } = require('@next/env');

// Membaca file .env.local bawaan Next.js
loadEnvConfig(process.cwd());

// 1. Inisialisasi Supabase SDK
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Gagal: NEXT_PUBLIC_SUPABASE_URL atau ANON_KEY tidak ditemukan di environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi delay agar IP tidak diblokir web berita & Google
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchNewsForEntity(searchQuery, memberSlug = null, tag = 'Berita') {
  console.log(`\n🔎 [Scraping] Mencari berita untuk: ${searchQuery}...`);
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=id&gl=ID&ceid=ID:id`;
    
    const rssResponse = await fetch(rssUrl);
    if (!rssResponse.ok) {
       console.log(`⚠️ Gagal mengambil RSS untuk ${searchQuery}`);
       return;
    }
    const xmlData = await rssResponse.text();
    
    // Parse Google News XML
    const $ = cheerio.load(xmlData, { xmlMode: true });
    
    // Ambil 3 berita teratas biar cepat & hemat resources
    const items = $('item').slice(0, 3).toArray();
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = $(item).find('title').text().replace(/ - .*/, '').trim(); 
        const rawLink = $(item).find('link').text().trim();
        const pubDateStr = $(item).find('pubDate').text().trim();
        const isoDate = new Date(pubDateStr).toISOString();

        console.log(`    -> Sedot image: ${title.substring(0, 40)}...`);
        
        let imageUrl = 'https://ui-avatars.com/api/?name=Partai+Golkar&background=0f172a&color=facc15&size=400'; // Fallback
        
        // Coba bongkar Meta Tag dari situs berita aslinya
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 detik batas limit fetch
            
            const articleRes = await fetch(rawLink, { redirect: 'follow', signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (articleRes.ok) {
               const articleHtml = await articleRes.text();
               const $article = cheerio.load(articleHtml);
               const ogImage = $article('meta[property="og:image"]').attr('content') || $article('meta[name="twitter:image"]').attr('content');
               if (ogImage && ogImage.startsWith('http')) imageUrl = ogImage;
            }
        } catch (e) {
            console.log("       [Hold] Gagal/Timeout mendapatkan gambar asli, pakai fallback standar.");
        }

        // ============================================
        // UPSERT KE SUPABASE
        // ============================================
        const { error } = await supabase
          .from('news_insight')
          .upsert({
             member_slug: memberSlug,
             title: title,
             url: rawLink,
             image_url: imageUrl,
             tag: tag,
             published_at: isoDate
          }, { onConflict: 'url' }); // pastikan gak ada duplikat

        if (error) {
           console.error("       ❌ Error Database:", error.message);
        } else {
           console.log("       ✅ Berhasil tertanam di Supabase.");
        }
        
        await sleep(1500); // jeda antar artikel biar santun
    }
  } catch (err) {
    console.error(`Gagal scraping ${searchQuery}:`, err);
  }
}

async function runScraper() {
  console.log("🚀 MENGHIDUPKAN MESIN DATA SUPABASE MEDIA INSIGHT\n");

  // 1. Ekstrak Berita Utama Dashboard (Airlangga & Partai)
  await fetchNewsForEntity('"Menteri Koordinator Bidang Perekonomian" Airlangga Hartarto', null, 'Kabinet');
  await sleep(2000);
  await fetchNewsForEntity('Partai Golkar', null, 'Nasional');
  await sleep(2000);

  // 2. Eksekusi Berita Personal Anggota
  const members = JSON.parse(fs.readFileSync('lib/members.json', 'utf8'));
  console.log(`\n👨‍💼 Menyiapkan scraping untuk anggota DPR...`);
  
  // PERINGATAN: Supaya eksekusi pertama tidak kena ban Google, 
  // kita batasi ke 3 pimpinan/anggota pertama dulu sebagai "Demo Uji Coba".
  // Jika aman, tinggal hapus '.slice(0, 3)'
  const devMembers = members.slice(0, 3);
  
  for (let i = 0; i < devMembers.length; i++) {
     const member = devMembers[i];
     const slug = (member.nama || member.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
     
     await fetchNewsForEntity(`"${member.nama || member.name}" DPR Golkar`, slug, "Dapil");
     await sleep(2500); 
  }

  console.log("\n🎯 PROSES SCRAPING & INGEST DATABASE SELESAI!");
}

runScraper();
