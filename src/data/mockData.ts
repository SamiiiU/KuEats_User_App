// Mock data for the Canteen Ordering App

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  role: 'Student' | 'Faculty Member' | 'Teacher';
}

export interface Canteen {
  id: string;
  name: string;
  isOpen: boolean;
  deliveryTime: string;
  image: string;
}

export interface MenuItem {
  id: string;
  canteenId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  canteenId: string;
  canteenName: string;
  items: { menuItem: MenuItem; quantity: number }[];
  totalPrice: number;
  deliveryDepartment: string;
  paymentMethod: string;
  status: 'Delivered' | 'Cancelled' | 'Processing';
  date: string;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    department: 'Computer Science',
    role: 'Student',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    department: 'Mathematics',
    role: 'Faculty Member',
  },
];

// Mock canteens
export const mockCanteens: Canteen[] = [
  {
    id: '1',
    name: 'Chemistry Canteen',
    isOpen: true,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400',
  },
  {
    id: '2',
    name: 'Staff Club Canteen',
    isOpen: true,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
  },
  {
    id: '3',
    name: 'Sufi Canteen',
    isOpen: false,
    deliveryTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400',
  },
  {
    id: '4',
    name: 'Mass Com Canteen',
    isOpen: true,
    deliveryTime: '18 mins',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400',
  },
];

// Mock menu items
export const mockMenuItems: MenuItem[] = [
  // Main Campus Canteen
  {
    id: '1',
    canteenId: '1',
    name: 'Chicken Biryani',
    price: 150,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    category: 'Main Course',
  },
  {
    id: '2',
    canteenId: '1',
    name: 'Vegetable Fried Rice',
    price: 100,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    category: 'Main Course',
  },
  {
    id: '3',
    canteenId: '1',
    name: 'Masala Dosa',
    price: 80,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    category: 'Breakfast',
  },
  {
    id: '4',
    canteenId: '1',
    name: 'Samosa',
    price: 30,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    category: 'Snacks',
  },
  {
    id: '5',
    canteenId: '1',
    name: 'Mango Lassi',
    price: 50,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    category: 'Beverages',
  },
  
  // Engineering Block Café
  {
    id: '6',
    canteenId: '2',
    name: 'Club Sandwich',
    price: 120,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
    category: 'Fast Food',
  },
  {
    id: '7',
    canteenId: '2',
    name: 'French Fries',
    price: 60,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    category: 'Snacks',
  },
  {
    id: '8',
    canteenId: '2',
    name: 'Cappuccino',
    price: 80,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    category: 'Beverages',
  },
  {
    id: '9',
    canteenId: '2',
    name: 'Pizza Slice',
    price: 90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    category: 'Fast Food',
  },
  
  // Library Coffee Shop
  {
    id: '10',
    canteenId: '3',
    name: 'Espresso',
    price: 60,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
    category: 'Beverages',
  },
  {
    id: '11',
    canteenId: '3',
    name: 'Chocolate Cake',
    price: 100,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category: 'Desserts',
  },
  {
    id: '12',
    canteenId: '3',
    name: 'Croissant',
    price: 70,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    category: 'Bakery',
  },
  
  // Sports Complex Canteen
  {
    id: '13',
    canteenId: '4',
    name: 'Protein Shake',
    price: 120,
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
    category: 'Beverages',
  },
  {
    id: '14',
    canteenId: '4',
    name: 'Grilled Chicken Wrap',
    price: 140,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    category: 'Healthy',
  },
  {
    id: '15',
    canteenId: '4',
    name: 'Fresh Fruit Salad',
    price: 80,
    image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400',
    category: 'Healthy',
  },
];

// Mock offers
export const mockOffers: Offer[] = [
  {
    id: '1',
    title: '20% OFF on First Order',
    description: 'Use code FIRST20 at checkout',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  },
  {
    id: '2',
    title: 'Free Delivery on Orders Above Rs 200',
    description: 'No minimum order required',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800',
  },
  {
    id: '3',
    title: 'Buy 1 Get 1 Free on Beverages',
    description: 'Valid till end of month',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
  },
];

// Mock order history
export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    canteenId: '1',
    canteenName: 'Main Campus Canteen',
    items: [
      { menuItem: mockMenuItems[0], quantity: 1 },
      { menuItem: mockMenuItems[4], quantity: 2 },
    ],
    totalPrice: 250,
    deliveryDepartment: 'Computer Science',
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    date: '2025-10-15 12:30 PM',
  },
  {
    id: '2',
    userId: '1',
    canteenId: '2',
    canteenName: 'Engineering Block Café',
    items: [
      { menuItem: mockMenuItems[5], quantity: 1 },
      { menuItem: mockMenuItems[6], quantity: 1 },
    ],
    totalPrice: 180,
    deliveryDepartment: 'Computer Science',
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    date: '2025-10-12 02:15 PM',
  },
  {
    id: '3',
    userId: '1',
    canteenId: '1',
    canteenName: 'Main Campus Canteen',
    items: [
      { menuItem: mockMenuItems[2], quantity: 2 },
    ],
    totalPrice: 160,
    deliveryDepartment: 'Computer Science',
    paymentMethod: 'Cash on Delivery',
    status: 'Cancelled',
    date: '2025-10-10 09:00 AM',
  },
];
