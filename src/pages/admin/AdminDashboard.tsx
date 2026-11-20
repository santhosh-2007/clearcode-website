import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  FolderKanban, 
  Layers, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { formatDate, formatRelativeTime } from '@/utils/formatters';
import { dataService } from '@/services/dataService';
import type { Enquiry, Project } from '@/types';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dataService.getEnquiries(), dataService.getProjects()]).then(([enq, proj]) => {
      setEnquiries(enq);
      setProjects(proj);
      setLoading(false);
    });
  }, []);

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const inProgressEnquiries = enquiries.filter((e) => e.status === 'In Progress').length;
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.is_published).length;

  const recentEnquiries = enquiries.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <Badge variant="blue">New</Badge>;
      case 'Contacted':
        return <Badge variant="cyan">Contacted</Badge>;
      case 'Discussion':
        return <Badge variant="amber">Discussion</Badge>;
      case 'Quotation Sent':
        return <Badge variant="gray">Quotation Sent</Badge>;
      case 'In Progress':
        return <Badge variant="blue">In Progress</Badge>;
      case 'Completed':
        return <Badge variant="green">Completed</Badge>;
      case 'Rejected':
        return <Badge variant="red">Rejected</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Calculating real-time database metrics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          System Overview & Metrics
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Real database values computed from live enquiries and projects records.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Enquiries */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted uppercase font-semibold tracking-wider block">
              Total Enquiries
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
              {totalEnquiries}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-cyan">
            <Inbox className="w-5 h-5" />
          </div>
        </Card>

        {/* New Enquiries */}
        <Card className="p-5 flex items-center justify-between border-brand-blue/40">
          <div>
            <span className="text-xs text-brand-cyan uppercase font-semibold tracking-wider block">
              New Enquiries
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-cyan mt-1">
              {newEnquiries}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-blue/30 flex items-center justify-center text-brand-cyan">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        {/* In Progress */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted uppercase font-semibold tracking-wider block">
              In Progress
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
              {inProgressEnquiries}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        {/* Total Projects */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted uppercase font-semibold tracking-wider block">
              Portfolio Projects
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
              {totalProjects}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-cardHover flex items-center justify-center text-text-secondary">
            <FolderKanban className="w-5 h-5" />
          </div>
        </Card>

        {/* Active/Completed */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted uppercase font-semibold tracking-wider block">
              Published Work
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
              {completedProjects}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Recent Enquiries Table */}
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-surface-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-heading font-bold text-white">Recent Customer Enquiries</h2>
            <p className="text-xs text-text-muted">Latest project leads received through ClearCode.dev</p>
          </div>
          <Link to="/admin/enquiries">
            <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Manage All Enquiries
            </Button>
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="p-12 text-center text-sm text-text-secondary">
            No customer enquiries logged yet. Fill out the public enquiry form to test the flow!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-cardHover/70 text-text-muted uppercase tracking-wider font-semibold border-b border-surface-border">
                <tr>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{enq.customer_name}</div>
                      {enq.business_name && (
                        <div className="text-[11px] text-text-muted">{enq.business_name}</div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-text-secondary">{enq.email}</div>
                      <div className="text-[11px] text-text-muted">{enq.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-brand-cyan">
                      {enq.budget}
                    </td>
                    <td className="px-5 py-3.5">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="px-5 py-3.5 text-text-muted whitespace-nowrap">
                      {formatRelativeTime(enq.created_at)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link to="/admin/enquiries">
                        <Button size="sm" variant="ghost" className="text-brand-cyan">
                          <Eye className="w-3.5 h-3.5 mr-1" /> View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
