
import { Heart, Star, ShoppingCart, Flame, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-800 border-gray-700">
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-gray-700 hover:bg-gray-600 text-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Special Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          <Badge className="bg-gray-700 text-gray-200 border-gray-600">
            {product.category}
          </Badge>
          {product.is_hot && (
            <Badge className="bg-red-500 text-white flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Hot
            </Badge>
          )}
          {product.is_limited && (
            <Badge className="bg-orange-500 text-white flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited
            </Badge>
          )}
          {product.is_almost_sold_out && (
            <Badge className="bg-yellow-600 text-white flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Almost Sold Out
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 bg-gray-800">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">({product.reviews_count})</span>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-gray-400">Sizes: {product.sizes.join(', ')}</span>
          </div>
        )}

        {/* Season */}
        {product.season && (
          <div className="mb-2">
            <span className="text-xs text-gray-400">Season: {product.season}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">€{product.price}</span>
          <Button 
            onClick={onAddToCart}
            className="hover:scale-105 transition-transform bg-white text-black hover:bg-gray-200"
            disabled={product.is_almost_sold_out}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.is_almost_sold_out ? 'Almost Gone' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
