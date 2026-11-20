import React, { useEffect, useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { formatDate, exportToCSV } from '@/utils/formatters';
import { dataService } from '@/services/dataService';
import type { Enquiry, EnquiryStatus } from '@/types';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Modals
  const [viewEnquiry, setViewEnquiry] = useState<Enquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [updatingStatus, setUpdatingStatus] = useState<EnquiryStatus>('New');

  const statuses: EnquiryStatus[] = [
    'New',
    'Contacted',
    'Discussion',
    'Quotation Sent',
    'In Progress',
    'Completed',
    'Rejected',
  ];

  const fetchEnquiries = async () => {
    setLoading(true);
    const data = await dataService.getEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleOpenDetail = (enq: Enquiry) => {
    setViewEnquiry(enq);
    setAdminNotes(enq.admin_notes || '');
    setUpdatingStatus(enq.status);
  };

  const handleSaveStatusAndNotes = async () => {
    if (!viewEnquiry) return;
    await dataService.updateEnquiryStatus(viewEnquiry.id, updatingStatus, adminNotes);
    setViewEnquiry(null);
    fetchEnquiries();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await dataService.deleteEnquiry(deleteId);
    setDeleteId(null);
    fetchEnquiries();
  };

  const handleExportCSV = () => {
    if (!enquiries.length) return;
    const cleanData = enquiries.map((e) => ({
      ID: e.id,
      Name: e.customer_name,
      Business: e.business_name || '',
      Email: e.email,
      Phone: e.phone,
      WhatsApp: e.whatsapp || '',
      Service: e.service_title || '',
      Budget: e.budget,
      ExpectedDate: e.expected_date || '',
      Status: e.status,
      Description: e.project_description,
      Notes: e.admin_notes || '',
      CreatedAt: e.created_at,
    }));
    exportToCSV(`clearcode_enquiries_${new Date().toISOString().slice(0, 10)}.csv`, cleanData);
  };

  // Filtering
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm) ||
      (e.business_name && e.business_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    const matchesDate = !dateFilter || (e.created_at && e.created_at.startsWith(dateFilter));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New': return <Badge variant="blue">New</Badge>;
      case 'Contacted': return <Badge variant="cyan">Contacted</Badge>;
      case 'Discussion': return <Badge variant="amber">Discussion</Badge>;
      case 'Quotation Sent': return <Badge variant="gray">Quotation Sent</Badge>;
      case 'In Progress': return <Badge variant="blue">In Progress</Badge>;
      case 'Completed': return <Badge variant="green">Completed</Badge>;
      case 'Rejected': return <Badge variant="red">Rejected</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Enquiry Management</h1>
          <p className="text-xs text-text-secondary mt-1">
            Track, qualify, update statuses, and log internal notes for incoming project leads.
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleExportCSV}
          leftIcon={<Download className="w-4 h-4" />}
          disabled={filteredEnquiries.length === 0}
        >
          Export CSV ({filteredEnquiries.length})
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name, email, phone, business..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs placeholder-text-muted border-glow-focus transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {statuses.map((st) => (
                <option key={st} value={st} className="bg-surface text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="sm:col-span-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Enquiries Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <LoadingSpinner message="Fetching customer enquiries..." />
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-sm text-text-secondary">
            No enquiries match the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-cardHover/70 text-text-muted uppercase tracking-wider font-semibold border-b border-surface-border">
                <tr>
                  <th className="px-5 py-3">Customer & Business</th>
                  <th className="px-5 py-3">Contact Details</th>
                  <th className="px-5 py-3">Budget Range</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received On</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{enq.customer_name}</div>
                      <div className="text-[11px] text-text-muted">{enq.business_name || 'Individual / Personal'}</div>
                    </td>
                    <td className="px-5 py-3.5 space-y-0.5">
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
                      {formatDate(enq.created_at)}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleOpenDetail(enq)}
                        className="mr-2"
                      >
                        Manage
                      </Button>
                      <button
                        onClick={() => setDeleteId(enq.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        aria-label="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Customer Details & Status Management Modal */}
      {viewEnquiry && (
        <Modal
          isOpen={Boolean(viewEnquiry)}
          onClose={() => setViewEnquiry(null)}
          title={`Enquiry: ${viewEnquiry.customer_name}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-cardHover/70 border border-surface-border text-xs">
              <div>
                <span className="text-text-muted block">Customer Name</span>
                <span className="font-semibold text-white text-sm">{viewEnquiry.customer_name}</span>
              </div>
              <div>
                <span className="text-text-muted block">Business / Company</span>
                <span className="font-semibold text-white text-sm">{viewEnquiry.business_name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-text-muted block">Email Address</span>
                <a href={`mailto:${viewEnquiry.email}`} className="text-brand-cyan hover:underline font-mono">
                  {viewEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-text-muted block">Phone Number</span>
                <a href={`tel:${viewEnquiry.phone}`} className="text-brand-cyan hover:underline font-mono">
                  {viewEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-text-muted block">Budget Preference</span>
                <span className="text-white font-semibold">{viewEnquiry.budget}</span>
              </div>
              <div>
                <span className="text-text-muted block">Expected Date</span>
                <span className="text-white">{viewEnquiry.expected_date || 'Flexible'}</span>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase text-brand-cyan tracking-wider mb-2">
                Project Requirements Description
              </h4>
              <div className="p-4 rounded-lg bg-surface border border-surface-border text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                {viewEnquiry.project_description}
              </div>
            </div>

            {/* Reference URL */}
            {viewEnquiry.reference_url && (
              <div>
                <h4 className="text-xs font-semibold uppercase text-brand-cyan tracking-wider mb-1">
                  Reference Website
                </h4>
                <a
                  href={viewEnquiry.reference_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  {viewEnquiry.reference_url} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Status Update & Internal Notes Form */}
            <div className="pt-4 border-t border-surface-border space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Update Lead Status
                </label>
                <select
                  value={updatingStatus}
                  onChange={(e) => setUpdatingStatus(e.target.value as EnquiryStatus)}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-sm border-glow-focus transition-all cursor-pointer"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st} className="bg-surface text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Internal Administrative Notes (Private)
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call summary, quotation amount sent, client preference details..."
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs placeholder-text-muted border-glow-focus transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setViewEnquiry(null)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveStatusAndNotes} rightIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <Modal
          isOpen={Boolean(deleteId)}
          onClose={() => setDeleteId(null)}
          title="Confirm Enquiry Deletion"
          maxWidth="sm"
        >
          <div className="space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Permanently Delete Enquiry?</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              This action cannot be undone. All customer contact information and notes associated with this enquiry will be deleted.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button size="sm" variant="secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" onClick={handleConfirmDelete}>
                Delete Permanently
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
