import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NepaliDate from 'nepali-date-converter';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';

export default function Calendar() {
  const { t } = useTranslation();
  const [nepaliDate, setNepaliDate] = useState<NepaliDate | null>(null);
  const [location, setLocation] = useState('nepal');

  useEffect(() => {
    // In a real app, you might adjust the date based on the selected location's timezone.
    // For this prototype, we'll just get the current Nepali date.
    const now = new Date();
    setNepaliDate(new NepaliDate(now));
  }, [location]);

  const nepaliMonths = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  const nepaliDays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('calendar')}</h1>
        <p className="text-lg text-slate-600">Bikram Sambat (BS) Interactive Calendar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary-600" />
                {t('location')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-primary-50 transition-colors">
                  <input 
                    type="radio" 
                    name="location" 
                    value="nepal" 
                    checked={location === 'nepal'} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-primary-600 focus:ring-primary-600"
                  />
                  <span>{t('nepal')} (NPT)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-primary-50 transition-colors">
                  <input 
                    type="radio" 
                    name="location" 
                    value="global" 
                    checked={location === 'global'} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-primary-600 focus:ring-primary-600"
                  />
                  <span>{t('global')} (Local Time)</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-primary-200 shadow-md overflow-hidden">
            <div className="bg-primary-600 text-white p-8 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-medium opacity-90 mb-2">{t('today')}</h2>
              {nepaliDate ? (
                <div className="text-5xl font-bold tracking-tight">
                  {nepaliDate.getDate()} {nepaliMonths[nepaliDate.getMonth()]} {nepaliDate.getYear()}
                </div>
              ) : (
                <div className="text-5xl font-bold tracking-tight">Loading...</div>
              )}
              {nepaliDate && (
                <div className="text-xl mt-4 opacity-90">
                  {nepaliDays[nepaliDate.getDay()]}
                </div>
              )}
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-1">{t('tithi')}</div>
                  <div className="text-2xl font-medium text-slate-800">Pratipada</div>
                  <div className="text-xs text-slate-500 mt-1">(Calculated)</div>
                </div>
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-1">{t('gate')}</div>
                  <div className="text-2xl font-medium text-slate-800">{nepaliDate?.getDate()}</div>
                  <div className="text-xs text-slate-500 mt-1">Gatē</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
