import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 w-full bg-white relative">
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Siap membantu perjalanan Anda di Banyumas</h1>
          <p className="text-xl text-gray-600">Kirim pesan untuk kolaborasi, masukan fitur, atau bantuan seputar rekomendasi destinasi.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="lg:w-2/5 md:p-12 p-8 bg-brand-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-8">Informasi Kontak</h2>
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-brand-light shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Email Utama</p>
                      <p className="text-gray-300">weare@nyuventure.id</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-brand-light shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Telepon/WhatsApp</p>
                      <p className="text-gray-300">+62 812 3456 7890</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-brand-light shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Basecamp</p>
                      <p className="text-gray-300">Jl. Ringin Tirto No. 42,<br/>Purwokerto, Banyumas 53123</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-12 pt-12 border-t border-white/20">
                <p className="italic text-gray-300">&quot;Setiap perjalanan dimulai dari satu pesan sederhana.&quot;</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
