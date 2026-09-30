export interface ProjectMilestone {
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
}

export interface ProjectMetric {
  value: string;
  labelEn: string;
  labelFa: string;
}

export interface ProjectCaseStudy {
  step: string;
  badgeEn: string;
  badgeFa: string;
  challenge: ProjectMilestone;
  idea: ProjectMilestone;
  result: ProjectMilestone;
  learning: ProjectMilestone;
  mockupQuote: {
    line1En: string;
    line1Fa: string;
    line2En: string;
    line2Fa: string;
    highlightEn: string;
    highlightFa: string;
  };
  mockupBrand: string;
  environmentShotEn: string;
  environmentShotFa: string;
  figureCaptionEn: string;
  figureCaptionFa: string;
  wireframeEn: string;
  wireframeFa: string;
}

export interface ProjectItem {
  id: string;
  step: string; // e.g. "04 / 08"
  titleEn: string;
  titleFa: string;
  categoryEn: string;
  categoryFa: string;
  departmentId: 'web-dev' | 'branding-identity' | 'game-studio' | 'creative-studio' | 'digital-marketing' | 'seo-analytics' | 'academy-learning';
  departmentNameEn: string;
  departmentNameFa: string;
  descEn: string;
  descFa: string;
  image: string;
  accentColor: string;
  link?: string;
  year: string;
  client: string;
  techStack: string[];
  metrics: ProjectMetric[];
  caseStudy: ProjectCaseStudy;
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 'toyooran',
    step: '04 / 08',
    titleEn: 'TOYOORAN',
    titleFa: 'طیوران',
    categoryEn: 'Web / Brand / Experience',
    categoryFa: 'وب‌سایت / هویت برند / تجربه کاربری',
    departmentId: 'web-dev',
    departmentNameEn: 'Web & Development',
    departmentNameFa: 'وب و توسعه نرم‌افزار',
    descEn: 'Architectural, immersive digital flagship capturing sensory depth and physical space.',
    descFa: 'طراحی پیشرو و معماری دیجیتال برای تجربه‌ای فراتر از یک وب‌سایت متعارف با تمرکز بر عمق حسی فضا.',
    image: '/assets/images/projects/project_toyooran.png',
    accentColor: '#fff083',
    link: 'https://toyooran.com',
    year: '2026',
    client: 'Toyooran Agro Industrial',
    techStack: ['Spatial 3D', 'WebGL', 'Tailwind 4', 'GSAP', 'React 19'],
    metrics: [
      { value: '+240%', labelEn: 'Average Session Duration', labelFa: 'افزایش ماندگاری در سایت' },
      { value: '< 0.8s', labelEn: 'First Contentful Paint', labelFa: 'سرعت لود اولیه' },
      { value: '99.9%', labelEn: 'Uptime & Scalability', labelFa: 'پایداری و دسترسی‌پذیری' },
    ],
    caseStudy: {
      step: '04 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'A traditional agro-industrial powerhouse needed a vanguard digital presence to bridge corporate scale with tactile authenticity for a new generation.',
        descFa: 'یک برند صنعتی و پیشرو با دهه‌ها سابقه نیاز به حضور دیجیتال مدرن داشت تا با نسل جدید و مخاطبان بین‌المللی ارتباطی حسی و معتبر برقرار کند.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'A minimal, immersive spatial web experience that echoes the purity of physical structures, materials, and atmospheric lighting.',
        descFa: 'خلق یک وب‌سایت فضایی مینیمال با تایپوگرافی اصیل، نورپردازی اتمسفریک و تعاملات روان که ارزش‌ها و صلابت برند را تجسم می‌بخشد.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'A high-performing web application and unified visual identity, leading to a 240% surge in user engagement and landmark brand recognition.',
        descFa: 'وب‌سایتی با عملکرد خیره‌کننده و هویت یکپارچه که موجب ارتقای جایگاه برند در صنعت و افزایش ۲۴۰ درصدی زمان تعامل مخاطبان شد.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Simplicity and architectural discipline create emotional depth far surpassing decorative noise.',
        descFa: 'سادگی و انضباط ساختاری عمیق، بیش از هر تزئین اضافه‌ای در ذهن مخاطب ماندگار می‌شود.',
      },
      mockupBrand: 'TOYOORAN',
      mockupQuote: {
        line1En: 'More than a place.',
        line1Fa: 'فراتر از یک مکان.',
        line2En: 'A feeling.',
        line2Fa: 'یک حس ماندگار.',
        highlightEn: 'TOYOORAN',
        highlightFa: 'طیوران',
      },
      environmentShotEn: 'Atmospheric Spatial Architecture',
      environmentShotFa: 'معماری و فضاسازی اتمسفریک',
      figureCaptionEn: 'Figure 02 — Digital Monolith & Tactile Geometry',
      figureCaptionFa: 'طرح ۰۲ — ساختار یکپارچه دیجیتال و هندسه ملموس',
      wireframeEn: 'Responsive Structural Wireframe & Shaders',
      wireframeFa: 'وایرفریم واکنش‌گرا و پایپ‌لاین رندر سه‌بعدی',
    },
  },
  {
    id: 'noura',
    step: '01 / 08',
    titleEn: 'NOURA BANKING',
    titleFa: 'سامانه نورا',
    categoryEn: 'Fintech Architecture',
    categoryFa: 'سامانه بانکی و زیرساخت مالی',
    departmentId: 'web-dev',
    departmentNameEn: 'Web & Development',
    departmentNameFa: 'وب و توسعه نرم‌افزار',
    descEn: 'Next-generation financial intelligence hub balancing ultra-low latency with biometric security.',
    descFa: 'هاب هوشمند مالی با امنیت بیومتریک، معماری بدون تأخیر و داشبورد تحلیلی مدرن.',
    image: '/assets/images/projects/project_fintech_1790411153505.jpg',
    accentColor: '#5ac8fa',
    link: '#project',
    year: '2026',
    client: 'Noura Capital Group',
    techStack: ['Microfrontends', 'Biometrics', 'Realtime Stream', 'High Security', 'Next-Gen API'],
    metrics: [
      { value: '45ms', labelEn: 'Transaction Latency', labelFa: 'سرعت پردازش تراکنش' },
      { value: '99.99%', labelEn: 'Fault Tolerance', labelFa: 'پایداری بدون وقفه' },
      { value: '3.2M', labelEn: 'Active Daily Requests', labelFa: 'درخواست‌های روزانه' },
    ],
    caseStudy: {
      step: '01 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Legacy banking interfaces suffer from high latency, disjointed information architecture, and cognitive overload for critical transactions.',
        descFa: 'رابط‌های کاربری سنتی بانکی با تأخیر بالا، بار شناختی بیش‌ازحد و ناهماهنگی در دسترسی به اطلاعات مالی حیاتی دست‌وپنجه نرم می‌کردند.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'A high-frequency terminal aesthetic blending Swiss modernist clarity with instant telemetry and hardware-accelerated micro-interactions.',
        descFa: 'ترکیب وضوح سبک مدرنیستی سوئیسی با داشبورد شتاب‌یافته گرافیکی و جریان‌های اطلاعاتی زنده بدون تاخیر.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'Over 3.2M daily users experienced 65% faster transaction completion and near-zero error rates in complex capital operations.',
        descFa: 'کاهش ۶۵ درصدی زمان انجام عملیات پیچیده مالی و رساندن خطای کاربری به نزدیک صفر برای بیش از ۳ میلیون کاربر فعال.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Security does not have to compromise elegance; clarity is the highest form of trust in financial tools.',
        descFa: 'امنیت و ظرافت در تضاد نیستند؛ شفافیت و خوانایی در ابزارهای مالی والاترین شکل اعتماد است.',
      },
      mockupBrand: 'NOURA CAPITAL',
      mockupQuote: {
        line1En: 'Precision at scale.',
        line1Fa: 'دقت در مقیاس بالا.',
        line2En: 'Speed in thought.',
        line2Fa: 'سرعت همگام با اندیشه.',
        highlightEn: 'NOURA',
        highlightFa: 'سامانه نورا',
      },
      environmentShotEn: 'Mission-Critical Telemetry Desk',
      environmentShotFa: 'میز مانیتورینگ بلادرنگ تبادلات مالی',
      figureCaptionEn: 'Figure 01 — Latency Breakdown & Microfrontends',
      figureCaptionFa: 'طرح ۰۱ — ساختار میکروفرانت‌اند و کاهش تأخیر',
      wireframeEn: 'Security Token & Cryptographic Key Handshake',
      wireframeFa: 'معماری امنیتی و تبادل کلیدهای رمزنگاری',
    },
  },
  {
    id: 'kafi',
    step: '02 / 08',
    titleEn: 'KAFI ATELIER',
    titleFa: 'آتلیه کافی',
    categoryEn: 'Brand Experience',
    categoryFa: 'طراحی هویت و تجربه فضایی',
    departmentId: 'branding-identity',
    departmentNameEn: 'Branding & Identity',
    departmentNameFa: 'برندینگ و هویت بصری',
    descEn: 'Sensory boutique coffee atelier with warm ambient amber lighting and dark walnut textures.',
    descFa: 'آتلیه تخصصی قهوه با فضاسازی گرم، نورپردازی کهربایی و بافت‌های مینیمال چوب.',
    image: '/assets/images/projects/project_kafi_1790411104227.jpg',
    accentColor: '#e5a952',
    link: '#project',
    year: '2025',
    client: 'Kafi Atelier',
    techStack: ['Sensory UX', 'React 19', 'Audio Engine', 'Amber Bloom', 'Brand Guideline'],
    metrics: [
      { value: '100%', labelEn: 'Bespoke Typography', labelFa: 'تایپوگرافی اختصاصی' },
      { value: '+310%', labelEn: 'Brand Equity Growth', labelFa: 'رشد ارزش برند' },
      { value: '4.9/5', labelEn: 'Customer Sensory Score', labelFa: 'رضایت حسی مخاطبان' },
    ],
    caseStudy: {
      step: '02 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'How to translate the tactile, aromatic experience of third-wave artisan coffee roasting into a digital space without feeling generic or cold.',
        descFa: 'چگونه می‌توان حس بویایی، گرما و لمس دانه و فنجان قهوه را به فضایی دیجیتال منتقل کرد بدون اینکه سرد یا تکراری به نظر برسد.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'A warm acoustic atmosphere blending walnut textures, custom ligature typography, and slow interactive micro-rituals.',
        descFa: 'خلق اتمسفر صوتی و بصری بر پایه بافت‌های طبیعی چوب گردو، تایپوگرافی با اتصالات اختصاصی و ریتم آرام تعاملی.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'Kafi became a celebrated boutique benchmark, uniting retail and digital presence under a cohesive sensorial language.',
        descFa: 'کافی به نمادی از تلفیق فضای فیزیکی و دیجیتال تبدیل شد و موجی از مخاطبان وفادار را جذب کرد.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Digital interactions can evoke warmth and human ritual when texture and tone are treated with care.',
        descFa: 'تجارب دیجیتال می‌توانند حامل حس گرما و آیین‌های انسانی باشند اگر بافت و لحن به درستی هدایت شوند.',
      },
      mockupBrand: 'KAFI',
      mockupQuote: {
        line1En: 'The ritual of pause.',
        line1Fa: 'آیین درنگ و آرامش.',
        line2En: 'The craft of taste.',
        line2Fa: 'هنر خلق طعم اصیل.',
        highlightEn: 'KAFI',
        highlightFa: 'آتلیه کافی',
      },
      environmentShotEn: 'Sensory Roasting Chamber & Lighting',
      environmentShotFa: 'تالار برشته‌کاری و نورپردازی کهربایی',
      figureCaptionEn: 'Figure 03 — Walnut Grain Texture & Typographic Grid',
      figureCaptionFa: 'طرح ۰۳ — بافت چوب گردو و گرید تایپوگرافی سفارشی',
      wireframeEn: 'Acoustic Soundbed & Amber Bloom Shaders',
      wireframeFa: 'طراحی ساندبِد محیطی و لایه‌های بازتاب نور',
    },
  },
  {
    id: 'jirjirak-world',
    step: '03 / 08',
    titleEn: 'JIRJIRAK WORLD',
    titleFa: 'جهان جیرجیرک',
    categoryEn: 'Gaming & 3D Simulation',
    categoryFa: 'بازی‌سازی و شبیه‌سازی سه‌بعدی',
    departmentId: 'game-studio',
    departmentNameEn: 'Game Studio & Interactive',
    departmentNameFa: 'استودیو بازی‌سازی و تعاملی',
    descEn: 'Expansive open-world adventure universe with stylized low-poly art and spatial dynamic sound.',
    descFa: 'دنیای ماجراجویی تعاملی با آرت‌استایل اختصاصی، هویت بصری پویا و شبیه‌سازی صدا.',
    image: '/assets/images/projects/project_gaming_1790411118596.jpg',
    accentColor: '#4cd964',
    link: '#project',
    year: '2025',
    client: 'Jirjirak Game Studios',
    techStack: ['Three.js', 'Shader Graph', 'GLSL', 'Spatial Audio', 'Physics Engine'],
    metrics: [
      { value: '60 FPS', labelEn: 'Stable WebGL Frame Rate', labelFa: 'نرخ فریم رندر مرورگر' },
      { value: '12km²', labelEn: 'Procedural Virtual World', labelFa: 'وسعت دنیای قابل اکتشاف' },
      { value: '45+', labelEn: 'Interactive Dynamic Entities', labelFa: 'موجودیت‌های تعاملی مستقل' },
    ],
    caseStudy: {
      step: '03 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Running rich 3D worlds directly inside standard mobile and desktop browsers with zero install barriers and buttery smooth 60 FPS.',
        descFa: 'اجرای روان یک دنیای سه‌بعدی غنی با فیزیک و اتمسفر نوری بدون نیاز به نصب هیچ پلاگین و با ۶۰ فریم بر ثانیه در تمامی دستگاه‌ها.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'Stylized custom shaders, instanced mesh rendering, and a procedural biome system tuned for lightweight memory footprints.',
        descFa: 'توسعه شیدرهای اختصاصی، سیستم رندرینگ نمونه‌ای (Instancing) و ساخت اقلیم‌های زیستی رویه‌ای برای حداقل مصرف رم.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'A magical narrative universe where users interact with studio characters and unlock creative artifacts.',
        descFa: 'جهانی داستانی و پر رمز و راز که کاربران در آن با کاراکترهای استودیو گفتگو می‌کنند و دستاوردهای خلاقانه آزاد می‌کنند.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Art direction and lighting trump raw polygon counts every single time.',
        descFa: 'جهت‌گیری هنری، استایل نوری و هارمونی صدا همواره بر تعداد خام چندضلعی‌ها برتری دارند.',
      },
      mockupBrand: 'JIRJIRAK STUDIOS',
      mockupQuote: {
        line1En: 'Step inside the mystery.',
        line1Fa: 'قدم در ناشناخته‌ها بگذار.',
        line2En: 'Unravel the world.',
        line2Fa: 'رمزگشایی جهان بازی.',
        highlightEn: 'JIRJIRAK',
        highlightFa: 'جهان جیرجیرک',
      },
      environmentShotEn: 'Procedural Twilight Biome Landscape',
      environmentShotFa: 'اقلیم شبیه‌سازی شده گرگ‌ومیش',
      figureCaptionEn: 'Figure 04 — Shader Pipeline & Mesh Instancing',
      figureCaptionFa: 'طرح ۰۴ — پایپ‌لاین شیدر و بهینه‌سازی بار پردازشی',
      wireframeEn: 'Dynamic Spatial Sound Nodes & Soundscapes',
      wireframeFa: 'طراحی نودهای صوتی سه‌بعدی متناسب با موقعیت بازیکن',
    },
  },
  {
    id: 'momo-creative',
    step: '05 / 08',
    titleEn: 'MOMO MOTION LAB',
    titleFa: 'استودیو موشن مومو',
    categoryEn: 'Motion & Visual Arts',
    categoryFa: 'موشن گرافیک و هنرهای بصری',
    departmentId: 'creative-studio',
    departmentNameEn: 'Creative Studio',
    departmentNameFa: 'استودیو خلاقیت و هنر بصری',
    descEn: 'High-octane kinetic typography and character animation system for cultural and festival branding.',
    descFa: 'سیستم تایپوگرافی کینتیک پرانرژی و انیمیشن کاراکتر برای رویدادها و برندینگ فرهنگی بین‌المللی.',
    image: '/assets/images/departments/Creative-Studio.png',
    accentColor: '#ff2d55',
    link: '#project',
    year: '2026',
    client: 'Momo International Festival',
    techStack: ['After Effects', 'Rive', 'Lottie', 'Custom SVG Physics', 'Cinema 4D'],
    metrics: [
      { value: '120+', labelEn: 'Kinetic Motion Assets', labelFa: 'آرت‌ورک‌های متحرک' },
      { value: '4K', labelEn: 'Master Screen Resolution', labelFa: 'کیفیت رندر نهایی' },
      { value: '10M+', labelEn: 'Social Campaign Impressions', labelFa: 'بازدیدهای کمپین' },
    ],
    caseStudy: {
      step: '05 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Creating a kinetic design language versatile enough to scale from giant outdoor LED billboards to tiny mobile app icons.',
        descFa: 'خلق زبانی پویا که بتواند از بیلبوردهای عظیم شهری تا کوچک‌ترین آیکون‌های موبایل بدون افت هویت تغییر مقیاس دهد.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'Elastic typography modules reacting to sound decibels with retro-futuristic mechanical aesthetics.',
        descFa: 'ماژول‌های تایپوگرافی الاستیک که به بلندی صدا واکنش نشان می‌دهند، همراه با چاشنی مکانیکی رترو-فیوچریستیک.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'The campaign captured over 10M impressions across 14 countries, winning Gold at the International Design Biennale.',
        descFa: 'کمپین بیش از ۱۰ میلیون بازدید جهانی کسب کرد و تندیس طلای بی‌ینال بین‌المللی طراحی را از آن خود کرد.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Motion is not an ornament; motion is the punctuation of visual communication.',
        descFa: 'حرکت تنها یک تزیین نیست؛ حرکت علائم نگارشی ارتباطات بصری در عصر دیجیتال است.',
      },
      mockupBrand: 'MOMO MOTION',
      mockupQuote: {
        line1En: 'Letters with momentum.',
        line1Fa: 'حروف با تکانه و شتاب.',
        line2En: 'Stories in rhythm.',
        line2Fa: 'روایت‌هایی در ضرب‌آهنگ نور.',
        highlightEn: 'MOMO LAB',
        highlightFa: 'استودیو مومو',
      },
      environmentShotEn: 'Giant Stage LED Wall Display Test',
      environmentShotFa: 'تست رندر روی استیج و نمایشگرهای ال‌ای‌دی غول‌پیکر',
      figureCaptionEn: 'Figure 05 — Elastic Bezier Curves & Vector Interpolation',
      figureCaptionFa: 'طرح ۰۵ — منحنی‌های بزیه الاستیک و درون‌یابی برداری',
      wireframeEn: 'Character Rigging & Mechanical Joints',
      wireframeFa: 'ریگ‌بندی استخوان‌بندی کاراکترها و اتصالات مفصلی',
    },
  },
  {
    id: 'aria-growth',
    step: '06 / 08',
    titleEn: 'ARIA GROWTH HUB',
    titleFa: 'هاب رشد آریا',
    categoryEn: 'Digital Marketing & Performance',
    categoryFa: 'دیجیتال مارکتینگ و کمپین‌های پرفورمنس',
    departmentId: 'digital-marketing',
    departmentNameEn: 'Digital Marketing & Growth',
    departmentNameFa: 'مارکتینگ دیجیتال و رشد',
    descEn: 'Omnichannel acquisition engine turning analytical data into bold storytelling and hyper-targeted conversion.',
    descFa: 'موتور یکپارچه جذب مخاطب و پرفورمنس مارکتینگ با تبدیل تحلیل‌های دقیق به روایتی جذاب و فروش پایدار.',
    image: '/assets/images/departments/Digital-Marketing-&-Growth.png',
    accentColor: '#af52de',
    link: '#project',
    year: '2025',
    client: 'Aria Enterprises',
    techStack: ['Attribution Modeling', 'A/B Matrix', 'Automated Funnels', 'Data Studio'],
    metrics: [
      { value: '4.8x', labelEn: 'ROAS Performance Return', labelFa: 'بازگشت سرمایه تبلیغات (ROAS)' },
      { value: '-42%', labelEn: 'Cost Per Acquisition (CPA)', labelFa: 'کاهش هزینه جذب هر مشتری' },
      { value: '+185%', labelEn: 'Net Revenue Expansion', labelFa: 'رشد سودآوری خالص' },
    ],
    caseStudy: {
      step: '06 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Diminishing ad returns and rising customer acquisition costs due to generic, noisy advertising fatigue.',
        descFa: 'کاهش بازدهی تبلیغات مرسوم و افزایش سرسام‌آور هزینه جذب مشتری در اثر خستگی مخاطبان از تبلیغات تکراری.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'Micro-segmented landing experiences paired with bespoke narrative hooks tuned to customer intent stages.',
        descFa: 'طراحی لندینگ‌پیج‌های میکرو-شخصی‌سازی شده همراه با قلاب‌های روایی متناسب با نقطه نیاز مخاطب.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'Delivered an astonishing 4.8x ROAS across multi-channel campaigns with sustainable customer lifetime value.',
        descFa: 'تحقق بازگشت سرمایه ۴.۸ برابری در کانال‌های تبلیغاتی و افزایش طول عمر ارزش مشتری (LTV).',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Data points show you where users drop; human empathy shows you how to bring them back.',
        descFa: 'داده‌ها نشان می‌دهند کاربران کجا متوقف می‌شوند؛ همدلی انسانی راه بازگرداندن آن‌ها را هموار می‌کند.',
      },
      mockupBrand: 'ARIA GROWTH',
      mockupQuote: {
        line1En: 'Every touchpoint matters.',
        line1Fa: 'هر نقطه تماس ارزشمند است.',
        line2En: 'Every metric connects.',
        line2Fa: 'هر شاخص پیونددهنده رشد است.',
        highlightEn: 'ARIA HUB',
        highlightFa: 'هاب آریا',
      },
      environmentShotEn: 'Real-time Conversion Analytics Matrix',
      environmentShotFa: 'ماتریس تحلیل بلادرنگ نرخ تبدیل و قیف فروش',
      figureCaptionEn: 'Figure 06 — Multi-Channel Touchpoint Attribution',
      figureCaptionFa: 'طرح ۰۶ — رهگیری چندکاناله و مسیر تبدیل کاربران',
      wireframeEn: 'High-Converting Modular Flow Architecture',
      wireframeFa: 'طراحی جریان ماژولار صفحات ورود و فرم‌های تعاملی',
    },
  },
  {
    id: 'atlas-seo',
    step: '07 / 08',
    titleEn: 'ATLAS SEARCH ARCHITECTURE',
    titleFa: 'معماری سرچ اطلس',
    categoryEn: 'Technical SEO & Data Science',
    categoryFa: 'سئو تکنیکال و مهندسی داده',
    departmentId: 'seo-analytics',
    departmentNameEn: 'SEO & Analytics',
    departmentNameFa: 'سئو و آنالیتیکس تخصصی',
    descEn: 'Algorithmic search authority framework and structured knowledge graphs for high-competition enterprise niches.',
    descFa: 'چارچوب مهندسی سئو تکنیکال، گراف دانش ساختاریافته و رتبه‌گیری در پررقابت‌ترین کلمات کلیدی بازار.',
    image: '/assets/images/departments/Seo-&-Analytics.png',
    accentColor: '#ff9500',
    link: '#project',
    year: '2026',
    client: 'Atlas Knowledge Infrastructure',
    techStack: ['Semantic SEO', 'JSON-LD Graphs', 'Edge Rendering', 'Core Web Vitals'],
    metrics: [
      { value: '100/100', labelEn: 'Core Web Vitals Score', labelFa: 'امتیاز شاخص‌های سلامت وب' },
      { value: '+520%', labelEn: 'Organic Search Impressions', labelFa: 'افزایش بازدیدهای ارگانیک' },
      { value: '#1', labelEn: 'Rankings on Tier-1 Keywords', labelFa: 'رتبه یک در کلمات کلیدی هدف' },
    ],
    caseStudy: {
      step: '07 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Massive enterprise portal suffering from index bloat, slow crawl rates, and declining search visibility.',
        descFa: 'پرتال بزرگ با صدها هزار صفحه که با ایندکس نامناسب، خزش کند بات‌ها و افت مداوم بازدید ارگانیک مواجه بود.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'Complete headless edge prerendering with enriched schema knowledge graphs and programmatic topical hubs.',
        descFa: 'بازمهندسی معماری محتوا با پیش‌رندر لبه (Edge Prerendering)، ساخت گراف‌های دانش عمیق و هاب‌های معنایی محتوا.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'Achieved a perfect 100/100 Core Web Vitals score and an unprecedented 520% organic traffic explosion in 90 days.',
        descFa: 'کسب نمره ۱۰۰ در تمامی شاخص‌های گوگل و رشد ۵۲۰ درصدی ورودی ارگانیک ظرف ۹۰ روز.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'Modern SEO is software engineering; treat content and schema with the same rigor as mission-critical databases.',
        descFa: 'سئوی مدرن بخشی از مهندسی نرم‌افزار است؛ با داده‌ها و استراکچرها با بالاترین دقت مهندسی رفتار کنید.',
      },
      mockupBrand: 'ATLAS ENGINE',
      mockupQuote: {
        line1En: 'Search with purpose.',
        line1Fa: 'جستجو با معنا و ساختار.',
        line2En: 'Rank with authority.',
        line2Fa: 'حضور ماندگار در صدر نتایج.',
        highlightEn: 'ATLAS',
        highlightFa: 'اطلس',
      },
      environmentShotEn: 'Knowledge Graph Semantic Clustering Model',
      environmentShotFa: 'مدل خوشه‌بندی معنایی و گراف دانش دامنه‌ای',
      figureCaptionEn: 'Figure 07 — Crawl Budget Optimization & TTFB Reduction',
      figureCaptionFa: 'طرح ۰۷ — بهینه‌سازی بودجه خزش و رساندن TTFB به حداقل',
      wireframeEn: 'JSON-LD Schema Triples & Hierarchy',
      wireframeFa: 'طراحی ساختار پیوندی سه‌گانه Schema و غنی‌سازی دیتای صفحات',
    },
  },
  {
    id: 'danaye-academy',
    step: '08 / 08',
    titleEn: 'DANAYE ACADEMY',
    titleFa: 'آکادمی دانای جیرجیرک',
    categoryEn: 'Interactive Education Hub',
    categoryFa: 'پلتفرم آموزشی و منتورشیپ تعاملی',
    departmentId: 'academy-learning',
    departmentNameEn: 'Academy & Learning Hub',
    departmentNameFa: 'آکادمی و هاب یادگیری',
    descEn: 'Mastery-driven creative engineering school blending interactive code sandboxes with live spatial workshops.',
    descFa: 'مرکز یادگیری مهندسی خلاق با ترکیب سناریوهای عملی کدنویسی زنده، شیدرها و جلسات تخصصی کارگاهی.',
    image: '/assets/images/departments/Academy-&-Learning-Hub.png',
    accentColor: '#30b0c7',
    link: '#project',
    year: '2026',
    client: 'Jirjirak Education Guild',
    techStack: ['WebAssembly', 'Monaco Editor', 'Live Collaborative WebSockets', 'Video Stream'],
    metrics: [
      { value: '94%', labelEn: 'Course Completion Rate', labelFa: 'نرخ تکمیل دوره‌های تخصصی' },
      { value: '1,500+', labelEn: 'Mentored Alumni', labelFa: 'فارغ‌التحصیلان وارد شده به بازار کار' },
      { value: '4.95/5', labelEn: 'Student Net Promoter Score', labelFa: 'رضایت دانشجویان' },
    ],
    caseStudy: {
      step: '08 / 08',
      badgeEn: 'Case Study',
      badgeFa: 'مطالعه موردی',
      challenge: {
        titleEn: 'THE PROBLEM',
        titleFa: 'مسئله و چالش',
        descEn: 'Traditional online courses suffer from passive video watching, leading to a dismal 5-10% completion rate.',
        descFa: 'دوره‌های آموزشی آنلاین مرسوم با تماشای منفعل ویدیوها همراه هستند که به نرخ ریزش بالای ۹۰٪ می‌انجامد.',
      },
      idea: {
        titleEn: 'THE IDEA',
        titleFa: 'ایده و رویکرد طراحی',
        descEn: 'A hands-on, browser-native IDE sandbox where learners code alongside real-time visual feedback and peer feedback.',
        descFa: 'محیط توسعه در مرورگر با فیدبک بصری بلادرنگ و پروژه‌محور که هر سطر کد بی‌درنگ اثر گرافیکی خود را نشان می‌دهد.',
      },
      result: {
        titleEn: 'THE RESULT',
        titleFa: 'نتیجه و دستاورد',
        descEn: 'Skyrocketed course completion to 94%, graduating hundreds of high-caliber creative developers across the region.',
        descFa: 'افزایش نرخ تکمیل دوره‌ها به ۹۴٪ و تربیت نسلی نو از توسعه‌دهندگان خلاق و شیدرنویسان حرفه‌ای.',
      },
      learning: {
        titleEn: 'WHAT WE LEARNED',
        titleFa: 'آنچه آموختیم',
        descEn: 'True learning happens through building and tactile feedback, not passive listening.',
        descFa: 'یادگیری واقعی از ساختن و لمس اثر دست حاصل می‌شود، نه از تماشای منفعل.',
      },
      mockupBrand: 'DANAYE GUILD',
      mockupQuote: {
        line1En: 'Learn by creating.',
        line1Fa: 'با خلق کردن بیاموز.',
        line2En: 'Master the medium.',
        line2Fa: 'بر ابزار خود مسلط شو.',
        highlightEn: 'DANAYE',
        highlightFa: 'آکادمی دانای جیرجیرک',
      },
      environmentShotEn: 'Collaborative IDE Classroom Interface',
      environmentShotFa: 'کلاس درس تعاملی با ویرایشگر همزمان کد',
      figureCaptionEn: 'Figure 08 — Interactive Code Sandbox & WebAssembly Compiler',
      figureCaptionFa: 'طرح ۰۸ — کامپایلر وب‌اسمبلی و شبیه‌ساز کد در مرورگر',
      wireframeEn: 'Curriculum Tree & Skill Mastery Architecture',
      wireframeFa: 'درخت مهارت‌های آموزشی و سیستم سنجش پیشرفت تعاملی',
    },
  },
];

export function getProjectById(id: string): ProjectItem | undefined {
  return ALL_PROJECTS.find((p) => p.id === id);
}

/**
 * Helper to get related projects.
 * Prioritizes projects in the same department as requested by the user,
 * and fills with other projects if fewer than the desired count.
 */
export function getRelatedProjects(
  currentProjectId: string,
  departmentId?: string,
  limit: number = 3
): ProjectItem[] {
  const otherProjects = ALL_PROJECTS.filter((p) => p.id !== currentProjectId);

  // 1. Projects with exact matching department
  const sameDept = departmentId
    ? otherProjects.filter((p) => p.departmentId === departmentId)
    : [];

  // 2. Other studio projects to fill up to limit
  const otherDepts = otherProjects.filter(
    (p) => !sameDept.some((sd) => sd.id === p.id)
  );

  return [...sameDept, ...otherDepts].slice(0, limit);
}
