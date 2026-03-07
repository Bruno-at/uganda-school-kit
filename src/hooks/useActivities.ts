import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string | null;
  thumbnail_url: string | null;
  activity_date: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ActivityInsert = Omit<Activity, 'id' | 'created_at' | 'updated_at'>;

export const useActivities = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities' as any)
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as any[]) as Activity[];
    },
  });

  const addActivity = useMutation({
    mutationFn: async (activity: ActivityInsert) => {
      const { error } = await supabase.from('activities' as any).insert(activity as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({ title: 'Activity added successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error adding activity', description: error.message, variant: 'destructive' });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Activity> & { id: string }) => {
      const { error } = await supabase.from('activities' as any).update(updates as any).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({ title: 'Activity updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error updating activity', description: error.message, variant: 'destructive' });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('activities' as any).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({ title: 'Activity deleted successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error deleting activity', description: error.message, variant: 'destructive' });
    },
  });

  const uploadMedia = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('activities').upload(fileName, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    }
    return supabase.storage.from('activities').getPublicUrl(fileName).data.publicUrl;
  };

  return { activities, isLoading, addActivity, updateActivity, deleteActivity, uploadMedia };
};
