import Link from 'next/link';
import { Users, History, Trophy } from 'lucide-react';
export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 w-full relative bg-white">
      <section className="bg-brand-dark text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tentang NyuVenture</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Filosofi kami yaitu membawa Anda ke jantung Banyumas yang sesungguhnya.</p>
      </section>
      <section className="py-20 container mx-auto px-4 max-w-4xl text-center">
        <History className="w-12 h-12 text-brand mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Berawal dari Tersesat</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Di tahun 2024, sekelompok pemuda dan pemudi tersesat di Gunung Baturraden tanpa sinyal dan mereka menemukan sebuah curug perawan yang tidak pernah ada di peta. Dari sanalah NyuVenture lahir. Kami percaya kejutan terbaik sering hadir ketika Anda berani melenceng dari rencana.
        </p>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Values Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Otentik', desc: 'Rekomendasi tanpa sponsor, semua dinilai objektif.' },
              { title: 'Melestarikan', desc: 'Berkolaborasi menjaga lingkungan wisata.' },
              { title: 'Pemberdayaan', desc: 'Mendukung ekonomi kreatif warga lokal Banyumas.' }
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <Trophy className="w-10 h-10 text-brand-light mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
