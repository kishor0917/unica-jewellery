// ─── CONFIRMED WORKING UNSPLASH JEWELRY PHOTOS ───────────────────────────────
const IMG = {
  // RINGS — 3 confirmed working designs, alternated so no adjacent cards match
  ring_a: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=90', // Design A: round rose-gold halo on black ✅
  ring_b: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=90', // Design B: pink cushion halo on white ✅
  // aliases — same photos, used in alternating order across 6 ring products
  ring_c: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=90',  // Design A
  ring_d: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=90',  // Design B
  ring_e: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=90',  // Design A
  ring_f: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=90',  // Design B

  // NECKLACES — confirmed
  neck_gold:    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90',
  neck_emerald: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=90',
  neck_pearl:   'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=90',
  neck_box:     'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90',

  // BRACELETS — confirmed
  brac_gold:    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=90',
  brac_silver:  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=90',
  brac_chain:   'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=90',

  // EARRINGS — 3 unique confirmed
  ear_gold:   'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=90',
  ear_silver: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=90',
  ear_drop:   'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=90',

  // CRAFT
  craft: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=800&q=90',
};

export const products = [

  // ══════════════════════════════════════════════
  //  RINGS — 2 products, each uses a different image
  // ══════════════════════════════════════════════
  {
    id: 1,
    name: 'Lumiere Diamond Ring',
    category: 'rings',
    metal: ['gold', 'rose-gold'],
    stone: ['diamond'],
    material: ['gold', 'diamond'],
    price: 12500, originalPrice: 15000,
    rating: 4.9, reviews: 128, badge: 'Bestseller', certified: true,
    description: '2.4ct brilliant-cut diamond in an 18k rose gold halo band with micro-pavé shoulders.',
    image:  IMG.ring_a,
    images: [IMG.ring_a, IMG.ring_b],
    features: ['2.4ct Brilliant-Cut Diamond','GIA Certified','18k Rose Gold','Handcrafted in Italy'],
  },
  {
    id: 5,
    name: 'Soleil Solitaire Ring',
    category: 'rings',
    metal: ['gold'],
    stone: ['diamond'],
    material: ['gold', 'diamond'],
    price: 18900, originalPrice: null,
    rating: 5.0, reviews: 45, badge: 'Signature', certified: true,
    description: '3.2ct D-color VS1 brilliant diamond in a hand-engraved 18k gold cathedral setting.',
    image:  IMG.ring_b,
    images: [IMG.ring_b, IMG.ring_a],
    features: ['3.2ct D/VS1 Diamond','Hand-Engraved Gold','Cathedral Setting','Bespoke Certificate'],
  },
  // ══════════════════════════════════════════════
  //  NECKLACES
  // ══════════════════════════════════════════════
  {
    id: 2,
    name: 'Celeste Drop Necklace',
    category: 'necklaces',
    metal: ['gold'],
    stone: ['diamond', 'sapphire'],
    material: ['gold', 'diamond'],
    price: 8750, originalPrice: null,
    rating: 4.8, reviews: 94, badge: 'New', certified: true,
    description: '1.8ct teardrop sapphire suspended from a delicate 18k gold chain adorned with diamond accents.',
    image:  IMG.neck_gold,
    images: [IMG.neck_gold, IMG.neck_emerald, IMG.craft],
    features: ['1.8ct Teardrop Sapphire','Diamond Accents','18k Gold Chain','Adjustable Length'],
  },
  {
    id: 6,
    name: 'Riviere Emerald Necklace',
    category: 'necklaces',
    metal: ['gold'],
    stone: ['emerald', 'diamond'],
    material: ['gold', 'diamond'],
    price: 22000, originalPrice: null,
    rating: 4.9, reviews: 38, badge: 'Rare', certified: true,
    description: 'Seven Colombian emeralds alternate with brilliant-cut diamonds in 18k yellow gold.',
    image:  IMG.neck_emerald,
    images: [IMG.neck_emerald, IMG.neck_gold, IMG.craft],
    features: ['7 Colombian Emeralds','Diamond Accents','18k Yellow Gold','Museum Quality'],
  },
  {
    id: 10,
    name: 'Solstice Pearl Necklace',
    category: 'necklaces',
    metal: ['silver'],
    stone: ['pearl'],
    material: ['silver'],
    price: 3900, originalPrice: null,
    rating: 4.7, reviews: 88, badge: 'New', certified: true,
    description: 'South Sea pearls of exceptional lustre, graduated and strung on a sterling silver chain.',
    image:  IMG.neck_pearl,
    images: [IMG.neck_pearl, IMG.neck_box, IMG.craft],
    features: ['South Sea Pearls','8-12mm Graduated','Sterling Silver','45cm Length'],
  },
  {
    id: 14,
    name: 'Serpentine Gold Necklace',
    category: 'necklaces',
    metal: ['gold'],
    stone: ['diamond'],
    material: ['gold', 'diamond'],
    price: 5600, originalPrice: null,
    rating: 4.6, reviews: 145, badge: 'Bestseller', certified: true,
    description: 'Fluid serpentine chain in 18k yellow gold with pavé diamond clasp.',
    image:  IMG.neck_box,
    images: [IMG.neck_box, IMG.neck_gold, IMG.craft],
    features: ['18k Yellow Gold','Diamond Pavé Clasp','Serpentine Link','42cm + Extension'],
  },
  {
    id: 19,
    name: 'Diamond Pendant Necklace',
    category: 'necklaces',
    metal: ['platinum'],
    stone: ['diamond'],
    material: ['platinum', 'diamond'],
    price: 7400, originalPrice: 8800,
    rating: 4.9, reviews: 112, badge: 'Bridal', certified: true,
    description: '1.0ct brilliant diamond in a four-claw platinum setting on a fine cable chain.',
    image:  IMG.neck_gold,
    images: [IMG.neck_gold, IMG.neck_pearl, IMG.craft],
    features: ['1.0ct Brilliant Diamond','Platinum Setting','Fine Cable Chain','GIA Certified'],
  },

  // ══════════════════════════════════════════════
  //  BRACELETS
  // ══════════════════════════════════════════════
  {
    id: 7,
    name: 'Bangle Pavé Bracelet',
    category: 'bracelets',
    metal: ['gold', 'rose-gold'],
    stone: ['diamond'],
    material: ['gold', 'diamond'],
    price: 7800, originalPrice: 9200,
    rating: 4.6, reviews: 156, badge: 'Bridal', certified: true,
    description: '120 brilliant-cut diamonds totaling 2.8ct in 18k rose gold rigid bangle.',
    image:  IMG.brac_gold,
    images: [IMG.brac_gold, IMG.brac_silver, IMG.craft],
    features: ['120 Diamonds (2.8ct)','18k Rose Gold','Rigid Bangle','Hinged Opening'],
  },
  {
    id: 11,
    name: 'Cascade Tennis Bracelet',
    category: 'bracelets',
    metal: ['silver', 'platinum'],
    stone: ['diamond', 'sapphire'],
    material: ['silver', 'platinum', 'diamond'],
    price: 9400, originalPrice: null,
    rating: 4.9, reviews: 54, badge: 'Signature', certified: true,
    description: 'Alternating diamonds and Ceylon sapphires in sterling silver. 5.6ct total weight.',
    image:  IMG.brac_chain,
    images: [IMG.brac_chain, IMG.brac_silver, IMG.craft],
    features: ['5.6ct Mixed Gems','Ceylon Sapphires','Sterling Silver','Box Clasp'],
  },
  {
    id: 15,
    name: 'Arch Cuff Bracelet',
    category: 'bracelets',
    metal: ['gold'],
    stone: ['diamond'],
    material: ['gold', 'diamond'],
    price: 11800, originalPrice: null,
    rating: 4.9, reviews: 27, badge: 'Rare', certified: true,
    description: 'Architectural cuff inspired by Renaissance arches, 3.2ct invisible-set diamonds in 18k gold.',
    image:  IMG.brac_gold,
    images: [IMG.brac_gold, IMG.brac_silver, IMG.craft],
    features: ['3.2ct Invisible Set','18k Yellow Gold','Open Cuff','Adjustable'],
  },
  {
    id: 20,
    name: 'Platinum Cuff Bracelet',
    category: 'bracelets',
    metal: ['platinum'],
    stone: ['diamond'],
    material: ['platinum', 'diamond'],
    price: 13200, originalPrice: null,
    rating: 4.8, reviews: 41, badge: null, certified: true,
    description: 'Sleek platinum cuff with 2.0ct channel-set diamonds — pure, understated magnificence.',
    image:  IMG.brac_silver,
    images: [IMG.brac_silver, IMG.brac_chain, IMG.craft],
    features: ['2.0ct Channel-Set','Pure Platinum','Sleek Cuff','Contemporary Design'],
  },

  // ══════════════════════════════════════════════
  //  EARRINGS — 3 products, each unique photo
  // ══════════════════════════════════════════════
  {
    id: 4,
    name: 'Aurore Stud Earrings',
    category: 'earrings',
    metal: ['silver', 'platinum'],
    stone: ['diamond'],
    material: ['silver', 'platinum', 'diamond'],
    price: 4900, originalPrice: 5800,
    rating: 4.7, reviews: 203, badge: null, certified: true,
    description: '0.75ct round brilliant diamond per ear in a four-prong sterling silver setting.',
    image:  IMG.ear_silver,
    images: [IMG.ear_silver, IMG.ear_gold, IMG.craft],
    features: ['0.75ct per ear','Four-Prong Setting','GIA Certified','Screw-Back Security'],
  },
  {
    id: 8,
    name: 'Chandelier Ruby Earrings',
    category: 'earrings',
    metal: ['gold'],
    stone: ['ruby', 'diamond'],
    material: ['gold', 'diamond'],
    price: 14500, originalPrice: null,
    rating: 4.8, reviews: 72, badge: 'Bridal', certified: true,
    description: 'Cascading Burma rubies and brilliant-cut diamonds in 18k gold chandelier drops.',
    image:  IMG.ear_gold,
    images: [IMG.ear_gold, IMG.ear_silver, IMG.craft],
    features: ['Burma Rubies','Diamond Cascade','18k Gold','Lever-Back Closure'],
  },
  {
    id: 12,
    name: 'Diamond Drop Earrings',
    category: 'earrings',
    metal: ['gold', 'platinum'],
    stone: ['diamond'],
    material: ['gold', 'platinum', 'diamond'],
    price: 10200, originalPrice: null,
    rating: 4.9, reviews: 48, badge: 'Signature', certified: true,
    description: '1.2ct pear-cut diamond drops in a two-claw 18k gold setting — effortless glamour.',
    image:  IMG.ear_drop,
    images: [IMG.ear_drop, IMG.ear_gold, IMG.craft],
    features: ['1.2ct Pear-Cut Diamonds','18k Gold Setting','Two-Claw Mount','GIA Certified'],
  },
];

export const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];
export const materials  = ['gold', 'silver', 'platinum', 'diamond'];

export const bridalCollections = [
  {
    id: 'engagement',
    title: 'Engagement',
    subtitle: 'The Promise',
    description: 'Begin forever with a ring as extraordinary as your love.',
    image: IMG.ring_a,
  },
  {
    id: 'wedding',
    title: 'Wedding Bands',
    subtitle: 'The Union',
    description: 'Bands of eternal commitment, crafted for a lifetime.',
    image: IMG.neck_pearl,
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    subtitle: 'The Celebration',
    description: 'Mark each milestone with timeless beauty.',
    image: IMG.neck_gold,
  },
];
