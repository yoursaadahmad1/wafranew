'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Minus } from 'lucide-react';

const initialCartItems = [
  {
    id: 1,
    name: 'Standard Shared Hosting',
    description: 'Perfect for small business websites',
    price: 4.99,
    originalPrice: 9.99,
    period: 'monthly',
    quantity: 1,
    type: 'hosting'
  },
  {
    id: 2,
    name: 'SSL Certificate',
    description: 'Secure your website with premium SSL',
    price: 9.99,
    originalPrice: null,
    period: 'yearly',
    quantity: 1,
    type: 'addon'
  }
];

export function CartItems() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
      
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <Button className="mt-4">Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">/{item.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Add More Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-semibold">Domain Registration</div>
                <div className="text-sm text-gray-500">Starting at $12.99/year</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-semibold">Professional Email</div>
                <div className="text-sm text-gray-500">Starting at $4.99/month</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}