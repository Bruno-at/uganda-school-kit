import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useStaffMembers, StaffMemberInsert } from '@/hooks/useStaffMembers';
import { Plus, Pencil, Trash2, Upload, ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminRoute from '@/components/auth/AdminRoute';

const DEPARTMENTS = ['Administration', 'Mathematics', 'Science', 'English', 'Languages', 'Arts', 'Physical Education', 'ICT', 'Social Studies', 'Other'];

const emptyForm: StaffMemberInsert = {
  name: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  bio: '',
  qualifications: '',
  subjects_taught: [],
  is_leadership: false,
  display_order: 0,
  image_url: '',
};

const StaffSettingsContent = () => {
  const { staffMembers, isLoading, addStaffMember, updateStaffMember, deleteStaffMember, uploadPhoto } = useStaffMembers();
  const [form, setForm] = useState<StaffMemberInsert>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [subjectsInput, setSubjectsInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setSubjectsInput('');
  };

  const openEdit = (member: any) => {
    setForm({
      name: member.name,
      position: member.position,
      department: member.department || '',
      email: member.email || '',
      phone: member.phone || '',
      bio: member.bio || '',
      qualifications: member.qualifications || '',
      subjects_taught: member.subjects_taught || [],
      is_leadership: member.is_leadership || false,
      display_order: member.display_order || 0,
      image_url: member.image_url || '',
    });
    setSubjectsInput((member.subjects_taught || []).join(', '));
    setEditingId(member.id);
    setDialogOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPhoto(file);
      setForm(f => ({ ...f, image_url: url }));
    } catch (err: any) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    const subjects = subjectsInput.split(',').map(s => s.trim()).filter(Boolean);
    const payload = { ...form, subjects_taught: subjects };
    if (editingId) {
      await updateStaffMember.mutateAsync({ id: editingId, ...payload });
    } else {
      await addStaffMember.mutateAsync(payload);
    }
    setDialogOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold flex items-center gap-3"><Users className="h-8 w-8 text-primary" /> Staff Members</h1>
            <p className="text-muted-foreground">Manage staff directory</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Staff</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Add'} Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Name *</Label>
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="space-y-1">
                    <Label>Position *</Label>
                    <Input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Department</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" value={form.department || ''} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                      <option value="">Select...</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>Display Order</Label>
                    <Input type="number" value={form.display_order ?? 0} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input type="email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <Input value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Qualifications</Label>
                  <Input value={form.qualifications || ''} onChange={e => setForm(f => ({ ...f, qualifications: e.target.value }))} placeholder="e.g. M.Ed, B.Sc" />
                </div>
                <div className="space-y-1">
                  <Label>Subjects Taught (comma separated)</Label>
                  <Input value={subjectsInput} onChange={e => setSubjectsInput(e.target.value)} placeholder="Math, Physics, Chemistry" />
                </div>
                <div className="space-y-1">
                  <Label>Bio</Label>
                  <Textarea value={form.bio || ''} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_leadership || false} onCheckedChange={v => setForm(f => ({ ...f, is_leadership: v }))} />
                  <Label>Leadership Team</Label>
                </div>
                <div className="space-y-1">
                  <Label>Photo</Label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <div className="flex items-center gap-3">
                    {form.image_url && <img src={form.image_url} alt="" className="h-16 w-16 rounded-full object-cover" />}
                    <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                      <Upload className="h-4 w-4 mr-1" /> {uploading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                  </div>
                </div>
                <Button className="w-full" onClick={handleSubmit} disabled={!form.name || !form.position || addStaffMember.isPending || updateStaffMember.isPending}>
                  {editingId ? 'Update' : 'Add'} Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}</div>
        ) : !staffMembers?.length ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No staff members yet. Click "Add Staff" to get started.</CardContent></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {staffMembers.map(member => (
              <Card key={member.id}>
                <CardContent className="flex items-start gap-4 pt-6">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(member)}><Pencil className="h-4 w-4" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete {member.name}?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteStaffMember.mutate(member.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.department && <Badge variant="secondary">{member.department}</Badge>}
                      {member.is_leadership && <Badge>Leadership</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StaffSettings = () => (
  <AdminRoute>
    <StaffSettingsContent />
  </AdminRoute>
);

export default StaffSettings;
