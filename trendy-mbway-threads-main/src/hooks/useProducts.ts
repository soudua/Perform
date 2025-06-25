
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  reviews_count: number;
  is_hot?: boolean;
  is_limited?: boolean;
  is_almost_sold_out?: boolean;
  sizes?: string[];
  season?: string;
  description?: string;
  stock_quantity?: number;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      console.log('Fetching products from Supabase...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products fetched successfully:', data);
      
      // Return the data as-is since it matches our interface
      return data || [];
    },
  });
};
