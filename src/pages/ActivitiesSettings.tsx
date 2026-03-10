import React, { useState } from 'react';
import AdminRoute from '@/components/auth/AdminRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useActivities, ActivityInsert, Activity } from '@/hooks/useActivities';
import { Plus, Pencil, Trash2, Image as ImageIcon, Video, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CATEGORIES = ['Sports', 'MDD', 'Swimming', 'Tour / Trip', 'Clubs', 'Competition', 'Cultural Event', 'Other'];

const emptyForm: ActivityInsert = {
  title: '',
  category: 'Sports',
  description: '',
  media_type: 'image',
  media_url: null,
  thumbnail_url: null,
  activity_date: null,
  featured: false,
};

const ActivitiesSettings = () => {
  const { activities, isLoading, addActivity, updateActivity, deleteActivity, uploadMedia } = useActivities();
  const [form, setForm] = useState<ActivityInsert>(emptyForm);
  const [videoUrl, setVideoUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setForm(emptyForm);
    setVideoUrl('');
    setFile(null);
    setEditingId(null);
  };

  const openEdit = (a: Activity) => {
    setForm({
      title: a.title,
      category: a.category,
      description: a.description,
      media_type: a.media_type,
      media_url: a.media_url,
      thumbnail_url: a.thumbnail_url,
      activity_date: a.activity_date,
      featured: a.featured,
    });
    if (a.media_type === 'video' && a.media_url) setVideoUrl(a.media_url);
    setEditingId(a.id);
    setIsOpen(true);
  };

  const getVideoThumbnail = (url: string): string | null => {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let mediaUrl = form.media_url;
    let thumbnailUrl = form.thumbnail_url;

    if (file) {
      const url = await uploadMedia(file);
      if (!url) { setUploading(false); return; }
      mediaUrl = url;
      if (form.media_type === 'image') thumbnailUrl = url;
    }

    if (form.media_type === 'video' && videoUrl) {
      mediaUrl = videoUrl;
      thumbnailUrl = getVideoThumbnail(videoUrl) || thumbnailUrl;
    }

    const payload = { ...form, media_url: mediaUrl, thumbnail_url: thumbnailUrl };

    if (editingId) {
      await updateActivity.mutateAsync({ id: editingId, ...payload });
    } else {
      await addActivity.mutateAsync(payload);
    }

    setUploading(false);
    setIsOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to Settings
            </Link>
            <h1 className="text-4xl font-bold">Activities Settings</h1>
            <p className="text-muted-foreground">Manage school activities displayed on the landing page</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(o) => { setIsOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Activity</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Short Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <Select value={form.media_type} onValueChange={(v: 'image' | 'video') => setForm({ ...form, media_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.media_type === 'image' ? (
                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    {form.media_url && !file && (
                      <img src={form.media_url} alt="Current" className="h-24 rounded-md object-cover" />
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Video URL (YouTube / Vimeo / direct link)</Label>
                      <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Or upload a video file</Label>
                      <Input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Activity Date</Label>
                  <Input type="date" value={form.activity_date || ''} onChange={(e) => setForm({ ...form, activity_date: e.target.value || null })} />
                </div>

                <div className="flex items-center gap-3">
                  <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                  <Label>Featured Activity</Label>
                </div>

                <Button type="submit" className="w-full" disabled={uploading || !form.title}>
                  {uploading ? 'Saving...' : editingId ? 'Update Activity' : 'Add Activity'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading activities...</p>
        ) : activities.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No activities yet. Click "Add Activity" to create one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {activities.map((a) => (
              <Card key={a.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    {a.thumbnail_url || a.media_url ? (
                      <img src={a.thumbnail_url || a.media_url!} alt={a.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        {a.media_type === 'video' ? <Video className="h-6 w-6 text-muted-foreground" /> : <ImageIcon className="h-6 w-6 text-muted-foreground" />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{a.title}</h3>
                      {a.featured && <Star className="h-4 w-4 text-secondary fill-secondary" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{a.category}</Badge>
                      <Badge variant="outline" className="text-xs">{a.media_type}</Badge>
                      {a.activity_date && <span className="text-xs text-muted-foreground">{format(new Date(a.activity_date), 'MMM d, yyyy')}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(a)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to delete "{a.title}"? This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteActivity.mutate(a.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default ActivitiesSettings;
