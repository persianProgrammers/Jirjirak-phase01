import { useGlobalStore } from '../stores/globalStore';

export default function About() {
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <div className="py-32 px-8 lg:px-16 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-6 text-brand-yellow">
        {isFa ? 'درباره جیرجیرک' : 'About Jirjirak'}
      </h1>
      <p className="text-brand-gray text-lg leading-relaxed">
        {isFa 
          ? 'جیرجیرک یک استودیوی خلاق است که توسط تیمی کوچک از افراد مشتاق ساخته شده است. ما به کیفیت به جای کمیت، عمق به جای سرعت، و ایده‌های معنادار باور داریم.'
          : 'Jirjirak is a creative studio, built by a small team of passionate people. We believe in quality over quantity, depth over speed, and ideas that actually matter.'}
      </p>
    </div>
  );
}
