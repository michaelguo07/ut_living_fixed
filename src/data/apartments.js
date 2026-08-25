import { slugify, normalizePropertyName } from './utils.js'
import { FLOOR_PLANS, LAST_UPDATED, LAST_UPDATED_ISO } from './floorPlans.js'

export { slugify, normalizePropertyName, LAST_UPDATED, LAST_UPDATED_ISO }

const APARTMENT_NAMES = [
  // ON CAMPUS (UNIVERSITY-OWNED/OPERATED)
  '2400 Nueces Apartments',
  'Brackenridge Apartments (Lake Austin Blvd)',
  'Colorado Apartments (Lake Austin Blvd)',
  'East Campus Graduate Apartments',
  'Gateway Apartments (West 6th St)',

  // WEST CAMPUS (PRIVATE STUDENT HOUSING)
  '21 Rio Apartments',
  'Axis West Campus',
  'Crest at Pearl',
  'Envoy Austin',
  'Evo Austin (formerly Ion Austin)',
  'GrandMarc Austin',
  'Inspire on 22nd',
  'Legacy on Rio',
  'Mark Uptown',
  'Moontower Just off Campus',
  'Nine Just off Campus',
  'Quarters on Campus (The Quarters)',
  'Rise on 23rd',
  'Skyloft Austin',
  'Texan & 21st Apartments',
  'The Block (on 23rd, 25th, etc.)',
  'The Castilian',
  'The G on West Campus',
  'The Harrison',
  'The Hub Austin West Campus',
  'The Ruckus',
  'The Standard at Austin',
  'Unleashed West Campus',
  'Villas on Rio',
  'Waterloo Austin',
  'West Campus Flats',
  'Yugo Austin Corner',
  'Yugo Austin Space',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments',
  '45th Street Apartments',
  'Hyde Park Court',
  'Hyde Park Square',
  'Lofts at the Triangle',
  'Melroy Apartments',
  'River Oaks Apartments',
  'Red River Apartments',
  'The Triangle Apartments',

  // OTHER OFF CAMPUS (RIVERSIDE / SOUTH / EAST AUSTIN)
  'Ballpark North',
  'Estate on Campus (Riverside)',
  'Mesh Apartments',
  'Town Lake Student Apartments',
  'University Estates at Austin',
  'University Village Austin',
]

export const NEIGHBORHOODS = [
  'All Neighborhoods',
  'On Campus',
  'West Campus',
  'North Campus / Hyde Park',
  'Riverside / Off-Campus',
]

const APARTMENT_NEIGHBORHOODS = {
  // ON CAMPUS
  '2400 Nueces Apartments': 'On Campus',
  'Brackenridge Apartments (Lake Austin Blvd)': 'On Campus',
  'Colorado Apartments (Lake Austin Blvd)': 'On Campus',
  'East Campus Graduate Apartments': 'On Campus',
  'Gateway Apartments (West 6th St)': 'On Campus',

  // WEST CAMPUS
  '21 Rio Apartments': 'West Campus',
  'Axis West Campus': 'West Campus',
  'Crest at Pearl': 'West Campus',
  'Envoy Austin': 'West Campus',
  'Evo Austin (formerly Ion Austin)': 'West Campus',
  'GrandMarc Austin': 'West Campus',
  'Inspire on 22nd': 'West Campus',
  'Legacy on Rio': 'West Campus',
  'Mark Uptown': 'West Campus',
  'Moontower Just off Campus': 'West Campus',
  'Nine Just off Campus': 'West Campus',
  'Quarters on Campus (The Quarters)': 'West Campus',
  'Rise on 23rd': 'West Campus',
  'Skyloft Austin': 'West Campus',
  'Texan & 21st Apartments': 'West Campus',
  'The Block (on 23rd, 25th, etc.)': 'West Campus',
  'The Castilian': 'West Campus',
  'The G on West Campus': 'West Campus',
  'The Harrison': 'West Campus',
  'The Hub Austin West Campus': 'West Campus',
  'The Ruckus': 'West Campus',
  'The Standard at Austin': 'West Campus',
  'Unleashed West Campus': 'West Campus',
  'Villas on Rio': 'West Campus',
  'Waterloo Austin': 'West Campus',
  'West Campus Flats': 'West Campus',
  'Yugo Austin Corner': 'West Campus',
  'Yugo Austin Space': 'West Campus',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': 'North Campus / Hyde Park',
  '45th Street Apartments': 'North Campus / Hyde Park',
  'Hyde Park Court': 'North Campus / Hyde Park',
  'Hyde Park Square': 'North Campus / Hyde Park',
  'Lofts at the Triangle': 'North Campus / Hyde Park',
  'Melroy Apartments': 'North Campus / Hyde Park',
  'River Oaks Apartments': 'North Campus / Hyde Park',
  'Red River Apartments': 'North Campus / Hyde Park',
  'The Triangle Apartments': 'North Campus / Hyde Park',

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': 'Riverside / Off-Campus',
  'Estate on Campus (Riverside)': 'Riverside / Off-Campus',
  'Mesh Apartments': 'Riverside / Off-Campus',
  'Town Lake Student Apartments': 'Riverside / Off-Campus',
  'University Estates at Austin': 'Riverside / Off-Campus',
  'University Village Austin': 'Riverside / Off-Campus',
}

const APARTMENT_ADDRESSES = {
  // ON CAMPUS
  '2400 Nueces Apartments': '2400 Nueces St, Austin, TX 78705',
  'Brackenridge Apartments (Lake Austin Blvd)': '3307 Lake Austin Blvd, Austin, TX 78703',
  'Colorado Apartments (Lake Austin Blvd)': '2501 Lake Austin Blvd, Austin, TX 78703',
  'East Campus Graduate Apartments': '1920 E 21st St, Austin, TX 78722',
  'Gateway Apartments (West 6th St)': '2400 W 6th St, Austin, TX 78703',

  // WEST CAMPUS
  '21 Rio Apartments': '2101 Rio Grande St, Austin, TX 78705',
  'Axis West Campus': '2505 Longview St, Austin, TX 78705',
  'Crest at Pearl': '707 W 30th St, Austin, TX 78705',
  'Envoy Austin': '2108 San Gabriel St, Austin, TX 78705',
  'Evo Austin (formerly Ion Austin)': '3003 Guadalupe St, Austin, TX 78705',
  'GrandMarc Austin': '510 W 26th St, Austin, TX 78705',
  'Inspire on 22nd': '2206 San Antonio St, Austin, TX 78705',
  'Legacy on Rio': '2614 Rio Grande St, Austin, TX 78705',
  'Mark Uptown': '812 W 23rd St, Austin, TX 78705',
  'Moontower Just off Campus': '2204 San Antonio St, Austin, TX 78705',
  'Nine Just off Campus': '2518 Leon St, Austin, TX 78705',
  'Quarters on Campus (The Quarters)': '2222 Rio Grande St, Austin, TX 78705',
  'Rise on 23rd': '2206 Nueces St, Austin, TX 78705',
  'Skyloft Austin': '507 W 23rd St, Austin, TX 78705',
  'Texan & 21st Apartments': '3108 Guadalupe St, Austin, TX 78705',
  'The Block (on 23rd, 25th, etc.)': '2815 Rio Grande St, Austin, TX 78705',
  'The Castilian': '2323 San Antonio St, Austin, TX 78705',
  'The G on West Campus': '1715 Guadalupe St, Austin, TX 78701',
  'The Harrison': '2101 Rio Grande St, Austin, TX 78705',
  'The Hub Austin West Campus': '2610 Rio Grande St, Austin, TX 78705',
  'The Ruckus': '2401 Rio Grande St, Austin, TX 78705',
  'The Standard at Austin': '715 W 23rd St, Austin, TX 78705',
  'Unleashed West Campus': '2408 Leon St, Austin, TX 78705',
  'Villas on Rio': '2501 Rio Grande St, Austin, TX 78705',
  'Waterloo Austin': '2400 Seton Ave, Austin, TX 78705',
  'West Campus Flats': '2104 San Gabriel St, Austin, TX 78705',
  'Yugo Austin Corner': '2504 San Gabriel St, Austin, TX 78705',
  'Yugo Austin Space': '2502 Nueces St, Austin, TX 78705',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': '305 W 44th St, Austin, TX 78751',
  '45th Street Apartments': '304 W 45th St, Austin, TX 78751',
  'Hyde Park Court': '302 W 38th St, Austin, TX 78705',
  'Hyde Park Square': '4001 Speedway, Austin, TX 78751',
  'Lofts at the Triangle': '4611 Guadalupe St, Austin, TX 78751',
  'Melroy Apartments': '3408 Speedway, Austin, TX 78705',
  'River Oaks Apartments': '3105 Speedway, Austin, TX 78705',
  'Red River Apartments': '3200 Red River St, Austin, TX 78705',
  'The Triangle Apartments': '4600 Guadalupe St, Austin, TX 78751',

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': '4600 Elmont Dr, Austin, TX 78741',
  'Estate on Campus (Riverside)': '1300 Crossing Pl, Austin, TX 78741',
  'Mesh Apartments': '2101 Elmont Dr, Austin, TX 78741',
  'Town Lake Student Apartments': '2201 S Lakeshore Blvd, Austin, TX 78741',
  'University Estates at Austin': '1300 Crossing Pl, Austin, TX 78741',
  'University Village Austin': '1301 Crossing Pl, Austin, TX 78741',
}

const APARTMENT_DISTANCES = {
  // ON CAMPUS
  '2400 Nueces Apartments': '0.4 miles (8 min walk)',
  'Brackenridge Apartments (Lake Austin Blvd)': '2.8 miles (12 min UT Shuttle)',
  'Colorado Apartments (Lake Austin Blvd)': '2.6 miles (10 min UT Shuttle)',
  'East Campus Graduate Apartments': '0.8 miles (15 min walk / 6 min bus)',
  'Gateway Apartments (West 6th St)': '2.2 miles (10 min UT Shuttle)',

  // WEST CAMPUS
  '21 Rio Apartments': '0.3 miles (6 min walk)',
  'Axis West Campus': '0.6 miles (12 min walk)',
  'Crest at Pearl': '0.7 miles (15 min walk)',
  'Envoy Austin': '0.5 miles (10 min walk)',
  'Evo Austin (formerly Ion Austin)': '0.7 miles (14 min walk)',
  'GrandMarc Austin': '0.4 miles (8 min walk)',
  'Inspire on 22nd': '0.2 miles (5 min walk)',
  'Legacy on Rio': '0.5 miles (10 min walk)',
  'Mark Uptown': '0.4 miles (8 min walk)',
  'Moontower Just off Campus': '0.2 miles (5 min walk)',
  'Nine Just off Campus': '0.5 miles (10 min walk)',
  'Quarters on Campus (The Quarters)': '0.4 miles (8 min walk)',
  'Rise on 23rd': '0.3 miles (6 min walk)',
  'Skyloft Austin': '0.4 miles (8 min walk)',
  'Texan & 21st Apartments': '0.8 miles (16 min walk)',
  'The Block (on 23rd, 25th, etc.)': '0.5 miles (10 min walk)',
  'The Castilian': '0.2 miles (4 min walk)',
  'The G on West Campus': '0.3 miles (6 min walk)',
  'The Harrison': '0.4 miles (8 min walk)',
  'The Hub Austin West Campus': '0.5 miles (10 min walk)',
  'The Ruckus': '0.4 miles (8 min walk)',
  'The Standard at Austin': '0.2 miles (5 min walk)',
  'Unleashed West Campus': '0.5 miles (10 min walk)',
  'Villas on Rio': '0.4 miles (9 min walk)',
  'Waterloo Austin': '0.5 miles (10 min walk)',
  'West Campus Flats': '0.5 miles (10 min walk)',
  'Yugo Austin Corner': '0.5 miles (10 min walk)',
  'Yugo Austin Space': '0.4 miles (8 min walk)',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': '1.4 miles (8 min bus / bike)',
  '45th Street Apartments': '1.5 miles (9 min bus / bike)',
  'Hyde Park Court': '1.1 miles (7 min bus / 18 min walk)',
  'Hyde Park Square': '1.3 miles (8 min bus / bike)',
  'Lofts at the Triangle': '1.8 miles (10 min bus)',
  'Melroy Apartments': '0.9 miles (14 min walk / 5 min bus)',
  'River Oaks Apartments': '0.8 miles (13 min walk / 5 min bus)',
  'Red River Apartments': '1.0 miles (15 min walk / 6 min bus)',
  'The Triangle Apartments': '1.8 miles (10 min bus)',

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': '4.2 miles (15 min UT Shuttle)',
  'Estate on Campus (Riverside)': '4.5 miles (15 min UT Shuttle)',
  'Mesh Apartments': '3.8 miles (12 min bus)',
  'Town Lake Student Apartments': '3.2 miles (10 min bus)',
  'University Estates at Austin': '4.5 miles (15 min UT Shuttle)',
  'University Village Austin': '4.5 miles (15 min UT Shuttle)',
}

const APARTMENT_PROS = {
  // ON CAMPUS
  '2400 Nueces Apartments': [
    'University Housing & Dining official support',
    'All utilities and high-speed internet included',
    'Resort courtyard pool and fitness center',
    'Sophomore+ and graduate community atmosphere',
  ],
  'Brackenridge Apartments (Lake Austin Blvd)': [
    'Affordable family and graduate student rates',
    'Direct UT Shuttle route to central campus',
    'Quiet scenic lakeside neighborhood',
    'Gas, water, internet, and trash included in rent',
  ],
  'Colorado Apartments (Lake Austin Blvd)': [
    'Budget-friendly single student rates ($619–$1,200/mo)',
    'All utilities (electric, gas, water, internet) included',
    'Free on-site resident laundry facilities',
    'Convenient UT Shuttle stop right outside',
  ],
  'East Campus Graduate Apartments': [
    'Dedicated modern graduate student community',
    'In-unit washer/dryer and modern stainless appliances',
    'All utilities included in monthly rate',
    'Close to East Campus academic centers and bus lines',
  ],
  'Gateway Apartments (West 6th St)': [
    'Budget-friendly UT University Housing rates',
    'Single student apartments with dedicated study spaces',
    'All utilities and internet included in rent',
    'Easy UT Shuttle connection to campus',
  ],

  // WEST CAMPUS
  '21 Rio Apartments': [
    'Premier high-rise tower with downtown and campus views',
    'Rooftop swimming pool and 24/7 fitness center',
    'On-site convenience store and coffee shop',
    'Individual by-the-bed leasing with roommate matching',
  ],
  'Axis West Campus': [
    'Modern finishes with Energy Star stainless appliances',
    'Resort-style courtyard pool with lounge cabanas',
    '24/7 fitness center and private study cafe',
    'SMART housing program availability',
  ],
  'Crest at Pearl': [
    'Quieter West Campus location',
    'Peaceful courtyard and outdoor grill areas',
    'Fully equipped fitness center',
    'Assigned garage parking available',
  ],
  'Envoy Austin': [
    'Budget-friendly private 1-bedroom apartments',
    'Quiet garden-style residential setting',
    'Free assigned parking permit included in rent',
    'Gas and trash utilities included',
  ],
  'Evo Austin (formerly Ion Austin)': [
    'Prime location on The Drag near dining and shops',
    'Courtyard pool and sun deck loungers',
    'Fully furnished units with modern interiors',
    'Fitness center and collaborative study spaces',
  ],
  'GrandMarc Austin': [
    'Ideal central West Campus location on 26th St',
    'Resort pool with sunbathing deck and hot tub',
    '24-hour fitness gym and business center',
    'Spacious floor plans with in-unit laundry',
  ],
  'Inspire on 22nd': [
    'Extremely close to campus (0.2 miles)',
    'Rooftop pool deck and skyline views',
    'Quiet study lounges and computer stations',
    'Fully furnished student apartments',
  ],
  'Legacy on Rio': [
    'Central West Campus location',
    'Courtyard pool and fitness center',
    'Fully furnished units with modern decor',
    'Active resident clubhouse and study lounge',
  ],
  'Mark Uptown': [
    'Brand new luxury high-rise built in 2023',
    'Rooftop pool deck with cabanas and fire pits',
    'Indoor virtual golf simulator lounge',
    'State-of-the-art multi-level gym and sauna',
  ],
  'Moontower Just off Campus': [
    'Extremely close to UT Tower (0.2 miles / 5 min walk)',
    'Rooftop pool, spin studio, and wellness center',
    'Free resident coffee bar in lobby',
    'Designer finishes with floor-to-ceiling windows',
  ],
  'Nine Just off Campus': [
    'Rooftop swimming pool and sun deck',
    'Modern fitness center and yoga studio',
    'Fully furnished units with in-unit laundry',
    'Quiet study lounges with free printing',
  ],
  'Quarters on Campus (The Quarters)': [
    'Multiple convenient West Campus building locations',
    'Massive 2,500 sq ft fitness center access',
    'Courtyards with outdoor grilling and sun decks',
    'SMART housing options with by-the-bed leasing',
  ],
  'Rise on 23rd': [
    'Modern high-rise just 2 blocks from campus',
    'Rooftop deck and state-of-the-art gym',
    'Luxury penthouses and club-level units available',
    'SMART housing floor plan selections',
  ],
  'Skyloft Austin': [
    'High-rise views of West Campus and UT Tower',
    'Rooftop pool and 24-hour fitness center',
    'Fully furnished with modern appliances',
    'Quick 8-minute walk to UT academic buildings',
  ],
  'Texan & 21st Apartments': [
    'Unique character and diverse floor plan layouts',
    'Quiet pocket of West Campus near dining',
    'Fully furnished apartment options',
    'Reliable on-site management and maintenance',
  ],
  'The Block (on 23rd, 25th, etc.)': [
    'Affordable student housing rates',
    'Affordable SMART housing program options',
    'Multiple locations very close to campus',
    'Furnished options and study spaces',
  ],
  'The Castilian': [
    'Freshman dorm-style with meal plans included',
    'Superb location (0.2 miles / 4 min walk to Tower)',
    'All-inclusive dining hall access in building',
    '24/7 computer lab and study areas',
  ],
  'The G on West Campus': [
    'Direct access to The Drag (Guadalupe St)',
    'Budget-friendly rates starting under $1,000/mo',
    'Short walking distance to UT campus classrooms',
    'Furnished options available',
  ],
  'The Harrison': [
    'Central West Campus street location',
    'Spacious living rooms and private bedrooms',
    'Courtyard pool and resident amenities',
    'Modern stainless kitchen packages',
  ],
  'The Hub Austin West Campus': [
    'Premium modern high-rise architecture',
    'Resort-style rooftop pool and hot tub',
    'Top-tier fitness center with private wellness rooms',
    'High-speed fiber internet and smart home locks',
  ],
  'The Ruckus': [
    'Sky gym and 7th-floor terrace overlooking city',
    'Lucky Lab Coffee shop on ground floor',
    'Boutique finishes with custom quartz countertops',
    '24/7 study lounge and package concierge',
  ],
  'The Standard at Austin': [
    'Extremely close to campus (0.2 miles)',
    'Resort-style rooftop pool and hot tub',
    'State-of-the-art 24/7 fitness center',
    'Clubroom and resident lounge area',
  ],
  'Unleashed West Campus': [
    'Pet-friendly community with dog-friendly amenities',
    'Spacious layouts with private bathrooms',
    'Convenient central West Campus location',
    'Modern interior finishes',
  ],
  'Villas on Rio': [
    'Ultra-luxury spa, sauna, and hydrotherapy pool',
    'Meditation room and state-of-the-art fitness center',
    'Rooftop pool with cabanas and panoramic views',
    'Smart home automation and designer finishes',
  ],
  'Waterloo Austin': [
    'Austin’s tallest student high-rise with luxury finishes',
    'Rooftop infinity pool, lounge, and premium gym',
    'Private study pods and conference rooms',
    'Fully furnished with in-unit washer/dryer',
  ],
  'West Campus Flats': [
    'Affordable private studio apartments',
    'Includes 1 assigned parking space in rent',
    'Gas and trash utilities included',
    'Walkable to UT classrooms and dining',
  ],
  'Yugo Austin Corner': [
    'Quiet West Campus corner location on San Gabriel',
    'Affordable multi-bed options starting near $1,000/mo',
    'SMART housing eligible layouts available',
    'Courtyard pool and resident fitness lounge',
  ],
  'Yugo Austin Space': [
    'Boutique student residence on Nueces St',
    'Loft-style floor plans with high ceilings',
    'Short walk to campus and Guadalupe food spots',
    'Fully furnished with modern kitchen appliances',
  ],

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': [
    'Quiet neighborhood vibe in North Campus/Hyde Park',
    'Significantly more affordable than West Campus towers',
    'Easy bike ride or bus commute to UT Tower',
    'Free resident parking included',
  ],
  '45th Street Apartments': [
    'Charming, tree-lined Hyde Park setting',
    'Close to local coffee shops and CapMetro bus stops',
    'Courtyard atmosphere with spacious layouts',
    'Budget-friendly rent rates',
  ],
  'Hyde Park Court': [
    'Classic Hyde Park architecture on 38th St',
    'Private garden courtyards and peaceful surroundings',
    'Walkable to North University cafes and dining',
    'Affordable 1-bedroom and 2-bedroom floor plans',
  ],
  'Hyde Park Square': [
    'Convenient Speedway bus line access right out front',
    'Quiet study-friendly residential environment',
    'Great value rent with parking included',
    'Pet-friendly community',
  ],
  'Lofts at the Triangle': [
    'High-end loft living with soaring ceilings',
    'Dozens of restaurants and shops downstairs in Triangle park',
    'Resort pools, fitness center, and green space',
    'Direct bus rapid transit connection to UT and downtown',
  ],
  'Melroy Apartments': [
    'Located directly on Speedway with frequent UT bus service',
    'Walkable to North Campus research buildings',
    'Affordable pricing for private 1-bedroom units',
    'Quiet, mature academic community',
  ],
  'River Oaks Apartments': [
    'Short 13-minute walk to north campus gates',
    'Spacious double-occupancy 2-bedroom layouts',
    'Great rates for students seeking quiet housing',
    'Assigned off-street parking available',
  ],
  'Red River Apartments': [
    'Convenient East Campus & Law School proximity',
    'Direct bus route down Red River St to campus',
    'Affordable rent and peaceful setting',
    'Pet-friendly with green courtyards',
  ],
  'The Triangle Apartments': [
    'Master-planned urban community with parks and pond',
    'On-site retail, dining, and farmers market',
    'Multiple swimming pools and expansive fitness center',
    'Direct RapidBus ride straight to UT campus',
  ],

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': [
    'Unbeatable student rates (starting in $600s/mo)',
    'Direct UT Shuttle stop on site for easy commute',
    'Resort swimming pool, basketball court, and gym',
    'Individual leases with full furniture packages',
  ],
  'Estate on Campus (Riverside)': [
    'Extremely budget-friendly rates for students',
    'Dedicated UT Shuttle route direct to campus',
    'Large resort pool, sand volleyball, and 24/7 gym',
    'Pet-friendly community with spacious townhome layouts',
  ],
  'Mesh Apartments': [
    'Modern urban finishes on East Riverside Dr',
    'Close to Lady Bird Lake hiking and bike trails',
    'Swimming pool, resident lounge, and fitness center',
    'Great price-to-space ratio compared to campus core',
  ],
  'Town Lake Student Apartments': [
    'Scenic waterfront access along Lady Bird Lake',
    'Boardwalk trail right outside your door',
    'Affordable multi-bedroom options',
    'Easy bus commute into downtown and campus',
  ],
  'University Estates at Austin': [
    'Massive 3,000 sq ft fitness center and resort pool',
    'Direct UT Shuttle access for fast campus transit',
    'Very affordable rates with utilities included packages',
    'Computer lab with free resident printing',
  ],
  'University Village Austin': [
    'Lowest per-bed rates in the Austin student market',
    'UT Shuttle stop directly in the community',
    'Clubhouse with game room, cyber lounge, and gym',
    'Fully furnished student suites with private bathrooms',
  ],
}

const APARTMENT_CONS = {
  // ON CAMPUS
  '2400 Nueces Apartments': [
    'Limited availability due to high UT student demand',
    'Must be a continuing, transfer, or graduate student',
    'Garage parking requires university permit fee',
  ],
  'Brackenridge Apartments (Lake Austin Blvd)': [
    'Older buildings without luxury high-rise amenities',
    'Requires 10-15 minute shuttle ride to main campus',
    'Units are unfurnished',
  ],
  'Colorado Apartments (Lake Austin Blvd)': [
    '2.6 miles away from main UT campus',
    'Basic amenities compared to modern West Campus towers',
    'Unfurnished apartments',
  ],
  'East Campus Graduate Apartments': [
    'Strictly restricted to full-time graduate students',
    'Competitive application and priority waitlist',
    'Parking permit is billed separately',
  ],
  'Gateway Apartments (West 6th St)': [
    'Located on West 6th St (requires shuttle or bus)',
    'Older construction and simple finishes',
    'Unfurnished floor plans',
  ],

  // WEST CAMPUS
  '21 Rio Apartments': [
    'Higher monthly rental tier for 1-bedroom units',
    'Garage parking is extra (~$150/mo)',
    'Busy social environment on weekends',
  ],
  'Axis West Campus': [
    'Slightly further walk to central campus (12 mins)',
    'Monthly utilities are billed separately',
    'Garage parking spaces are limited',
  ],
  'Crest at Pearl': [
    'Further walk from central campus (0.7 miles)',
    'Fewer nearby restaurant options',
    'Paid parking and separate utility billing',
  ],
  'Envoy Austin': [
    'Older garden-style building without high-rise pool',
    'No elevator (stair access only)',
    'No on-site fitness gym',
  ],
  'Evo Austin (formerly Ion Austin)': [
    '14-minute walk to UT Tower',
    'Paid garage parking fees apply',
    'Monthly utilities billed separately',
  ],
  'GrandMarc Austin': [
    'High demand can lead to early sell-outs',
    'Garage parking is extra',
    'Can experience noise on game days and weekends',
  ],
  'Inspire on 22nd': [
    'Paid garage parking only',
    'Monthly utilities are extra',
    'Layouts can feel slightly compact in multi-bed units',
  ],
  'Legacy on Rio': [
    'Paid garage parking is limited',
    'Water and electricity utilities are billed extra',
    'Some bedrooms in multi-bed units are smaller',
  ],
  'Mark Uptown': [
    'High premium rental rates',
    'Expensive parking fees (~$160/mo)',
    'Monthly utilities are not included',
  ],
  'Moontower Just off Campus': [
    'Premium pricing tier',
    'Paid parking is expensive',
    'High demand means units sell out very early',
  ],
  'Nine Just off Campus': [
    'High monthly rental rates',
    'Garage parking is expensive (~$150/mo)',
    'Utilities are not included in the rent price',
  ],
  'Quarters on Campus (The Quarters)': [
    'Varying building ages across different houses',
    'Amenities are spread across separate buildings',
    'Paid parking garage fees',
  ],
  'Rise on 23rd': [
    'Premium pricing on upper penthouse floors',
    'Elevator traffic during peak morning rush',
    'Parking fees are additional',
  ],
  'Skyloft Austin': [
    'Premium pricing on upper floors',
    'High parking fees',
    'Elevator wait times can be long during peak hours',
  ],
  'Texan & 21st Apartments': [
    '15-16 minute walk to central campus',
    'More basic amenities than modern high-rises',
    'Utilities and parking are not included',
  ],
  'The Block (on 23rd, 25th, etc.)': [
    'Older buildings compared to new high-rises',
    'Amenities are more basic than luxury towers',
    'Paid parking and limited availability',
  ],
  'The Castilian': [
    'Dorm-style layout with shared bedrooms',
    'High overall cost due to required meal plans',
    'Restricted kitchen access (no private kitchen in unit)',
  ],
  'The G on West Campus': [
    'Older building design',
    'Basic community amenities',
    'Street noise from Guadalupe St traffic',
  ],
  'The Harrison': [
    'Parking is limited and costs extra',
    'Utilities are billed separately',
    'Standard amenities compared to ultra-luxury towers',
  ],
  'The Hub Austin West Campus': [
    'Premium luxury pricing tier',
    'High garage parking fees',
    'High demand requires early leasing',
  ],
  'The Ruckus': [
    'Boutique size means very few total floor plans',
    'Limited on-site parking spots',
    'Can experience noise on 24th Street',
  ],
  'The Standard at Austin': [
    'Premium rent pricing tier',
    'Expensive garage parking fees',
    'High density/social environment can be noisy',
  ],
  'Unleashed West Campus': [
    'Smaller boutique property with limited common spaces',
    'Parking spots are limited',
    'Utilities billed separately',
  ],
  'Villas on Rio': [
    'Premium luxury pricing tier',
    'High parking fee (~$200/mo)',
    'Separate utility bills',
  ],
  'Waterloo Austin': [
    'High premium pricing tier',
    'Expensive garage parking',
    'Resident pays for water and electricity',
  ],
  'West Campus Flats': [
    'Compact studio square footage (380-410 sq ft)',
    'No swimming pool or fitness gym on-site',
    'Older property aesthetic',
  ],
  'Yugo Austin Corner': [
    '10-minute walk to campus',
    'More basic finishes than high-rise Waterloo',
    'Utilities and parking are extra',
  ],
  'Yugo Austin Space': [
    'Limited floor plan inventory',
    'Paid parking is extra',
    'Smaller common areas than mega-complexes',
  ],

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': [
    'Requires bus ride, bike, or drive to UT Tower',
    'Older building without pool or fitness center',
    'No in-unit laundry in some layouts (shared laundry)',
  ],
  '45th Street Apartments': [
    '1.5 miles from central campus',
    'Basic finishes without modern luxury perks',
    'Limited immediate nightlife compared to West Campus',
  ],
  'Hyde Park Court': [
    'No fitness gym or pool on premises',
    'Older vintage charm may mean older appliances',
    'Distance requires bus commute for daily classes',
  ],
  'Hyde Park Square': [
    '1.3 miles north of campus',
    'More basic building finishes',
    'Shared on-site laundry facility',
  ],
  'Lofts at the Triangle': [
    'Higher rent pricing than typical Hyde Park flats',
    '10-minute bus commute to campus',
    'Retail traffic in commercial plaza on weekends',
  ],
  'Melroy Apartments': [
    'Only offers 1-bedroom floor plans',
    'No pool or community clubhouse',
    'Older building structure',
  ],
  'River Oaks Apartments': [
    'Standard older apartment finishes',
    'No high-end luxury amenities',
    'Street parking can get crowded',
  ],
  'Red River Apartments': [
    '15-minute walk to main campus',
    'Basic amenities and simple unit finishes',
    'Near major thoroughfare traffic',
  ],
  'The Triangle Apartments': [
    'Not walking distance to UT Tower (requires bus/drive)',
    'Higher monthly rates for luxury finishes',
    'Parking fees apply for extra vehicles',
  ],

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': [
    '4+ miles from campus (requires 15-min UT Shuttle)',
    'High-density student complex can be noisy',
    'Older building requiring periodic maintenance',
  ],
  'Estate on Campus (Riverside)': [
    'Located in East Riverside (commute required)',
    'Large complex with varying unit conditions',
    'Traffic on Riverside Dr during peak rush hours',
  ],
  'Mesh Apartments': [
    'Not directly on student shuttle route (CapMetro bus used)',
    'Higher rent than older Riverside student housing',
    'Urban neighborhood noise',
  ],
  'Town Lake Student Apartments': [
    'Requires bus or drive across river to campus',
    'Older property condition in some buildings',
    'High humidity and summer insects near lakefront',
  ],
  'University Estates at Austin': [
    '15-20 minute shuttle ride to main campus',
    'High density student property',
    'Maintenance response times vary during peak move-in',
  ],
  'University Village Austin': [
    'Distance from campus requires reliance on shuttle schedule',
    'Basic apartment fixtures and wear-and-tear',
    'Large student complex with active weekend atmosphere',
  ],
}

const APARTMENT_IMAGES = {
  // ON CAMPUS
  '2400 Nueces Apartments': '/ApartmentPictures/26West.jpg',
  'Brackenridge Apartments (Lake Austin Blvd)': '/ApartmentPictures/TheBlock.jpg',
  'Colorado Apartments (Lake Austin Blvd)': '/ApartmentPictures/TheBlock.jpg',
  'East Campus Graduate Apartments': '/ApartmentPictures/LegacyOnRio.webp',
  'Gateway Apartments (West 6th St)': '/ApartmentPictures/TheBlock.jpg',

  // WEST CAMPUS
  '21 Rio Apartments': '/ApartmentPictures/Moontower.jpg',
  'Axis West Campus': '/ApartmentPictures/IonAustin.jpg',
  'Crest at Pearl': '/ApartmentPictures/CrestAtPearl.jpg',
  'Envoy Austin': '/ApartmentPictures/TheBlock.jpg',
  'Evo Austin (formerly Ion Austin)': '/ApartmentPictures/IonAustin.jpg',
  'GrandMarc Austin': '/ApartmentPictures/CallawayHouse.jpg',
  'Inspire on 22nd': '/ApartmentPictures/InspireOn22nd.webp',
  'Legacy on Rio': '/ApartmentPictures/LegacyOnRio.webp',
  'Mark Uptown': '/ApartmentPictures/TheMarkAustin.webp',
  'Moontower Just off Campus': '/ApartmentPictures/Moontower.jpg',
  'Nine Just off Campus': '/ApartmentPictures/TheNineAtWestCampus.webp',
  'Quarters on Campus (The Quarters)': '/ApartmentPictures/TheBlock.jpg',
  'Rise on 23rd': '/ApartmentPictures/TheStandardAtAustin.webp',
  'Skyloft Austin': '/ApartmentPictures/Skylofy.jpg',
  'Texan & 21st Apartments': '/ApartmentPictures/TexanAndVintage.jpeg',
  'The Block (on 23rd, 25th, etc.)': '/ApartmentPictures/TheBlock.jpg',
  'The Castilian': '/ApartmentPictures/TheCastillian.jpg',
  'The G on West Campus': '/ApartmentPictures/TheCastillian.jpg',
  'The Harrison': '/ApartmentPictures/LegacyOnRio.webp',
  'The Hub Austin West Campus': '/ApartmentPictures/TheStandardAtAustin.webp',
  'The Ruckus': '/ApartmentPictures/Moontower.jpg',
  'The Standard at Austin': '/ApartmentPictures/TheStandardAtAustin.webp',
  'Unleashed West Campus': '/ApartmentPictures/TheNineAtWestCampus.webp',
  'Villas on Rio': '/ApartmentPictures/VillasOnRio.webp',
  'Waterloo Austin': '/ApartmentPictures/YugoAustinWaterloo.jpg',
  'West Campus Flats': '/ApartmentPictures/TheBlock.jpg',
  'Yugo Austin Corner': '/ApartmentPictures/YugoAustinRio.webp',
  'Yugo Austin Space': '/ApartmentPictures/YugoAustinRio.webp',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': '/ApartmentPictures/TexanAndVintage.jpeg',
  '45th Street Apartments': '/ApartmentPictures/TexanAndVintage.jpeg',
  'Hyde Park Court': '/ApartmentPictures/TexanAndVintage.jpeg',
  'Hyde Park Square': '/ApartmentPictures/TexanAndVintage.jpeg',
  'Lofts at the Triangle': '/ApartmentPictures/TheMarkAustin.webp',
  'Melroy Apartments': '/ApartmentPictures/TexanAndVintage.jpeg',
  'River Oaks Apartments': '/ApartmentPictures/TheBlock.jpg',
  'Red River Apartments': '/ApartmentPictures/TheBlock.jpg',
  'The Triangle Apartments': '/ApartmentPictures/TheMarkAustin.webp',

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': '/ApartmentPictures/TheBlock.jpg',
  'Estate on Campus (Riverside)': '/ApartmentPictures/TheBlock.jpg',
  'Mesh Apartments': '/ApartmentPictures/LegacyOnRio.webp',
  'Town Lake Student Apartments': '/ApartmentPictures/Moontower.jpg',
  'University Estates at Austin': '/ApartmentPictures/TheBlock.jpg',
  'University Village Austin': '/ApartmentPictures/TheBlock.jpg',
}

const APARTMENT_DEFAULT_URLS = {
  // ON CAMPUS
  '2400 Nueces Apartments': 'https://housing.utexas.edu/halls/2400-nueces-apartment-complex',
  'Brackenridge Apartments (Lake Austin Blvd)': 'https://housing.utexas.edu/housing/apartments/university-apartments',
  'Colorado Apartments (Lake Austin Blvd)': 'https://housing.utexas.edu/housing/apartments/university-apartments',
  'East Campus Graduate Apartments': 'https://housing.utexas.edu/housing/university-apartments/east-campus-graduate-apartments',
  'Gateway Apartments (West 6th St)': 'https://housing.utexas.edu/housing/apartments/university-apartments',

  // WEST CAMPUS
  '21 Rio Apartments': 'https://21rio.com/floorplans/',
  'Axis West Campus': 'https://www.axiswestcampus.com/floorplans',
  'Crest at Pearl': 'https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans',
  'Envoy Austin': 'https://www.westsidegroup.com/envoy-apartments',
  'Evo Austin (formerly Ion Austin)': 'https://evoaustin.com/floorplans/',
  'GrandMarc Austin': 'https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans',
  'Inspire on 22nd': 'https://www.inspire22nd.com/austin/inspire-on-22nd/student/',
  'Legacy on Rio': 'https://legacyonrio.com/floorplans/',
  'Mark Uptown': 'https://www.themarkatx.com/floorplans/',
  'Moontower Just off Campus': 'https://moontoweratx.com/floorplans/',
  'Nine Just off Campus': 'https://theninewestcampus.com/floorplans/',
  'Quarters on Campus (The Quarters)': 'https://quartersoncampus.com',
  'Rise on 23rd': 'https://riseatwestcampus.com',
  'Skyloft Austin': 'https://skyloftatx.com/floor-plans/',
  'Texan & 21st Apartments': 'https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans',
  'The Block (on 23rd, 25th, etc.)': 'https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans',
  'The Castilian': 'https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans',
  'The G on West Campus': 'https://thegatx.com',
  'The Harrison': 'https://theharrisonaustin.com',
  'The Hub Austin West Campus': 'https://hubwestcampus.com',
  'The Ruckus': 'https://ruckusatx.com',
  'The Standard at Austin': 'https://thestandardaustin.landmark-properties.com/floorplans/',
  'Unleashed West Campus': 'https://unleashedwestcampus.com',
  'Villas on Rio': 'https://villasonrio.com/floor-plans/',
  'Waterloo Austin': 'https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/rooms',
  'West Campus Flats': 'https://www.westsidegroup.com/west-campus-flats',
  'Yugo Austin Corner': 'https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/rooms',
  'Yugo Austin Space': 'https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/rooms',

  // NORTH CAMPUS / HYDE PARK
  '44th Street Apartments': 'https://www.westsidegroup.com/44th-street-apartments',
  '45th Street Apartments': 'https://www.westsidegroup.com/45th-street-apartments',
  'Hyde Park Court': 'https://www.westsidegroup.com/hyde-park-court',
  'Hyde Park Square': 'https://www.westsidegroup.com/hyde-park-square',
  'Lofts at the Triangle': 'https://thetriangleaustin.com',
  'Melroy Apartments': 'https://www.westsidegroup.com/melroy-apartments',
  'River Oaks Apartments': 'https://www.westsidegroup.com/river-oaks-apartments',
  'Red River Apartments': 'https://www.westsidegroup.com/red-river-apartments',
  'The Triangle Apartments': 'https://thetriangleaustin.com',

  // RIVERSIDE / OFF CAMPUS
  'Ballpark North': 'https://theballparkaustin.com',
  'Estate on Campus (Riverside)': 'https://estatesateastriverside.com',
  'Mesh Apartments': 'https://meshapartments.com',
  'Town Lake Student Apartments': 'https://townlakeaustin.com',
  'University Estates at Austin': 'https://estatesateastriverside.com',
  'University Village Austin': 'https://villageateastriverside.com',
}

const formatCost = (lowestPrice) =>
  typeof lowestPrice === 'number' && Number.isFinite(lowestPrice)
    ? `From $${lowestPrice.toLocaleString()}/mo`
    : 'N/A'

const formatAvailability = (availablePlans) =>
  typeof availablePlans === 'number' && Number.isFinite(availablePlans)
    ? `${availablePlans} plan${availablePlans === 1 ? '' : 's'} available`
    : 'N/A'

/**
 * UT Austin apartment list dynamically hydrated from scraped floor plans.
 * Automatically stays in sync whenever floorPlans.js is updated.
 */
export const UT_AUSTIN_APARTMENTS = APARTMENT_NAMES.map((name) => {
  const normKey = normalizePropertyName(name)
  const plans = FLOOR_PLANS.filter((p) => normalizePropertyName(p.property) === normKey)
  
  const totalPlans = plans.length
  const availablePlans = plans.filter((p) => {
    const av = (p.availability || '').toLowerCase()
    return !av.includes('sold out') && !av.includes('waitlist')
  }).length

  // Differentiate private bedroom floor plans vs shared double-occupancy plans
  const privatePlans = plans.filter((p) => {
    const pl = (p.plan || '').toLowerCase()
    const rt = (p.roomType || '').toLowerCase()
    return !pl.includes('shared') && !pl.includes('double occupancy') && !rt.includes('shared')
  })
  const sharedPlans = plans.filter((p) => {
    const pl = (p.plan || '').toLowerCase()
    const rt = (p.roomType || '').toLowerCase()
    return pl.includes('shared') || pl.includes('double occupancy') || rt.includes('shared')
  })

  const validPrivatePrices = privatePlans
    .map((p) => p.minPrice)
    .filter((p) => typeof p === 'number' && Number.isFinite(p) && p >= 300)

  const validAllPrices = plans
    .map((p) => p.minPrice)
    .filter((p) => typeof p === 'number' && Number.isFinite(p) && p >= 300)

  const lowestPrivatePrice = validPrivatePrices.length > 0 ? Math.min(...validPrivatePrices) : null
  const lowestSharedPrice = sharedPlans
    .map((p) => p.minPrice)
    .filter((p) => typeof p === 'number' && Number.isFinite(p) && p >= 300)
    .reduce((min, p) => (min === null || p < min ? p : min), null)

  const lowestPrice = lowestPrivatePrice || (validAllPrices.length > 0 ? Math.min(...validAllPrices) : null)

  let cost = 'N/A'
  if (lowestPrivatePrice && lowestSharedPrice && lowestSharedPrice < lowestPrivatePrice) {
    cost = `From $${lowestPrivatePrice.toLocaleString()}/mo ($${lowestSharedPrice.toLocaleString()} shared)`
  } else if (lowestPrice) {
    cost = `From $${lowestPrice.toLocaleString()}/mo`
  }

  const defaultUrl = APARTMENT_DEFAULT_URLS[name] || (plans.length > 0 && plans[0].url ? plans[0].url : '')

  return {
    id: slugify(name),
    name,
    neighborhood: APARTMENT_NEIGHBORHOODS[name] || 'West Campus',
    address: APARTMENT_ADDRESSES[name] || '',
    cost,
    distanceFromTower: APARTMENT_DISTANCES[name] || '',
    availability: formatAvailability(availablePlans),
    url: defaultUrl,
    totalPlans: totalPlans > 0 ? totalPlans : null,
    availablePlans: totalPlans > 0 ? availablePlans : null,
    lowestPrice,
    lowestSharedPrice,
    pros: APARTMENT_PROS[name] || [],
    cons: APARTMENT_CONS[name] || [],
    imageUrl: APARTMENT_IMAGES[name] || '',
  }
})

export function getApartmentById(id) {
  return UT_AUSTIN_APARTMENTS.find((a) => a.id === id) || null
}

export function getApartmentsByNeighborhood(neighborhood) {
  if (!neighborhood || neighborhood === 'All Neighborhoods') return UT_AUSTIN_APARTMENTS
  return UT_AUSTIN_APARTMENTS.filter((a) => a.neighborhood === neighborhood)
}
