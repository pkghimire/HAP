import { useState, useEffect } from 'react';
import { collection, getDocs, query, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

interface Service {
  id: string;
  title: string;
  description: string;
  language: 'en' | 'np';
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newService, setNewService] = useState({ title: '', description: '', language: 'en' as 'en' | 'np' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'services'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'services'), {
        ...newService,
        createdAt: serverTimestamp()
      });
      setIsCreating(false);
      setNewService({ title: '', description: '', language: 'en' });
      fetchServices();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'services');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancel' : 'Add New Service'}
        </Button>
      </div>

      {isCreating && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  required 
                  value={newService.title} 
                  onChange={e => setNewService({...newService, title: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select 
                  className="w-full border border-slate-200 rounded-md p-2"
                  value={newService.language}
                  onChange={e => setNewService({...newService, language: e.target.value as 'en' | 'np'})}
                >
                  <option value="en">English</option>
                  <option value="np">Nepali</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea 
                  required 
                  rows={4}
                  value={newService.description} 
                  onChange={e => setNewService({...newService, description: e.target.value})} 
                />
              </div>
              <Button type="submit">Save Service</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.length === 0 ? (
          <div className="text-slate-500">No services found.</div>
        ) : (
          services.map(service => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="text-sm text-slate-500 mt-1">
                      Language: {service.language.toUpperCase()}
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{service.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
