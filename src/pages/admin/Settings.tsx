import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function AdminSettings() {
  const [themeColor, setThemeColor] = useState('#ea580c');
  const [secondaryColor, setSecondaryColor] = useState('#0f172a');
  const [logoBase64, setLogoBase64] = useState('');
  const [heroImageBase64, setHeroImageBase64] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.themeColor) setThemeColor(data.themeColor);
          if (data.secondaryColor) setSecondaryColor(data.secondaryColor);
          if (data.logoUrl) setLogoBase64(data.logoUrl);
          if (data.heroImageUrl) setHeroImageBase64(data.heroImageUrl);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'settings/general');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'hero') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Max dimensions
        const MAX_WIDTH = type === 'logo' ? 800 : 1920;
        const MAX_HEIGHT = type === 'logo' ? 800 : 1080;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality to ensure it stays well under 1MB
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        if (type === 'logo') {
          setLogoBase64(dataUrl);
        } else {
          setHeroImageBase64(dataUrl);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        themeColor,
        secondaryColor,
        logoUrl: logoBase64,
        heroImageUrl: heroImageBase64,
      }, { merge: true });
      setMessage('Settings saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/general');
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Site Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Theme & Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <div className={`p-3 rounded-md text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Primary Theme Color</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded border border-slate-200"
              />
              <Input 
                type="text" 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-32 font-mono"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Select a base color for the website theme.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secondary Theme Color</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={secondaryColor} 
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded border border-slate-200"
              />
              <Input 
                type="text" 
                value={secondaryColor} 
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-32 font-mono"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Select a secondary color for accents and backgrounds.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Logo</label>
            {logoBase64 && (
              <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-md inline-block">
                <img src={logoBase64} alt="Site Logo" className="h-16 object-contain" />
              </div>
            )}
            <Input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, 'logo')}
              className="cursor-pointer"
            />
            <p className="text-xs text-slate-500 mt-2">Upload a logo image (Max 500KB). It will be displayed in the top navigation bar.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Home Page Hero Image</label>
            {heroImageBase64 && (
              <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-md inline-block w-full">
                <img src={heroImageBase64} alt="Hero Image" className="h-32 object-cover w-full rounded-md" />
              </div>
            )}
            <Input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, 'hero')}
              className="cursor-pointer"
            />
            <p className="text-xs text-slate-500 mt-2">Upload a background image for the home page hero section (Max 2MB).</p>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
