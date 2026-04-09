import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  status: 'new' | 'read';
  createdAt: any;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
      setContacts(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'contacts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { status: 'read' });
      setContacts(contacts.map(c => c.id === id ? { ...c, status: 'read' } : c));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `contacts/${id}`);
    }
  };

  if (loading) return <div>Loading contacts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Submissions</h2>
        <Button onClick={fetchContacts} variant="outline">Refresh</Button>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <div className="text-slate-500">No contact submissions found.</div>
        ) : (
          contacts.map(contact => (
            <Card key={contact.id} className={contact.status === 'new' ? 'border-orange-300 bg-orange-50/30' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <div className="text-sm text-slate-500 mt-1">
                      {contact.email && <span className="mr-4">✉️ {contact.email}</span>}
                      {contact.phone && <span>📞 {contact.phone}</span>}
                    </div>
                  </div>
                  {contact.status === 'new' && (
                    <Button size="sm" onClick={() => markAsRead(contact.id)}>Mark as Read</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 whitespace-pre-wrap">{contact.message}</p>
                <div className="text-xs text-slate-400 mt-4">
                  Received: {contact.createdAt?.toDate().toLocaleString() || 'Unknown'}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
