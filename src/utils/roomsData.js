/**
 * Rooms Data Model
 * Complete room catalog with all details
 */

export const roomCategories = [
    { id: 'all', label: 'All Rooms' },
    { id: 'standard', label: 'Standard' },
    { id: 'deluxe', label: 'Deluxe' },
    { id: 'suite', label: 'Suites' },
    { id: 'penthouse', label: 'Penthouse' },
]

export const roomAmenities = {
    wifi: { icon: 'wifi', label: 'Free WiFi' },
    tv: { icon: 'tv', label: 'Smart TV' },
    minibar: { icon: 'minibar', label: 'Mini Bar' },
    ac: { icon: 'ac', label: 'Air Conditioning' },
    safe: { icon: 'safe', label: 'In-room Safe' },
    desk: { icon: 'desk', label: 'Work Desk' },
    coffee: { icon: 'coffee', label: 'Coffee Machine' },
    bathtub: { icon: 'bathtub', label: 'Bathtub' },
    balcony: { icon: 'balcony', label: 'Private Balcony' },
    view: { icon: 'view', label: 'River View' },
    jacuzzi: { icon: 'jacuzzi', label: 'Jacuzzi' },
    butler: { icon: 'butler', label: 'Butler Service' },
    kitchen: { icon: 'kitchen', label: 'Kitchenette' },
    living: { icon: 'living', label: 'Living Room' },
}

export const rooms = [
    {
        id: 'standard-twin',
        slug: 'standard-twin',
        name: 'Standard Twin Room',
        category: 'standard',
        shortDescription: 'Comfortable and efficient, perfect for short stays.',
        description: 'Our Standard Twin Room offers the perfect blend of comfort and value. Featuring two plush single beds with premium linens, modern amenities, and a sleek design that reflects the futuristic spirit of Riverside Suites. Ideal for friends traveling together or business colleagues.',
        price: 129,
        originalPrice: 159,
        size: 28,
        maxGuests: 2,
        beds: '2 Single Beds',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'coffee'],
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        ],
        featured: false,
        available: true,
    },
    {
        id: 'standard-king',
        slug: 'standard-king',
        name: 'Standard King Room',
        category: 'standard',
        shortDescription: 'Spacious king bed with all essential amenities.',
        description: 'Experience restful nights in our Standard King Room, featuring a luxurious king-size bed dressed in Egyptian cotton sheets. The room offers a modern workspace, high-speed WiFi, and a rain shower. Perfect for solo travelers or couples seeking comfort without compromise.',
        price: 149,
        originalPrice: 179,
        size: 32,
        maxGuests: 2,
        beds: '1 King Bed',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee'],
        images: [
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&q=80',
            'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
        ],
        featured: false,
        available: true,
    },
    {
        id: 'deluxe-river',
        slug: 'deluxe-river-view',
        name: 'Deluxe River View',
        category: 'deluxe',
        shortDescription: 'Stunning river views with premium furnishings.',
        description: 'Wake up to breathtaking river views in our Deluxe River View room. This spacious retreat features floor-to-ceiling windows, a premium king bed, and a private balcony where you can enjoy your morning coffee while watching the sunrise over the water. The marble bathroom includes a deep soaking tub and separate rain shower.',
        price: 249,
        originalPrice: 299,
        size: 42,
        maxGuests: 2,
        beds: '1 King Bed',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee', 'minibar', 'balcony', 'view', 'bathtub'],
        images: [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
        ],
        featured: true,
        available: true,
    },
    {
        id: 'deluxe-corner',
        slug: 'deluxe-corner-suite',
        name: 'Deluxe Corner Room',
        category: 'deluxe',
        shortDescription: 'Corner location with panoramic views.',
        description: 'Our Deluxe Corner Room occupies a prime position at the corner of the building, offering panoramic views through wraparound windows. The extra-large space includes a comfortable seating area, work desk, and a king bed positioned to maximize the stunning vistas. The bathroom features dual vanities and a spa-inspired shower.',
        price: 279,
        originalPrice: 329,
        size: 48,
        maxGuests: 3,
        beds: '1 King Bed + Sofa Bed',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee', 'minibar', 'view', 'bathtub'],
        images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
            'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
            'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        ],
        featured: false,
        available: true,
    },
    {
        id: 'executive-suite',
        slug: 'executive-suite',
        name: 'Executive Suite',
        category: 'suite',
        shortDescription: 'Separate living area for work and relaxation.',
        description: 'The Executive Suite is designed for discerning travelers who demand both productivity and luxury. A separate living room with a sofa and work area allows you to host meetings or unwind, while the bedroom offers a sanctuary of calm with a premium king bed. The suite includes complimentary minibar refills and evening turndown service.',
        price: 349,
        originalPrice: 419,
        size: 65,
        maxGuests: 3,
        beds: '1 King Bed + Sofa Bed',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee', 'minibar', 'balcony', 'view', 'bathtub', 'living'],
        images: [
            'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
            'https://images.unsplash.com/photo-1598928506311-c55ez361a30e?w=800&q=80',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
            'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80',
        ],
        featured: true,
        available: true,
    },
    {
        id: 'family-suite',
        slug: 'family-suite',
        name: 'Family Suite',
        category: 'suite',
        shortDescription: 'Spacious suite perfect for families.',
        description: 'Our Family Suite offers generous space for the whole family. With a master bedroom featuring a king bed and a second room with twin beds, everyone has their own comfortable sleeping area. The large living space includes a kitchenette, dining area, and entertainment system. Child-friendly amenities are available upon request.',
        price: 399,
        originalPrice: 479,
        size: 85,
        maxGuests: 5,
        beds: '1 King + 2 Singles',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'coffee', 'minibar', 'view', 'bathtub', 'living', 'kitchen'],
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
            'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80',
        ],
        featured: false,
        available: true,
    },
    {
        id: 'presidential-suite',
        slug: 'presidential-suite',
        name: 'Presidential Suite',
        category: 'penthouse',
        shortDescription: 'Ultimate luxury with private terrace and butler.',
        description: 'The Presidential Suite represents the pinnacle of luxury at Riverside Suites. Spanning an entire floor corner, this magnificent space features a private terrace with outdoor seating, a fully equipped kitchen, formal dining area, and an opulent living room. The master bedroom includes a walk-in closet and marble bathroom with jacuzzi. Dedicated butler service ensures your every need is anticipated.',
        price: 899,
        originalPrice: 1099,
        size: 150,
        maxGuests: 4,
        beds: '1 King + 1 Queen',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee', 'minibar', 'balcony', 'view', 'bathtub', 'jacuzzi', 'butler', 'living', 'kitchen'],
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
        ],
        featured: true,
        available: true,
    },
    {
        id: 'penthouse-royal',
        slug: 'penthouse-royal',
        name: 'Royal Penthouse',
        category: 'penthouse',
        shortDescription: 'The crown jewel with 360° views.',
        description: 'Our Royal Penthouse is an architectural masterpiece occupying the entire top floor. With 360-degree panoramic views, a private rooftop terrace with hot tub, and interiors designed by award-winning architects, this is truly a once-in-a-lifetime experience. Features include a home theater, wine cellar, private gym, and helipad access. Round-the-clock butler service and a private chef are included.',
        price: 1499,
        originalPrice: 1899,
        size: 280,
        maxGuests: 6,
        beds: '2 King + 2 Queen',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'desk', 'coffee', 'minibar', 'balcony', 'view', 'bathtub', 'jacuzzi', 'butler', 'living', 'kitchen'],
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
        ],
        featured: true,
        available: false,
    },
]

// Helper functions
export function getRoomBySlug(slug) {
    return rooms.find(room => room.slug === slug)
}

export function getRoomById(id) {
    return rooms.find(room => room.id === id)
}

export function getFeaturedRooms() {
    return rooms.filter(room => room.featured)
}

export function getRoomsByCategory(category) {
    if (category === 'all') return rooms
    return rooms.filter(room => room.category === category)
}

export function getAvailableRooms() {
    return rooms.filter(room => room.available)
}

export function sortRooms(roomList, sortBy) {
    const sorted = [...roomList]
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price)
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price)
        case 'size':
            return sorted.sort((a, b) => b.size - a.size)
        case 'guests':
            return sorted.sort((a, b) => b.maxGuests - a.maxGuests)
        default:
            return sorted
    }
}

export function filterRooms(roomList, filters) {
    return roomList.filter(room => {
        if (filters.minPrice && room.price < filters.minPrice) return false
        if (filters.maxPrice && room.price > filters.maxPrice) return false
        if (filters.minGuests && room.maxGuests < filters.minGuests) return false
        if (filters.amenities?.length > 0) {
            const hasAllAmenities = filters.amenities.every(a => room.amenities.includes(a))
            if (!hasAllAmenities) return false
        }
        return true
    })
}
