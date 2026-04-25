import Link from 'next/link';
import { Compass, Ticket, Home, Car, Users, Camera } from 'lucide-react';
export default function ServicesPage() {
  const services = [
    {
      id: 'curation',
      title: 'Destinasi Terkurasi',
      desc: 'Kami merancang rute liburan spesifik untukmu yang mencari "hidden gem" otentik murni, jauh dari keramaian wisata arus utama.',
      icon: Compass,
    },
    {
      id: 'ticketing',
      title: 'Akses Antrean Prioritas',
      desc: 'Sistem jalur cepat (Fast-Track) kami menjalin kemitraan dengan loket wisata Banyumas. Kamu tinggal pindai kode QR dan melangkah masuk.',
      icon: Ticket,
    },
    {
      id: 'stay',
      title: 'Akomodasi',
      desc: 'Mulai dari pinggir tebing hingga cabin privat. Kami menyediakan akomodasi yang menawarkan 100% integrasi dengan alam sekitar.',
      icon: Home,
    },
    {
      id: 'transport',
      title: 'Transportasi',
      desc: 'Informasi armada lengkap. Sewa eksklusif untuk tur santai keluarga, atau kendaraan off-road untuk medan curam menantang.',
      icon: Car,
    },
    {
      id: 'guide',
      title: 'Pemandu Lokal',
      desc: 'Pendamping wisata kami adalah pemuda asli daerah yang menguasai jalan tikus, etika budaya, serta sejarah mendalam di setiap sudut Banyumas.',
      icon: Users,
    },
    {
      id: 'documentation',
      title: 'Dokumentasi',
      desc: 'Nikmati liburan tanpa pusing memegang kamera. Tim videografer dan drone kami akan mengabadikan setiap canda tawa ekspedisi kamu.',
      icon: Camera,
    }
  ];
  return (
    <div className="flex flex-col flex-1 w-full bg-[#f3f5f4] pb-20">
      <section className="bg-brand text-white py-24 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Layanan Kami</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 text-[#edf8f4]">
            Dari satu langkahmu hingga kamu tertidur lelap sepulang wisata, serahkan semua detail teknis perjalanannya kepada kami.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 max-w-7xl -mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <article key={svc.id} className="bg-white border border-[#d8dede] rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-opacity-95 backdrop-blur-sm z-10 shadow-lg">
              <div className="flex items-center gap-5 mb-5">
                <span className="w-14 h-14 rounded-xl bg-[#e8f0ed] text-brand flex items-center justify-center shrink-0">
                  <svc.icon className="w-7 h-7"/>
                </span>
                <h3 className="text-xl font-bold mb-0 text-gray-900 leading-tight">{svc.title}</h3>
              </div>
              <p className="text-[#5d6a67] m-0 leading-relaxed flex-1">{svc.desc}</p>
              <Link href="/contact" className="mt-8 self-start font-semibold text-brand hover:text-brand-dark transition-colors flex items-center text-sm tracking-wide gap-1 group">
                Reservasi Layanan <span className="text-lg group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
