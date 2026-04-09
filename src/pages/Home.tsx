import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Flame, Flower2, Sparkles } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export default function Home() {
  const { t } = useTranslation();
  const { heroImageUrl } = useSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${heroImageUrl || 'https://picsum.photos/seed/himalayas/1920/1080'}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-24 md:mb-32 tracking-tight max-w-4xl mx-auto drop-shadow-lg">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8" asChild>
              <Link to="/contact">{t('book_anusthan')}</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm" asChild>
              <Link to="/services">{t('our_services')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('our_services')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Vedic Anusthan', icon: Flame, desc: 'Authentic rituals performed by learned scholars following ancient scriptures.' },
              { title: 'Graha Shanti', icon: Sparkles, desc: 'Pacify planetary influences and bring harmony to your life.' },
              { title: 'Sanskar Ceremonies', icon: Flower2, desc: 'Sacred rites of passage from birth to marriage, conducted with purity.' }
            ].map((service, i) => (
              <Card key={i} className="border-primary-100 hover:shadow-md transition-shadow text-center">
                <CardHeader className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <service.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="ghost" className="text-primary-600" asChild>
              <Link to="/services">{t('read_more')} &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 bg-primary-900 text-primary-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-8">{t('mission_vision')}</h2>
          <div className="space-y-6 text-lg text-primary-100/90 leading-relaxed">
            <p><strong>Mission:</strong> {t('mission_text')}</p>
            <p><strong>Vision:</strong> {t('vision_text')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
