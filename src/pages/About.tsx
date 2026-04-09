import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Heart, Sun } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('about')}</h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
      </div>

      <div className="space-y-12">
        <section className="prose prose-orange max-w-none text-lg text-slate-700 leading-relaxed">
          <p>
            Himavat Arsa Prjna is dedicated to the preservation, practice, and propagation of authentic Vedic rituals and spiritual wisdom. Nestled in the sacred land of Nepal, the Himalayas have always been the abode of sages and seekers. We strive to bring that profound peace and spiritual clarity to the modern world.
          </p>
          <p>
            Our organization conducts various Vedic Anusthans, Yagyas, and Sanskar ceremonies strictly adhering to the ancient scriptures. Guided by learned scholars and Gurus, we ensure that every ritual is performed with utmost purity, devotion, and precision.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-8 text-center">
              <Sun className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-700">{t('vision_text')}</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-700">{t('mission_text')}</p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center py-8">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Spiritual Lineage</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            We follow the timeless traditions passed down through generations of Vedic scholars in the Himalayan region, maintaining the sanctity and authenticity of every mantra and offering.
          </p>
        </section>
      </div>
    </div>
  );
}
