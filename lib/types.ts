export interface Property {
  id: string;
  title: string;
  location: string;
  neighborhood: 'Kiyovu' | 'Kimironko' | 'Kacyiru' | 'Nyarutarama' | 'Rebero';
  price: number; // in RWF
  priceUSD: number; // USD equivalence
  beds: number | 'Studio';
  baths: number;
  size: number; // in m²
  imageUrl: string;
  galleryImages: string[];
  verified: boolean;
  amenities: string[];
  description: string;
  agent: {
    name: string;
    role: string;
    experience: string;
    imageUrl: string;
  };
}

export interface Message {
  id: string;
  sender: 'renter' | 'landlord';
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: 'video' | 'document' | 'image';
  };
}

export interface Chat {
  id: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
  lastMessage: string;
  time: string;
  status?: string;
  unread: boolean;
  online: boolean;
  messages: Message[];
}

export interface User {
  name: string;
  email: string;
  role: 'renter' | 'landlord';
  joinedDate: string;
  verified: 'none' | 'pending' | 'verified';
  avatarUrl: string;
}
