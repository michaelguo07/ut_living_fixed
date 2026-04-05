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
  'The Nine at West Campus': '2409 Nueces St, Austin, TX 78705',
  'The Standard at Austin': '2515 Guadalupe St, Austin, TX 78705',
  'Legacy on Rio': '2402 Rio Grande St, Austin, TX 78705',
  'The Mark Austin': '2418 Leon St, Austin, TX 78705',
  'The Block (various locations)': '3400 Red River St, Austin, TX 78705',
  'Callaway House': '2505 Longview St, Austin, TX 78705',
  'The Castilian': '2323 San Antonio St, Austin, TX 78705',
  '26 West': '2400 Nueces St, Austin, TX 78705',
  'Crest at Pearl': '800 W 38th St, Austin, TX 78705',
  'Texan & Vintage': '3108 Guadalupe St, Austin, TX 78705',
  'Villas on Rio': '2501 Rio Grande St, Austin, TX 78705',
  'ION Austin': '3003 Guadalupe St, Austin, TX 78705',
  'Skyloft': '3003 Whitis Ave, Austin, TX 78705',
  'Moontower': '3200 Duval St, Austin, TX 78705',
  'Yugo Austin Waterloo': '501 W 26th St, Austin, TX 78705',
  'Yugo Austin Rio': '2612 Rio Grande St, Austin, TX 78705',
  'Inspire on 22nd': '2206 San Antonio St, Austin, TX 78705',
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
    distanceFromTower: '',
    availability: formatAvailability(summary?.availablePlans),
    url: summary?.url || '',
    totalPlans: summary?.totalPlans ?? null,
    availablePlans: summary?.availablePlans ?? null,
    lowestPrice: summary?.lowestPrice ?? null,
    pros: [],
    cons: [],
  }
})

export function getApartmentById(id) {
  return UT_AUSTIN_APARTMENTS.find((a) => a.id === id) || null
}

