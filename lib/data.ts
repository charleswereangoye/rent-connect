import { Property, Chat, User } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern Sky Villa',
    location: 'Kiyovu, Kigali',
    neighborhood: 'Kiyovu',
    price: 1200000,
    priceUSD: 1250,
    beds: 3,
    baths: 2,
    size: 150,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgBWwFIJGxs8_LgaUkrRYd728TPRBng56AlANGrl-r9GBlumXJyBgvnSwppv1OApn9af-yToszeinZCFWA7UASmYrscANYk6NMiH27yGh1F0PljK76GZJmaJF5wIrmCEFPLrGUfpypWa-nFvwPtmMVISsmuvE-VfD7NOEttomlUdMfi4rQUeP9L7dLqKoqluyLRon68cjXHXiDWlUQ514Sa-kn2SVPlnxURQejW_hxjEoILrjXlYDzoxAWPFNNrjngLlVte1Y',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgBWwFIJGxs8_LgaUkrRYd728TPRBng56AlANGrl-r9GBlumXJyBgvnSwppv1OApn9af-yToszeinZCFWA7UASmYrscANYk6NMiH27yGh1F0PljK76GZJmaJF5wIrmCEFPLrGUfpypWa-nFvwPtmMVISsmuvE-VfD7NOEttomlUdMfi4rQUeP9L7dLqKoqluyLRon68cjXHXiDWlUQ514Sa-kn2SVPlnxURQejW_hxjEoILrjXlYDzoxAWPFNNrjngLlVte1Y',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhnIQBwnVoUVJI9wWrzpERxLxs88AEcwo9GDc9QImWKLbvO5DHCp4YZSkWifnn7nwcW0uGIaG6VNodIypJiPCiuQi1pC33CUxwgfL03TTneVtiWnaTvfvDONbj9L0vxPxBBgJ75eJ1rtW0xKHpvDhJP81_ntQ0PTOwWVku6VhBIsUYauTTLkf9Iv440zLRGJ-TNkIJ50kZfHcAIVDXRmy1rQvqdvbR4jSnn67nWbVbc9o1usVZ4WTiyZ4CBFicczK6BX-6iY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASvB6r-BBlZKQoqpe_sDhaFYq8X8wHc2W4QT30T99hWiuKvqn6MnqUUI49Ee50RjwNZIBhIC1Dd_XMKO1ICZ6dRRBI86YS5NAE2J_VSz4LbITqfOv4dyVHuWVvcVDzVYNE1BfUYlP3OurmqxBn_QkAr9dQOotWSTFYcv6nyFetaZCIn8uaipjmkhEXfHKPkJH-73jCdI5WwbBIh2Z_UDfyGJKX3dSMQkTnu7L1zNScrOUVc49_Koi7htwMmgI3NsWmehxdKJA'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Free Parking', 'Air Conditioning', 'Gym Access', 'Swimming Pool', '24/7 Security'],
    description: 'Experience urban luxury at its finest in this stunning 3-bedroom apartment located in the heart of Kiyovu. This residence offers breathtaking views of the Kigali skyline and the lush green hills beyond. Featuring high-end finishes, an open-concept living area, and a gourmet kitchen with built-in appliances, it is designed for those who value both style and functionality. The building provides 24/7 security, high-speed elevators, a common fitness center, and dedicated secure parking. Within walking distance to premier restaurants, corporate offices, and international schools.',
    agent: {
      name: 'Jean-Paul K.',
      role: 'Trusted Partner',
      experience: '5 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6qubFNXB6Z1pni7AyDy2FIum7fbxwtGJYbtL_bObKc5wJlk9T6qh129zsIIKIgKy19XcpoJD8Rn-NIct1xYjQtEzU8F_ws3PrkBod59u1OcgWtHL63rEe9KKjeDVrE7-hfNIOhsX2zSs-hJvSXvPgqVI6dv0Wvk9rRTnazxu3CU5LMrt3CH4iYwJOQxiZzG4TV8XLJhXzZ8XLisZm4V2enZ5k3Evk7TLDIQ1ix8aGiu8AENRQAWVNtZ7Db5P1AUpuUL_45U'
    }
  },
  {
    id: 'prop-2',
    title: 'Garden Terrace House',
    location: 'Kacyiru, Kigali',
    neighborhood: 'Kacyiru',
    price: 850000,
    priceUSD: 880,
    beds: 2,
    baths: 1.5,
    size: 95,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuu6elonXqP2hhJ-Ph8DVEdIFoE0HGENErjpcdt6EZCaeRHWmHPr5LUbaKddTDEPmyAenqb4Y_OnsEvm7EdcNZlVR7cZ9GJBpFt6HkT2LCzC-atbffW5-iZm4igT-WhuvII5DIesnMnCyUuryVa5FAYzNoEy6ISO_Uzyy9D8XwYdHK3K62gkl6Fv3Wu4x5vVCIIpOAxsLX2kEFi56fs2iq80ZEwz_DdECefN0puK30MRWqzL8DvN9ojZMcUsS_M_DtXLbOUg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuu6elonXqP2hhJ-Ph8DVEdIFoE0HGENErjpcdt6EZCaeRHWmHPr5LUbaKddTDEPmyAenqb4Y_OnsEvm7EdcNZlVR7cZ9GJBpFt6HkT2LCzC-atbffW5-iZm4igT-WhuvII5DIesnMnCyUuryVa5FAYzNoEy6ISO_Uzyy9D8XwYdHK3K62gkl6Fv3Wu4x5vVCIIpOAxsLX2kEFi56fs2iq80ZEwz_DdECefN0puK30MRWqzL8DvN9ojZMcUsS_M_DtXLbOUg'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Free Parking', 'Security', 'Backup Power'],
    description: 'An elegant townhouse in Kacyiru, Kigali, characterized by its clean architectural lines, large glass balconies, and manicured tropical garden. Perfect for professionals looking for a peaceful yet well-connected home in the diplomatic hub.',
    agent: {
      name: 'Sarah Umutoni',
      role: 'Property Manager',
      experience: '3 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgbIQZICgcWKkjuilPZeGDiZUsmMHu025UWlk2fz05EyOs4aIjgANMimy9VW-EHqkInmJ1aM-stE27Z1c67hESqStdGDEU28aQCUBbAq5FOZd_LGszCrlT0Tu_xLSD006TyJt54fUgyGHvBvqf1HicF0b0Iv6XEV-6vW8g9oNVEw5O4OC5nq1OXeETNhz6ZS7yDbrIC_mZ4afQQxYaIgZa8fdpauf9Kw3RztHRcwMKqJ3b7kQjXKaqzBEF8GibmpXFsCijUNA'
    }
  },
  {
    id: 'prop-3',
    title: 'Urban Loft Studio',
    location: 'Kimironko, Kigali',
    neighborhood: 'Kimironko',
    price: 450000,
    priceUSD: 470,
    beds: 'Studio',
    baths: 1,
    size: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu0Wc0IGDr2-svHbyKJCUgbVMQpWzG2716VkFw5yTRyMJhX6TqGoxl1Rd-0LKoMidaGzyfwblyBhHGAfzLbkZKj-wiAFzh7hSGztTU-09SisoOOppd5qC1zdANn_gxJNN76HmJ06dowH-0QKQPkzG8bq__J2VEXCOCXhYNdstiOeirTliVGce4j85joF3a58C5JEfWOYOVMuxnVjiRXzkM8Lrn0KqVUnn_hE0tacSQIaGSyXFzMj514Yo0w6HzDZjSOVthXqA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu0Wc0IGDr2-svHbyKJCUgbVMQpWzG2716VkFw5yTRyMJhX6TqGoxl1Rd-0LKoMidaGzyfwblyBhHGAfzLbkZKj-wiAFzh7hSGztTU-09SisoOOppd5qC1zdANn_gxJNN76HmJ06dowH-0QKQPkzG8bq__J2VEXCOCXhYNdstiOeirTliVGce4j85joF3a58C5JEfWOYOVMuxnVjiRXzkM8Lrn0KqVUnn_hE0tacSQIaGSyXFzMj514Yo0w6HzDZjSOVthXqA'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Swimming Pool', 'Security'],
    description: 'A stylish urban studio apartment in Kimironko, Kigali, designed with a functional and chic open-plan layout. Features industrial-modern furniture, a sleek compact kitchen, and vibrant local art.',
    agent: {
      name: 'Emmanuel Kwizera',
      role: 'Landlord Partner',
      experience: '4 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFIq0YbQ5Ai7_GWE9PDpKJ5qjrqKEsLgLg2Va3fbEPw1a8pOcnVrejgaax-R-4TOiiYxhKWvb8ag7bfRoECCgfsR_vOmOM4Msg4wH8Bec6hUO28PmaffPWsF_RYPPiuRMvv7iSj9ih_WwrhE28LY64tv-10-IYlU_qKKknpwfbqsqwoEF0Exh0eJ4rGtYodlUe-qj1hFyAFYszEGvJWORxVv0SKRxtrxXfiiQiq1xVB5EOb-8Pa51EuSzMVGVN6JuCTr9A96U'
    }
  },
  {
    id: 'prop-4',
    title: 'Hillview Executive Suite',
    location: 'Kiyovu, Kigali',
    neighborhood: 'Kiyovu',
    price: 1800000,
    priceUSD: 1850,
    beds: 4,
    baths: 2,
    size: 210,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd2ThF3BXzKVhISzforC0uKtFm7ddhPlOEmq0EzLrGv8PT5itrO81LDaznYzqSnzeB391V4r9gO3Ett2n8xP6NFJmB4escdsOb8i9NryrFmQa05cIDsS7sPABdhrmheIqakyqBJYfrTVjuMREQdRfbXcpjyJJepnLQjGF8gPn6mXzKDDbbbKmt7OWW1dxq5nQapqGvlOMGckQxOBfAjlsice9hn6DFSSbeFz4icOEmPt5WmEbsACxrwbli76_lXFsJhOE19C0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd2ThF3BXzKVhISzforC0uKtFm7ddhPlOEmq0EzLrGv8PT5itrO81LDaznYzqSnzeB391V4r9gO3Ett2n8xP6NFJmB4escdsOb8i9NryrFmQa05cIDsS7sPABdhrmheIqakyqBJYfrTVjuMREQdRfbXcpjyJJepnLQjGF8gPn6mXzKDDbbbKmt7OWW1dxq5nQapqGvlOMGckQxOBfAjlsice9hn6DFSSbeFz4icOEmPt5WmEbsACxrwbli76_lXFsJhOE19C0'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Free Parking', 'Air Conditioning', 'Garage', 'Swimming Pool', '24/7 Security'],
    description: 'Breathtaking executive suite in Kiyovu overlooking Kigali’s famous rolling green hills. Premium luxury layout with high-end glass railings, modern balcony lounge furniture, and 24/7 security.',
    agent: {
      name: 'Jean-Paul K.',
      role: 'Trusted Partner',
      experience: '5 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6qubFNXB6Z1pni7AyDy2FIum7fbxwtGJYbtL_bObKc5wJlk9T6qh129zsIIKIgKy19XcpoJD8Rn-NIct1xYjQtEzU8F_ws3PrkBod59u1OcgWtHL63rEe9KKjeDVrE7-hfNIOhsX2zSs-hJvSXvPgqVI6dv0Wvk9rRTnazxu3CU5LMrt3CH4iYwJOQxiZzG4TV8XLJhXzZ8XLisZm4V2enZ5k3Evk7TLDIQ1ix8aGiu8AENRQAWVNtZ7Db5P1AUpuUL_45U'
    }
  },
  {
    id: 'prop-5',
    title: 'Luxury Apartment in Rebero',
    location: 'Rebero, Kigali',
    neighborhood: 'Rebero',
    price: 900000,
    priceUSD: 930,
    beds: 3,
    baths: 2,
    size: 130,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wKSJqapo--AIcGL9w_FCeTt-36WpupwMv-2JRx4DWgRlwdcHhQRDmJZfS92QQSksYrofdKIn21nFMbw8UarMh2bMAJ5z-4bkQ7SQWyG_37uFbt1vu5-Y2j7-geGmcCubEr6u30yGiyh9CKJKuH0irk5V7aaRJvRUCNXfq2VeU9OZKoD4w-AG80F-EGzCSunSeAqb7Ml9SeDuUCmeGaVgOR8xBVQ3DZlQNRdhpqEzT_QjHRyBNYq0FYW2fAwX3soGVs5MvQk',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wKSJqapo--AIcGL9w_FCeTt-36WpupwMv-2JRx4DWgRlwdcHhQRDmJZfS92QQSksYrofdKIn21nFMbw8UarMh2bMAJ5z-4bkQ7SQWyG_37uFbt1vu5-Y2j7-geGmcCubEr6u30yGiyh9CKJKuH0irk5V7aaRJvRUCNXfq2VeU9OZKoD4w-AG80F-EGzCSunSeAqb7Ml9SeDuUCmeGaVgOR8xBVQ3DZlQNRdhpqEzT_QjHRyBNYq0FYW2fAwX3soGVs5MvQk'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Free Parking', 'Air Conditioning', 'Gym Access', '24/7 Security'],
    description: 'Experience stunning top-of-the-hill panoramas of Kigali from this boutique luxury apartment in Rebero. Beautiful modern finishes and fresh climate vibes make it a highly desirable residency.',
    agent: {
      name: 'Sarah Umutoni',
      role: 'Property Manager',
      experience: '3 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgbIQZICgcWKkjuilPZeGDiZUsmMHu025UWlk2fz05EyOs4aIjgANMimy9VW-EHqkInmJ1aM-stE27Z1c67hESqStdGDEU28aQCUBbAq5FOZd_LGszCrlT0Tu_xLSD006TyJt54fUgyGHvBvqf1HicF0b0Iv6XEV-6vW8g9oNVEw5O4OC5nq1OXeETNhz6ZS7yDbrIC_mZ4afQQxYaIgZa8fdpauf9Kw3RztHRcwMKqJ3b7kQjXKaqzBEF8GibmpXFsCijUNA'
    }
  },
  {
    id: 'prop-6',
    title: 'Nyarutarama Heights Penthouse',
    location: 'Nyarutarama, Kigali',
    neighborhood: 'Nyarutarama',
    price: 2500000,
    priceUSD: 2600,
    beds: 4,
    baths: 3,
    size: 280,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXO5DMUTIZ928aOQV91xuxfTcohOb1HXi2nh9G431Zey9qehpGc1PdQr31OaiqphNsZLUbFA4OaJNGxDKPK9CEH9VZvVN-X3rRAWC1jZRtJNOzqE2tmCHESddMCsksr88lsmcJ0Fc4VnY0zfLNfLjcHsh6n1F1U3xD6at8z7i6IbPcR8UwumLJxaeUt1CvXZzOQRcmHxRMvYyJhHE9DQwagXWwgtsQ2l23P0qp9Ovf0W-qh7QTtRAjTev3KKyZqAiTtRylzBM',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXO5DMUTIZ928aOQV91xuxfTcohOb1HXi2nh9G431Zey9qehpGc1PdQr31OaiqphNsZLUbFA4OaJNGxDKPK9CEH9VZvVN-X3rRAWC1jZRtJNOzqE2tmCHESddMCsksr88lsmcJ0Fc4VnY0zfLNfLjcHsh6n1F1U3xD6at8z7i6IbPcR8UwumLJxaeUt1CvXZzOQRcmHxRMvYyJhHE9DQwagXWwgtsQ2l23P0qp9Ovf0W-qh7QTtRAjTev3KKyZqAiTtRylzBM'
    ],
    verified: true,
    amenities: ['Fiber Optic WiFi', 'Free Parking', 'Air Conditioning', 'Gym Access', 'Swimming Pool', '24/7 Security'],
    description: 'This premium, custom-designed penthouse sits on Nyarutarama’s elite ridge. Fully equipped with an expansive roof-terrace lounge, private pool, and integrated Smart Home capabilities.',
    agent: {
      name: 'Jean-Paul K.',
      role: 'Trusted Partner',
      experience: '5 years',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6qubFNXB6Z1pni7AyDy2FIum7fbxwtGJYbtL_bObKc5wJlk9T6qh129zsIIKIgKy19XcpoJD8Rn-NIct1xYjQtEzU8F_ws3PrkBod59u1OcgWtHL63rEe9KKjeDVrE7-hfNIOhsX2zSs-hJvSXvPgqVI6dv0Wvk9rRTnazxu3CU5LMrt3CH4iYwJOQxiZzG4TV8XLJhXzZ8XLisZm4V2enZ5k3Evk7TLDIQ1ix8aGiu8AENRQAWVNtZ7Db5P1AUpuUL_45U'
    }
  }
];

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat-1',
    name: 'Emmanuel Kwizera',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFIq0YbQ5Ai7_GWE9PDpKJ5qjrqKEsLgLg2Va3fbEPw1a8pOcnVrejgaax-R-4TOiiYxhKWvb8ag7bfRoECCgfsR_vOmOM4Msg4wH8Bec6hUO28PmaffPWsF_RYPPiuRMvv7iSj9ih_WwrhE28LY64tv-10-IYlU_qKKknpwfbqsqwoEF0Exh0eJ4rGtYodlUe-qj1hFyAFYszEGvJWORxVv0SKRxtrxXfiiQiq1xVB5EOb-8Pa51EuSzMVGVN6JuCTr9A96U',
    verified: true,
    lastMessage: 'Is the 2-bedroom in Kiyovu still...',
    time: '10:42 AM',
    status: 'Viewing Scheduled',
    unread: true,
    online: true,
    messages: [
      {
        id: 'm-1',
        sender: 'landlord',
        text: 'Hello! I saw your interest in the Kiyovu property. Are you looking to move in this month or next?',
        timestamp: 'Yesterday, 04:15 PM'
      },
      {
        id: 'm-2',
        sender: 'renter',
        text: 'Hi Emmanuel! Yes, I\'m looking for a move-in date around October 1st. Is the balcony facing the hills or the city?',
        timestamp: 'Yesterday, 04:18 PM'
      },
      {
        id: 'm-3',
        sender: 'landlord',
        text: 'The balcony faces the hills! It has a wonderful view of the sunset. I\'ve attached a video for you to see.',
        timestamp: 'Today, 10:42 AM',
        attachment: {
          name: 'View_from_Balcony.mp4',
          size: '12.4 MB',
          type: 'video'
        }
      },
      {
        id: 'm-4',
        sender: 'renter',
        text: 'That looks stunning! Could we schedule a viewing for Saturday morning?',
        timestamp: 'Today, 10:45 AM'
      }
    ]
  },
  {
    id: 'chat-2',
    name: 'Sarah Umutoni',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgbIQZICgcWKkjuilPZeGDiZUsmMHu025UWlk2fz05EyOs4aIjgANMimy9VW-EHqkInmJ1aM-stE27Z1c67hESqStdGDEU28aQCUBbAq5FOZd_LGszCrlT0Tu_xLSD006TyJt54fUgyGHvBvqf1HicF0b0Iv6XEV-6vW8g9oNVEw5O4OC5nq1OXeETNhz6ZS7yDbrIC_mZ4afQQxYaIgZa8fdpauf9Kw3RztHRcwMKqJ3b7kQjXKaqzBEF8GibmpXFsCijUNA',
    verified: false,
    lastMessage: 'Thank you for the documents.',
    time: 'Yesterday',
    unread: false,
    online: false,
    messages: [
      {
        id: 'ms-1',
        sender: 'renter',
        text: 'Hello Sarah, I\'ve sent over the passport copy and proof of funds.',
        timestamp: 'Yesterday, 02:30 PM'
      },
      {
        id: 'ms-2',
        sender: 'landlord',
        text: 'Thank you for the documents. I am reviewing them with the owner and will get back to you shortly.',
        timestamp: 'Yesterday, 03:02 PM'
      }
    ]
  },
  {
    id: 'chat-3',
    name: 'Kigali Heights Properties',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3SYDATk_zQ226RehCX45Ja5BuoRa3xC-PNs64WybNyQOaLsm_zy5J-0flMlqwmu9r0EQIcBcD9c8pOwVWTWyx8VkJDbiLG2ASB439MldnXtSi1HmqeaxpFcWHMy0wi_3-ncu2PvU-AyJ0F1gY2uqPDqwYba1J8yetM5Fnysis7E7sLjnXvicBnTu3GWQADcHDo9PxuqKpupc7E4gyyAwrmconcG9STDIecK0jKD5B7n2UHEa-e_nCY_UZ4Ze4h4CwJj1_9V0',
    verified: true,
    lastMessage: 'The lease agreement is ready...',
    time: 'Tuesday',
    unread: false,
    online: false,
    messages: [
      {
        id: 'mk-1',
        sender: 'landlord',
        text: 'The lease agreement is ready for your signature. Let us know when you can sign.',
        timestamp: 'Tuesday, 11:15 AM'
      }
    ]
  }
];

export const CURRENT_USER: User = {
  name: 'Jean-Paul Nshuti',
  email: 'jeanpaul@rentconnect.rw',
  role: 'landlord',
  joinedDate: 'Joined March 2024',
  verified: 'pending',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJm5p2sJaORZzFrFI06mvjfptH1JQ_Ao-nn-_SV0ETW13doxAlh-UBimjh93HRG6yKPw9mQfpuTErMZts1WlDgc9EYI-bnM6Jt8GOyTBcRVc7ieiGzTjeL7YzRTt5pXQ5PnrqStLYSluyi1eaIaL2vFvPI1KviVbZa8boPAxQ1MjlFWKlNnv7LbpUkMcFcHqzlUKSh_vrlU9pLuo7hCIfvL3Ows0YLRApHGqG-Q2eSjY0z8b7lgaSiLx10HtO6C1IvAIgX2og'
};
