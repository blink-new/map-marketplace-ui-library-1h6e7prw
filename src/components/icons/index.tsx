import React from 'react'

// Base icon component type
type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>

// Location & Navigation Icons
export const LocationIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export const NavigationIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

export const CompassIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" strokeWidth={2} />
  </svg>
)

export const RouteIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
)

export const MapIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
)

// Marketplace Icons
export const StoreIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

export const ShoppingBagIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
  </svg>
)

export const PriceTagIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
)

export const CreditCardIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth={2} />
    <line x1="1" y1="10" x2="23" y2="10" strokeWidth={2} />
  </svg>
)

export const WalletIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

// Food & Dining Icons
export const RestaurantIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 2v6h6m2-6v18m-2-6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 2v6h-6" />
  </svg>
)

export const CoffeeIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
  </svg>
)

export const PizzaIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l10 18H2L12 2z" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
  </svg>
)

// Accommodation Icons
export const HotelIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

export const BedIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-9 4.5V19m-4.5-7V5.5a1.5 1.5 0 013 0V12m4.5 0V8.5a1.5 1.5 0 013 0V12" />
    <rect x="2" y="12" width="20" height="8" rx="1" strokeWidth={2} />
  </svg>
)

export const HomeIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

// Transportation Icons
export const CarIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6H4L2 4v4l15 1 1-3-5-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h16v3H4z" />
  </svg>
)

export const BusIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-2M16 21v-2M3 10h18M8 6V4M16 6V4" />
    <circle cx="7" cy="16" r="1" fill="currentColor" />
    <circle cx="17" cy="16" r="1" fill="currentColor" />
  </svg>
)

export const TrainIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11h16M12 4v7" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 20l-2 2M16 20l2 2" />
  </svg>
)

export const PlaneIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

// Service Icons
export const GasStationIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20V8a2 2 0 012-2h6a2 2 0 012 2v12M3 20h10M3 20l2-2m8 2v-4a2 2 0 012-2h2l3-3V9a1 1 0 00-1-1h-1" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10h2v4H7z" />
  </svg>
)

export const HospitalIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v10M7 12h10" />
  </svg>
)

export const PharmacyIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2" />
  </svg>
)

export const BankIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h8M8 15h8" />
  </svg>
)

// Entertainment Icons
export const MovieIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2} />
    <line x1="8" y1="21" x2="16" y2="21" strokeWidth={2} />
    <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2} />
    <polygon points="10,7 16,10 10,13" fill="currentColor" />
  </svg>
)

export const GameIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="8" width="20" height="8" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
  </svg>
)

export const MusicIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" strokeWidth={2} />
    <circle cx="18" cy="16" r="3" strokeWidth={2} />
  </svg>
)

// UI & Interface Icons
export const SearchIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

export const FilterIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" strokeWidth={2} />
  </svg>
)

export const SortIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 12h12M9 17h6" />
  </svg>
)

export const GridIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" strokeWidth={2} />
    <rect x="14" y="3" width="7" height="7" strokeWidth={2} />
    <rect x="14" y="14" width="7" height="7" strokeWidth={2} />
    <rect x="3" y="14" width="7" height="7" strokeWidth={2} />
  </svg>
)

export const ListIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6" strokeWidth={2} />
    <line x1="8" y1="12" x2="21" y2="12" strokeWidth={2} />
    <line x1="8" y1="18" x2="21" y2="18" strokeWidth={2} />
    <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth={2} />
    <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth={2} />
    <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth={2} />
  </svg>
)

export const StarIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" strokeWidth={2} />
  </svg>
)

export const HeartIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const ShareIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3" strokeWidth={2} />
    <circle cx="6" cy="12" r="3" strokeWidth={2} />
    <circle cx="18" cy="19" r="3" strokeWidth={2} />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth={2} />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth={2} />
  </svg>
)

export const BookmarkIcon: IconComponent = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)