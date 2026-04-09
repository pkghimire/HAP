import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  authorName?: string;
  createdAt: any;
  imageUrl?: string;
  category?: string;
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'blogs'), 
          where('language', '==', i18n.language),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        setBlogs(data);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [i18n.language]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('blog')}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No blog posts found for this language.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Card key={blog.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {blog.imageUrl && (
                <div className="h-48 w-full bg-slate-100">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <CardHeader>
                {blog.category && (
                  <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">
                    {blog.category}
                  </div>
                )}
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="text-base mb-4 line-clamp-3 flex-1">
                  {blog.excerpt || 'Read more about this spiritual insight...'}
                </CardDescription>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">{blog.authorName || 'Admin'}</span>
                  <Link to={`/blog/${blog.id}`} className="text-sm font-medium text-primary-600 hover:underline">
                    {t('read_more')}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
