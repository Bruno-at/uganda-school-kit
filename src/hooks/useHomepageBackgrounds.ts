import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MAX_IMAGES = 6;
const BUCKET_NAME = 'homepage-backgrounds';

export interface BackgroundImage {
  name: string;
  url: string;
}

export const useHomepageBackgrounds = () => {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list('', { sortBy: { column: 'created_at', order: 'asc' } });

      if (error) throw error;

      const imageFiles = data?.filter(file => file.name !== '.emptyFolderPlaceholder') || [];
      
      const imagesWithUrls = imageFiles.map(file => ({
        name: file.name,
        url: supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
      }));

      setImages(imagesWithUrls);
    } catch (error: any) {
      toast({
        title: 'Error fetching images',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<boolean> => {
    if (images.length >= MAX_IMAGES) {
      toast({
        title: 'Maximum images reached',
        description: `You can only have up to ${MAX_IMAGES} background images.`,
        variant: 'destructive',
      });
      return false;
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `bg-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      toast({
        title: 'Image uploaded',
        description: 'Background image has been uploaded successfully.',
      });

      await fetchImages();
      return true;
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (fileName: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: 'Image deleted',
        description: 'Background image has been removed.',
      });

      await fetchImages();
      return true;
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const replaceImage = async (oldFileName: string, newFile: File): Promise<boolean> => {
    try {
      setIsUploading(true);
      
      // Delete old image
      await supabase.storage.from(BUCKET_NAME).remove([oldFileName]);
      
      // Upload new image
      const fileExt = newFile.name.split('.').pop();
      const fileName = `bg-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, newFile);

      if (uploadError) throw uploadError;

      toast({
        title: 'Image replaced',
        description: 'Background image has been replaced successfully.',
      });

      await fetchImages();
      return true;
    } catch (error: any) {
      toast({
        title: 'Replace failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    isLoading,
    isUploading,
    uploadImage,
    deleteImage,
    replaceImage,
    maxImages: MAX_IMAGES,
    canUpload: images.length < MAX_IMAGES,
  };
};
