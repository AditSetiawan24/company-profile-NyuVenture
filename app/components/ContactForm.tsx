"use client";
import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
export default function ContactForm({ 
  className = "lg:w-3/5 md:p-12 p-8 flex flex-col justify-center",
  title = "Kirimkan Surat Digital"
}: { className?: string, title?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    formElement.reset();
  };
  return (
    <div className={className}>
      {title && <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition" placeholder="Kipli Sukata" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition" placeholder="kipli@gmail.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Topik Pesan</label>
          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition">
            <option>Tanya Rute Wisata</option>
            <option>Kerjasama Vendor</option>
            <option>Feedback Aplikasi</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Isi Pesan</label>
          <textarea rows={5} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition resize-none" placeholder="Ceritakan detailnya di sini..."></textarea>
        </div>
        {success && (
          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg text-sm font-semibold text-center">
            Pesan berhasil terkirim! Kami akan segera menghubungi Anda.
          </div>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`font-bold px-8 py-4 rounded-xl w-full transition flex items-center justify-center gap-2 ${
            isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand text-white hover:bg-emerald-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Kirim Pesan Sekarang
            </>
          )}
        </button>
      </form>
    </div>
  );
}
