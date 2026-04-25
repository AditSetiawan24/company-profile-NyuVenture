import Link from 'next/link';
import { Users } from 'lucide-react';
export default function TeamPage() {
  const team = [
    { id: '1', name: 'Adit Setiawan', role: 'Fullstack Developer', img: 'https://static.vecteezy.com/system/resources/previews/065/760/147/non_2x/anime-profile-black-hair-vector.jpg' },
    { id: '2', name: 'Siti Maskanah', role: 'Fullstack Developer', img: 'https://static.vecteezy.com/system/resources/previews/065/760/128/non_2x/anime-profile-girl-vector.jpg' },
    { id: '3', name: 'Sakinah Aprilia', role: 'Fullstack Developer', img: 'https://static.vecteezy.com/system/resources/previews/065/760/142/non_2x/cute-anime-profile-picture-on-white-vector.jpg' }
  ];
  return (
    <div className="flex flex-col flex-1 w-full bg-white relative">
      <section className="bg-brand-dark text-white py-24 text-center">
         <div className="flex flex-col items-center mb-6 text-center">
            <Users className="w-16 h-16 text-brand-light mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Team Kami</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Di balik setiap ekspedisi yang lancar ada tim yang berdedikasi tinggi bekerja tanpa lelah untuk memetakan yang tidak diketahui.
            </p>
         </div>
      </section>
      <section className="py-20 container mx-auto px-4 max-w-5xl">
         <div className="grid md:grid-cols-3 gap-8">
            {team.map((t) => (
              <Link href={`/team/${t.id}`} key={t.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 bg-gray-100">
                  <img src={t.img} alt={t.name} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand transition">{t.name}</h3>
                <p className="text-brand-light font-medium">{t.role}</p>
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
}
