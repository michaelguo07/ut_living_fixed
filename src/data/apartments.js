export const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const normalizePropertyName = (name) =>
  String(name || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // remove parentheticals like "(various locations)"
    .replace(/\b(at|austin)\b/g, '') // reduce minor naming variations (e.g. "The Standard Austin" vs "The Standard at Austin")
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')

const APARTMENT_NAMES = [
  'The Nine at West Campus',
  'The Standard at Austin',
  'Legacy on Rio',
  'The Mark Austin',
  'The Block (various locations)',
  'Callaway House',
  'The Castilian',
  '26 West',
  'Crest at Pearl',
  'Texan & Vintage',
  'Villas on Rio',
  'ION Austin',
  'Skyloft',
  'Moontower',
  'Yugo Austin Waterloo',
  'Yugo Austin Rio',
  'Inspire on 22nd',
]

const APARTMENT_ADDRESSES = {
  'The Nine at West Campus': '2518 Leon St, Austin, TX 78705',
  'The Standard at Austin': '715 W 23rd St, Austin, TX 78705',
  'Legacy on Rio': '2614 Rio Grande St, Austin, TX 78705',
  'The Mark Austin': '812 W 23rd St, Austin, TX 78705',
  'The Block (various locations)': '2815 Rio Grande St, Austin, TX 78705',
  'Callaway House': '505 W 22nd St, Austin, TX 78705',
  'The Castilian': '2323 San Antonio St, Austin, TX 78705',
  '26 West': '2400 Nueces St, Austin, TX 78705',
  'Crest at Pearl': '707 W 30th St, Austin, TX 78705',
  'Texan & Vintage': '3108 Guadalupe St, Austin, TX 78705',
  'Villas on Rio': '2501 Rio Grande St, Austin, TX 78705',
  'ION Austin': '3003 Guadalupe St, Austin, TX 78705',
  'Skyloft': '507 W 23rd St, Austin, TX 78705',
  'Moontower': '2204 San Antonio St, Austin, TX 78705',
  'Yugo Austin Waterloo': '2400 Seton Ave, Austin, TX 78705',
  'Yugo Austin Rio': '2612 Rio Grande St, Austin, TX 78705',
  'Inspire on 22nd': '2206 San Antonio St, Austin, TX 78705',
}

const APARTMENT_DISTANCES = {
  'The Nine at West Campus': '0.5 miles (10 min walk)',
  'The Standard at Austin': '0.2 miles (5 min walk)',
  'Legacy on Rio': '0.5 miles (10 min walk)',
  'The Mark Austin': '0.4 miles (8 min walk)',
  'The Block (various locations)': '0.5 miles (10 min walk)',
  'Callaway House': '0.3 miles (6 min walk)',
  'The Castilian': '0.2 miles (4 min walk)',
  '26 West': '0.4 miles (8 min walk)',
  'Crest at Pearl': '0.7 miles (15 min walk)',
  'Texan & Vintage': '0.8 miles (16 min walk)',
  'Villas on Rio': '0.4 miles (9 min walk)',
  'ION Austin': '0.7 miles (14 min walk)',
  'Skyloft': '0.4 miles (8 min walk)',
  'Moontower': '0.2 miles (5 min walk)',
  'Yugo Austin Waterloo': '0.5 miles (10 min walk)',
  'Yugo Austin Rio': '0.5 miles (10 min walk)',
  'Inspire on 22nd': '0.2 miles (5 min walk)',
}

const APARTMENT_PROS = {
  'The Nine at West Campus': [
    'Rooftop swimming pool & sun deck',
    'Modern fitness center & yoga studio',
    'Fully furnished units with in-unit laundry',
    'Quiet study lounges with free printing',
  ],
  'The Standard at Austin': [
    'Extremely close to campus (0.2 miles)',
    'Resort-style rooftop pool and hot tub',
    'State-of-the-art 24/7 fitness center',
    'Clubroom and resident lounge area',
  ],
  'Legacy on Rio': [
    'Central West Campus location',
    'Courtyard pool and fitness center',
    'Fully furnished units',
    'Good study space and computer lab',
  ],
  'The Mark Austin': [
    'Premium modern building built in 2023',
    'Rooftop pool deck and fire pits',
    'Indoor golf simulator',
    'High-end fitness center & sauna',
  ],
  'The Block (various locations)': [
    'Affordable student housing rates',
    'Affordable SMART housing program options',
    'Multiple locations very close to campus',
    'Furnished options and study spaces',
  ],
  'Callaway House': [
    'Freshman dorm-style with food included',
    'All-inclusive meal plan (unlimited dining)',
    'Very close to campus (0.3 miles)',
    'Great social environment for incoming students',
    'Housekeeping services available',
  ],
  'The Castilian': [
    'Freshman dorm-style with meal plans',
    'Excellent location (0.2 miles from campus)',
    'Meal plan with dining hall access included',
    '24/7 computer lab and study areas',
    'Active student community events',
  ],
  '26 West': [
    'Large courtyard pool with grill stations',
    'Spacious resident clubhouse and study area',
    '24/7 fitness center and basketball court',
    'Furnished apartments with in-unit washer/dryer',
  ],
  'Crest at Pearl': [
    'Quieter West Campus location',
    'Peaceful courtyard and outdoor grill areas',
    'Fully equipped fitness center',
    'Assigned garage parking available',
  ],
  'Texan & Vintage': [
    'Unique character and layout designs',
    'Located in a quieter pocket of West Campus',
    'Fully furnished floor plans',
    'Convenient access to nearby dining options',
  ],
  'Villas on Rio': [
    'Ultra-luxury amenities (spa, sauna, steam room)',
    'Meditation room and state-of-the-art fitness center',
    'Rooftop pool with cabanas and Austin views',
    'Smart home automation and designer finishes',
  ],
  'ION Austin': [
    'Close to Guadalupe Street dining',
    'Courtyard swimming pool and sun loungers',
    'Fully furnished units',
    'Fitness center and study lounges',
  ],
  'Skyloft': [
    'Stunning high-rise views of West Campus & UT Tower',
    'Rooftop pool and fitness center',
    'Fully furnished with modern appliances',
    'Excellent walkability to campus (0.4 miles)',
  ],
  'Moontower': [
    'Extremely close to campus (0.2 miles)',
    'Rooftop pool, spin studio, and fitness center',
    'Free resident coffee bar',
    'Luxury modern finishes and study rooms',
  ],
  'Yugo Austin Waterloo': [
    'Brand new high-rise building with luxury finishes',
    'Rooftop pool, lounge, and premium gym',
    'Excellent study spaces and conference rooms',
    'Fully furnished with in-unit laundry',
  ],
  'Yugo Austin Rio': [
    'Located in the heart of West Campus',
    'Rooftop pool deck and sun deck',
    'Fitness center and game room',
    'Fully furnished with standard student amenities',
  ],
  'Inspire on 22nd': [
    'Very close to campus (0.2 miles)',
    'Rooftop pool and fitness center',
    'Quiet study rooms and computer stations',
    'Fully furnished apartments',
  ],
}

const APARTMENT_CONS = {
  'The Nine at West Campus': [
    'High monthly rental rates',
    'Garage parking is expensive (~$150/mo)',
    'Utilities are not included in the rent price',
  ],
  'The Standard at Austin': [
    'Premium rent pricing tier',
    'Expensive garage parking fees',
    'High density/social environment can be noisy',
    'Utilities are billed separately',
  ],
  'Legacy on Rio': [
    'Paid garage parking is limited',
    'Water and electricity utilities are billed extra',
    'Some bedrooms in multi-bed units are small',
  ],
  'The Mark Austin': [
    'High premium rental rates',
    'Expensive parking fees (~$160/mo)',
    'Monthly utilities are not included',
  ],
  'The Block (various locations)': [
    'Older buildings compared to new high-rises',
    'Amenities are more basic than luxury towers',
    'Paid parking and limited availability',
  ],
  'Callaway House': [
    'Mandatory meal plan makes it very expensive',
    'Shared bedrooms offer limited privacy',
    'Strict community guidelines (dorm rules)',
  ],
  'The Castilian': [
    'Dorm-style layout with shared bedrooms',
    'High overall cost due to required meal plans',
    'Restricted kitchen access (no private kitchen)',
  ],
  '26 West': [
    'Paid parking fee is extra',
    'Utilities are billed separately',
    'Older building showing some wear and tear',
  ],
  'Crest at Pearl': [
    'Further walk from central campus (0.7 miles)',
    'Fewer nearby restaurant options',
    'Paid parking and separate utility billing',
  ],
  'Texan & Vintage': [
    '15-16 minute walk to the central campus',
    'More basic amenities than modern high-rises',
    'Utilities and parking are not included',
  ],
  'Villas on Rio': [
    'Premium luxury pricing tier',
    'High parking fee (~$200/mo)',
    'Separate utility bills',
  ],
  'ION Austin': [
    'Further walk to campus (0.7 miles / 14 mins)',
    'Older building and standard amenities',
    'Parking and utilities are extra',
  ],
  'Skyloft': [
    'Premium pricing on upper floors',
    'High parking fees',
    'Elevator wait times can be long during peak hours',
  ],
  'Moontower': [
    'Premium pricing tier',
    'Paid parking is expensive',
    'High demand means units sell out very early',
  ],
  'Yugo Austin Waterloo': [
    'High premium pricing',
    'Expensive garage parking',
    'Resident pays for water and electricity',
  ],
  'Yugo Austin Rio': [
    'Can be noisy on weekends',
    'High parking fees',
    'Utilities are billed separately',
  ],
  'Inspire on 22nd': [
    'Paid garage parking only',
    'Monthly utilities are extra',
    'Layouts can feel slightly compact in multi-bed configurations',
  ],
}

/**
 * Spreadsheet-backed summary data (from `austin_student_housing.xlsx` → "Summary by Property").
 * Note: the XLSX currently only contains 11 properties; the others remain placeholders.
 */
const SUMMARY_BY_PROPERTY = [
  {
    property: '26 West',
    totalPlans: 13,
    availablePlans: 10,
    lowestPrice: 1304,
    url: 'https://www.americancampus.com/student-apartments/tx/austin/26-west/floor-plans',
  },
  {
    property: 'Inspire on 22nd',
    totalPlans: 2,
    availablePlans: 2,
    lowestPrice: 2129,
    url: 'https://www.inspire22nd.com/austin/inspire-on-22nd/student/',
  },
  {
    property: 'Legacy on Rio',
    totalPlans: 30,
    availablePlans: 15,
    lowestPrice: 799,
    url: 'https://legacyonrio.com/floorplans/',
  },
  {
    property: 'Moontower',
    totalPlans: 14,
    availablePlans: 9,
    lowestPrice: 1255,
    url: 'https://moontoweratx.com/floorplans/',
  },
  {
    property: 'The Block',
    totalPlans: 139,
    availablePlans: 95,
    lowestPrice: 534,
    url: 'https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans',
  },
  {
    property: 'The Castilian',
    totalPlans: 1,
    availablePlans: 1,
    lowestPrice: 1649,
    url: 'https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans',
  },
  {
    property: 'The Mark Austin',
    totalPlans: 30,
    availablePlans: 13,
    lowestPrice: 1255,
    url: 'https://www.themarkatx.com/floorplans/',
  },
  {
    property: 'The Nine at West Campus',
    totalPlans: 10,
    availablePlans: 9,
    lowestPrice: 950,
    url: 'https://theninewestcampus.com/floorplans/',
  },
  {
    property: 'The Standard Austin',
    totalPlans: 27,
    availablePlans: 16,
    lowestPrice: 999,
    url: 'https://thestandardaustin.landmark-properties.com/floorplans/',
  },
  {
    property: 'Yugo Austin Rio',
    totalPlans: 17,
    availablePlans: 4,
    lowestPrice: 1289,
    url: 'https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-rio/rooms',
  },
  {
    property: 'Yugo Austin Waterloo',
    totalPlans: 11,
    availablePlans: 7,
    lowestPrice: 1249,
    url: 'https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/rooms',
  },
]

const SUMMARY_MAP = new Map(
  SUMMARY_BY_PROPERTY.map((r) => [normalizePropertyName(r.property), r]),
)

const formatCost = (lowestPrice) =>
  typeof lowestPrice === 'number' && Number.isFinite(lowestPrice)
    ? `From $${lowestPrice}/mo`
    : ''

const formatAvailability = (availablePlans) =>
  typeof availablePlans === 'number' && Number.isFinite(availablePlans)
    ? `${availablePlans} plan${availablePlans === 1 ? '' : 's'} available`
    : ''

/**
 * UT Austin apartment list (placeholder fields for now).
 * You can fill these in later or hydrate them from your AI agent.
 */
export const UT_AUSTIN_APARTMENTS = APARTMENT_NAMES.map((name) => {
  const summary = SUMMARY_MAP.get(normalizePropertyName(name))

  return {
    id: slugify(name),
    name,
    address: APARTMENT_ADDRESSES[name] || '',
    cost: formatCost(summary?.lowestPrice),
    distanceFromTower: APARTMENT_DISTANCES[name] || '',
    availability: formatAvailability(summary?.availablePlans),
    url: summary?.url || '',
    totalPlans: summary?.totalPlans ?? null,
    availablePlans: summary?.availablePlans ?? null,
    lowestPrice: summary?.lowestPrice ?? null,
    pros: APARTMENT_PROS[name] || [],
    cons: APARTMENT_CONS[name] || [],
  }
})

export function getApartmentById(id) {
  return UT_AUSTIN_APARTMENTS.find((a) => a.id === id) || null
}

