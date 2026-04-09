import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  benefits?: string[];
  imageUrl?: string;
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'services'), where('language', '==', i18n.language));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
        setServices(data);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [i18n.language]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('our_services')}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No services found for this language.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(service => (
            <Card key={service.id} className="overflow-hidden flex flex-col">
              {service.imageUrl && (
                <div className="h-48 w-full bg-slate-100">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="text-base mb-4 flex-1">
                  {service.description}
                </CardDescription>
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-slate-900 mb-2">Benefits:</h4>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      {service.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button asChild className="w-full mt-auto">
                  <Link to="/contact">{t('book_anusthan')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
