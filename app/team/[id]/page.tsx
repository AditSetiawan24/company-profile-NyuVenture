import Link from 'next/link';
import { ArrowLeft, Star, Compass } from 'lucide-react';
const teamData: Record<string, { name: string, role: string, img: string, bio: string }> = {
  '1': { 
     name: 'Adit Setiawan', 
     role: 'Fullstack Developer', 
     img: 'https://static.vecteezy.com/system/resources/previews/065/760/147/non_2x/anime-profile-black-hair-vector.jpg',
     bio: 'Adit sudah mendaki seluruh gunung di Pulau Jawa sebelum usianya 25 tahun. Keahliannya membaca arah angin dan memetakan jalur evakuasi membuat NyuVenture memiliki standard keamanan trip yang tak tertandingi.'
  },
  '2': { 
     name: 'Siti Maskanah', 
     role: 'Fullstack Developer', 
     img: 'https://static.vecteezy.com/system/resources/previews/065/760/128/non_2x/anime-profile-girl-vector.jpg',
     bio: 'Dengan latar belakang fotografi komersial, Almira bertugas menyeleksi setiap akomodasi dan restoran. Motonya: "Jika tidak bagus dipandang mata, apalagi saat dikunjungi."'
  },
  '3': { 
     name: 'Sakinah Aprilia', 
     role: 'Fullstack Developer', 
     img: 'https://static.vecteezy.com/system/resources/previews/065/760/142/non_2x/cute-anime-profile-picture-on-white-vector.jpg',
     bio: 'Pemuda asli Banyumas yang mengenal setiap preman pasar hingga perangkat desa. Kehadiran Bagas memuluskan segala perizinan wisata ekstrem NyuVenture.'
  }
};
export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = teamData[id];
  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center p-20 flex-1">
        <h1 className="text-3xl font-bold mb-4">Profil Tidak Ditemukan</h1>
        <Link href="/team" className="text-brand hover:underline">Kembali ke Tim</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 w-full relative bg-gray-50 pb-24">
      <div className="h-32 bg-brand-dark"></div>
      <div className="container mx-auto px-4 max-w-4xl -mt-16 z-10 relative">
        <Link href="/team" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium transition">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Tim</span>
        </Link>
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
           <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
             <div className="md:w-1/3 w-2/3 shrink-0">
                <img src={person.img} alt={person.name} className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg ring-4 ring-gray-50" />
             </div>
             <div>
               <div className="flex items-center gap-3 text-brand font-bold mb-2 uppercase tracking-widest text-sm">
                 <Star className="w-4 h-4" /> Tim Inti
               </div>
               <h1 className="text-4xl font-black text-gray-900 mb-2">{person.name}</h1>
               <h2 className="text-xl text-gray-500 font-medium mb-6 pb-6 border-b border-gray-100">{person.role}</h2>
               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
                 <Compass className="w-5 h-5 text-brand" /> Karakteristik
               </h3>
               <p className="text-gray-600 text-lg leading-relaxed">
                 {person.bio}
               </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
