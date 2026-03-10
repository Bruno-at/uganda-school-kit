import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export type GalleryItem = Tables<'gallery_items'>;
export type GalleryItemInsert = TablesInsert<'gallery_items'>;
export type GalleryItemUpdate = TablesUpdate<'gallery_items'>;

export function useGalleryItems() {
  const queryClient = useQueryClient();

  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ['gallery-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addGalleryItem = useMutation({
    mutationFn: async (item: GalleryItemInsert) => {
      const { data, error } = await supabase.from('gallery_items').insert(item).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast.success('Gallery item added');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateGalleryItem = useMutation({
    mutationFn: async ({ id, ...updates }: GalleryItemUpdate & { id: string }) => {
      const { data, error } = await supabase.from('gallery_items').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast.success('Gallery item updated');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteGalleryItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast.success('Gallery item deleted');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadMedia = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('gallery').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('gallery').getPublicUrl(path);
    return data.publicUrl;
  };

  return { galleryItems, isLoading, addGalleryItem, updateGalleryItem, deleteGalleryItem, uploadMedia };
}
