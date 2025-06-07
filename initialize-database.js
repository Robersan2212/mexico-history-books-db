import { DatabaseOperations } from './database-operations.js';

const periods = [
  {
    id: 'porfiriato',
    name: 'Porfiriato',
    yearRange: { start: 1876, end: 1911 },
    description: 'The era of Porfirio Díaz\'s rule in Mexico'
  },
  {
    id: 'mexican_revolution',
    name: 'Mexican Revolution',
    yearRange: { start: 1910, end: 1920 },
    description: 'The Mexican Revolution period'
  },
  {
    id: 'post_revolutionary',
    name: 'Post-Revolutionary Mexico',
    yearRange: { start: 1920, end: 1940 },
    description: 'Post-Revolutionary reconstruction period'
  },
  {
    id: 'pri_era',
    name: 'PRI Era & Modernization',
    yearRange: { start: 1940, end: 1990 },
    description: 'PRI dominance and modernization period'
  },
  {
    id: 'contemporary',
    name: 'Contemporary Mexico',
    yearRange: { start: 1990, end: 2025 },
    description: 'Modern Mexico from 1990s to present'
  },
  {
    id: 'broader_periods',
    name: 'Broader/Multiple Periods',
    yearRange: { start: 1300, end: 2025 },
    description: 'Books covering multiple historical periods'
  }
];

const books = [
  // Porfiriato (1876–1911) - 1 book
  {
    title: "Porfirio Díaz",
    authors: ["Paul Garner"],
    isbn: "9780582772545",
    period: "porfiriato",
    category: "biography",
    yearRange: { start: 1876, end: 1911 }
  },
  
  // Mexican Revolution (1910–1920) - 7 books
  {
    title: "The Mexican Revolution: A Short History 1910–1920",
    authors: ["Stuart Easterling"],
    isbn: "9781608461783",
    period: "mexican_revolution",
    category: "general_history",
    yearRange: { start: 1910, end: 1920 }
  },
  {
    title: "Zapata and the Mexican Revolution",
    authors: ["John Womack Jr."],
    isbn: "9780394708539",
    period: "mexican_revolution",
    category: "biography",
    yearRange: { start: 1910, end: 1920 }
  },
  {
    title: "Villa and Zapata: A History of the Mexican Revolution",
    authors: ["Frank McLynn"],
    isbn: "9780786708412",
    period: "mexican_revolution",
    category: "general_history",
    yearRange: { start: 1910, end: 1920 }
  },
  {
    title: "The Life and Times of Pancho Villa",
    authors: ["Friedrich Katz"],
    isbn: "9780804730464",
    period: "mexican_revolution",
    category: "biography",
    yearRange: { start: 1910, end: 1920 }
  },
  {
    title: "The Wind that Swept Mexico: The History of the Mexican Revolution of 1910–1942",
    authors: ["Anita Brenner", "George R. Leighton"],
    isbn: "9780292790232",
    period: "mexican_revolution",
    category: "general_history",
    yearRange: { start: 1910, end: 1942 }
  },
  {
    title: "The Last Caudillo: Alvaro Obregón and the Mexican Revolution",
    authors: ["Jürgen Buchenau"],
    isbn: "9781442209005",
    period: "mexican_revolution",
    category: "biography",
    yearRange: { start: 1910, end: 1920 }
  },
  {
    title: "Bad Mexicans: Race, Empire, and Revolution in the Borderlands",
    authors: ["Kelly Lytle Hernández"],
    isbn: "9781328745521",
    period: "mexican_revolution",
    category: "social_history",
    yearRange: { start: 1910, end: 1920 }
  },
  
  // Post-Revolutionary Mexico (1920s–1940s) - 2 books
  {
    title: "Unrevolutionary Mexico",
    authors: ["Paul Gillingham"],
    isbn: "9780300253245",
    period: "post_revolutionary",
    category: "political_history",
    yearRange: { start: 1920, end: 1940 }
  },
  {
    title: "Cardenismo, Juggernaut or Jalopy?",
    authors: ["Alan Knight"],
    isbn: "9780521593930",
    period: "post_revolutionary",
    category: "political_history",
    yearRange: { start: 1920, end: 1940 }
  },
  
  // PRI Era & Modernization (1940s–1990s) - 4 books
  {
    title: "Mexico's Once and Future Revolution",
    authors: ["Gilbert M. Joseph", "Jürgen Buchenau"],
    isbn: "9780822355042",
    period: "pri_era",
    category: "general_history",
    yearRange: { start: 1940, end: 1990 }
  },
  {
    title: "Fragments of a Golden Age: The Politics of Culture in Mexico since 1940",
    authors: ["Gilbert M. Joseph", "Anne Rubenstein", "Eric Zolov"],
    isbn: "9780822324925",
    period: "pri_era",
    category: "cultural_history",
    yearRange: { start: 1940, end: 1990 }
  },
  {
    title: "Mexico Profundo: Reclaiming a Civilization",
    authors: ["Guillermo Bonfil Batalla"],
    isbn: "9780292708435",
    period: "pri_era",
    category: "anthropology",
    yearRange: { start: 1940, end: 1990 }
  },
  {
    title: "The Mexico Reader: History, Culture, Politics",
    authors: ["Gilbert M. Joseph", "Timothy J. Henderson"],
    isbn: "9780822330421",
    period: "pri_era",
    category: "anthology",
    yearRange: { start: 1940, end: 1990 }
  },
  
  // Contemporary Mexico (1990s–Present) - 3 books
  {
    title: "The Fire and the Word: A History of the Zapatista Movement",
    authors: ["Gloria Muñoz Ramírez"],
    isbn: "9780872864886",
    period: "contemporary",
    category: "political_history",
    yearRange: { start: 1990, end: 2025 }
  },
  {
    title: "The Dope: The Real History of the Mexican Drug Trade",
    authors: ["Benjamin T. Smith"],
    isbn: "9781324090779",
    period: "contemporary",
    category: "social_history",
    yearRange: { start: 1990, end: 2025 }
  },
  {
    title: "Basta!: Land and the Zapatista Rebellion in Chiapas",
    authors: ["George A. Collier"],
    isbn: "9780935028963",
    period: "contemporary",
    category: "political_history",
    yearRange: { start: 1990, end: 2025 }
  },
  
  // Broader/Multiple Periods - 3 books
  {
    title: "Fifth Sun: A New History of the Aztecs",
    authors: ["Camilla Townsend"],
    isbn: "9780190673062",
    period: "broader_periods",
    category: "pre_columbian",
    yearRange: { start: 1300, end: 1521 }
  },
  {
    title: "The Broken Spears: The Aztec Account of the Conquest of Mexico",
    authors: ["Miguel León-Portilla"],
    isbn: "9780807055007",
    period: "broader_periods",
    category: "pre_columbian",
    yearRange: { start: 1519, end: 1521 }
  },
  {
    title: "Noticias del Imperio",
    authors: ["Fernando del Paso"],
    isbn: "9789684114982",
    period: "broader_periods",
    category: "historical_fiction",
    yearRange: { start: 1860, end: 1867 }
  }
];

export async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Mexican History Books Database...\n');
    
    // Insert all periods first
    console.log('📅 Adding historical periods...');
    for (const period of periods) {
      await DatabaseOperations.insertPeriod(period);
    }
    
    console.log('\n📚 Adding books...');
    let bookCount = 0;
    
    // Insert all books with progress tracking
    for (const book of books) {
      await DatabaseOperations.insertBook(book);
      bookCount++;
      console.log(`   Progress: ${bookCount}/${books.length} books added`);
    }
    
    console.log('\n✅ Database initialization complete!');
    console.log(`📊 Successfully added:`);
    console.log(`   • ${periods.length} historical periods`);
    console.log(`   • ${books.length} books total`);
    console.log(`\n📈 Books by period:`);
    console.log(`   • Porfiriato: 1 book`);
    console.log(`   • Mexican Revolution: 7 books`);
    console.log(`   • Post-Revolutionary: 2 books`);
    console.log(`   • PRI Era & Modernization: 4 books`);
    console.log(`   • Contemporary Mexico: 3 books`);
    console.log(`   • Broader/Multiple Periods: 3 books`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// If running this file directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('🎉 Database setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}
