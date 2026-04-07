const fs = require('fs');

const rawPhotos = fs.readFileSync('raw_photos.txt', 'utf8').split('\n').filter(l => l.trim().length > 0);
const members = JSON.parse(fs.readFileSync('lib/members.json', 'utf8'));

console.log(`Menemukan ${rawPhotos.length} link foto dan ${members.length} profil anggota.`);

let mappedCount = 0;
for (let i = 0; i < Math.min(rawPhotos.length, members.length); i++) {
    const line = rawPhotos[i];
    const urlMatch = line.match(/URL Foto:\s*(https:\/\/[^\s]+)/);
    
    if (urlMatch) {
        // Ambil URL-nya dan bersihkan parameter timestamp ?t= supaya URL bersih
        let cleanUrl = urlMatch[1].split('?')[0]; 
        members[i].image = cleanUrl;
        mappedCount++;
    }
}

fs.writeFileSync('lib/members.json', JSON.stringify(members, null, 2));
console.log(`🔥🔥 Sukses! Telah menimpa ${mappedCount} avatar palsu dengan foto HD asli petinggi Golkar!`);
