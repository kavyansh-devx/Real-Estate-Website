export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  type: 'Villa' | 'Penthouse' | 'Mansion' | 'Apartment';
  featured: boolean;
  description: string;
  amenities: string[];
  gradient: string; // unique gradient accent per property
}

// Using Pexels static CDN which is 100% reliable
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'The Obsidian',
    tagline: 'Where sky meets luxury.',
    location: 'Dubai Marina, UAE',
    price: 8500000,
    beds: 4,
    baths: 5,
    sqft: 6200,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Penthouse',
    featured: true,
    description: 'An ultra-luxury penthouse offering panoramic views of the Dubai skyline. Every surface whispers perfection — from Italian marble floors to smart-glass windows that tint at the touch of a button. The private infinity pool seems to pour directly into the sky.',
    amenities: ['Infinity Pool', 'Smart Home AI', 'Private Elevator', 'Wine Cellar', 'Cinema Room', 'Rooftop Terrace'],
    gradient: 'from-blue-600 to-cyan-400',
  },
  {
    id: 'prop-2',
    title: 'Aura Villa',
    tagline: 'Architecture in its purest form.',
    location: 'Beverly Hills, CA',
    price: 12400000,
    beds: 6,
    baths: 8,
    sqft: 10500,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Villa',
    featured: true,
    description: 'A masterpiece of modern architecture where indoor and outdoor living dissolve into one. Floor-to-ceiling glass walls frame the rolling hills of Beverly Hills. The estate spans three levels of impeccable design with a detached guest pavilion.',
    amenities: ['Spa & Wellness', 'Home Gym', 'Tennis Court', 'Guest Pavilion', 'Helipad', 'Zen Garden'],
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    id: 'prop-3',
    title: 'Lumina Sky',
    tagline: 'Above everything. Beyond everything.',
    location: 'Monaco',
    price: 25000000,
    beds: 5,
    baths: 7,
    sqft: 8800,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Mansion',
    featured: true,
    description: 'Perched high above the Mediterranean, this mansion offers unmatched privacy and breathtaking ocean panoramas. Exquisite marble finishes, a state-of-the-art security system, and direct private beach access redefine coastal luxury.',
    amenities: ['Ocean Panorama', 'Private Beach', 'Staff Quarters', 'Indoor Pool', 'Wine Cave', 'Art Gallery'],
    gradient: 'from-purple-600 to-pink-400',
  },
  {
    id: 'prop-4',
    title: 'Elysium Estate',
    tagline: 'Where winter becomes art.',
    location: 'Aspen, Colorado',
    price: 15200000,
    beds: 7,
    baths: 9,
    sqft: 12000,
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Mansion',
    featured: false,
    description: 'The ultimate mountain retreat. This modern estate features heated driveways, a private ski lift access, and a world-class wellness center with panoramic mountain views. Every room is a masterclass in alpine luxury.',
    amenities: ['Ski-in/Ski-out', 'Wellness Center', 'Home Theater', 'Heated Driveway', 'Mountain Views', 'Fire Pit Lounge'],
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'prop-5',
    title: 'Noir Residence',
    tagline: 'The art of living in shadows.',
    location: 'London, UK',
    price: 18700000,
    beds: 5,
    baths: 6,
    sqft: 7400,
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Penthouse',
    featured: true,
    description: 'A rare Georgian-era penthouse reimagined for the modern ultra-wealthy. Dark oak paneling meets state-of-the-art automation. Located in Mayfair, steps from Hyde Park, this is old-world charm fused with new-world technology.',
    amenities: ['Private Garden', 'Butler Service', 'Panic Room', 'Library', 'Sauna', 'Garage for 4'],
    gradient: 'from-rose-500 to-red-400',
  },
  {
    id: 'prop-6',
    title: 'Solace Island',
    tagline: 'Your own private world.',
    location: 'Maldives',
    price: 32000000,
    beds: 8,
    baths: 10,
    sqft: 15000,
    image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
      'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    ],
    type: 'Villa',
    featured: true,
    description: 'An entire private island compound featuring over-water pavilions, a marine research station, and the most exclusive coral reef access on the planet. This is not just a home — it is a sovereign territory of serenity.',
    amenities: ['Private Island', 'Coral Reef', 'Submarine Dock', 'Organic Farm', 'Yoga Pavilion', 'Dive Center'],
    gradient: 'from-sky-400 to-indigo-500',
  },
];

export const heroImages = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
  'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
];
