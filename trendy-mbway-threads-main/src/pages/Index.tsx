
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";

// Mock product data for streetwear
const categories = ["All", "T-Shirts", "Sneakers", "Shirts", "Jackets", "Hoodies", "Pants"];
const filterOptions = ["All", "Most Hot Products", "Time-Limited", "Close to Sell Out"];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Array<{id: string, quantity: number}>>([]);
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();

  const { data: products = [], isLoading, error } = useProducts();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === "Most Hot Products") {
      matchesFilter = product.is_hot;
    } else if (selectedFilter === "Time-Limited") {
      matchesFilter = product.is_limited;
    } else if (selectedFilter === "Close to Sell Out") {
      matchesFilter = product.is_almost_sold_out;
    }
    
    return matchesCategory && matchesSearch && matchesFilter;
  });

  const addToCart = (productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart!",
      description: "Item has been added to your shopping cart.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account."
    });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (error) {
    console.error('Error loading products:', error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Products</h2>
          <p className="text-gray-400">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/lovable-uploads/06a5ca80-b969-4998-8443-f0f60e22c07a.png" 
                alt="Club Infinity Logo" 
                className="h-8 w-8 mr-3 filter brightness-0 invert"
              />
              <h1 className="text-2xl font-bold text-white">Club Infinity</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Collection</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 hover:text-white">
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:bg-gray-800 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              
              {/* Auth Section */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300 hidden md:block">
                    {profile?.full_name || user.email}
                  </span>
                  {!profile?.email_confirmed && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      Confirm Email
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-gray-800 hover:text-white">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)} className="text-white hover:bg-gray-800">
                  <User className="h-5 w-5" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Collection</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">About</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Contact</a>
              {user && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-3 py-2 text-white hover:bg-gray-800" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
  <iframe
    src="https://www.youtube.com/embed/QHGd7zj7GWw?autoplay=1&mute=1&loop=1&playlist=QHGd7zj7GWw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&autohide=1"
    className="w-full h-full object-cover"
    style={{
      minWidth: '100%',
      minHeight: '100%',
      width: '100vw',
      height: '56.25vw',
      minHeight: '100vh',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none'
    }}
    allow="autoplay; encrypted-media"
    allowFullScreen={false}
    frameBorder="0"
  />
</div>

        
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Infinite Streetwear Style
            </h2>
            <p className="text-xl mb-8 animate-fade-in">
              Limited Looks. Unlimited Access.
            </p>
            <Button size="lg" className="animate-fade-in bg-white text-black hover:bg-gray-200">
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="relative flex-1 max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search streetwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all hover:scale-105 ${
                    selectedCategory === category 
                      ? "bg-white text-black" 
                      : "border-gray-600 text-black hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={`transition-all hover:scale-105 ${
                    selectedFilter === filter 
                      ? "bg-white text-black" 
                      : "border-gray-600 text-black hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {filter === "Most Hot Products" && "🔥 "}
                  {filter === "Time-Limited" && "⏰ "}
                  {filter === "Close to Sell Out" && "🚨 "}
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {selectedFilter !== "All" ? selectedFilter : "Featured Collection"}
          </h3>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product.id)}
                />
              ))}
            </div>
          )}
          
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/06a5ca80-b969-4998-8443-f0f60e22c07a.png" 
                  alt="Club Infinity Logo" 
                  className="h-6 w-6 mr-2 filter brightness-0 invert"
                />
                <h4 className="text-lg font-semibold">Club Infinity</h4>
              </div>
              <p className="text-gray-400">Premium streetwear for infinite style</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sneakers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">T-Shirts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hoodies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jackets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Payment</h4>
              <p className="text-gray-400 mb-2">Secure payments with MBway</p>
              <div className="flex space-x-2">
                <div className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">MBway</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Club Infinity. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        products={products}
        onUpdateQuantity={(id, quantity) => {
          if (quantity === 0) {
            setCartItems(prev => prev.filter(item => item.id !== id));
          } else {
            setCartItems(prev => prev.map(item => 
              item.id === id ? { ...item, quantity } : item
            ));
          }
        }}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default Index;
