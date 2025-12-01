import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_content: string;
  category: string;
  tags?: string[];
  image_url?: string;
  date_published: string;
  reading_time?: number;
  is_featured: boolean;
  status: 'published' | 'draft';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useNewsItems = () => {
  return useQuery({
    queryKey: ['news-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('date_published', { ascending: false });
      
      if (error) throw error;
      return data as NewsItem[];
    },
  });
};

export const useCreateNewsItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newsItem: Omit<NewsItem, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('news_items')
        .insert([{ ...newsItem, created_by: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      toast({ title: 'Success', description: 'News item created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateNewsItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<NewsItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('news_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      toast({ title: 'Success', description: 'News item updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteNewsItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      toast({ title: 'Success', description: 'News item deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
};