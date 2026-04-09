import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/blogs">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Manage Blogs</CardTitle>
              <FileText className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">Articles</div>
              <p className="text-xs text-slate-500 mt-1">Create and edit blog posts</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/services">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Manage Services</CardTitle>
              <Briefcase className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">Offerings</div>
              <p className="text-xs text-slate-500 mt-1">Update Vedic services</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/contacts">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">View Contacts</CardTitle>
              <Users className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">Inquiries</div>
              <p className="text-xs text-slate-500 mt-1">Check messages from users</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
