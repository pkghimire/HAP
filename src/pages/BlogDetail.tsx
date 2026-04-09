import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorName?: string;
  createdAt: any;
  imageUrl?: string;
  category?: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        } else {
          setBlog(null);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `blogs/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Blog post not found</h2>
        <Button asChild variant="outline">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 -ml-4 text-slate-500 hover:text-orange-600">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Link>
      </Button>

      <article className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        {blog.imageUrl && (
          <div className="w-full h-64 md:h-96 bg-slate-100">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        
        <div className="p-8 md:p-12">
          {blog.category && (
            <div className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4">
              {blog.category}
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-10 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.authorName || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blog.createdAt?.toDate().toLocaleDateString() || 'Unknown date'}</span>
            </div>
          </div>
          
          <div className="prose prose-orange prose-lg max-w-none text-slate-700 whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>
      </article>
    </div>
  );
}
