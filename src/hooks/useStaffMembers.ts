import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export type StaffMember = Tables<'staff_members'>;
export type StaffMemberInsert = TablesInsert<'staff_members'>;
export type StaffMemberUpdate = TablesUpdate<'staff_members'>;

export function useStaffMembers() {
  const queryClient = useQueryClient();

  const { data: staffMembers, isLoading } = useQuery({
    queryKey: ['staff-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const addStaffMember = useMutation({
    mutationFn: async (member: StaffMemberInsert) => {
      const { data, error } = await supabase.from('staff_members').insert(member).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-members'] });
      toast.success('Staff member added');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateStaffMember = useMutation({
    mutationFn: async ({ id, ...updates }: StaffMemberUpdate & { id: string }) => {
      const { data, error } = await supabase.from('staff_members').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-members'] });
      toast.success('Staff member updated');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteStaffMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('staff_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-members'] });
      toast.success('Staff member deleted');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadPhoto = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('staff-photos').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('staff-photos').getPublicUrl(path);
    return data.publicUrl;
  };

  return { staffMembers, isLoading, addStaffMember, updateStaffMember, deleteStaffMember, uploadPhoto };
}
