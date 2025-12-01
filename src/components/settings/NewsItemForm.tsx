import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCreateNewsItem, useUpdateNewsItem, useNewsItems } from '@/hooks/useNewsItems';
import { useImageUpload } from '@/hooks/useImageUpload';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  short_description: z.string().min(1, 'Short description is required').max(500),
  full_content: z.string().min(1, 'Full content is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  date_published: z.date(),
  is_featured: z.boolean().default(false),
  status: z.enum(['published', 'draft']),
  image_url: z.string().optional(),
});

interface NewsItemFormProps {
  newsId?: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const NewsItemForm: React.FC<NewsItemFormProps> = ({ newsId, onClose, onSuccess }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const { data: newsItems } = useNewsItems();
  const createMutation = useCreateNewsItem();
  const updateMutation = useUpdateNewsItem();
  const { uploadImage, isUploading } = useImageUpload();

  const editingNews = newsId ? newsItems?.find(n => n.id === newsId) : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      short_description: '',
      full_content: '',
      category: '',
      tags: '',
      date_published: new Date(),
      is_featured: false,
      status: 'published',
      image_url: '',
    },
  });

  useEffect(() => {
    if (editingNews) {
      form.reset({
        title: editingNews.title,
        short_description: editingNews.short_description,
        full_content: editingNews.full_content,
        category: editingNews.category,
        tags: editingNews.tags?.join(', ') || '',
        date_published: new Date(editingNews.date_published),
        is_featured: editingNews.is_featured,
        status: editingNews.status,
        image_url: editingNews.image_url || '',
      });
      if (editingNews.image_url) {
        setImagePreview(editingNews.image_url);
      }
    }
  }, [editingNews, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = values.image_url || '';

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const slug = values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const tags = values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const readingTime = calculateReadingTime(values.full_content);

    const newsData = {
      title: values.title,
      slug,
      short_description: values.short_description,
      full_content: values.full_content,
      category: values.category,
      tags,
      reading_time: readingTime,
      image_url: imageUrl,
      date_published: values.date_published.toISOString(),
      is_featured: values.is_featured,
      status: values.status,
    };

    if (newsId) {
      await updateMutation.mutateAsync({ id: newsId, ...newsData });
    } else {
      await createMutation.mutateAsync(newsData);
    }

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{newsId ? 'Edit News Item' : 'Add New News Item'}</h3>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter news title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description *</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief overview (max 500 characters)" {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="full_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content *</FormLabel>
              <FormControl>
                <Textarea placeholder="Complete article content" {...field} rows={8} />
              </FormControl>
              <FormDescription>Reading time will be calculated automatically</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Achievement">Achievement</SelectItem>
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Academics">Academics</SelectItem>
                    <SelectItem value="Facilities">Facilities</SelectItem>
                    <SelectItem value="Student Life">Student Life</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Tag 1, Tag 2, Tag 3" {...field} />
              </FormControl>
              <FormDescription>Comma-separated tags</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_published"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Published *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Image Upload</FormLabel>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1"
            />
            {imagePreview && (
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured Article</FormLabel>
                <FormDescription>Display this article prominently on the news page</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || isUploading}>
            {isUploading ? 'Uploading...' : newsId ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsItemForm;