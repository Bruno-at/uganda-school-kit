import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGalleryItems, GalleryItemInsert } from '@/hooks/useGalleryItems';
import { Plus, Pencil, Trash2, Upload, ArrowLeft, Image as ImageIcon, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AdminRoute from '@/components/auth/AdminRoute';

const CATEGORIES = ['Campus', 'Events', 'Sports', 'Arts', 'Science', 'Graduation', 'Cultural', 'Other'];

const emptyForm: GalleryItemInsert = {
  title: '',
  category: 'Events',
  description: '',
  media_type: 'image',
  media_url: '',
  thumbnail_url: '',
  is_featured: false,
  date_taken: null,
};

const GallerySettingsContent = () => {
  const { galleryItems, isLoading, addGalleryItem, updateGalleryItem, deleteGalleryItem, uploadMedia } = useGalleryItems();
  const [form, setForm] = useState<GalleryItemInsert>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const openEdit = (item: any) => {
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      media_type: item.media_type || 'image',
      media_url: item.media_url || '',
      thumbnail_url: item.thumbnail_url || '',
      is_featured: item.is_featured || false,
      date_taken: item.date_taken || null,
    });
    setEditingId(item.id);
    setDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMedia(file);
      setForm(f => ({ ...f, media_url: url }));
    } catch (err: any) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateGalleryItem.mutateAsync({ id: editingId, ...form });
    } else {
      await addGalleryItem.mutateAsync(form);
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
            <h1 className="text-4xl font-bold flex items-center gap-3"><ImageIcon className="h-8 w-8 text-primary" /> Gallery</h1>
            <p className="text-muted-foreground">Manage gallery items</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>Media Type</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" value={form.media_type} onChange={e => setForm(f => ({ ...f, media_type: e.target.value }))}>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
                </div>
                <div className="space-y-1">
                  <Label>Date Taken</Label>
                  <Input type="date" value={form.date_taken || ''} onChange={e => setForm(f => ({ ...f, date_taken: e.target.value || null }))} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_featured || false} onCheckedChange={v => setForm(f => ({ ...f, is_featured: v }))} />
                  <Label>Featured</Label>
                </div>
                <div className="space-y-1">
                  <Label>Media</Label>
                  <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                  <div className="space-y-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                      <Upload className="h-4 w-4 mr-1" /> {uploading ? 'Uploading...' : 'Upload File'}
                    </Button>
                    <p className="text-xs text-muted-foreground">Or paste a URL below:</p>
                    <Input placeholder="https://..." value={form.media_url || ''} onChange={e => setForm(f => ({ ...f, media_url: e.target.value }))} />
                  </div>
                  {form.media_url && form.media_type === 'image' && (
                    <img src={form.media_url} alt="" className="mt-2 h-32 rounded object-cover" />
                  )}
                </div>
                <Button className="w-full" onClick={handleSubmit} disabled={!form.title || addGalleryItem.isPending || updateGalleryItem.isPending}>
                  {editingId ? 'Update' : 'Add'} Gallery Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48" />)}</div>
        ) : !galleryItems?.length ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No gallery items yet. Click "Add Item" to get started.</CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {item.media_url ? (
                    item.media_type === 'video' ? (
                      <div className="flex items-center justify-center h-full"><Video className="h-12 w-12 text-muted-foreground" /></div>
                    ) : (
                      <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full"><ImageIcon className="h-12 w-12 text-muted-foreground" /></div>
                  )}
                  {item.is_featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.date_taken && <span className="text-xs text-muted-foreground">{format(new Date(item.date_taken), 'MMM yyyy')}</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{item.title}"?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteGalleryItem.mutate(item.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

const GallerySettings = () => (
  <AdminRoute>
    <GallerySettingsContent />
  </AdminRoute>
);

export default GallerySettings;
