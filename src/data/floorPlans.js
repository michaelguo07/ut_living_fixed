import { normalizePropertyName, slugify } from './utils.js';

export const LAST_UPDATED = "August 31, 2026";
export const LAST_UPDATED_ISO = "2026-08-31T12:18:34.736377";

const RAW_FLOOR_PLANS = [
  {
    "property": "2400 Nueces Apartments",
    "plan": "Studio",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "450",
    "minPrice": 1495,
    "maxPrice": 1576,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-studio.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "2400 Nueces Apartments",
    "plan": "1 Bedroom / 1 Bath",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "580",
    "minPrice": 1789,
    "maxPrice": 1789,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-1b1b.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "2400 Nueces Apartments",
    "plan": "2 Bedroom / 2 Bath Private",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "820",
    "minPrice": 1468,
    "maxPrice": 1548,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-2b2b.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "2400 Nueces Apartments",
    "plan": "2 Bed / 2 Bath (Double Occupancy)",
    "roomType": "2 Bed / 2 Bath (Shared)",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "820",
    "minPrice": 911,
    "maxPrice": 991,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-2b2b-shared.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "2400 Nueces Apartments",
    "plan": "3 Bedroom / 3 Bath",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1150",
    "minPrice": 1291,
    "maxPrice": 1371,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-3b3b.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "2400 Nueces Apartments",
    "plan": "4 Bedroom / 4 Bath",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1380",
    "minPrice": 1141,
    "maxPrice": 1221,
    "availability": "Available",
    "url": "https://housing.utexas.edu/halls/2400-nueces-apartment-complex",
    "imagePath": "https://housing.utexas.edu/sites/default/files/2400-4b4b.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Brackenridge Apartments (Lake Austin Blvd)",
    "plan": "1 Bedroom Family Unit",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "540",
    "minPrice": 1320,
    "maxPrice": 1320,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Brackenridge Apartments (Lake Austin Blvd)",
    "plan": "2 Bedroom Family Unit",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "720",
    "minPrice": 1514,
    "maxPrice": 1514,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Brackenridge Apartments (Lake Austin Blvd)",
    "plan": "3 Bedroom Family Unit",
    "roomType": "3 Bed / 1.5 Bath",
    "beds": 3,
    "baths": 1.5,
    "sqFt": "950",
    "minPrice": 1826,
    "maxPrice": 1826,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 1.5 baths)",
      "Premium pricing tier"
    ]
  },
  {
    "property": "Colorado Apartments (Lake Austin Blvd)",
    "plan": "1 Bedroom Single Unit",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "520",
    "minPrice": 1200,
    "maxPrice": 1200,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Colorado Apartments (Lake Austin Blvd)",
    "plan": "1 Bedroom Unit with Office",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "610",
    "minPrice": 1338,
    "maxPrice": 1338,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Colorado Apartments (Lake Austin Blvd)",
    "plan": "2 Bedroom Unit (Room A - 55%)",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "700",
    "minPrice": 757,
    "maxPrice": 757,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Colorado Apartments (Lake Austin Blvd)",
    "plan": "2 Bedroom Unit (Room B - 45%)",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "700",
    "minPrice": 619,
    "maxPrice": 619,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "East Campus Graduate Apartments",
    "plan": "Graduate Studio",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "420",
    "minPrice": 1301,
    "maxPrice": 1301,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/university-apartments/east-campus-graduate-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "East Campus Graduate Apartments",
    "plan": "1 Bedroom / 1 Bath Graduate Unit",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "560",
    "minPrice": 1581,
    "maxPrice": 1581,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/university-apartments/east-campus-graduate-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "East Campus Graduate Apartments",
    "plan": "2 Bedroom / 2 Bath Graduate Shared",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "850",
    "minPrice": 1199,
    "maxPrice": 1199,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/university-apartments/east-campus-graduate-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Gateway Apartments (West 6th St)",
    "plan": "1 Bedroom Single Unit",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "530",
    "minPrice": 1200,
    "maxPrice": 1200,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Gateway Apartments (West 6th St)",
    "plan": "1 Bedroom with Study",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "625",
    "minPrice": 1338,
    "maxPrice": 1338,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Gateway Apartments (West 6th St)",
    "plan": "2 Bedroom Unit (Room A - 55%)",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "710",
    "minPrice": 757,
    "maxPrice": 757,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Gateway Apartments (West 6th St)",
    "plan": "2 Bedroom Unit (Room B - 45%)",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "710",
    "minPrice": 619,
    "maxPrice": 619,
    "availability": "Available",
    "url": "https://housing.utexas.edu/housing/apartments/university-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "University-operated housing & services",
      "All utilities & high-speed internet included",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: Efficiency SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "375",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e02bc780-6824-458c-84f4-7969bc81736c/671-23rd-Efficiency-SMART-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: Efficiency Premium SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "323",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/13d3a4c9-844c-4496-b0b3-e76347908c88/671-25th-West-Efficiency-Premium-SMART-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: Efficiency A SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "380",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d5cc8faa-98d9-4801-8df2-c58d4bd49f4c/671-Pearl-N-Efficiency-A-SMART-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: Efficiency B SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "571",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/41dcece5-d58c-490d-8f3a-e4387955ffc3/671-Efficiency-B-SMART-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: Efficiency A SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "381",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f65fc531-68ae-46b8-8b6b-86248068c60d/671-Pearl-S-Efficiency-A-SMART-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: Efficiency B SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "571",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f73614c3-be4d-4207-a3b1-b3b08cd5ae45/671-Pearl-S-Efficiency-B-SMART-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: Efficiency C",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "458",
    "minPrice": 1401,
    "maxPrice": 1401,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c47d7fed-4127-4118-9c15-508d43aeb158/671-Pearl-S-Efficiency-C-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 1 Bed - 1 Bath A SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "632",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4f2f8fff-7fdf-4f8d-9ee9-5c7e60008a3f/671-23rd-1-Bed-1-Bath-A-SMART-01.png?width=661&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 1 Bed - 1 Bath B Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "546",
    "minPrice": 1674,
    "maxPrice": 1674,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/548160c8-07bd-4060-9045-787b3c72f1a8/671-23rd-1-Bed-1-Bath-B-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 1 Bed - 1 Bath B Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "546",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/21b96357-fe91-4675-8379-410d712d8aac/671-23rd-1-Bed-1-Bath-B-Premium-01_1.png?width=661&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 1 Bed - 1 Bath C Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "720",
    "minPrice": 1744,
    "maxPrice": 1744,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b4c141eb-f278-43c2-aa24-f2007f15c67b/671-23rd-1-Bed-1-Bath-C-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 1 Bed - 1 Bath C Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "720",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ef95dc9e-10b4-4f47-9d55-8574fdf42f64/671-23rd-1-Bed-1-Bath-C-Premium-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 1 Bath",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "806",
    "minPrice": 1184,
    "maxPrice": 1224,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/26fbb246-b96a-4507-8987-b1b60fc91606/671-23rd-2-Bed-1-Bath-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath A Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "812",
    "minPrice": 1139,
    "maxPrice": 1179,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c41bdaa5-8a60-4240-ba93-70d9188460ba/671-23rd-2-Bed-2-Bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath A Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 564,
    "maxPrice": 564,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7e9be082-58a7-43b6-b3fd-af4f4ee26d82/671-23rd-2-Bed-2-Bath-A-Premium-Shared-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath B Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "926",
    "minPrice": 1179,
    "maxPrice": 1199,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4d17b24d-2ebb-466f-b237-e67290c163a6/671-23rd-2-Bed-2-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath C Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "994",
    "minPrice": 1074,
    "maxPrice": 1134,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7a8e5156-49a8-4436-afbd-ed4f52efe846/671-23rd-2-Bed-2-Bath-C-Premium-Private-ORIGINAL-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath D Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1164,
    "maxPrice": 1164,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/43dc28ba-6c66-491e-9e75-f3f8859e0ded/671-23rd-2-Bed-2-Bath-D-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath D Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 564,
    "maxPrice": 564,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/63ee7804-7c75-42c2-9164-3fcdffcc05e1/671-23rd-2-Bed-2-Bath-D-Premium-Shared-Furnished.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 2 Bed - 2 Bath E Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1112",
    "minPrice": 1204,
    "maxPrice": 1214,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/62949db8-58c4-4ed2-b1a4-acbf48bea016/671-23rd-2-Bed-2-Bath-E-Premium-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 3 Bed - 2 Bath Premium",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1176",
    "minPrice": 964,
    "maxPrice": 1044,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e56106c8-21cc-4400-aff9-8ed1ab283886/671-23rd-3-Bed-2-Bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 3 Bed - 3 Bath A",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1167",
    "minPrice": 1129,
    "maxPrice": 1139,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f1c41b51-ff39-4f3d-b175-657fcdf5547c/671-23rd-3-Bed-3-Bath-A-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 3 Bed - 3 Bath B Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1059,
    "maxPrice": 1139,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2c0aab29-5456-479f-b755-4d7b8d943cbc/671-23rd-3-Bed-3-Bath-B-Premium-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 3 Bed - 3 Bath C Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1209",
    "minPrice": 1029,
    "maxPrice": 1039,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6ec4e6af-e416-4a3c-bd92-7c955d192cdd/671-23rd-3-Bed-3-Bath-C-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 3 Bed - 3 Bath D",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1284",
    "minPrice": 869,
    "maxPrice": 879,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/cf6dc077-a9a5-4b04-8c6e-451bc13e90c4/671-23rd-3-Bed-3-Bath-D-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 4 Bed - 2 Bath Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1576",
    "minPrice": 1009,
    "maxPrice": 1009,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0789e671-837f-4edc-be91-83e00f8051d9/671-23rd-4-Bed-2-Bath-Premium-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 4 Bed - 4 Bath",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1400",
    "minPrice": 1169,
    "maxPrice": 1179,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7445b275-801e-482f-ae80-33d274cc12cf/671-23rd-4-bed-4-bath-furnished-01.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "23rd: 4 Bed - 4 Bath Premium Private Bedroom",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1400",
    "minPrice": 1204,
    "maxPrice": 1284,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7e0063e0-4e3c-4576-8d5b-0453399cb25f/671-23rd-4-Bed-4-Bath-Premium-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 1 Bath A Premium w/Loft",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "1064",
    "minPrice": 1469,
    "maxPrice": 1479,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5a7922d1-816b-4ef9-a0bf-770ef0ebce3c/671-25th-East-2-Bed-1-Bath-A-Premium-with-Loft-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 1 Bath B Premium w/Loft",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "1118",
    "minPrice": 1449,
    "maxPrice": 1459,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a79afbeb-d7d7-4fc0-bea0-624d84299de4/671-25th-East-2-Bed-1-Bath-B-Premium-with-Loft-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath A",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1074,
    "maxPrice": 1074,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3b178fdf-9505-4444-8890-4a459864ac7d/671-25th-East-2-Bed-2-Bath-A-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath B Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1056",
    "minPrice": 1029,
    "maxPrice": 1089,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2a9bd6cf-d0d3-4d9f-ab41-4f334fc63f20/671-25th-East-2-Bed-2-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath C Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1154,
    "maxPrice": 1174,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath C Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1100",
    "minPrice": 469,
    "maxPrice": 479,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/33e527a0-4245-4451-822e-1b8ce3f5332f/671-25th-East-2-Bed-2-Bath-C-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath D Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1199,
    "maxPrice": 1219,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/fd6424c2-1c84-4015-8207-641b41b20eac/671-25th-East-2-Bed-2-Bath-D-Premium-Private-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath D Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1130",
    "minPrice": 509,
    "maxPrice": 519,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/dc21a9ba-ea80-4d7d-b1f0-d2d89b64c6e4/671-25th-East-2-Bed-2-Bath-D-Premium-Shared-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath E Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1270",
    "minPrice": 1394,
    "maxPrice": 1414,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b0a0ccd1-4e88-4a36-802b-810f8289f0e5/671-25th-East-2-Bed-2-Bath-E-Premium-with-Loft-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 2 Bed - 2 Bath E Premium w/Loft Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1270",
    "minPrice": 649,
    "maxPrice": 669,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b0a0ccd1-4e88-4a36-802b-810f8289f0e5/671-25th-East-2-Bed-2-Bath-E-Premium-with-Loft-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 3 Bed - 2 Bath Premium w/Loft Shared Bedroom",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1521",
    "minPrice": 549,
    "maxPrice": 569,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6ac4ba6f-2f9b-43dd-b821-c500d33099b8/671-25th-East-3-Bed-2-Bath-Premium-with-Loft-Shared-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 3 Bed - 3 Bath A Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1399,
    "maxPrice": 1419,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bf7b998f-5ad0-47f9-84f0-75bacc692f56/671-25th-East-3-Bed-3-Bath-A-Premium-Private-Furnished.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 3 Bed - 3 Bath A Premium Shared Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1485",
    "minPrice": 464,
    "maxPrice": 504,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c28dbff0-abef-41f4-80a9-074c818af9c9/671-25th-East-3-Bed-3-Bath-A-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 3 Bed - 3 Bath A Premium w/Loft Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1419,
    "maxPrice": 1469,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/07da0fa3-e05d-4872-a551-645297d38d53/671-25th-E-3x3-A-Premium-Private-w-Loft_1.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 3 Bed - 3 Bath B Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1259,
    "maxPrice": 1279,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f770c4d3-25d7-401a-b9bc-a4370bf39166/671-25th-East-3-Bed-3-Bath-B-Premium-Private-furnished.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 2 Bath A Premium Private Bedroom",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1692",
    "minPrice": 804,
    "maxPrice": 814,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0bcea636-9fce-4404-928b-a843e1ef1e8c/671-25th-East-4-Bed-2-Bath-A-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 2 Bath B Premium w/Loft Private Bedroom",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1724",
    "minPrice": 969,
    "maxPrice": 979,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b24d63c0-e50d-4fee-add2-8912264b57a2/671-25th-East-4-Bed-2-Bath-B-Premium-with-Loft-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 2 Bath C Premium w/Loft Shared Bedroom",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "2100",
    "minPrice": 629,
    "maxPrice": 639,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0f966e24-eb5f-487e-8f77-a86efda2165b/671-25th-East-4-Bed-2-Bath-C-Premium-with-Loft-Shared-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 3 Bath A Premium Private Bedroom",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1692",
    "minPrice": 949,
    "maxPrice": 989,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/1f507109-019a-4e13-a8f9-817580639c8a/671-25th-East-4-Bed-3-Bath-A-Premium-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 3 Bath B Premium Private Bedroom",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1752",
    "minPrice": 959,
    "maxPrice": 999,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5330e644-2a6a-4775-961d-9391cb2e26bd/671-25th-East-4-Bed-3-Bath-B-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 3 Bath C Premium Private Bedroom",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1924",
    "minPrice": 1019,
    "maxPrice": 1049,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0a803644-4a50-42b2-aad2-6830ad88650f/671-25th-East-4-Bed-3-Bath-C-Premium-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 3 Bath D Premium w/Loft Private Bedroom",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1928",
    "minPrice": 1024,
    "maxPrice": 1064,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ecf45ea8-71d9-40ea-89df-de37a395a376/671-25th-East-4-Bed-3-Bath-D-Premium-with-Loft-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 4 Bed - 3 Bath E Premium",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "2292",
    "minPrice": 1114,
    "maxPrice": 1154,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/314fc8e3-cdcd-4e7f-b216-06f128edf33f/671-25th-East-4-Bed-3-Bath-E-Premium-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 5 Bed - 3 Bath Premium w/Loft Shared Bedroom",
    "roomType": "5 Bed / 3 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "3140",
    "minPrice": 594,
    "maxPrice": 604,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/415826a8-8279-4c63-89e9-8e50b17c7f3b/671-25th-East-5-Bed-3-Bath-Premium-with-Loft-Shared-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)",
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 5 Bed - 4 Bath Premium Private Bedroom",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "2495",
    "minPrice": 984,
    "maxPrice": 1024,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d6a581ab-a557-49c1-bcf9-be1821231be7/671-25th-East-5-Bed-4-Bath-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 5 Bed - 4 Bath Premium w/Loft Private Bedroom",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "2730",
    "minPrice": 1064,
    "maxPrice": 1094,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/50075e91-5b12-468d-9c4f-177a1b1c4231/671-25th-East-5-Bed-4-Bath-Premium-with-Loft-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th E: 5 Bed - 4 Bath Premium w/Loft Shared Bedroom",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 524,
    "maxPrice": 534,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/50075e91-5b12-468d-9c4f-177a1b1c4231/671-25th-East-5-Bed-4-Bath-Premium-with-Loft-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)",
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath A Premium - Furnished",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1674,
    "maxPrice": 1674,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath A Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "414",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/47fb31e3-2f96-4524-aede-8b2efa1e402d/671-25th-West-1-Bed-1-Bath-A-Premium-SMART-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath B",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "502",
    "minPrice": 1609,
    "maxPrice": 1609,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c2ffa0bd-d490-432a-b9b0-8edc340dd1c0/671-25th-West-1-Bed-1-Bath-B-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath B Premium Private Bedroom",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "502",
    "minPrice": 1619,
    "maxPrice": 1619,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/59d9f572-8dbe-42b8-b519-55ed5f72beab/671-25th-West-1-Bed-1-Bath-B-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath B Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "502",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6c27725c-c447-4aba-93fb-00fab9e01e4b/671-25th-West-1-Bed-1-Bath-B-Premium-Private-01_3.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath B SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c2ffa0bd-d490-432a-b9b0-8edc340dd1c0/671-25th-West-1-Bed-1-Bath-B-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 1 Bed - 1 Bath C Premium w/Loft",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1639,
    "maxPrice": 1639,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d171cecb-c15b-4752-9fa8-30158d57a6fe/671-25th-west-1-bed-1-bath-c-premium-with-loft-shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 1 Bath Premium w/Loft",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "1046",
    "minPrice": 1724,
    "maxPrice": 1724,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/adaa7136-f57b-4231-965f-24f79c911d7e/671-25th-West-2-Bed-1-Bath-Premium-with-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath A Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "888",
    "minPrice": 1139,
    "maxPrice": 1139,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e5af1582-b259-4d5f-8213-c366b937833f/671-25th-West-2-Bed-2-Bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath B",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "896",
    "minPrice": 1174,
    "maxPrice": 1174,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5314ce10-6e60-4298-9456-914bc7db79f3/671-25th-West-2-Bed-2-Bath-B-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath B Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "910",
    "minPrice": 1184,
    "maxPrice": 1184,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e298149c-75e8-4ed6-bb9e-09192190b16f/671-25th-West-2-Bed-2-Bath-B-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath C Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "934",
    "minPrice": 1074,
    "maxPrice": 1114,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5ee59d9f-8eec-4267-8833-0c6dda208b08/671-25th-West-2-Bed-2-Bath-C-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath C Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1056",
    "minPrice": 1214,
    "maxPrice": 1264,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4c63626f-b9be-45b3-887b-b46d09705dc8/671-25th-West-2-Bed-2-Bath-C-Premium-with-Loft-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath D Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "996",
    "minPrice": 1169,
    "maxPrice": 1169,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/08373755-cde6-4fcd-a971-28126467c724/671-25th-West-2-Bed-2-Bath-D-Premium-with-Loft-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath E Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1139,
    "maxPrice": 1139,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b0c103ae-03f6-4df7-bc08-22113f532c6a/671-25th-West-2-Bed-2-Bath-E-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 2 Bed - 2 Bath E Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1042",
    "minPrice": 504,
    "maxPrice": 504,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b0c103ae-03f6-4df7-bc08-22113f532c6a/671-25th-West-2-Bed-2-Bath-E-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 2 Bath A",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1185",
    "minPrice": 1129,
    "maxPrice": 1204,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2708dac3-3ea8-4f4a-bf44-c0765ac7ab80/671-25th-West-3-Bed-2-Bath-A-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 2 Bath B Premium",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1206",
    "minPrice": 1229,
    "maxPrice": 1229,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a53cee34-2ea0-4bc0-b0aa-ceb89e78a38e/671-25th-West-3-Bed-2-Bath-B-Premium-with-Loft-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 3 Bath A Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1185",
    "minPrice": 1124,
    "maxPrice": 1204,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/dbd73c63-e805-4c10-a318-e4276edefc80/671-25th-West-3-Bed-3-Bath-A-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 3 Bath B",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1185",
    "minPrice": 969,
    "maxPrice": 979,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c222b752-20aa-4ef2-8f09-417091844348/671-25th-West-3-Bed-3-Bath-B-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 3 Bath C Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1149",
    "minPrice": 1084,
    "maxPrice": 1164,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f50e4179-0a24-4b4a-9742-09fbf6e13eed/671-25th-West-3-Bed-3-Bath-C-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 3 Bath D Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1221",
    "minPrice": 1079,
    "maxPrice": 1119,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/31e468b0-ec61-4fc5-a335-6d04168c9fbe/671-25th-West-3-Bed-3-Bath-D-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 3 Bed - 3 Bath E Premium w/Loft Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1320",
    "minPrice": 1129,
    "maxPrice": 1209,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/91f598c9-77af-421e-b655-9c816e4a2a68/671-25th-West-3-bed-3-bath-E-Premium-w-Loft-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 4 Bed - 2 Bath A Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1536",
    "minPrice": 989,
    "maxPrice": 989,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bedb39bb-5dc6-4cf9-a7ab-42f814db4055/671-25th-West-4-Bed-2-Bath-A-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 4 Bed - 2 Bath B Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1580",
    "minPrice": 1014,
    "maxPrice": 1014,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2f207a2c-5798-43bd-a6f0-0b7a5a0a545d/671-25th-West-4-bed-2-bath-B-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 4 Bed - 2 Bath C Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1668",
    "minPrice": 984,
    "maxPrice": 1024,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4ccc7cf4-26b2-4ffb-bf43-60b0ef9d9de2/671-25th-West-4-Bed-2-Bath-C-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 4 Bed - 4 Bath A",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1356",
    "minPrice": 1249,
    "maxPrice": 1259,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0c1af878-059b-40cd-92ab-afdf04c14d5b/671-25th-West-4-Bed-4-Bath-A-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "25th W: 4 Bed - 4 Bath A w/Loft",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1399,
    "maxPrice": 1409,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/11cca7b5-da5b-41d1-a7b1-4b248bc92ae2/671-25th-West-4-Bed-4-Bath-A-w-Loft-furnished.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1539,
    "maxPrice": 1539,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/11e4da16-1486-42b5-bacd-d62384b81ffa/28th-1-Bed-1-Bath-A-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath A Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1469,
    "maxPrice": 1519,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/1296d10c-ba5d-4f6a-af0e-837f5f90f98a/671-28th-1-bed-1-bath-A-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath A Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7745f556-d1b3-445c-a05e-7b1482d458dd/671-28th-1-bed-1-bath-A-Premium-01_1?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath B",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "595",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/76a2934c-37d1-4171-a824-63055e9eecf1/671-28th-1-bed-1-bath-B-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath B SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "595",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/540c1185-bdbe-4dcc-bf5a-9750e22bc7dc/671-28th-1-bed-1-bath-B-01_2.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 1 Bed - 1 Bath C",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "618",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8c3cc8c0-74ac-4851-bcee-087e84951c6f/671-28th-1-bed-1-bath-C-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath A Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "886",
    "minPrice": 979,
    "maxPrice": 1019,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f3ec91e1-c331-4611-8b48-0b5788ca12fc/671-28th-2-bed-2-bath-A-Premium-NF.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath B Premium  Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "884",
    "minPrice": 1019,
    "maxPrice": 1059,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/61a29e85-25a1-4883-9cae-7ecae540901a/671-28th-2-bed-2-bath-B-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath B Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 469,
    "maxPrice": 469,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/66932699-cc90-4678-9c27-3e5aa46119a7/671-28th-2-bed-2-bath-b-premium-shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath B Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "914",
    "minPrice": 999,
    "maxPrice": 1039,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6b582aeb-688b-4ef0-85c5-fd285aaced5f/671-28th-2-bed-2-bath-B-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath B Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1000",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2236f533-62f9-4867-8ddb-6b4b923a51d2/671-28th-2-bed-2-bath-B-Shared-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath C Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "930",
    "minPrice": 1039,
    "maxPrice": 1039,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bdc50695-0194-44df-bcba-b47bab1f2d31/671-28th-2-bed-2-bath-C-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath D Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1066",
    "minPrice": 1049,
    "maxPrice": 1089,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/19dbd6c9-9809-4956-a01e-10c7eeb90458/671-28th-2-bed-2-bath-D-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 2 Bed - 2 Bath D Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1066",
    "minPrice": 469,
    "maxPrice": 469,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/9ad9b07f-1356-43e9-9e72-8289499e1412/671-28th-2-bed-2-bath-D-Premium-Shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 3 Bed - 3 Bath Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1236",
    "minPrice": 1204,
    "maxPrice": 1214,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4e52af47-9777-4910-848e-ca5da7ba4d60/671-28th-3-bed-3-bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 4 Bed - 2 Bath Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1504",
    "minPrice": 834,
    "maxPrice": 874,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/18cde729-bf7c-4396-8258-b908e2426873/671-28th-4-bed-2-bath-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "28th: 4 Bed - 4 Bath Premium",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1472",
    "minPrice": 1079,
    "maxPrice": 1119,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/dd83a8a3-e9bf-479b-9021-525bd9c304fe/671-28th-4-bed-4-bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath A Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3ddd0567-28f6-4459-b669-88b5ddbc3d85/671-Leon-1-Bed-1-Bath-A-Premium-01.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath A Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 838,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/91738436-8388-4569-b8fc-ae49ae8d0de3/671-Leon-1-Bed-1-Bath-A-Premium-01_1.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath B SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "541",
    "minPrice": 838,
    "maxPrice": 838,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c8f09276-0228-4590-b1ba-5fafbbce2f2f/671-Leon-1-bed-1-bath-B-SMART-Private-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath C Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "613",
    "minPrice": 1454,
    "maxPrice": 1504,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a3f89524-b00c-4d86-8de3-5eb85d4d858d/671-Leon-1-bed-1-bath-C-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath C Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "613",
    "minPrice": 838,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3670ecf2-1a23-4932-b7eb-1b02fdf86adf/671-Leon-1-bed-1-bath-C-Premium-01_1?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath D",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "655",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/1d2785a3-78b4-4a63-acab-f75b50fd1e34/671-Leon-1-bed-1-bath-D-01.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 1 Bed - 1 Bath E Premium w/Loft",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "712",
    "minPrice": 1619,
    "maxPrice": 1619,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b1c5de31-715f-42f0-afd1-f8df0e509b60/671-Leon-1-bed-1-bath-E-Premium-w-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath A Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "880",
    "minPrice": 379,
    "maxPrice": 379,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/70b5ad0e-a49a-4f2d-a5ad-920e966a0a1d/671-Leon-2-bed-2-bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath A Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "878",
    "minPrice": 369,
    "maxPrice": 369,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/52e38392-663a-4d5b-ad43-a3c95f2b5748/671-leon-2-bed-2-bath-a-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath B Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "886",
    "minPrice": 899,
    "maxPrice": 939,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7e27bc39-14ab-4ceb-8ea5-89268a8cb1e4/671-Leon-2-bed-2-bath-B-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath C Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "902",
    "minPrice": 904,
    "maxPrice": 944,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4efcf56c-0790-41f8-ad20-b9531c48bf39/671-Leon-2-bed-2-bath-C-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath C Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "902",
    "minPrice": 399,
    "maxPrice": 399,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4efcf56c-0790-41f8-ad20-b9531c48bf39/671-Leon-2-bed-2-bath-C-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath D Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "956",
    "minPrice": 929,
    "maxPrice": 969,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0263e88a-3f24-4756-aa1d-8cb60577ee43/671-Leon-2-bed-2-bath-D-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath D Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "916",
    "minPrice": 369,
    "maxPrice": 369,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/52aa7991-6641-4d83-8e97-09c07d7b20af/671-Leon-2-Bed-2-Bath-D-Shared-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath E Premium w/Loft Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 474,
    "maxPrice": 474,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c423bb47-0686-4ef0-b460-eec85a8ba293/671-Leon-2-bed-2-bath-E-Premium-w-Loft-Shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath F Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1004",
    "minPrice": 1064,
    "maxPrice": 1064,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4bef59c0-cf88-4c6b-9e48-f204972f1265/671-Leon-2-bed-2-bath-F-Premium-w-Loft-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath F Premium w/Loft Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/265a1862-a133-427a-beb3-6bdb21f555dd/671-leon-2-bed-2-bath-f-premium-w-loft-private-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath G Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1056",
    "minPrice": 924,
    "maxPrice": 964,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/41d57533-1f28-4234-99d2-ca72ef567b6b/671-Leon-2-bed-2-bath-G-Premium-Private-01.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath G Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1056",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/91a41e19-8257-4778-a394-d80d03e1da3a/671-Leon-2-bed-2-bath-G-Premium-Shared-01_1.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath H Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1069",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/cfc9ed82-54a4-4ae5-8d4b-bf7a662618e2/671-Leon-2-Bed-2-Bath-H-Premium-Shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath I Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1070",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/27233257-e1ad-4c07-9352-60fc422fe800/671-Leon-2-bed-2-bath-I-Premium-Shared-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath J Premium w/Loft",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1084",
    "minPrice": 1104,
    "maxPrice": 1104,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d95d3067-c755-4a0f-875c-8169d766c7f6/671-Leon-2-bed-2-bath-J-Premium-w-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath K Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1180",
    "minPrice": 1039,
    "maxPrice": 1039,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5b05dbd6-a736-4861-a744-0dd8a631a140/671-Leon-2-bed-2-bath-K-Premium-w-Loft-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath L Premium w/Loft Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1204",
    "minPrice": 1059,
    "maxPrice": 1099,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/550ab7fc-5f48-48dc-a1d4-067fd707d697/671-Leon-2-bed-2-bath-L-Premium-w-Loft-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath M Premium w/Loft",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1003",
    "minPrice": 1019,
    "maxPrice": 1019,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6bf3bd26-d277-4d6b-9a06-464d173de7c9/671-Leon-2-Bed-2-Bath-M-Premium-w-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 2 Bed - 2 Bath N Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1290",
    "minPrice": 939,
    "maxPrice": 939,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c6cca6bc-c2ff-4970-8fd5-249a0406543d/671-Leon-2-bed-2-bath-N-Premium-01_1?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 4 Bed - 2 Bath A Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 874,
    "maxPrice": 874,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/9aaa858d-db2a-4492-b0c9-837c0e3ab5d5/671-Leon-4-bed-2-bath-A-Premium-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 4 Bed - 2 Bath A Premium w/ Loft Private Bedroom",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1054,
    "maxPrice": 1054,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/682abf15-6eee-4668-b31d-c39068e03926/671-leon-4-bed-2-bath-a-premium-w-loft-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 4 Bed - 2 Bath B Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1548",
    "minPrice": 874,
    "maxPrice": 874,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7cde86b7-27b0-40fb-b5bf-14a94f330f1c/671-Leon-4-Bed-2-Bath-B-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Leon: 4 Bed - 4 Bath Premium",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1456",
    "minPrice": 959,
    "maxPrice": 1039,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/07557c46-8f63-442b-b332-30405085b059/671-Leon-4-Bed-4-Bath-Premium-ORIGNAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 1 Bed - 1 Bath A Premium Private Bedroom",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c36253e4-3eb7-4287-a681-bc6da785dc6f/671-Pearl-N-1-bed-1-bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 1 Bed - 1 Bath A Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/08c56976-cb2a-446a-8987-30a09c2f2db4/671-Pearl-N-1-bed-1-bath-A-Premium-Private-01_1?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 1 Bed - 1 Bath B Premium w/Loft",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1774,
    "maxPrice": 1774,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/9dc289d6-9ece-4f58-80ea-7d0a722cf67f/671-pearl-n-1-bed-1-bath-b-premium-w-loft-shared-loft-01_2.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath A Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "886",
    "minPrice": 1039,
    "maxPrice": 1079,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/db5746e2-df1a-493c-89d3-53f046d8a5e7/671-Pearl-N-2-bed-2-bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath B Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "902",
    "minPrice": 539,
    "maxPrice": 539,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8f5a356b-a9d9-4c9e-b133-ca27d638e86a/671-Pearl-N-2-Bed-2-Bath-B-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath B Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "914",
    "minPrice": 529,
    "maxPrice": 529,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/013e1f8d-cc43-4f90-b221-5ea7c1ee2285/671-Pearl-N-2-Bed-2-Bath-B-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath C Premium w/Loft",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1012",
    "minPrice": 1199,
    "maxPrice": 1199,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/aa25dd92-3738-4c39-8e5c-450ac42fc5ee/671-Pearl-N-2-Bed-2-Bath-C-Premium-w-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath D Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1062",
    "minPrice": 1169,
    "maxPrice": 1239,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7d41f413-cc7b-45a0-a7c6-7dce93f068b8/671-Pearl-N-2-bed-2-bath-D-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 2 Bed - 2 Bath E Premium w/Loft",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1240",
    "minPrice": 1264,
    "maxPrice": 1264,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/456d4f0a-2597-4608-b87d-81e53b2fd5b4/671-Pearl-N-2-bed-2-bath-E-Premium-w-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 3 Bed - 3 Bath A Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1236",
    "minPrice": 1204,
    "maxPrice": 1284,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5f8f707d-593c-4d46-b862-7cef82a941de/671-Pearl-N-3-bed-3-bath-A-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 3 Bed - 3 Bath B Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1317",
    "minPrice": 1254,
    "maxPrice": 1264,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c36ae76c-3121-4983-aabc-991a80690e92/671-Pearl-N-3-bed-3-bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 4 Bed - 2 Bath Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1488",
    "minPrice": 1049,
    "maxPrice": 1089,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a7f136ee-f4f7-49cb-b7a4-4a4206f05019/671-Pearl-N-4-bed-2-bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl N: 4 Bed - 4 Bath Premium w/Loft",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1584",
    "minPrice": 1429,
    "maxPrice": 1439,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d6b4f3d2-fc96-493f-afad-8bfbcc0640d1/671-Pearl-N-4-bed-4-bath-Premium-w-Loft-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 1 Bed - 1 Bath A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4a2919d1-72cf-4772-95db-d8409f691997/671-pearl-s-1-bed-1-bath-a-shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 1 Bed - 1 Bath A Premium Private Bedroom",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "521",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bebbb183-0803-4d11-b18e-eab8e0328ee7/671-Pearl-S-1-Bed-1-Bath-A-Premium-Private-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 1 Bed - 1 Bath A Premium Shared Bedroom",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 729,
    "maxPrice": 729,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/139144f7-12bf-4e0f-b8c1-6fb5e869d17f/671-pearl-s-1-bed-1-bath-a-premium-private-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 1 Bed - 1 Bath B Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1554,
    "maxPrice": 1554,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4c138560-9172-448f-b2ab-f90563693514/671-pearl-s-1-bed-1-bath-b-premium-shared-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath A Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "854",
    "minPrice": 1119,
    "maxPrice": 1159,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f79e517a-a261-45f6-b994-fb664a7b066f/671-Pearl-S-2-Bed-2-Bath-A-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath B Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "902",
    "minPrice": 1149,
    "maxPrice": 1149,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/85725101-5e9c-4f74-b30c-49059b3fc80a/671-Pearl-S-2-Bed-2-Bath-B-Premium-Private-01_3.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath B Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 539,
    "maxPrice": 539,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3b686c8c-7a13-4899-96cf-cdca88a5562f/671-Pearl-S-2-Bed-2-Bath-B-Premium-Shared-Furnished.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath B Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 539,
    "maxPrice": 539,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b8cf08f0-7f02-440f-adb0-75959ed0f37b/671-pearl-s-2-bed-2-bath-b-shared-furnished-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath C Premium w/Loft Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1010",
    "minPrice": 619,
    "maxPrice": 619,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/efe21323-9a77-4404-9cea-bed157df1a1a/671-Pearl-S-2-Bed-2-Bath-C-Premium-with-Loft-Shared-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath D Premium Private Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1064",
    "minPrice": 1189,
    "maxPrice": 1259,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/42b9c11c-8ffb-4c0d-9979-59d22f71f84e/671-Pearl-S-2-Bed-2-Bath-D-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath D Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1064",
    "minPrice": 554,
    "maxPrice": 584,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/33a3ccd9-9194-4ea1-b45e-2efdbe73e856/671-Pearl-S-2-Bed-2-Bath-D-Premium-Shared-ORIGINAL-01_1.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 2 Bed - 2 Bath E Premium w/Loft",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1240",
    "minPrice": 604,
    "maxPrice": 604,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/898271b2-eb63-41b3-8f39-d7f1114b5280/671-Pearl-S-2-Bed-2-Bath-E-Premium-with-Loft-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 3 Bed - 3 Bath A Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1236",
    "minPrice": 1204,
    "maxPrice": 1284,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6e316fae-6280-46c3-afde-9b31bed37dfc/671-Pearl-S-3-Bed-3-Bath-A-Premium-Private-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 3 Bed - 3 Bath B Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1314",
    "minPrice": 1244,
    "maxPrice": 1284,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c08cac37-db97-4a90-8431-7be8831db1e6/671-Pearl-S-3-Bed-3-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 4 Bed - 2 Bath Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1488",
    "minPrice": 1049,
    "maxPrice": 1089,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7a0a93ef-4ab9-442d-a35a-644f40b3cd13/671-Pearl-S-4-Bed-2-Bath-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Pearl S: 4 Bed - 4 Bath Premium",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1448",
    "minPrice": 1324,
    "maxPrice": 1334,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/873ecd03-43e8-4edb-afd7-b57f86fedcac/671-Pearl-S-4-Bed-4-Bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 1 Bed - 1 Bath A Premium",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "505",
    "minPrice": 1474,
    "maxPrice": 1474,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ea830dbc-0506-4b4d-9dbc-195c94c472b5/671-Rio-1-Bed-1-Bath-A-Premium-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 1 Bed - 1 Bath A Premium SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "505",
    "minPrice": 838,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ea830dbc-0506-4b4d-9dbc-195c94c472b5/671-Rio-1-Bed-1-Bath-A-Premium-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 1 Bed - 1 Bath B",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "621",
    "minPrice": 1454,
    "maxPrice": 1454,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a7a38d71-ea86-455d-9d60-9fa94f567755/671-Rio-1-Bed-1-Bath-B-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 1 Bed - 1 Bath B SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "621",
    "minPrice": 1447,
    "maxPrice": 1447,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c8d89e00-57a7-423d-9fb2-7952cba3249f/671-Rio-1-Bed-1-Bath-B-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 2 Bed - 2 Bath A Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "842",
    "minPrice": 919,
    "maxPrice": 939,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4fb8cd94-17ae-4bae-9ecd-c72b5fb98d8d/671-Rio-2-Bed-2-Bath-A-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 2 Bed - 2 Bath B Premium",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1000",
    "minPrice": 889,
    "maxPrice": 949,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f8e0a749-ad7f-4786-9c4a-9dd058b5f440/671-Rio-2-Bed-2-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 2 Bed - 2 Bath B Premium Shared Bedroom",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1000",
    "minPrice": 439,
    "maxPrice": 439,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/46444f40-bec6-499f-ae5a-45247b50e96f/671-Rio-2-Bed-2-Bath-B-Premium-Shared-Furnished.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bedroom (limited privacy)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 2 Bed - 2 Bath Premium w/Study",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1086",
    "minPrice": 879,
    "maxPrice": 879,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f355c398-60cc-46d4-ac2b-eeb742d05756/671-Rio-2-Bed-2-Bath-Premium-w-Study-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 3 Bed - 2 Bath A Premium",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1212",
    "minPrice": 839,
    "maxPrice": 909,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/37c61d50-9ae2-4845-99bf-6c8ba95bd4ab/671-Rio-3-Bed-2-Bath-A-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 3 Bed - 2 Bath B Premium",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1488",
    "minPrice": 844,
    "maxPrice": 919,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/6e9af897-0c8b-4dfe-8b31-811d32bc4293/671-Rio-3-Bed-2-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 3 Bed - 3 Bath A Premium",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1353",
    "minPrice": 1154,
    "maxPrice": 1184,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/9d9f9e34-5833-4314-b464-8cb366adabad/671-rio-3-bed-3-bath-a-premium-private-balcony-bedroom-furnished-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 3 Bed - 3 Bath B Premium Private Bedroom",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1461",
    "minPrice": 899,
    "maxPrice": 939,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/823cb39e-1291-4d76-a9f8-ed0025616ce2/671-Rio-3-Bed-3-Bath-B-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 4 Bed - 2 Bath Premium",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1840",
    "minPrice": 899,
    "maxPrice": 949,
    "availability": "Available",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/418e6068-1046-4f03-9786-698aaf5fe3ab/671-Rio-4-Bed-2-Bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 4 Bed - 4 Bath Premium",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1400",
    "minPrice": 954,
    "maxPrice": 1034,
    "availability": "Available",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/96e627e5-a5ac-4d23-beca-edbc6d06df4a/671-Rio-4-Bed-4-Bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Block (on 23rd, 25th, etc.)",
    "plan": "Rio: 5 Bed - 3 Bath Premium",
    "roomType": "5 Bed / 3 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "1905",
    "minPrice": 759,
    "maxPrice": 809,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5cead19b-2d20-485d-85cf-c31d93021584/671-Rio-5-Bed-3-Bath-Premium-ORIGINAL-01?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)"
    ]
  },
  {
    "property": "The Castilian",
    "plan": "1 Bed - 1 Bath",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2829,
    "maxPrice": 2879,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/32b76896-79eb-4f8e-830f-b593790b3240/674_1-bed-1-bath-Private-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "All-inclusive meals (meal plan included)",
      "All utilities included (electricity, water, internet)"
    ],
    "cons": [
      "Premium pricing tier",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "The Castilian",
    "plan": "2 Bed - 1 Bath Private",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "227",
    "minPrice": 2659,
    "maxPrice": 2664,
    "availability": "Available",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8598adab-42b3-4be5-8d2e-f477ccffe321/Castilian-Suite-Single-Room-01.png?width=756&height=511&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "All-inclusive meals (meal plan included)",
      "All utilities included (electricity, water, internet)",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "The Castilian",
    "plan": "2 Bed - 1 Bath Shared",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "227",
    "minPrice": 1649,
    "maxPrice": 1779,
    "availability": "Available",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d4957b13-0b65-49af-aea2-0cf2e91f7b25/674_Suite-Double-Room-ORIGINAL-01-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "All-inclusive meals (meal plan included)",
      "All utilities included (electricity, water, internet)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "Studio A - SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1093,
    "maxPrice": 1093,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c73f5a4b-0f6b-497a-931c-267470c84f81/675_Studio-A-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "Studio B - SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1399,
    "maxPrice": 1399,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/83712d7f-1b59-4e5d-a831-70bb2db3aa44/675_Studio-B-01.png?width=656&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "Studio C - SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1093,
    "maxPrice": 1093,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5fd20b8d-b091-498d-8e50-52ca3a4a47fc/675_Studio-C-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "Studio D - SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1093,
    "maxPrice": 1093,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/5769402b-18bd-4262-8dba-0cc25a570cdd/675_Studio-D-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "Studio E - SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1399,
    "maxPrice": 1399,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/41f5c2cc-9af2-4340-b854-01f9b4d9d694/675_Studio-E-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "1 Bed - 1 Bath A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1714,
    "maxPrice": 1714,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f9c259c2-9c2f-41d5-b543-530831793531/675_1-bed-1-bath-A-ORIGINAL-01.png?width=656&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "1 Bed - 1 Bath A - SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1702,
    "maxPrice": 1702,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/31d55581-d48a-4a89-b543-197c7cae1094/675_1-bed-1-bath-A-SMART-ORIGINAL-01.png?width=656&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "1 Bed - 1 Bath B",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2099,
    "maxPrice": 2099,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/fa7eec7c-bafd-4e9d-b0da-e0a2a0fad4e9/675_1-bed-1-bath-B-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "1 Bed - 1 Bath C",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2299,
    "maxPrice": 2299,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b176ff48-2f46-4086-a687-8e2158ac79dd/675_1-Bed-1-Bath-C-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "1 Bed - 1 Bath D",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2199,
    "maxPrice": 2199,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/423a16a2-07fa-4b10-8d8f-600422a80fe7/675_1-bed-1-bath-D-ORIGINAL-01.png?width=656&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 1 Bath A",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1239,
    "maxPrice": 1239,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/67cde5d6-6d01-4987-a4b8-faacccec71e3/675_2-Bed-1-Bath-A-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 1 Bath B",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1259,
    "maxPrice": 1259,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/83d64a49-fc33-48de-ba25-3790c574c99d/675_-2-bed-1-bath-B-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath A",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1349,
    "maxPrice": 1349,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e177c0d5-10a9-49f2-89b0-edda285c6a7c/675_2-Bed-2-Bath-A-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath B",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8d7917e8-f4a0-4df2-9112-520465fe15c2/675_2-Bed-2-Bath-B-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath C",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1379,
    "maxPrice": 1399,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/f8f7d892-753f-4b11-8084-c9605cf208f9/675_2-Bed-2-Bath-C-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath D",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1399,
    "maxPrice": 1399,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/fb377891-8285-4f99-85f3-90e3e18695e2/675_2-Bed-2-Bath-D-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath E",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1234,
    "maxPrice": 1244,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b31ffe61-48ea-4ecc-a271-7586d831d713/675_2-Bed-2-Bath-E-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath F",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1229,
    "maxPrice": 1229,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0381d64b-e63a-43c7-aa0b-1afc7a78fcfb/675_2-Bed-2-Bath-F-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath G",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1369,
    "maxPrice": 1369,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e1d5d790-4e99-416e-8124-e995238b07ce/675_2-Bed-2-Bath-G-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "2 Bed - 2 Bath H",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1309,
    "maxPrice": 1309,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/45f6b2fc-eca6-4365-bc8b-64b3fe1554f9/675_2-Bed-2-Bath-H-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "3 Bed - 3 Bath A",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1169,
    "maxPrice": 1179,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e4e4a3ce-eeaf-4dab-8f4c-5293bfcf5e1e/675_3-Bed-3-Bath-A-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "3 Bed - 3 Bath B",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1239,
    "maxPrice": 1259,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/66e4db87-adf8-45d6-8403-c7c98aaaa29a/675_3-Bed-3-Bath-B-ORIGINAL-01_1.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "3 Bed - 3 Bath C",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1184,
    "maxPrice": 1204,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/4b459b9f-e54a-4db2-9edb-b4139d07b6bf/675_3-bed-3-bath-C-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "4 Bed - 4 Bath B",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1064,
    "maxPrice": 1084,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/49bfdb04-62d0-4e9a-a059-44afe6fdbcd2/675_4-bed-4-bath-B-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Crest at Pearl",
    "plan": "4 Bed - 4 Bath C",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1064,
    "maxPrice": 1084,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/b7d88c51-810d-4db7-9f19-a3a732909aa8/675_4-Bed-4-Bath-C-ORIGINAL-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: Studio SMART",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "369",
    "minPrice": 1359,
    "maxPrice": 1359,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/69a576d3-59b3-4ce9-b043-1713f0298fec/672_Messina-efficiency-FURNISHED-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 1 Bed - 1 Bath SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "535",
    "minPrice": 1702,
    "maxPrice": 1702,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bf59aca8-6008-41f3-bea6-923e8430e3d0/672_1-bd-1-bath-Seton-Furnished-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 2 Bed - 1 Bath",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "808",
    "minPrice": 1249,
    "maxPrice": 1249,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e47cedaf-50ed-4434-814d-f564e5839c51/672_2-Bed-1-Bath-Salado-FURNISHED-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 2 Bed - 1 Bath w/Loft",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "599",
    "minPrice": 899,
    "maxPrice": 1109,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bf63ed5e-84b4-45ff-b4bb-4c8614b84178/672_1-bd-1-bath-W-LOFT-Seton-SMART-FURNISHED-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 2 Bed - 1 Bath w/Loft SMART",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "599",
    "minPrice": 824,
    "maxPrice": 1028,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/bf63ed5e-84b4-45ff-b4bb-4c8614b84178/672_1-bd-1-bath-W-LOFT-Seton-SMART-FURNISHED-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 3 Bed - 2 Bath A",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1240",
    "minPrice": 864,
    "maxPrice": 989,
    "availability": "Available",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/64ffa1eb-5b4f-40cc-8d7b-dde0f406b5a6/672_Furnished-3-Bed-2-Bath-Rio-Grande-01-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 3 Bed - 2 Bath B",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1213",
    "minPrice": 904,
    "maxPrice": 1029,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2ff8a63f-dbc2-48a5-a5dd-13c518bfb5ec/672_3-Bed-2-Bath-San-Pedro-FURNISHED-copy.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 4 Bed - 2 Bath w/Loft",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1368",
    "minPrice": 664,
    "maxPrice": 949,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d738d797-992c-45fd-82b8-43c49616aee9/672-Furnished-3-Bed-2-Bath-Rio-Grande-Furn-Loft-01.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 4 Bed - 4 Bath",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1692",
    "minPrice": 1099,
    "maxPrice": 1099,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/1a858313-96e1-4dca-a3b2-0c61b2ccf068/672_Furnished-4-Bed-4-Bath-Guadalupe-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Texan: 4 Bed - 4 Bath w/ Loft",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1893",
    "minPrice": 1219,
    "maxPrice": 1219,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a5ee665a-756d-4b69-9fc0-80aea40d77c2/672_4-Bed-4-Bath-w-Loft.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "524",
    "minPrice": 1709,
    "maxPrice": 1709,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c7ec6b9e-5f3e-4ba4-86f4-cd50839febe4/673_Furnished-1-bed-1-bath-Florence-Furnished-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath A SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "524",
    "minPrice": 1702,
    "maxPrice": 1702,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/c7ec6b9e-5f3e-4ba4-86f4-cd50839febe4/673_Furnished-1-bed-1-bath-Florence-Furnished-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath B",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "529",
    "minPrice": 1679,
    "maxPrice": 1679,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/98173143-4053-41dc-8da9-2b229ba417d4/673_1-bed-1-bath-Padova-Furnished-01.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath C",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "722",
    "minPrice": 1949,
    "maxPrice": 1949,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/22944b9e-0160-4222-b8c6-3484cf1d026a/673_Furnished-1-bed-1-bath-Palermo-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath D",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "654",
    "minPrice": 1779,
    "maxPrice": 1779,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7b5aedcf-c8db-4a5e-a0f8-7da93ad4dc44/673_Furnished-1-Bed-1-Bath-Genova-Furnished-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 1 Bed - 1 Bath E SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "466",
    "minPrice": 1427,
    "maxPrice": 1427,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ca7ac062-52d9-49b5-a45c-75766c020f43/673_1-bed-1-bath-Venice-FURNISHED.png?width=2750&height=1855&ext=.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 2 Bed - 2 Bath A",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "866",
    "minPrice": 1204,
    "maxPrice": 1204,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/d2d820c6-2789-428c-999c-23b5ce9169af/673_Furnished-2-Bed-2-Bath-Siena-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 2 Bed - 2 Bath B",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "907",
    "minPrice": 1214,
    "maxPrice": 1214,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/07d23f1b-0d4b-4442-be61-86b7d4892f0a/673_Furnished-2-Bed-2-Bath-Turin-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 2 Bed - 2 Bath C",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "964",
    "minPrice": 1169,
    "maxPrice": 1169,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/ac6838b4-ea29-423c-82c2-0934f6d6c751/673_Furnished-2-Bed-2-Bath-Naples-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 4 Bed - 4 Bath A",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1620",
    "minPrice": 1119,
    "maxPrice": 1139,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/752546c9-a673-4a23-90f4-2c2b20be68d5/673_Furnished-4-Bed-4-Bath-Rome-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Texan & 21st Apartments",
    "plan": "Vintage: 4 Bed - 4 Bath B",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1467",
    "minPrice": 1129,
    "maxPrice": 1149,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/272ac433-c0eb-41a3-ab9d-5cd7b55806c6/672_Furnished-4-Bed-4-Bath-Milan-01-copy.png?width=660&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "2 Bed - 2.5 Bath",
    "roomType": "2 Bed / 2.5 Bath",
    "beds": 2,
    "baths": 2.5,
    "sqFt": "1398",
    "minPrice": 1129,
    "maxPrice": 1129,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/e8db7005-e38c-4da2-9c43-909a5e0ced31/677_Retreat-2-bed-2-5-bath-Birchmore-ORIGINAL.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "3 Bed - 3 Bath A",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1396",
    "minPrice": 989,
    "maxPrice": 989,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/a323c927-f4bf-45b0-b201-89454792163e/677_Retreat-3-bed-3-bath-Fairview-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "GrandMarc Austin",
    "plan": "3 Bed - 3 Bath B - Buildings 10-12",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1395",
    "minPrice": 929,
    "maxPrice": 929,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/2989f27d-d318-4751-af60-f4cc709eb955/677_Retreat-3-bed-3-bath-Milledge-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath A - Buildings 10-12",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1772",
    "minPrice": 774,
    "maxPrice": 774,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/36adc150-e0cb-4bb9-bbc8-acc8e6cbef83/677_Retreat-4-bed-4-bath-Lumpkin-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath B",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1785",
    "minPrice": 774,
    "maxPrice": 774,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/26024ff0-7173-4bb9-8b75-22af9206c3d3/677_Retreat-4-bed-4-bath-Artisan-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath C",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1915",
    "minPrice": 774,
    "maxPrice": 774,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3a27172f-ba44-4455-af59-ece5637092f0/677_Retreat-4-bed-4-bath-Courtyard-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath D",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "2124",
    "minPrice": 774,
    "maxPrice": 784,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/39047d36-8769-46a2-8c0e-814c8befab4a/677_Retreat-4-bed-4-bath-Sycamore-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath E",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "2000",
    "minPrice": 784,
    "maxPrice": 784,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/7605a7c0-0ae1-4372-b9c6-cf2b75217d55/677_Retreat-4-bed-4-bath-Bloomfield-ORIGINAL.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4 Bath F",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1845",
    "minPrice": 804,
    "maxPrice": 804,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/3377cf81-c021-41c4-827e-f6085845a22c/677_Retreat-4-bed-4-bath-Thornberry-ORIGINAL.png?width=661&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4.5 Bath A",
    "roomType": "4 Bed / 4.5 Bath",
    "beds": 4,
    "baths": 4.5,
    "sqFt": "1831",
    "minPrice": 804,
    "maxPrice": 829,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/74637f2d-2614-40f0-bd78-fcef42db740f/677_Retreat-4-bed-4-5-bath-Brookshire-ORIGINAL-01.png?width=660&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4.5 Bath B",
    "roomType": "4 Bed / 4.5 Bath",
    "beds": 4,
    "baths": 4.5,
    "sqFt": "2000",
    "minPrice": 914,
    "maxPrice": 934,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/551c70f3-4ae2-4544-bf69-2f43b3780a86/677_Retreat-4-bed-4-5-bath-Springmore-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "4 Bed - 4.5 Bath C - Buildings 10-12",
    "roomType": "4 Bed / 4.5 Bath",
    "beds": 4,
    "baths": 4.5,
    "sqFt": "1395",
    "minPrice": 839,
    "maxPrice": 849,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/9c258167-d3c3-4ee2-b9f1-9e431aa6d0a7/677_Retreat-4-bed-4-5-bath-Milledge-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "5 Bed - 5 Bath A",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "2089",
    "minPrice": 684,
    "maxPrice": 684,
    "availability": "Waitlist",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/1cd8a731-4691-45e5-9a72-035745320334/677_Retreat-5-bed-5-bath-Courtyard-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "GrandMarc Austin",
    "plan": "5 Bed - 5 Bath B",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "2280",
    "minPrice": 764,
    "maxPrice": 764,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/86fe2f7c-f215-41f8-850c-4ae91d5987c3/677_Retreat-5-bed-5-bath-w-study-Hawthorne-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "5 Bed - 5 Bath C",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "2166",
    "minPrice": 769,
    "maxPrice": 769,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8768703c-63db-45a0-8e4d-3dccc311dc23/677_Retreat-5-bed-5-bath-Magnolia-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "5 Bed - 5 Bath D",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "2059",
    "minPrice": 689,
    "maxPrice": 689,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/8f43c354-f924-4210-ac97-9d21abf92fe8/677_Retreat-5-bed-5-bath-Sycamore-ORIGINAL.png?width=661&height=446&ext=.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "GrandMarc Austin",
    "plan": "5 Bed - 5.5 Bath",
    "roomType": "5 Bed / 5.5 Bath",
    "beds": 5,
    "baths": 5.5,
    "sqFt": "2363",
    "minPrice": 749,
    "maxPrice": 759,
    "availability": "Limited Availability",
    "url": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans",
    "imagePath": "https://www.americancampus.com/getmedia/0a7c9774-9a17-4df9-b5d6-3bd54a2dd625/677_Retreat-5-bed-5-5-bath-Rutherford-ORIGINAL.png?width=661&height=445&ext=.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Standard at Austin",
    "plan": "Soho-Studio",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "359-387",
    "minPrice": 1850,
    "maxPrice": 1850,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Soho-5.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Allister-1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2295,
    "maxPrice": 2295,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Allister.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Ansley-1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2395,
    "maxPrice": 2395,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Ansley.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Arden Double -1x1 Double",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1375,
    "maxPrice": 1375,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Arden-Double-Occupancy.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Ardmore - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2395,
    "maxPrice": 2395,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Ardmore.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Astoria Double -1x1 Double",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1295,
    "maxPrice": 1295,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Astoria-Double-Occupancy.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Avondale-1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 2295,
    "maxPrice": 2295,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Avondale-4.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Berkeley - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1095,
    "maxPrice": 1730,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Berkeley.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Standard at Austin",
    "plan": "Bexley-2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 2415,
    "maxPrice": 2415,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Bexley.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Birch-2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1850,
    "maxPrice": 1850,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Birch.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Bradford-2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1715,
    "maxPrice": 1715,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Bradford.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Bristol Premium-2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1875,
    "maxPrice": 1875,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Bristol-premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Brookhaven-2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1725,
    "maxPrice": 1725,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Brookhaven-1.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Standard at Austin",
    "plan": "Camden Premium -3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1715,
    "maxPrice": 1715,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Camden-Premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Chelsea-3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1525,
    "maxPrice": 1525,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Chelsea.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Standard at Austin",
    "plan": "Denmark Premium-4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1675,
    "maxPrice": 1675,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Denmark-premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Derby Premium -4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1485,
    "maxPrice": 1485,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Derby-Premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Derby-4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1455,
    "maxPrice": 1455,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Derby.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Downing Premium-4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1525,
    "maxPrice": 1655,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Downing-Premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Standard at Austin",
    "plan": "Forestdale-5x3",
    "roomType": "5 Bed / 3 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1475,
    "maxPrice": 1475,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Forestdale.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Finchley -5x4",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1255,
    "maxPrice": 1280,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Finchley.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Fillmore Premium-5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1600,
    "maxPrice": 1600,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Filmore-Premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Fulham - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1450,
    "maxPrice": 1450,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Fulham.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Fulham Premium-5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1575,
    "maxPrice": 1575,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Fulham-Premium.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Fulton - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1345,
    "maxPrice": 1345,
    "availability": "Sold Out",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Fulton.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Gramercy 6x4",
    "roomType": "6 Bed / 4 Bath",
    "beds": 6,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Gramercy.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (6 residents sharing 4 baths)"
    ]
  },
  {
    "property": "The Standard at Austin",
    "plan": "Greenwich -6x4",
    "roomType": "6 Bed / 4 Bath",
    "beds": 6,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1390,
    "maxPrice": 1425,
    "availability": "Available",
    "url": "https://thestandardaustin.landmark-properties.com/floorplans/",
    "imagePath": "https://thestandardaustin.landmark-properties.com/wp-content/uploads/2026/03/Standard-Austin-Floorplan-Greenwich.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (6 residents sharing 4 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "A1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "463",
    "minPrice": 2120,
    "maxPrice": 2120,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/23_legacy-on-rio-floorplans_A1.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "B1",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "720",
    "minPrice": 1550,
    "maxPrice": 1550,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/6_legacy-on-rio-floorplans_B1-Ansi-Type-A.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "B1.1",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "618",
    "minPrice": 1545,
    "maxPrice": 1545,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/legacy-on-rio-cut-floorplans_B1.1.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "B1.2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "728",
    "minPrice": 1300,
    "maxPrice": 1300,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/25_legacy-on-rio-floorplan_b1.2.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "B2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "770",
    "minPrice": 1530,
    "maxPrice": 1530,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/7_legacy-on-rio-floorplans_B2.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "B3",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "783",
    "minPrice": 1505,
    "maxPrice": 1505,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/26_legacy-on-rio-floorplans_B3.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C1",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "857",
    "minPrice": 1295,
    "maxPrice": 1295,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/8_legacy-on-rio-floorplans_C1.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C2",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "918",
    "minPrice": 1295,
    "maxPrice": 1295,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/9_legacy-on-rio-floorplans_C2.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C2.1",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "964",
    "minPrice": 825,
    "maxPrice": 1075,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/10_legacy-on-rio-floorplan-C2.1.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C2.2",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1013",
    "minPrice": 1245,
    "maxPrice": 1245,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/11_legacy-on-rio-floorplan-c2.2.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C5",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "973",
    "minPrice": 1250,
    "maxPrice": 1250,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/14_legacy-on-rio-floorplans_C5-Ansi-Type-A.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "972",
    "minPrice": 1125,
    "maxPrice": 1125,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/12_legacy-on-rio-floorplans_C3.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C4",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "976",
    "minPrice": 1325,
    "maxPrice": 1325,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/13_legacy-on-rio-floorplans_C4.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Legacy on Rio",
    "plan": "C6",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1001",
    "minPrice": 1375,
    "maxPrice": 1375,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/15_legacy-on-rio-floorplans_C6.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C6-A",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "981",
    "minPrice": 1105,
    "maxPrice": 1105,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/27_legacy-on-rio-floorplans_C6A.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C7",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1013",
    "minPrice": 1440,
    "maxPrice": 1440,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/16_legacy-on-rio-floorplans_C7.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "C8",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1045",
    "minPrice": 1410,
    "maxPrice": 1410,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/28_legacy-on-rio-floorplans_C8.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D1.1",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1013",
    "minPrice": 975,
    "maxPrice": 975,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/17_legacy-on-rio-floorplans_D1.1.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D3",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1020",
    "minPrice": 899,
    "maxPrice": 899,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/18_legacy-on-rio-floorplans_D3.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D11",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1298",
    "minPrice": 1085,
    "maxPrice": 1085,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/31_legacy-on-rio-floorplans_D11.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D12",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1301",
    "minPrice": 1099,
    "maxPrice": 1099,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/22_legacy-on-rio-floorplans_D12_.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Legacy on Rio",
    "plan": "D13",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1357",
    "minPrice": 1415,
    "maxPrice": 1415,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/32_legacy-on-rio-floorplans_D13-Ansi-Type-A.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1161",
    "minPrice": 1335,
    "maxPrice": 1335,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/19_legacy-on-rio-floorplans_D4.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Legacy on Rio",
    "plan": "D5",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1206",
    "minPrice": 1365,
    "maxPrice": 1365,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/29_legacy-on-rio-floorplans_D5.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "D6.1",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1196",
    "minPrice": 1335,
    "maxPrice": 1335,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/20_legacy-on-rio-floorplans_D6.1.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Legacy on Rio",
    "plan": "D8",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1257",
    "minPrice": 1199,
    "maxPrice": 1199,
    "availability": "Available",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/21_legacy-on-rio-floorplans_D8.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Legacy on Rio",
    "plan": "D9",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1286",
    "minPrice": 1295,
    "maxPrice": 1295,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/30_legacy-on-rio-floorplans_D9.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E1",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "1388",
    "minPrice": 937,
    "maxPrice": 937,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/33_legacy-on-rio-floorplans_E1.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E2",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "1417",
    "minPrice": 937,
    "maxPrice": 937,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/34_legacy-on-rio-floorplan-E2.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E6",
    "roomType": "5 Bed / 4 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "1291",
    "minPrice": 1025,
    "maxPrice": 1025,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/38_legacy-on-rio-floorplans_E6.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E3",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1413",
    "minPrice": 1160,
    "maxPrice": 1160,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/35_legacy-on-rio-floorplan-e3.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E4",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1433",
    "minPrice": 1205,
    "maxPrice": 1205,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/36_legacy-on-rio-floorplan-E4.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Legacy on Rio",
    "plan": "E5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1499",
    "minPrice": 1075,
    "maxPrice": 1075,
    "availability": "Sold Out",
    "url": "https://legacyonrio.com/floorplans/",
    "imagePath": "https://legacyonrio.com/wp-content/uploads/2026/03/37_legacy-on-rio-floorplan-E5.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C5 Alt - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1009",
    "minPrice": 1865,
    "maxPrice": 1865,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/08/C5_Alt.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "S1 - Studio",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "422",
    "minPrice": 2455,
    "maxPrice": 2465,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_S1.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "A0 - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "516",
    "minPrice": 2800,
    "maxPrice": 2800,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_A0_516.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "A1 - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "572",
    "minPrice": 1550,
    "maxPrice": 1560,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_A1_572.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "A2 - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "553",
    "minPrice": 2500,
    "maxPrice": 2500,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_A2_553.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "A3 - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "591",
    "minPrice": 2600,
    "maxPrice": 2600,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_A3_591.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "A4 - 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "663",
    "minPrice": 2510,
    "maxPrice": 2510,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_A4_712.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B1 - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "857",
    "minPrice": 1915,
    "maxPrice": 1915,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/633dbcd5f03b56.04377062334.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B2 - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "775",
    "minPrice": 2010,
    "maxPrice": 2020,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_B2_775.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B2S - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "778",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_B2_775.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B3 VIP - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "944",
    "minPrice": 1850,
    "maxPrice": 1900,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_B3_944.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B4 Premium - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "929",
    "minPrice": 2020,
    "maxPrice": 2070,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_B4_978.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "B5 - 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "726",
    "minPrice": 1555,
    "maxPrice": 1565,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_B5_726.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "C1 - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "945",
    "minPrice": 1630,
    "maxPrice": 1655,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C1_945.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C2 - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1052",
    "minPrice": 1820,
    "maxPrice": 1820,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C2_1052.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C3 - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1404",
    "minPrice": 1675,
    "maxPrice": 1675,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C3_1104.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C3S - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1104",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C3_1104.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C4 Premium - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1047",
    "minPrice": 1510,
    "maxPrice": 1510,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C4_TH-Combined.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "C5 - 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1009",
    "minPrice": 1875,
    "maxPrice": 1875,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_C5_1009.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "D1 - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1295",
    "minPrice": 1460,
    "maxPrice": 1500,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D1_1338.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "D2 - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1257",
    "minPrice": 1360,
    "maxPrice": 1375,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D2_1318.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "D3 - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1345",
    "minPrice": 1450,
    "maxPrice": 1475,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D3_1345.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "D4 - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1345",
    "minPrice": 1500,
    "maxPrice": 1500,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D4_1538.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "D4S - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1366",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D4_1538.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "D5 VIP - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1519",
    "minPrice": 1825,
    "maxPrice": 1825,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D5_1561.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "D6 Premium - 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1546",
    "minPrice": 1610,
    "maxPrice": 1610,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_D6_1804.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "E1 - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1562",
    "minPrice": 1280,
    "maxPrice": 1280,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E1_1609.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "E2 - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1519",
    "minPrice": 1450,
    "maxPrice": 1490,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E2_1562.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "E3 Premium - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1784",
    "minPrice": 1585,
    "maxPrice": 1595,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E3_1857.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "E4 - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1588",
    "minPrice": 1560,
    "maxPrice": 1570,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E4_1663.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "E5 - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1493",
    "minPrice": 1565,
    "maxPrice": 1575,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E5_ALT_1487.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "E6 - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1657",
    "minPrice": 1555,
    "maxPrice": 1555,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E6_1615.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "E6A - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1657",
    "minPrice": 1495,
    "maxPrice": 1495,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/E6A.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "E7 Premium - 5x5",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1721",
    "minPrice": 1745,
    "maxPrice": 1745,
    "availability": "Sold Out",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_E7_1771.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Mark Uptown",
    "plan": "F1 Premium - 6x6",
    "roomType": "6 Bed / 6 Bath",
    "beds": 6,
    "baths": 6.0,
    "sqFt": "2026",
    "minPrice": 1560,
    "maxPrice": 1570,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_F1_2026.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mark Uptown",
    "plan": "F2S - 6x6",
    "roomType": "6 Bed / 6 Bath",
    "beds": 6,
    "baths": 6.0,
    "sqFt": "1908",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Available",
    "url": "https://themarkatx.com/floorplans/",
    "imagePath": "https://www.themarkatx.com/wp-content/uploads/2026/03/The-Mark-Austin-floorplan_F2_2056.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "A1 - Sx1 The McConaughey",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "520",
    "minPrice": 1875,
    "maxPrice": 1910,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa420eb99e146.04543478938.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "A2 - Sx1 The Bullock",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "396",
    "minPrice": 2050,
    "maxPrice": 2050,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa41938bb1848.62674292104.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "A3 - Sx1 The Vaughan",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "511",
    "minPrice": 2050,
    "maxPrice": 2050,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa423b4997665.23333497709.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "B1 - 2x2 The Kendra",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "820",
    "minPrice": 1740,
    "maxPrice": 1740,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa423e3ad6dc8.40710721841.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "B2 - 2x2 The Brees",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "957",
    "minPrice": 1895,
    "maxPrice": 1895,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa4241f47e523.57529853469.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "B4 - 2x2 The Nelson",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "981",
    "minPrice": 1705,
    "maxPrice": 1705,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa42514e5fe47.68060847454.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "C1 - 3x3 The Van Zandt",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1173",
    "minPrice": 1185,
    "maxPrice": 1185,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa42549231b03.67635048337.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "C2 - 3x3 The Armstrong",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1203",
    "minPrice": 1550,
    "maxPrice": 1550,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa425766a7b90.03047101320.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "C3 - 3x3 The Wilson",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1228",
    "minPrice": 1425,
    "maxPrice": 1425,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa4258f7c0cf4.42480250916.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "C4 - 3x3 The Joplin",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1195",
    "minPrice": 1505,
    "maxPrice": 1505,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa425cf244501.76087010677.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D5 - 4x3 The Durant",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1334",
    "minPrice": 1140,
    "maxPrice": 1215,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa426cfcea8f3.35847124953.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D1 - 4x4 The Ehlinger",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1323",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa426136aecf9.74555193583.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D2 - 4x4 The Mack",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1407",
    "minPrice": 1345,
    "maxPrice": 1345,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa42680363d75.46951992767.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D3 - 4x4 The Johnson",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1490",
    "minPrice": 1460,
    "maxPrice": 1460,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa4269ab60dc5.83922540320.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D4 - 4x4 The Travis",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1458",
    "minPrice": 1115,
    "maxPrice": 1175,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa426b241c4c3.63526208265.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "D6 - 4x4 The Aldridge",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1537",
    "minPrice": 1525,
    "maxPrice": 1525,
    "availability": "Sold Out",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa4270fd7e466.61958099273.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Moontower Just off Campus",
    "plan": "E1 - 5x5 The Anderson",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1704",
    "minPrice": 1355,
    "maxPrice": 1355,
    "availability": "Available",
    "url": "https://moontoweratx.com/floorplans/",
    "imagePath": "https://moontoweratx.com/wp-content/uploads/2026/03/5fa4272c66a417.69542183924.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Nine Just off Campus",
    "plan": "Studio (S1) SMART*",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "406",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5c95b6fd047.71488695510.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "Studio (S2) SMART*",
    "roomType": "0 Bed / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "319",
    "minPrice": 1255,
    "maxPrice": 1255,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5c868c11413.66216379373.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "1/1 A1 SMART",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "567",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5c9d7b2f0f2.24149230178.png",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "2/2 B1",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "756",
    "minPrice": 1495,
    "maxPrice": 1495,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cc58667dc5.82786497369.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "2/2 B2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "925",
    "minPrice": 1365,
    "maxPrice": 1365,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cc43364f50.11810579610.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "3/3 C1",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1123",
    "minPrice": 1440,
    "maxPrice": 1440,
    "availability": "Available",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cc801b64f1.03966927791.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Nine Just off Campus",
    "plan": "3/3 C2",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1122",
    "minPrice": 1395,
    "maxPrice": 1395,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cce87a4976.89245477815.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "4/2 D4",
    "roomType": "4 Bed / 2 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1461",
    "minPrice": 1215,
    "maxPrice": 1215,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cd1606bfc6.07469590761.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "4/3 D5",
    "roomType": "4 Bed / 3 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1222",
    "minPrice": 1315,
    "maxPrice": 1340,
    "availability": "Available",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cd78171f52.47368702558.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "4/4 D1",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1327",
    "minPrice": 1315,
    "maxPrice": 1315,
    "availability": "Available",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cd4096c509.29171762328.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Nine Just off Campus",
    "plan": "4/4 D2",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1382",
    "minPrice": 1300,
    "maxPrice": 1300,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cd91dd88b1.65034471936.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Nine Just off Campus",
    "plan": "4/4 D3",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1350",
    "minPrice": 1340,
    "maxPrice": 1340,
    "availability": "Available",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cd578bf550.01114641257.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Nine Just off Campus",
    "plan": "5/5 E1",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1577",
    "minPrice": 1275,
    "maxPrice": 1275,
    "availability": "Available",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cdae8abc53.18293786247.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Nine Just off Campus",
    "plan": "5/5 E2",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1793",
    "minPrice": 1285,
    "maxPrice": 1285,
    "availability": "Sold Out",
    "url": "https://theninewestcampus.com/floorplans/",
    "imagePath": "https://theninewestcampus.com/wp-content/uploads/2026/03/5da5cdd7439ed6.47192408562.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Waterloo Austin",
    "plan": "2 Bed, 2 Bath Classic",
    "roomType": "2 Bed / 2.0 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1749,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-waldorf-2-bedroom--644886",
    "imagePath": "https://yugo.com/resource/blob/644646/8f64573fe986f0ffd3ab5b8514a65cb0/waldorfjpg-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "3 Bed, 3 Bath",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1599,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-ramble-3-bedroom-644882",
    "imagePath": "https://yugo.com/resource/blob/644644/701817dd04c673a14e373714899749c3/ramblejpg-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "4 Bed, 4 Bath Classic",
    "roomType": "4 Bed / 4.0 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1229,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-henry-4-bedroom-644826",
    "imagePath": "https://yugo.com/resource/blob/644818/0ec8cf6494fde56d6c4a0ea0d2f8a835/yugo-austinwaterloo-2208dsc-8408-edit-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "4 Bed, 4 Bath Deluxe",
    "roomType": "4 Bed / 4.0 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1329,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-proper-4-bedroom-644880",
    "imagePath": "https://yugo.com/resource/blob/644868/7bd606de1b28510699a117d0502bbe56/yugo-austinwaterloo-2005dsc-8492-edit-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "4 Bed, 4 Bath Plus",
    "roomType": "4 Bed / 4.0 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1279,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-crawford-4-bedroom-644816",
    "imagePath": "https://yugo.com/resource/blob/644814/ec80ecc3a220f4b66dc11dd16729826b/crawford-rendering-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "4 Bed, 4 Bath Premier",
    "roomType": "4 Bed / 4.0 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1439,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-joule-4-bedroom-644856",
    "imagePath": "https://yugo.com/resource/blob/644848/f313ca64d6d2b322bcaa4706caa3cbea/yugo-austinwaterloo-1309dsc-8213-edit-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "5 Bed, 5 Bath Penthouse",
    "roomType": "5 Bed / 5.0 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1869,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/penthouse-on-30-5-bed-5-bath-644812",
    "imagePath": "https://yugo.com/resource/blob/678704/622893bc48a30c7982ce0d48204faf7e/yugo-website-photo-edits-1--data.png",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Waterloo Austin",
    "plan": "6 Bed, 6 Bath Classic",
    "roomType": "6 Bed / 6.0 Bath",
    "beds": 6,
    "baths": 6.0,
    "sqFt": "",
    "minPrice": 1249,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-hoxton-6-bed-6-bath-644844",
    "imagePath": "https://yugo.com/resource/blob/644828/ed546a0be77a6ae92b8ef0125a11d2a1/yugo-austinwaterloo-1902dsc-8330-edit-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "6 Bed, 6 Bath Plus",
    "roomType": "6 Bed / 6.0 Bath",
    "beds": 6,
    "baths": 6.0,
    "sqFt": "",
    "minPrice": 1299,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-zaza-6-bed-6-bath-644892",
    "imagePath": "https://yugo.com/resource/blob/644888/3571ab23ea6d00ba449928908529fbbd/4b-kitchen-henry-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "Studio Classic",
    "roomType": "",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": 941,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-moxy-studio-644866",
    "imagePath": "https://yugo.com/resource/blob/644858/61a5f2b53e8ce8b47d866d4e95c99aea/yugo-austinwaterloo-2206dsc-8141-edit-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Waterloo Austin",
    "plan": "Studio Plus",
    "roomType": "",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": 1260,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/the-ivy-studio-644846",
    "imagePath": "https://yugo.com/resource/blob/644634/d1e530a3406394574713fab111c7851f/ivyjpg-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": " 2 Bed, 1 Bath Classic",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1259,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/2-bed-1-bath-classic-642684",
    "imagePath": "https://yugo.com/resource/blob/642682/06a8809735afa2ddca981dbbfd88fdc7/corner2x1-classic-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": " 4 Bed, 4 Bath",
    "roomType": "4 Bed / 4.0 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 1219,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/4-bed-4-bath-642680",
    "imagePath": "https://yugo.com/resource/blob/642470/d7bff86d85929bb2e6845fe8cc65a3d0/yugo-austincorner-207-15-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "2 Bed, 1 Bath Deluxe",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1219,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/2-bed-1-bath-deluxe-642688",
    "imagePath": "https://yugo.com/resource/blob/642686/654da7c92da01842acbdfb89257ab988/corner-2x1-deluxe-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "2 Bed, 1 Bath Plus",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1209,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/2-bed-1-bath-plus-642690",
    "imagePath": "https://yugo.com/resource/blob/642362/12483154fb9764e1dcbdc75066cfbcd1/yugo-austincorner-502-3-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "2 Bed, 1.5 Bath Loft",
    "roomType": "2 Bed / 5.0 Bath",
    "beds": 2,
    "baths": 5.0,
    "sqFt": "",
    "minPrice": 1459,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/2-bed-1-5-bath-loft-642692",
    "imagePath": "https://yugo.com/resource/blob/642360/6d871285bc6806efc64cce28c2650582/yugo-austincorner-702-9-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "2 Bed, 2 Bath",
    "roomType": "2 Bed / 2.0 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1309,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/2-bed-2-bath-642694",
    "imagePath": "https://yugo.com/resource/blob/642600/9602f01b68740f4321ef95682a12b57d/yugo-austin-corner-room-type-3-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "3 Bed, 2 Bath Classic",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 941,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/3-bed-2-bath-classic-642698",
    "imagePath": "https://yugo.com/resource/blob/642452/b67306dafca0fe5891b4a916a92cc286/yugo-austincorner-701-701-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "3 Bed, 2 Bath Deluxe",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1169,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/3-bed-2-bath-deluxe-642700",
    "imagePath": "https://yugo.com/resource/blob/642394/8e4c6e697f748eb0b60b23c1c4911e5a/yugo-austincorner-605-11-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "3 Bed, 2 Bath Plus",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 941,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/3-bed-2-bath-plus-642702",
    "imagePath": "https://yugo.com/resource/blob/642408/61b3a3ecd544bc6acc1b152d8eaaa56e/yugo-austincorner-705-10-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "3 Bed, 3 Bath Classic",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1260,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/3-bed-3-bath-classic-642704",
    "imagePath": "https://yugo.com/resource/blob/642598/62dbdac85273d59da7a942dd84eac42a/yugo-austin-corner-room-type-1-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "3 Bed, 3 Bath Loft",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1249,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/3-bed-3-bath-loft-642678",
    "imagePath": "https://yugo.com/resource/blob/642438/360cb7c59c6acdc12a56543eb7c4e7cf/yugo-austincorner-704-20-data.jpg",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "4 Bed, 3 Bath Classic",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1189,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/4-bed-3-bath-classic-642708",
    "imagePath": "https://yugo.com/resource/blob/642466/b659f6c3226ced47ee392a52c653d409/yugo-austincorner-501-8-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "4 Bed, 3 Bath Plus",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1139,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/4-bed-3-bath-plus-642712",
    "imagePath": "https://yugo.com/resource/blob/642710/59726029d7d52299abb42b50ece4e4c9/corner-4x3-plus-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Corner",
    "plan": "5 Bed, 4 Bath",
    "roomType": "5 Bed / 4.0 Bath",
    "beds": 5,
    "baths": 4.0,
    "sqFt": "",
    "minPrice": 999,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/5-bed-4-bath-642718",
    "imagePath": "https://yugo.com/resource/blob/642716/37f0699f29844a60d236f8d79ee013c1/corner-5x4-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 4 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "2 Bed, 1 Bath Loft",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1524,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/2-bed-1-bath-loft-643540",
    "imagePath": "https://yugo.com/resource/blob/643278/d7216d6ff5e5213db7e612b4084c4cf5/3056-1169248-59e68f66e10c59802-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "2 Bed, 1 Bath Plus",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1504,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/2-bed-1-bath-plus-643542",
    "imagePath": "https://yugo.com/resource/blob/643278/d7216d6ff5e5213db7e612b4084c4cf5/3056-1169248-59e68f66e10c59802-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "3 Bed, 1 Bath Loft",
    "roomType": "3 Bed / 1.0 Bath",
    "beds": 3,
    "baths": 1.0,
    "sqFt": "",
    "minPrice": 1424,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/3-bed-1-bath-loft-643544",
    "imagePath": "https://yugo.com/resource/blob/643264/e448744aafb77eb0321bd5c13dece443/3047-1169248-59e68f28d5f373192-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "3 Bed, 2 Bath Loft",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1464,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/3-bed-2-bath-loft-643548",
    "imagePath": "https://yugo.com/resource/blob/643546/86881011906032f7f06dcf2bffeaf050/nueces-3x2-loft-data.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 2 Bath Classic",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1254,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-2-bath-classic-643552",
    "imagePath": "https://yugo.com/resource/blob/643550/85ac3d732dfa3002e5b79753d38e777e/4x2-classic-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 2 Bath Deluxe",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1284,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-2-bath-deluxe-643554",
    "imagePath": "https://yugo.com/resource/blob/643260/9be89b946f6f50e75dcb46b7d4f6fa52/3045-1169248-59e68f28986598852-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 2 Bath Loft",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1294,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-2-bath-loft-643556",
    "imagePath": "https://yugo.com/resource/blob/643276/65042ae1226de65685e47ae9da3faf59/3055-1169248-59e68f66c66a51252-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 2 Bath Plus",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1274,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-2-bath-plus-643558",
    "imagePath": "https://yugo.com/resource/blob/643276/65042ae1226de65685e47ae9da3faf59/3055-1169248-59e68f66c66a51252-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 3 Bath Classic",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1329,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-3-bath-classic-643560",
    "imagePath": "https://yugo.com/resource/blob/643254/d24c43070577afdb1ccf69a21879b969/3042-1169248-59e68f0b134562892-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "4 Bed, 3 Bath Plus",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1364,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/4-bed-3-bath-plus-643564",
    "imagePath": "https://yugo.com/resource/blob/643562/c0cc34974b77d628fb07d1ee0b6a300c/nueces-4x3-plus-data.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "5 Bed, 2 Bath Loft",
    "roomType": "5 Bed / 2.0 Bath",
    "beds": 5,
    "baths": 2.0,
    "sqFt": "",
    "minPrice": 1199,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/5-bed-2-bath-loft-643568",
    "imagePath": "https://yugo.com/resource/blob/643566/45e128c71e30a06270af54ec8dbbf756/nueces-5x2-loft-data.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 2 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "5 Bed, 3 Bath Loft",
    "roomType": "5 Bed / 3.0 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1224,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/5-bed-3-bath-loft-643572",
    "imagePath": "https://yugo.com/resource/blob/643570/bc30fb703b586c212442ca89bfa4e6c3/nueces-5x3-loft-data.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "5 Bed, 3 Bath Plus",
    "roomType": "5 Bed / 3.0 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "",
    "minPrice": 1254,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/5-bed-3-bath-plus-643576",
    "imagePath": "https://yugo.com/resource/blob/643574/cb3c06ab1d5b73156c56072838bfeb0c/nueces-5x3-plus-data.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)"
    ]
  },
  {
    "property": "Yugo Austin Space",
    "plan": "Studio Classic",
    "roomType": "",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": 1260,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/studio-classic-643578",
    "imagePath": "https://yugo.com/resource/blob/643258/e78271ec97a3249bb956f586f9912e03/3044-1169248-59e68f28801c59292-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Yugo Austin Space",
    "plan": "Studio Plus",
    "roomType": "",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": 1734,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/studio-plus-643580",
    "imagePath": "https://yugo.com/resource/blob/643276/65042ae1226de65685e47ae9da3faf59/3055-1169248-59e68f66c66a51252-data.jpg",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Villas on Rio",
    "plan": "B1-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 2 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  2",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/074507/66a8ee63ae0225.84930273797.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "B2-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 2 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  2",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/075103/66a8efc718a691.34861874550.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "B2-X",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 2 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  2",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/081220/66a8f4c46b4217.15041962254.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Villas on Rio",
    "plan": "B2A-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 2 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  2",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/080049/66a8f211dbd195.07464493752.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "B4-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 2 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  2",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/081901/66a8f655a6a746.91993431818.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "C1",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 3 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  3",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/083352/66a8f9d09f8a69.38713837294.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Villas on Rio",
    "plan": "C1-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 3 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  3",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/093814/66a908e5f1c505.83648925912.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "C2-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 3 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  3",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/104237/66a917fd624200.20996211501.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "C3-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 3 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  3",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/105122/66a91a0a939034.25287345968.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Villas on Rio",
    "plan": "D1",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 4 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  4",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/105341/66a91a9596cac8.93442523464.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Villas on Rio",
    "plan": "D5-SHARED",
    "roomType": "<img decoding=\"async\" class=\"bedimg\" src=\"/wp-content/uploads/2023/02/bed.png\" alt=\"bed\"> 4 <span class=\"unit-sep\">|</span> <img decoding=\"async\"  class=\"bathimg\"  src=\"/wp-content/uploads/2023/02/bath.png\" alt=\"bath\">  4",
    "beds": null,
    "baths": null,
    "sqFt": "",
    "minPrice": null,
    "maxPrice": null,
    "availability": "<span>1 FEMALE PRIVATE ROOM LEFT </span>",
    "url": "https://villasonrio.com/floor-plans/",
    "imagePath": "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2024/07/30/111315/66a91f2b244ea5.56945494937.png",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "A1",
    "roomType": "1 Bed / None Bath",
    "beds": 1,
    "baths": null,
    "sqFt": "550",
    "minPrice": 2129,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/04/08/022252/69d6b91c0e9018.70895052503.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "A1 ANSI",
    "roomType": "1 Bed / None Bath",
    "beds": 1,
    "baths": null,
    "sqFt": "550",
    "minPrice": 2129,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/04/08/022335/69d6b946cf1752.36874217347.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "B1",
    "roomType": "2 Bed / None Bath",
    "beds": 2,
    "baths": null,
    "sqFt": "806",
    "minPrice": 1650,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/04/08/022422/69d6b976d725c3.56313573264.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "B1 ANSI",
    "roomType": "2 Bed / None Bath",
    "beds": 2,
    "baths": null,
    "sqFt": "806",
    "minPrice": 1475,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/04/08/022517/69d6b9ad818837.33533161601.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "B2",
    "roomType": "2 Bed / None Bath",
    "beds": 2,
    "baths": null,
    "sqFt": "719",
    "minPrice": 1615,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/05/27/022924/6a1754244ec8b2.66176557707.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C1",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "055",
    "minPrice": 1285,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/06/030344/6a4c18303eef97.83740551809.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C2",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "",
    "minPrice": 1490,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/05/27/023225/6a1754d9d063d2.73811136737.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C3",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "186",
    "minPrice": 1265,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/06/030949/6a4c199cddce51.90785753971.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C4",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "080",
    "minPrice": 1375,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/06/031031/6a4c19c76f1413.20804420401.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C5",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "993",
    "minPrice": 1315,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/06/031108/6a4c19ebeacb38.58535135456.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C6",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "110",
    "minPrice": 1245,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/13/040817/69b48ad1d0ec33.27866602719.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C7",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "001",
    "minPrice": 1265,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/13/040855/69b48af7733545.62508409154.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "C8",
    "roomType": "3 Bed / None Bath",
    "beds": 3,
    "baths": null,
    "sqFt": "977",
    "minPrice": 1395,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/04/08/022708/69d6ba1c0e5258.76370505925.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D1",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "180",
    "minPrice": 1245,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021336/69b86470bd29b9.40869472826.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D2",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "202",
    "minPrice": 1225,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021419/69b8649b494ea4.18095443375.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D3",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "396",
    "minPrice": 1265,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021509/69b864cdb3ee29.06749675869.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D4",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "303",
    "minPrice": 1255,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021609/69b86508f37523.56797283303.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D5",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "307",
    "minPrice": 1285,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021648/69b86530af66f4.32232108186.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D6",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "300",
    "minPrice": 1275,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021728/69b86558925cd8.82615991966.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "D7",
    "roomType": "4 Bed / None Bath",
    "beds": 4,
    "baths": null,
    "sqFt": "1301",
    "minPrice": 1285,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/03/16/021809/69b8658117d974.61266279584.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "F1",
    "roomType": "5 Bed / None Bath",
    "beds": 5,
    "baths": null,
    "sqFt": "447",
    "minPrice": 1179,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/30/123448/6a6b9948cff9e6.29722422389.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Inspire on 22nd",
    "plan": "F2",
    "roomType": "5 Bed / None Bath",
    "beds": 5,
    "baths": null,
    "sqFt": "",
    "minPrice": 1199,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.inspire22nd.com/austin/inspire-on-22nd/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/300x300/10073/MLv3/4/22/2026/07/30/123533/6a6b99757de674.05874549522.png",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "Studio - S1",
    "roomType": "Studio / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "420",
    "minPrice": 1879,
    "maxPrice": null,
    "availability": "Limited",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "1 Bed - 1 Bath A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "540",
    "minPrice": 1899,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "2 Bed - 2 Bath A",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "780",
    "minPrice": 1299,
    "maxPrice": null,
    "availability": "Limited",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "3 Bed - 3 Bath Standard",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1050",
    "minPrice": 1199,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "3 Bed - 3 Bath XL",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1180",
    "minPrice": 1229,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "4 Bed - 4 Bath SMART",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1250",
    "minPrice": 1139,
    "maxPrice": null,
    "availability": "Waitlist",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Affordable SMART housing program rate"
    ],
    "cons": [
      "Waitlist status (limited immediate spots)"
    ]
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "4 Bed - 4 Bath Apartment",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1310",
    "minPrice": 1119,
    "maxPrice": null,
    "availability": "Available",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Evo Austin (formerly Ion Austin)",
    "plan": "4 Bed - 4 Bath Townhouse",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1450",
    "minPrice": 1399,
    "maxPrice": null,
    "availability": "Limited",
    "url": "https://ion-austin.com/rates-floorplans/",
    "dataWarning": "cached",
    "imagePath": "",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Skyloft Austin",
    "plan": "ACL A",
    "roomType": "",
    "beds": null,
    "baths": 1.0,
    "sqFt": "307",
    "minPrice": 1999,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/021933/699e15e5a20657.42652043764.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "ACL B",
    "roomType": "",
    "beds": null,
    "baths": 1.0,
    "sqFt": "367",
    "minPrice": 1969,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110058/68f90dca840768.45403480273.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Antone's A",
    "roomType": "1 Bed / 1.0 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "580",
    "minPrice": 2219,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022137/699e1661024914.02206401211.jpg",
    "dataWarning": "cached",
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Antone's B",
    "roomType": "1 Bed / 1.0 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "620",
    "minPrice": 2219,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093227/68f2618bd29158.28480327187.jpg",
    "dataWarning": "cached",
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Antone's C",
    "roomType": "1 Bed / 1.0 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "510",
    "minPrice": 2219,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093256/68f261a8609830.56139820550.jpg",
    "dataWarning": "cached",
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available"
    ],
    "cons": [
      "Premium pricing tier",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Cedar Street",
    "roomType": "2 Bed / 1.0 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "679",
    "minPrice": 1379,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022207/699e167fb79e50.43332203490.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Emo's B",
    "roomType": "2 Bed / 2.0 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "744",
    "minPrice": 1539,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/121654/678aaca69693e2.75525262279.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Emo's C",
    "roomType": "2 Bed / 2.0 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "744",
    "minPrice": 1539,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/121718/678aacbedff209.70340974442.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Emo's D",
    "roomType": "2 Bed / 2.0 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "837",
    "minPrice": 1599,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/121744/678aacd89ade89.20137842530.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Nutty Brown A",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "839",
    "minPrice": 1289,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022333/699e16d55dcd83.05728699163.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Nutty Brown B",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "866",
    "minPrice": 1309,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022407/699e16f7570916.13423350752.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Nutty Brown C",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1011",
    "minPrice": 1339,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022551/699e175f3d0293.17272641357.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Nutty Brown D",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "970",
    "minPrice": 1334,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110138/68f90df239e543.46740171544.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Nutty Brown E",
    "roomType": "3 Bed / 2.0 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1011",
    "minPrice": 1269,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/03/16/011433/69b856993ce1f6.55438196852.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy A",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "978",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/122105/678aada1e60360.48303376809.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy B",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "978",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110208/68f90e10b64926.10263842170.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy C",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "978",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/122219/678aadeb701f24.75421133747.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy D",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "978",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/122247/678aae07250402.32092294629.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy E",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1131",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/01/17/122316/678aae246ba5a5.26142517265.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Speakeasy F",
    "roomType": "3 Bed / 3.0 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1191",
    "minPrice": 1359,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093400/68f261e8d99a61.12276692657.jpg",
    "dataWarning": "cached",
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available"
    ],
    "cons": [
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's A",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1108",
    "minPrice": 1229,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022629/699e1785460a39.38541329993.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's B",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1075",
    "minPrice": 1209,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022656/699e17a032bfa6.79594014204.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's C",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1158",
    "minPrice": 1209,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022733/699e17c549f2c4.32275832883.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's D",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1129",
    "minPrice": 1229,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/03/16/011248/69b85630ab2957.23638686630.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's E",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1200",
    "minPrice": 1209,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110237/68f90e2d979ab3.57066325767.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "Stubb's F",
    "roomType": "4 Bed / 2.0 Bath",
    "beds": 4,
    "baths": 2.0,
    "sqFt": "1354",
    "minPrice": 1209,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093440/68f262109c05d1.76660653288.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 2 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke A",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1114",
    "minPrice": 1349,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/02/24/022808/699e17e873c5f3.71896701286.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke B",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1349,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110305/68f90e49cdc154.66917735407.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke C",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1364,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/22/110825/68f90f89c64036.53996417419.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke D",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1349,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093515/68f262335ccc72.81174545582.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke E",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1275",
    "minPrice": 1379,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093551/68f26257753e84.27997906780.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke F",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1364,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2026/03/16/011338/69b856623878e3.79087317447.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke G",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1349,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093622/68f2627632f558.95284779967.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke H",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1216",
    "minPrice": 1349,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/093652/68f262944cdac7.53633194794.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Broken Spoke I",
    "roomType": "4 Bed / 3.0 Bath",
    "beds": 4,
    "baths": 3.0,
    "sqFt": "1378",
    "minPrice": 1379,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/094357/68f2643d06fbf4.73887916918.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (4 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "Skyloft Austin",
    "plan": "The Continental Club",
    "roomType": "5 Bed / 3.0 Bath",
    "beds": 5,
    "baths": 3.0,
    "sqFt": "1492",
    "minPrice": 1299,
    "maxPrice": null,
    "availability": "Sold Out",
    "url": "https://www.skyloftatx.com/austin/95211-skyloft/student/",
    "imagePath": "https://medialibrarycfo.entrata.com/fit-in/640x480/12394/MLv3/4/22/2025/10/17/094437/68f264659ef325.94842669414.jpg",
    "dataWarning": "cached",
    "pros": [
      "Fully furnished options available"
    ],
    "cons": [
      "Shared bathroom (5 residents sharing 3 baths)",
      "Currently sold out / waitlist only"
    ]
  },
  {
    "property": "21 Rio Apartments",
    "plan": "The Brazos (1x1)",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "620",
    "minPrice": 1850,
    "maxPrice": 1950,
    "availability": "Available",
    "url": "https://21rio.com/floorplans/",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Premium pricing tier"
    ]
  },
  {
    "property": "21 Rio Apartments",
    "plan": "The Colorado (2x2)",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "940",
    "minPrice": 1350,
    "maxPrice": 1450,
    "availability": "Available",
    "url": "https://21rio.com/floorplans/",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "21 Rio Apartments",
    "plan": "The Guadalupe (3x3)",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1280",
    "minPrice": 1250,
    "maxPrice": 1350,
    "availability": "Available",
    "url": "https://21rio.com/floorplans/",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Axis West Campus",
    "plan": "Independent SMART Studio",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "467",
    "minPrice": 1628,
    "maxPrice": 1628,
    "availability": "Available",
    "url": "https://www.axiswestcampus.com/floorplans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Axis West Campus",
    "plan": "Sophisticate SMART 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "494",
    "minPrice": 1658,
    "maxPrice": 1658,
    "availability": "Available",
    "url": "https://www.axiswestcampus.com/floorplans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Affordable SMART housing program rate",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Axis West Campus",
    "plan": "Pure 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "780",
    "minPrice": 1290,
    "maxPrice": 1350,
    "availability": "Available",
    "url": "https://www.axiswestcampus.com/floorplans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Axis West Campus",
    "plan": "Pure 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1250",
    "minPrice": 850,
    "maxPrice": 1085,
    "availability": "Available",
    "url": "https://www.axiswestcampus.com/floorplans",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Envoy Austin",
    "plan": "1 Bed / 1 Bath Standard",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "500",
    "minPrice": 1150,
    "maxPrice": 1200,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/envoy-apartments",
    "imagePath": "https://www.westsidegroup.com/wp-content/uploads/envoy-college-apartments-austin-kitchen-dining.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Envoy Austin",
    "plan": "1 Bed / 1 Bath Renovated",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "520",
    "minPrice": 1225,
    "maxPrice": 1275,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/envoy-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Quarters on Campus (The Quarters)",
    "plan": "Cameron House 1x1",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "560",
    "minPrice": 1550,
    "maxPrice": 1625,
    "availability": "Available",
    "url": "https://quartersoncampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Quarters on Campus (The Quarters)",
    "plan": "Nueces House 2x2",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "850",
    "minPrice": 1195,
    "maxPrice": 1275,
    "availability": "Available",
    "url": "https://quartersoncampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Quarters on Campus (The Quarters)",
    "plan": "Sterling House 3x3",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1120",
    "minPrice": 1095,
    "maxPrice": 1150,
    "availability": "Available",
    "url": "https://quartersoncampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Quarters on Campus (The Quarters)",
    "plan": "Grayson House 4x4",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1350",
    "minPrice": 995,
    "maxPrice": 1050,
    "availability": "Available",
    "url": "https://quartersoncampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Rise on 23rd",
    "plan": "Studio S1",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "425",
    "minPrice": 1650,
    "maxPrice": 1725,
    "availability": "Available",
    "url": "https://riseatwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Rise on 23rd",
    "plan": "2x2 Layout A",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "795",
    "minPrice": 1454,
    "maxPrice": 1520,
    "availability": "Available",
    "url": "https://riseatwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Rise on 23rd",
    "plan": "4x4 Layout A",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1280",
    "minPrice": 1294,
    "maxPrice": 1340,
    "availability": "Available",
    "url": "https://riseatwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Rise on 23rd",
    "plan": "4x4 Penthouse Level",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1310",
    "minPrice": 1324,
    "maxPrice": 1380,
    "availability": "Available",
    "url": "https://riseatwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Rise on 23rd",
    "plan": "5x5 Layout",
    "roomType": "5 Bed / 5 Bath",
    "beds": 5,
    "baths": 5.0,
    "sqFt": "1540",
    "minPrice": 1220,
    "maxPrice": 1270,
    "availability": "Available",
    "url": "https://riseatwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The G on West Campus",
    "plan": "Studio Efficiency",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "400",
    "minPrice": 1150,
    "maxPrice": 1200,
    "availability": "Available",
    "url": "https://thegatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The G on West Campus",
    "plan": "2 Bed / 1 Bath",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "720",
    "minPrice": 950,
    "maxPrice": 1000,
    "availability": "Available",
    "url": "https://thegatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "The G on West Campus",
    "plan": "3 Bed / 2 Bath",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1050",
    "minPrice": 850,
    "maxPrice": 925,
    "availability": "Available",
    "url": "https://thegatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "The Harrison",
    "plan": "1 Bed / 1 Bath Suite",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "550",
    "minPrice": 1425,
    "maxPrice": 1495,
    "availability": "Available",
    "url": "https://theharrisonaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Harrison",
    "plan": "2 Bed / 2 Bath Classic",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "880",
    "minPrice": 1150,
    "maxPrice": 1220,
    "availability": "Available",
    "url": "https://theharrisonaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Harrison",
    "plan": "4 Bed / 4 Bath Penthouse",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1350",
    "minPrice": 995,
    "maxPrice": 1050,
    "availability": "Available",
    "url": "https://theharrisonaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Hub Austin West Campus",
    "plan": "Studio Urban",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "440",
    "minPrice": 1595,
    "maxPrice": 1650,
    "availability": "Available",
    "url": "https://hubwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Hub Austin West Campus",
    "plan": "2 Bed / 2 Bath VIP",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "860",
    "minPrice": 1395,
    "maxPrice": 1450,
    "availability": "Available",
    "url": "https://hubwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Hub Austin West Campus",
    "plan": "4 Bed / 4 Bath Sky",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1320",
    "minPrice": 1195,
    "maxPrice": 1250,
    "availability": "Available",
    "url": "https://hubwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Ruckus",
    "plan": "Studio Loft (Nueces)",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "450",
    "minPrice": 1450,
    "maxPrice": 1525,
    "availability": "Available",
    "url": "https://ruckusatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Ruckus",
    "plan": "2 Bed / 2 Bath (Rio)",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "810",
    "minPrice": 1329,
    "maxPrice": 1395,
    "availability": "Available",
    "url": "https://ruckusatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Ruckus",
    "plan": "4 Bed / 4 Bath Sky Suite",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1300",
    "minPrice": 1150,
    "maxPrice": 1225,
    "availability": "Available",
    "url": "https://ruckusatx.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Unleashed West Campus",
    "plan": "1 Bed / 1 Bath Studio",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "420",
    "minPrice": 1195,
    "maxPrice": 1250,
    "availability": "Available",
    "url": "https://unleashedwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Unleashed West Campus",
    "plan": "2 Bed / 2 Bath Shared",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "780",
    "minPrice": 995,
    "maxPrice": 1050,
    "availability": "Available",
    "url": "https://unleashedwestcampus.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bedroom (limited privacy)"
    ]
  },
  {
    "property": "West Campus Flats",
    "plan": "Studio Flat A",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "380",
    "minPrice": 950,
    "maxPrice": 995,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/west-campus-flats",
    "imagePath": "https://www.westsidegroup.com/wp-content/uploads/elementor/thumbs/living-room-area-facing-door-1-qlhwyansgrkzd760d7f86a5hij0fand0r2zx153jow.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "West Campus Flats",
    "plan": "Studio Flat Deluxe",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "410",
    "minPrice": 1025,
    "maxPrice": 1075,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/west-campus-flats",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "44th Street Apartments",
    "plan": "1 Bed / 1 Bath North Campus",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "520",
    "minPrice": 1095,
    "maxPrice": 1150,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/44th-street-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "44th Street Apartments",
    "plan": "2 Bed / 1 Bath Classic",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "750",
    "minPrice": 850,
    "maxPrice": 895,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/44th-street-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "45th Street Apartments",
    "plan": "1 Bed / 1 Bath Flat",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "510",
    "minPrice": 1075,
    "maxPrice": 1125,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/45th-street-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "45th Street Apartments",
    "plan": "2 Bed / 1 Bath Courtyard",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "740",
    "minPrice": 840,
    "maxPrice": 880,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/45th-street-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Hyde Park Court",
    "plan": "1 Bed / 1 Bath Garden",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "530",
    "minPrice": 1125,
    "maxPrice": 1175,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/hyde-park-court",
    "imagePath": "https://www.westsidegroup.com/wp-content/uploads/hyde-park-apartment-building-1-jpg.webp",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Hyde Park Court",
    "plan": "2 Bed / 1 Bath Garden",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "760",
    "minPrice": 875,
    "maxPrice": 925,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/hyde-park-court",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Hyde Park Square",
    "plan": "Studio Speedway",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "420",
    "minPrice": 995,
    "maxPrice": 1050,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/hyde-park-square",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Hyde Park Square",
    "plan": "1 Bed / 1 Bath Speedway",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "540",
    "minPrice": 1150,
    "maxPrice": 1195,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/hyde-park-square",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Lofts at the Triangle",
    "plan": "1 Bed / 1 Bath Loft A",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "680",
    "minPrice": 1725,
    "maxPrice": 1850,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Lofts at the Triangle",
    "plan": "2 Bed / 2 Bath Loft B",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1040",
    "minPrice": 1395,
    "maxPrice": 1475,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Melroy Apartments",
    "plan": "1 Bed / 1 Bath Speedway Unit",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "515",
    "minPrice": 1095,
    "maxPrice": 1145,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/melroy-apartments",
    "imagePath": "https://www.westsidegroup.com/wp-content/uploads/upgraded-one-bedroom-unit-scaled.jpg",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "River Oaks Apartments",
    "plan": "1 Bed / 1 Bath Classic",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "525",
    "minPrice": 1120,
    "maxPrice": 1160,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/river-oaks-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "River Oaks Apartments",
    "plan": "2 Bed / 1 Bath Double",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "760",
    "minPrice": 860,
    "maxPrice": 895,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/river-oaks-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "Red River Apartments",
    "plan": "1 Bed / 1 Bath Red River",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "500",
    "minPrice": 1080,
    "maxPrice": 1130,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/red-river-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Red River Apartments",
    "plan": "2 Bed / 1 Bath Red River",
    "roomType": "2 Bed / 1 Bath",
    "beds": 2,
    "baths": 1.0,
    "sqFt": "730",
    "minPrice": 830,
    "maxPrice": 875,
    "availability": "Available",
    "url": "https://www.westsidegroup.com/red-river-apartments",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (2 residents sharing 1 baths)"
    ]
  },
  {
    "property": "The Triangle Apartments",
    "plan": "Studio Residence",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "550",
    "minPrice": 1550,
    "maxPrice": 1625,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Triangle Apartments",
    "plan": "1 Bed / 1 Bath Urban",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "710",
    "minPrice": 1695,
    "maxPrice": 1795,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Triangle Apartments",
    "plan": "2 Bed / 2 Bath Urban",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "1100",
    "minPrice": 1350,
    "maxPrice": 1425,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "The Triangle Apartments",
    "plan": "3 Bed / 2.5 Bath Townhome",
    "roomType": "3 Bed / 2.5 Bath",
    "beds": 3,
    "baths": 2.5,
    "sqFt": "1450",
    "minPrice": 1250,
    "maxPrice": 1325,
    "availability": "Available",
    "url": "https://thetriangleaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2.5 baths)"
    ]
  },
  {
    "property": "Ballpark North",
    "plan": "4 Bed / 4 Bath Student Suite",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1350",
    "minPrice": 625,
    "maxPrice": 675,
    "availability": "Available",
    "url": "https://theballparkaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Ballpark North",
    "plan": "3 Bed / 3 Bath Suite",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1150",
    "minPrice": 695,
    "maxPrice": 745,
    "availability": "Available",
    "url": "https://theballparkaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Ballpark North",
    "plan": "2 Bed / 2 Bath Suite",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "890",
    "minPrice": 795,
    "maxPrice": 850,
    "availability": "Available",
    "url": "https://theballparkaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Ballpark North",
    "plan": "1 Bed / 1 Bath Apartment",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "580",
    "minPrice": 1050,
    "maxPrice": 1120,
    "availability": "Available",
    "url": "https://theballparkaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Estate on Campus (Riverside)",
    "plan": "4 Bed / 4 Bath Townhome",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1420",
    "minPrice": 650,
    "maxPrice": 699,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Estate on Campus (Riverside)",
    "plan": "3 Bed / 3 Bath Flat",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1210",
    "minPrice": 725,
    "maxPrice": 775,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Estate on Campus (Riverside)",
    "plan": "2 Bed / 2 Bath Flat",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "910",
    "minPrice": 820,
    "maxPrice": 875,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Estate on Campus (Riverside)",
    "plan": "1 Bed / 1 Bath Flat",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "610",
    "minPrice": 1095,
    "maxPrice": 1150,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mesh Apartments",
    "plan": "Studio Modern",
    "roomType": "Studio / 1 Bath",
    "beds": 0,
    "baths": 1.0,
    "sqFt": "475",
    "minPrice": 1125,
    "maxPrice": 1175,
    "availability": "Available",
    "url": "https://meshapartments.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mesh Apartments",
    "plan": "1 Bed / 1 Bath Modern",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "620",
    "minPrice": 1250,
    "maxPrice": 1320,
    "availability": "Available",
    "url": "https://meshapartments.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Mesh Apartments",
    "plan": "2 Bed / 2 Bath Modern",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "920",
    "minPrice": 925,
    "maxPrice": 975,
    "availability": "Available",
    "url": "https://meshapartments.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Town Lake Student Apartments",
    "plan": "1 Bed / 1 Bath Waterfront",
    "roomType": "1 Bed / 1 Bath",
    "beds": 1,
    "baths": 1.0,
    "sqFt": "650",
    "minPrice": 1395,
    "maxPrice": 1475,
    "availability": "Available",
    "url": "https://townlakeaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Maximum privacy (no roommates)",
      "Fully furnished options available",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Town Lake Student Apartments",
    "plan": "2 Bed / 2 Bath Waterfront",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "980",
    "minPrice": 995,
    "maxPrice": 1050,
    "availability": "Available",
    "url": "https://townlakeaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "Town Lake Student Apartments",
    "plan": "3 Bed / 2 Bath Waterfront",
    "roomType": "3 Bed / 2 Bath",
    "beds": 3,
    "baths": 2.0,
    "sqFt": "1250",
    "minPrice": 850,
    "maxPrice": 895,
    "availability": "Available",
    "url": "https://townlakeaustin.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": [
      "Shared bathroom (3 residents sharing 2 baths)"
    ]
  },
  {
    "property": "University Estates at Austin",
    "plan": "4 Bed / 4 Bath Crossing Pl",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1400",
    "minPrice": 640,
    "maxPrice": 690,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "University Estates at Austin",
    "plan": "3 Bed / 3 Bath Crossing Pl",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1190",
    "minPrice": 715,
    "maxPrice": 765,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "University Estates at Austin",
    "plan": "2 Bed / 2 Bath Crossing Pl",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "900",
    "minPrice": 810,
    "maxPrice": 860,
    "availability": "Available",
    "url": "https://estatesateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "University Village Austin",
    "plan": "4 Bed / 4 Bath Village Suite",
    "roomType": "4 Bed / 4 Bath",
    "beds": 4,
    "baths": 4.0,
    "sqFt": "1380",
    "minPrice": 635,
    "maxPrice": 685,
    "availability": "Available",
    "url": "https://villageateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "University Village Austin",
    "plan": "3 Bed / 3 Bath Village Suite",
    "roomType": "3 Bed / 3 Bath",
    "beds": 3,
    "baths": 3.0,
    "sqFt": "1180",
    "minPrice": 710,
    "maxPrice": 760,
    "availability": "Available",
    "url": "https://villageateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  },
  {
    "property": "University Village Austin",
    "plan": "2 Bed / 2 Bath Village Suite",
    "roomType": "2 Bed / 2 Bath",
    "beds": 2,
    "baths": 2.0,
    "sqFt": "890",
    "minPrice": 799,
    "maxPrice": 849,
    "availability": "Available",
    "url": "https://villageateastriverside.com",
    "imagePath": "",
    "dataWarning": null,
    "pros": [
      "Private bathroom for every resident",
      "Fully furnished options available",
      "Budget-friendly rent (under $1,000/mo)",
      "Direct lease available"
    ],
    "cons": []
  }
];

export const FLOOR_PLANS = RAW_FLOOR_PLANS.map((p, index) => ({
  ...p,
  id: `${slugify(p.property)}-${slugify(p.plan)}-${index}`,
  imagePath: p.imagePath || '',
}));

export function getFloorPlansForProperty(name) {
  const key = normalizePropertyName(name);
  return FLOOR_PLANS.filter((p) => normalizePropertyName(p.property) === key);
}

export function getFloorPlanById(id) {
  return FLOOR_PLANS.find((p) => p.id === id) || null;
}
