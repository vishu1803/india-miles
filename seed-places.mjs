/**
 * Seed script — populates the 'places' table with real tourist places
 * from Uttar Pradesh and nearby states.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fhjquepmmeguqhzkziqg.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF1ZXBtbWVndXFoemt6aXFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTk0ODM4MSwiZXhwIjoyMDk3NTI0MzgxfQ.PMnS8z0Ps9vPHtz6NxVt-6KIfe5JrV3BMm9SK-arUj8";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const places = [
  // ==========================================
  // GORAKHPUR DISTRICT (user's detected location)
  // ==========================================
  {
    name: "Gorakhnath Temple",
    category: "Religious",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7606,
    longitude: 83.3732,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Gorakhnath_Temple_Gorakhpur.jpg/1280px-Gorakhnath_Temple_Gorakhpur.jpg",
    description: "Ancient temple dedicated to Guru Gorakhnath, a prominent Hindu saint and founder of the Nath Hindu monastic movement.",
  },
  {
    name: "Ramgarh Tal",
    category: "Nature",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7377,
    longitude: 83.3570,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ramgarh_Tal_Lake_Gorakhpur.jpg/1280px-Ramgarh_Tal_Lake_Gorakhpur.jpg",
    description: "One of the largest artificial lakes in Asia, spread over 1700 acres. A popular recreational and nature spot.",
  },
  {
    name: "Gita Press",
    category: "Cultural",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7545,
    longitude: 83.3647,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gita_press_Gorakhpur.jpg/1280px-Gita_press_Gorakhpur.jpg",
    description: "World's largest publisher of Hindu religious texts. Founded in 1923, it has published over 72 crore books.",
  },
  {
    name: "Vishnu Temple Gorakhpur",
    category: "Religious",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7530,
    longitude: 83.3790,
    image_url: null,
    description: "Historic temple dedicated to Lord Vishnu, attracting devotees from across the region.",
  },
  {
    name: "Railway Museum Gorakhpur",
    category: "Museum",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7455,
    longitude: 83.3637,
    image_url: null,
    description: "Home to vintage locomotives and railway memorabilia. Gorakhpur has the world's longest railway platform.",
  },
  {
    name: "Imambara Gorakhpur",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    city: "Gorakhpur",
    latitude: 26.7588,
    longitude: 83.3725,
    image_url: null,
    description: "A historic Imambara known for its architectural beauty and cultural significance.",
  },

  // ==========================================
  // NEARBY DISTRICTS IN UTTAR PRADESH
  // ==========================================
  {
    name: "Kushinagar (Mahaparinirvana Temple)",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Kushinagar",
    city: "Kushinagar",
    latitude: 26.7396,
    longitude: 83.8885,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mahaparinirvana_temple_Kushinagar.jpg/1280px-Mahaparinirvana_temple_Kushinagar.jpg",
    description: "Sacred Buddhist pilgrimage site where Lord Buddha attained Mahaparinirvana. UNESCO World Heritage tentative list.",
  },
  {
    name: "Lumbini (Buddha's Birthplace)",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Siddharthnagar",
    city: "Kapilvastu",
    latitude: 27.4833,
    longitude: 83.2767,
    image_url: null,
    description: "Region near the birthplace of Gautama Buddha. Rich in Buddhist heritage and ancient ruins.",
  },

  // VARANASI
  {
    name: "Kashi Vishwanath Temple",
    category: "Religious",
    state: "Uttar Pradesh",
    district: "Varanasi",
    city: "Varanasi",
    latitude: 25.3109,
    longitude: 83.0107,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kashi_Vishwanath_Temple_Varanasi.jpg/800px-Kashi_Vishwanath_Temple_Varanasi.jpg",
    description: "One of the most famous Hindu temples dedicated to Lord Shiva, located on the western bank of the holy Ganges.",
  },
  {
    name: "Sarnath",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Varanasi",
    city: "Sarnath",
    latitude: 25.3814,
    longitude: 83.0227,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Dhamek_Stupa%2C_Sarnath.jpg/1280px-Dhamek_Stupa%2C_Sarnath.jpg",
    description: "Ancient Buddhist pilgrimage site where Buddha gave his first sermon. Home to the famous Ashoka Pillar and Dhamek Stupa.",
  },
  {
    name: "Dashashwamedh Ghat",
    category: "Cultural",
    state: "Uttar Pradesh",
    district: "Varanasi",
    city: "Varanasi",
    latitude: 25.3046,
    longitude: 83.0108,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Evening_aarti_at_Dashashwamedh_ghat.jpg/1280px-Evening_aarti_at_Dashashwamedh_ghat.jpg",
    description: "The main ghat in Varanasi on the Ganges river. Famous for the spectacular Ganga Aarti ceremony every evening.",
  },

  // LUCKNOW
  {
    name: "Bara Imambara",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Lucknow",
    city: "Lucknow",
    latitude: 26.8691,
    longitude: 80.9122,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bada_Imambara_Lucknow.jpg/1280px-Bada_Imambara_Lucknow.jpg",
    description: "An 18th-century Mughal monument with the famous Bhool Bhulaiya labyrinth. One of the largest structures of its kind.",
  },
  {
    name: "Hazratganj",
    category: "Cultural",
    state: "Uttar Pradesh",
    district: "Lucknow",
    city: "Lucknow",
    latitude: 26.8521,
    longitude: 80.9462,
    image_url: null,
    description: "The heart of Lucknow, a bustling market street known for shopping, street food, and colonial-era architecture.",
  },

  // AGRA
  {
    name: "Taj Mahal",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Agra",
    city: "Agra",
    latitude: 27.1751,
    longitude: 78.0421,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
    description: "An ivory-white marble mausoleum built by Mughal Emperor Shah Jahan. One of the Seven Wonders of the World.",
  },
  {
    name: "Agra Fort",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Agra",
    city: "Agra",
    latitude: 27.1795,
    longitude: 78.0211,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Agra_Fort_Amar_Singh_Gate.jpg/1280px-Agra_Fort_Amar_Singh_Gate.jpg",
    description: "A UNESCO World Heritage Site. A massive red sandstone fort on the banks of the Yamuna, built by Emperor Akbar.",
  },
  {
    name: "Fatehpur Sikri",
    category: "Historical",
    state: "Uttar Pradesh",
    district: "Agra",
    city: "Fatehpur Sikri",
    latitude: 27.0940,
    longitude: 77.6610,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/1280px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg",
    description: "A 16th-century Mughal ghost city built by Emperor Akbar. UNESCO World Heritage Site with stunning architecture.",
  },

  // PRAYAGRAJ (ALLAHABAD)
  {
    name: "Triveni Sangam",
    category: "Religious",
    state: "Uttar Pradesh",
    district: "Prayagraj",
    city: "Prayagraj",
    latitude: 25.4270,
    longitude: 81.8854,
    image_url: null,
    description: "The sacred confluence of the Ganges, Yamuna, and the mythical Saraswati rivers. Host to the Kumbh Mela.",
  },
  {
    name: "Anand Bhavan",
    category: "Museum",
    state: "Uttar Pradesh",
    district: "Prayagraj",
    city: "Prayagraj",
    latitude: 25.4545,
    longitude: 81.8397,
    image_url: null,
    description: "Historic residence of the Nehru family, now a museum showcasing India's freedom struggle.",
  },

  // AYODHYA
  {
    name: "Ram Mandir Ayodhya",
    category: "Religious",
    state: "Uttar Pradesh",
    district: "Ayodhya",
    city: "Ayodhya",
    latitude: 26.7955,
    longitude: 82.1940,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Shri_Ram_Janmbhoomi_Mandir%2C_Ayodhya.jpg/1280px-Shri_Ram_Janmbhoomi_Mandir%2C_Ayodhya.jpg",
    description: "The grand temple at the birthplace of Lord Ram, one of the most significant religious sites in India.",
  },

  // ==========================================
  // NEARBY STATES — BIHAR
  // ==========================================
  {
    name: "Mahabodhi Temple",
    category: "Religious",
    state: "Bihar",
    district: "Gaya",
    city: "Bodh Gaya",
    latitude: 24.6961,
    longitude: 84.9911,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhi_temple_and_animesa_locana.jpg/800px-Mahabodhi_temple_and_animesa_locana.jpg",
    description: "UNESCO World Heritage Site where Gautama Buddha attained enlightenment under the Bodhi tree.",
  },
  {
    name: "Nalanda University Ruins",
    category: "Historical",
    state: "Bihar",
    district: "Nalanda",
    city: "Nalanda",
    latitude: 25.1357,
    longitude: 85.4428,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nalanda_University_Ruins.jpg/1280px-Nalanda_University_Ruins.jpg",
    description: "Ruins of the ancient Nalanda Mahavihara, one of the oldest universities in the world. UNESCO World Heritage Site.",
  },
  {
    name: "Rajgir",
    category: "Historical",
    state: "Bihar",
    district: "Nalanda",
    city: "Rajgir",
    latitude: 25.0283,
    longitude: 85.4166,
    image_url: null,
    description: "Ancient city with hot springs, Buddhist ruins, and the Vishwa Shanti Stupa on Ratnagiri hill.",
  },

  // ==========================================
  // NEARBY STATES — MADHYA PRADESH
  // ==========================================
  {
    name: "Khajuraho Temples",
    category: "Historical",
    state: "Madhya Pradesh",
    district: "Chhatarpur",
    city: "Khajuraho",
    latitude: 24.8318,
    longitude: 79.9199,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Khajuraho_-_Kandariya_Mahadeo_Temple.jpg/1280px-Khajuraho_-_Kandariya_Mahadeo_Temple.jpg",
    description: "UNESCO World Heritage group of Hindu and Jain temples known for their stunning nagara-style architecture and sculptures.",
  },
  {
    name: "Sanchi Stupa",
    category: "Historical",
    state: "Madhya Pradesh",
    district: "Raisen",
    city: "Sanchi",
    latitude: 23.4793,
    longitude: 77.7399,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sanchi_Stupa_from_Eastern_gate%2C_Sanchi_Hill.jpg/1280px-Sanchi_Stupa_from_Eastern_gate%2C_Sanchi_Hill.jpg",
    description: "One of the oldest stone structures in India. Built by Emperor Ashoka in the 3rd century BCE. UNESCO World Heritage Site.",
  },

  // ==========================================
  // NEARBY STATES — JHARKHAND
  // ==========================================
  {
    name: "Deoghar (Baidyanath Temple)",
    category: "Religious",
    state: "Jharkhand",
    district: "Deoghar",
    city: "Deoghar",
    latitude: 24.4921,
    longitude: 86.6945,
    image_url: null,
    description: "One of the twelve Jyotirlingas of Lord Shiva. An important Hindu pilgrimage destination.",
  },

  // ==========================================
  // NEARBY STATES — UTTARAKHAND
  // ==========================================
  {
    name: "Haridwar Har Ki Pauri",
    category: "Religious",
    state: "Uttarakhand",
    district: "Haridwar",
    city: "Haridwar",
    latitude: 29.9588,
    longitude: 78.1693,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Haridwar_Ganga_Aarti.jpg/1280px-Haridwar_Ganga_Aarti.jpg",
    description: "Sacred ghat on the banks of the Ganges in Haridwar. Famous for the daily Ganga Aarti ceremony at sunset.",
  },
  {
    name: "Rishikesh",
    category: "Adventure",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Rishikesh",
    latitude: 30.0869,
    longitude: 78.2676,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Lakshman_Jhula_Bridge%2C_Rishikesh.jpg/1280px-Lakshman_Jhula_Bridge%2C_Rishikesh.jpg",
    description: "The yoga capital of the world. Known for adventure sports, ashrams, and the iconic Lakshman Jhula bridge.",
  },
];

async function seed() {
  console.log(`Seeding ${places.length} places into Supabase...\n`);

  const { data, error } = await supabase.from("places").insert(places).select();

  if (error) {
    console.error("❌ Seed error:", error.message);
    console.error("Details:", JSON.stringify(error, null, 2));
    return;
  }

  console.log(`✅ Successfully inserted ${data.length} places!\n`);

  // Verify
  const { count } = await supabase
    .from("places")
    .select("*", { count: "exact", head: true });
  console.log(`Total rows in 'places' table: ${count}`);

  // Show Gorakhpur district matches
  const { data: gorakhpurPlaces } = await supabase
    .from("places")
    .select("name, district")
    .eq("district", "Gorakhpur");
  console.log(`\nGorakhpur district places: ${gorakhpurPlaces?.length}`);
  gorakhpurPlaces?.forEach((p) => console.log(`  → ${p.name}`));
}

seed().catch(console.error);
