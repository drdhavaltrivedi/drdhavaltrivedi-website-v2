/* Vedic Astrology Tools - Calculation Engine */

/* 1. Nakshatra Data */
const nakshatras = [
    { id: 0, name: "Ashwini", ruler: "Ketu", yoni: "Horse", varna: "Vaishya", gana: "Deva", nadi: "Adi" },
    { id: 1, name: "Bharani", ruler: "Venus", yoni: "Elephant", varna: "Mleccha", gana: "Manushya", nadi: "Madhya" },
    { id: 2, name: "Krittika", ruler: "Sun", yoni: "Sheep", varna: "Brahmin", gana: "Rakshasa", nadi: "Antya" },
    { id: 3, name: "Rohini", ruler: "Moon", yoni: "Serpent", varna: "Shudra", gana: "Manushya", nadi: "Antya" },
    { id: 4, name: "Mrigashira", ruler: "Mars", yoni: "Serpent", varna: "Vaishya", gana: "Deva", nadi: "Madhya" },
    { id: 5, name: "Ardra", ruler: "Rahu", yoni: "Dog", varna: "Shudra", gana: "Manushya", nadi: "Adi" },
    { id: 6, name: "Punarvasu", ruler: "Jupiter", yoni: "Cat", varna: "Vaishya", gana: "Deva", nadi: "Adi" },
    { id: 7, name: "Pushya", ruler: "Saturn", yoni: "Goat", varna: "Kshatriya", gana: "Deva", nadi: "Madhya" },
    { id: 8, name: "Ashlesha", ruler: "Mercury", yoni: "Cat", varna: "Mleccha", gana: "Rakshasa", nadi: "Antya" },
    { id: 9, name: "Magha", ruler: "Ketu", yoni: "Rat", varna: "Shudra", gana: "Rakshasa", nadi: "Antya" },
    { id: 10, name: "Purva Phalguni", ruler: "Venus", yoni: "Rat", varna: "Brahmin", gana: "Manushya", nadi: "Madhya" },
    { id: 11, name: "Uttara Phalguni", ruler: "Sun", yoni: "Cow", varna: "Kshatriya", gana: "Manushya", nadi: "Adi" },
    { id: 12, name: "Hasta", ruler: "Moon", yoni: "Buffalo", varna: "Vaishya", gana: "Deva", nadi: "Adi" },
    { id: 13, name: "Chitra", ruler: "Mars", yoni: "Tiger", varna: "Shudra", gana: "Rakshasa", nadi: "Madhya" },
    { id: 14, name: "Swati", ruler: "Rahu", yoni: "Buffalo", varna: "Mleccha", gana: "Deva", nadi: "Antya" },
    { id: 15, name: "Vishakha", ruler: "Jupiter", yoni: "Tiger", varna: "Mleccha", gana: "Rakshasa", nadi: "Antya" },
    { id: 16, name: "Anuradha", ruler: "Saturn", yoni: "Deer", varna: "Shudra", gana: "Deva", nadi: "Madhya" },
    { id: 17, name: "Jyeshtha", ruler: "Mercury", yoni: "Deer", varna: "Shudra", gana: "Rakshasa", nadi: "Adi" },
    { id: 18, name: "Mula", ruler: "Ketu", yoni: "Dog", varna: "Mleccha", gana: "Rakshasa", nadi: "Adi" },
    { id: 19, name: "Purva Ashadha", ruler: "Venus", yoni: "Monkey", varna: "Brahmin", gana: "Manushya", nadi: "Madhya" },
    { id: 20, name: "Uttara Ashadha", ruler: "Sun", yoni: "Mongoose", varna: "Kshatriya", gana: "Manushya", nadi: "Antya" },
    { id: 21, name: "Shravana", ruler: "Moon", yoni: "Monkey", varna: "Shudra", gana: "Deva", nadi: "Antya" },
    { id: 22, name: "Dhanishta", ruler: "Mars", yoni: "Lion", varna: "Shudra", gana: "Rakshasa", nadi: "Madhya" },
    { id: 23, name: "Shatabhisha", ruler: "Rahu", yoni: "Horse", varna: "Mleccha", gana: "Rakshasa", nadi: "Adi" },
    { id: 24, name: "Purva Bhadrapada", ruler: "Jupiter", yoni: "Lion", varna: "Brahmin", gana: "Manushya", nadi: "Adi" },
    { id: 25, name: "Uttara Bhadrapada", ruler: "Saturn", yoni: "Cow", varna: "Kshatriya", gana: "Manushya", nadi: "Madhya" },
    { id: 26, name: "Revati", ruler: "Mercury", yoni: "Elephant", varna: "Shudra", gana: "Deva", nadi: "Antya" }
];

/* 2. Moon Position Calculation (Simplified Sidereal) */
function getNakshatraFromDate(dateStr, timeStr) {
    const date = new Date(dateStr + 'T' + timeStr);
    
    // Julian Date Calculation
    const time = date.getTime();
    const jd = (time / 86400000) + 2440587.5;
    
    // Days since J2000
    const d = jd - 2451545.0;
    
    // Mean Longitude of Moon (L)
    let L = 218.316 + 13.176396 * d;
    
    // Mean Anomaly of Moon (M)
    let M = 134.963 + 13.064993 * d;
    
    // Mean Distance of Moon to Ascending Node (F)
    let F = 93.272 + 13.229350 * d;
    
    // Longitude corrections (Equation of Center etc.)
    const degToRad = Math.PI / 180;
    
    let l_adjusted = L + 6.289 * Math.sin(M * degToRad) 
                       - 1.274 * Math.sin((L - 2 * d * 13.176396) * degToRad) // Eviction
                       + 0.658 * Math.sin(2 * (d * 13.176396) * degToRad);  // Variation
                       
    // Normalize to 0-360
    let moonLong = l_adjusted % 360;
    if (moonLong < 0) moonLong += 360;
    
    // Ayanamsa Correction (Lahiri Approx: ~24 degrees in modern times)
    // Approximate Ayanamsa = 23.85 + (Year - 2000) * 0.013 roughly
    const year = date.getFullYear();
    const ayanamsa = 23.85 + (year - 2000) * 0.0139; // Approximation
    
    let siderealMoon = moonLong - ayanamsa;
    if (siderealMoon < 0) siderealMoon += 360;
    
    // Calculate Nakshatra (Size = 13 deg 20 min = 13.3333 deg)
    const nakshatraIndex = Math.floor(siderealMoon / 13.33333);
    
    return nakshatras[nakshatraIndex % 27];
}

/* 3. Choghadiya Calculation */
const choghadiyaDay = ["Udveg", "Chara", "Labh", "Amrit", "Kaal", "Shubh", "Rog"];
const choghadiyaNight = ["Shubh", "Amrit", "Chara", "Rog", "Kaal", "Labh", "Udveg"];

function getChoghadiya(dateStr) {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ...
    
    // Mapping Sunday(0) to array index start
    // Sun: Udveg start. Mon: Amrit start. Tue: Rog. Wed: Labh. Thu: Shubh. Fri: Chara. Sat: Kaal.
    const dayOffsets = { 0: 0, 1: 3, 2: 6, 3: 2, 4: 5, 5: 1, 6: 4 }; // Indexes into choghadiyaDay
    const nightOffsets = { 0: 0, 1: 2, 2: 4, 3: 1, 4: 6, 5: 3, 6: 5 }; // Indexes into choghadiyaNight
    
    const dOffset = dayOffsets[dayOfWeek];
    const nOffset = nightOffsets[dayOfWeek];
    
    let daySequence = [];
    let nightSequence = [];
    
    for(let i=0; i<8; i++) {
        daySequence.push(choghadiyaDay[(dOffset + i) % 7]);
        nightSequence.push(choghadiyaNight[(nOffset + i) % 7]);
    }
    
    return { day: daySequence, night: nightSequence };
}
