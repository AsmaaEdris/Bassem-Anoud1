import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import 'aos/dist/aos.css' // استيراد التنسيق

export const Route = createRootRoute({
 head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // العنوان الذي يظهر في التاب
      { title: 'Bassem & Anoud — Wedding Invitation' },
      // الوصف الذي يظهر عند المشاركة
      { name: 'description', content: 'You are cordially invited to celebrate the marriage of Bassem & Anoud. Join us for our special day.' },
      
      // Open Graph (للفيسبوك وواتساب)
      { property: 'og:title', content: 'Wedding Invitation: Bassem ❤️ Anoud' },
      { property: 'og:description', content: 'Join us in celebrating our wedding day. Click to open the invitation.' },
      { property: 'og:image', content: '/wedding-icon.png' }, // ضعي صورتك في المجلد public
      { property: 'og:url', content: 'https://Bassem-Anoud.vercel.app' }, // ضعي رابط موقعك الفعلي هنا
      { property: 'og:type', content: 'website' },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Wedding Invitation: Bassem ❤️ Anoud' },
      { name: 'twitter:image', content: '/wedding-icon.png' },
    ],
    links: [
      { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' },
    ],
    scripts: [
      {
        src: 'https://unpkg.com/aos@2.3.1/dist/aos.js',
        async: true,
        onload: () => { (window as any).AOS.init({ duration: 1000, once: true }); },
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* بما أننا أضفنا الـ AOS في الـ scripts أعلاه، سيعمل تلقائياً */}
        <Scripts />
      </body>
    </html>
  )
}