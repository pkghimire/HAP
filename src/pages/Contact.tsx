import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccessMessage('Thank you for reaching out. We will get back to you soon.');
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'contacts');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('contact_us')}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <Card className="border-primary-100 bg-primary-50/50">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-primary-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">Visit Us</h3>
                  <p className="text-slate-600">Pashupatinath Area, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-primary-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600">+977 1-2345678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-primary-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600">info@himavatarsaprjna.org</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for Google Map */}
          <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              Google Map Integration
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('contact_form_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')} *</label>
                <Input {...register('name')} placeholder="John Doe" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('email')}</label>
                  <Input {...register('email')} type="email" placeholder="john@example.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('phone')}</label>
                  <Input {...register('phone')} placeholder="+977 ..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('message')} *</label>
                <Textarea {...register('message')} placeholder="How can we help you?" rows={5} />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : t('send_message')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
