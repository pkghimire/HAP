import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'np';
  createdAt: any;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', language: 'en' as 'en' | 'np' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setBlogs(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    try {
      await addDoc(collection(db, 'blogs'), {
        ...newBlog,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || 'Admin',
        createdAt: serverTimestamp()
      });
      setIsCreating(false);
      setNewBlog({ title: '', content: '', language: 'en' });
      fetchBlogs();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'blogs');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blogs/${id}`);
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancel' : 'Create New Blog'}
        </Button>
      </div>

      {isCreating && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  required 
                  value={newBlog.title} 
                  onChange={e => setNewBlog({...newBlog, title: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select 
                  className="w-full border border-slate-200 rounded-md p-2"
                  value={newBlog.language}
                  onChange={e => setNewBlog({...newBlog, language: e.target.value as 'en' | 'np'})}
                >
                  <option value="en">English</option>
                  <option value="np">Nepali</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea 
                  required 
                  rows={10}
                  value={newBlog.content} 
                  onChange={e => setNewBlog({...newBlog, content: e.target.value})} 
                />
              </div>
              <Button type="submit">Publish Blog</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {blogs.length === 0 ? (
          <div className="text-slate-500">No blogs found.</div>
        ) : (
          blogs.map(blog => (
            <Card key={blog.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{blog.title}</CardTitle>
                    <div className="text-sm text-slate-500 mt-1">
                      Language: {blog.language.toUpperCase()} | 
                      Date: {blog.createdAt?.toDate().toLocaleDateString() || 'Unknown'}
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
