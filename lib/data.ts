export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Serums' | 'Moisturizers' | 'Sunscreens' | 'Face Wash' | 'Toners' | 'Face Masks' | 'Lip Care' | 'Haircare' | 'Body Care';
  concern: 'Acne & Pimples' | 'Dark Spots & Pigmentation' | 'Barrier Repair & Dry Skin' | 'Oily & Open Pores' | 'Anti-Aging & Fine Lines' | 'Dullness & Glow';
  skinType: 'All Skin Types' | 'Oily & Combination' | 'Dry to Very Dry' | 'Sensitive Skin';
  originalPrice: number;
  price: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Bestseller' | 'New Launch' | 'Award Winner' | 'Dermatologist Pick' | 'Festive Special';
  image: string;
  galleryImages: string[];
  sizes: string[];
  volume: string;
  inStock: boolean;
  shortDescription: string;
  description: string;
  benefits: string[];
  keyIngredients: { name: string; percentage?: string; purpose: string }[];
  ingredientsList: string;
  howToUse: string[];
  hsnCode: string;
  gstPercent: number;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  skinType?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  summary: string;
  content: string[];
  coverImage: string;
  relatedProductIds: string[];
}

export interface OrderItem {
  product: Product;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  createdAt: string;
  status: 'Processing' | 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  payment: {
    method: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'COD';
    transactionId?: string;
    status: 'Paid' | 'Pending COD Verification' | 'Failed';
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    discount: number;
    couponCode?: string;
    shippingFee: number;
    codFee: number;
    gstAmount: number; // 18% inclusive
    finalTotal: number;
  };
  timeline: {
    status: string;
    time: string;
    description: string;
    completed: boolean;
  }[];
}

// Demo Products with rich Indian skincare botanical & clinical formulations
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kashmiri Kumkumadi Miraculous Radiance Elixir',
    slug: 'kashmiri-kumkumadi-radiance-elixir',
    brand: 'NIKHAAR',
    category: 'Serums',
    concern: 'Dullness & Glow',
    skinType: 'All Skin Types',
    originalPrice: 2499,
    price: 1899,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 1420,
    badge: 'Bestseller',
    image: '/images/kumkumadi_serum.jpg',
    galleryImages: [
      '/images/kumkumadi_serum.jpg',
      '/images/glass_skin_collection.jpg',
      '/images/hero_campaign.jpg'
    ],
    sizes: ['15 ml', '30 ml', '50 ml'],
    volume: '30 ml',
    inStock: true,
    shortDescription: 'Pure Kashmiri Mongra Saffron infused with 26 Ayurvedic herbs for incandescent glass skin.',
    description: 'A luxurious multi-action face oil formulated using classical Ayurvedic Taila Paka Vidhi. Blended with GI-tagged Kashmiri Saffron (Crocus Sativus), Red Sandalwood, Manjistha, and Vetiver. It accelerates cell turnover, reduces stubborn pigmentation, and leaves skin with a deep celestial glow.',
    benefits: [
      'Visible reduction in dark spots and stubborn sun pigmentation in 21 days',
      'Infuses deep cellular hydration without clogging pores',
      'Improves skin luminosity, bounce, and skin barrier resilience',
      '100% natural, certified organic ingredients, cold-processed in copper vessels'
    ],
    keyIngredients: [
      { name: 'Kashmiri Mongra Saffron', percentage: '100% GI Tagged', purpose: 'Brightens skin tone and neutralizes free radical damage' },
      { name: 'Red Sandalwood (Rakta Chandana)', purpose: 'Soothes inflammation and refines skin texture' },
      { name: 'Manjistha Root', purpose: 'Purifies blood and treats micro-hyperpigmentation' },
      { name: 'Licorice Root Extract', purpose: 'Inhibits tyrosinase for even-toned clarity' }
    ],
    ingredientsList: 'Sesamum Indicum (Sesame) Seed Oil, Crocus Sativus (Saffron) Stigma Extract, Santalum Album (Sandalwood) Wood Extract, Rubia Cordifolia (Manjistha) Root, Glycyrrhiza Glabra (Licorice) Root, Nelumbo Nucifera (Lotus) Flower, Vetiveria Zizanioides Root Extract, Goat Milk (Aja Ksheera), Rosa Damascena Flower Oil.',
    howToUse: [
      'Cleanse face thoroughly with a gentle cleanser.',
      'Take 3-4 drops on clean palms and gently press onto damp face and neck.',
      'Massage in upward circular motions for 2 minutes to encourage lymphatic drainage.',
      'Use every evening as the final step of your night ritual.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Barrier Restore 5-Ceramide Hydrating Cream',
    slug: 'barrier-restore-5-ceramide-hydrating-cream',
    brand: 'NIKHAAR',
    category: 'Moisturizers',
    concern: 'Barrier Repair & Dry Skin',
    skinType: 'Dry to Very Dry',
    originalPrice: 1199,
    price: 899,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 980,
    badge: 'Dermatologist Pick',
    image: '/images/moisturizer_cream.jpg',
    galleryImages: [
      '/images/moisturizer_cream.jpg',
      '/images/glass_skin_collection.jpg'
    ],
    sizes: ['50 g', '100 g'],
    volume: '50 g',
    inStock: true,
    shortDescription: 'Bio-identical 5 Ceramide complex with Cica and Madecassoside for instant barrier repair.',
    description: 'Designed specifically for sensitive, sensitized, and barrier-compromised Indian skin exposed to harsh pollution and air conditioning. Reconstructs the lipid matrix within 48 hours while locking in multi-depth moisture with olive squalane and colloidal oat extract.',
    benefits: [
      'Clinically proven to repair damaged barrier in 48 hours',
      'Provides 72-hour continuous hydration without greasy residue',
      'Soothes active redness, stinging, and retinol irritation immediately',
      'Fragrance-free, non-comedogenic, and hypoallergenic'
    ],
    keyIngredients: [
      { name: 'Ceramide NP, AP, EOP, EOS, NS', percentage: '2.5% Complex', purpose: 'Restores the intercellular lipid cement of the stratum corneum' },
      { name: 'Centella Asiatica (Cica) & Madecassoside', purpose: 'Calms irritated skin and stimulates collagen synthesis' },
      { name: 'Olive-Derived Squalane', percentage: '3%', purpose: 'Mimics natural skin sebum for weightless nourishment' },
      { name: 'Colloidal Oat Extract', purpose: 'Relieves itching, tightness, and micro-flaking' }
    ],
    ingredientsList: 'Aqua, Caprylic/Capric Triglyceride, Glycerin, Butylene Glycol, Squalane, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Ceramide EOS, Ceramide NS, Cholesterol, Phytosphingosine, Centella Asiatica Extract, Madecassoside, Colloidal Oatmeal, Sodium Hyaluronate, Panthenol, Tocopherol, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: [
      'Scoop a dime-sized amount using clean fingers.',
      'Apply onto face and neck after water-based serums.',
      'Gently pat until completely absorbed. Suitable for AM and PM use.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Aqua-Light Invisible Gel Sunscreen SPF 50+ PA++++',
    slug: 'aqua-light-invisible-gel-sunscreen-spf50',
    brand: 'NIKHAAR',
    category: 'Sunscreens',
    concern: 'Barrier Repair & Dry Skin',
    skinType: 'All Skin Types',
    originalPrice: 899,
    price: 699,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 2310,
    badge: 'Bestseller',
    image: '/images/spf_sunscreen.jpg',
    galleryImages: [
      '/images/spf_sunscreen.jpg',
      '/images/hero_campaign.jpg'
    ],
    sizes: ['50 ml', '100 ml'],
    volume: '50 ml',
    inStock: true,
    shortDescription: 'Ultra-light water gel SPF 50 with zero white cast, sweat-resistant for Indian weather.',
    description: 'Say goodbye to heavy, sticky sunscreens that leave a ghostly white cast. Formulated with new-generation photostable UV filters (Tinosorb S, Uvinul A Plus) and infused with Hyaluronic Acid and Niacinamide. Dries down to an undetectable velvet-matte touch.',
    benefits: [
      'Guaranteed Zero White Cast on all Indian skin undertones (Fitzpatrick III-VI)',
      'Broad-spectrum UVA/UVB + High Blue Light & Pollution Shield',
      'Water and sweat resistant for up to 80 minutes in high Indian humidity',
      'Does not pill under makeup or irritate the delicate eye area'
    ],
    keyIngredients: [
      { name: 'Tinosorb S & Uvinul A Plus', purpose: 'Next-gen photostable chemical filters with maximum UV absorption' },
      { name: 'Niacinamide (Vitamin B3)', percentage: '2%', purpose: 'Regulates sebum and prevents sun-induced pigmentation' },
      { name: 'Multi-Molecular Hyaluronic Acid', purpose: 'Hydrates deeply without oiliness' },
      { name: 'Green Tea & Cica Leaf Extract', purpose: 'Protects from free radical photo-damage' }
    ],
    ingredientsList: 'Aqua, Ethylhexyl Methoxycinnamate, Butyl Methoxydibenzoylmethane, Octocrylene, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine (Tinosorb S), Diethylamino Hydroxybenzoyl Hexyl Benzoate, Niacinamide, Sodium Hyaluronate, Camellia Sinensis (Green Tea) Leaf Extract, Silica, Ammonium Acryloyldimethyltaurate/VP Copolymer, Phenoxyethanol.',
    howToUse: [
      'Apply generously using the two-finger rule across face and neck 15 minutes before sun exposure.',
      'Reapply every 2 to 3 hours during extended outdoor exposure or after swimming.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: '10% Niacinamide + Centella Pore Refining Serum',
    slug: '10-niacinamide-centella-pore-refining-serum',
    brand: 'NIKHAAR',
    category: 'Serums',
    concern: 'Acne & Pimples',
    skinType: 'Oily & Combination',
    originalPrice: 799,
    price: 599,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 840,
    badge: 'Award Winner',
    image: '/images/kumkumadi_serum.jpg',
    galleryImages: [
      '/images/kumkumadi_serum.jpg',
      '/images/glass_skin_collection.jpg'
    ],
    sizes: ['30 ml'],
    volume: '30 ml',
    inStock: true,
    shortDescription: 'High-purity Niacinamide with Zinc PCA to control excess sebum and fade post-acne marks.',
    description: 'Clinical grade serum specifically tuned for Indian skin prone to hormonal breakouts, enlarged pores, and post-inflammatory erythema (PIE). Combines pure Niacinamide with Zinc PCA and organic Gotu Kola (Centella) to balance sebum secretion while keeping the moisture barrier intact.',
    benefits: [
      'Visibly tightens enlarged pores and refines uneven skin texture in 14 days',
      'Fades dark acne blemishes and stubborn red marks',
      'Normalizes excessive sebum production without drying out skin',
      'Calms cystic inflammation and hormonal flare-ups'
    ],
    keyIngredients: [
      { name: 'Pure Niacinamide (Vitamin B3)', percentage: '10%', purpose: 'Fades hyperpigmentation and restores lipid barrier' },
      { name: 'Zinc PCA', percentage: '1%', purpose: 'Targeted antimicrobial and oil-control agent' },
      { name: 'Centella Asiatica (Gotu Kola)', purpose: 'Reduces redness and speeds wound healing' }
    ],
    ingredientsList: 'Aqua, Niacinamide, Propanediol, Zinc PCA, Centella Asiatica Extract, Sodium Hyaluronate, Hydroxyethylcellulose, Allantoin, Disodium EDTA, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: [
      'Dispense 2-3 drops on cleansed skin.',
      'Gently spread across forehead, cheeks, and chin before heavier creams.',
      'Use morning and night. Follow with sunscreen in the morning.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-5',
    name: 'Pure Damask Rosewater Hydrosol Facial Mist',
    slug: 'pure-damask-rosewater-hydrosol-mist',
    brand: 'NIKHAAR',
    category: 'Toners',
    concern: 'Dullness & Glow',
    skinType: 'All Skin Types',
    originalPrice: 650,
    price: 499,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 1120,
    badge: 'Festive Special',
    image: '/images/glass_skin_collection.jpg',
    galleryImages: [
      '/images/glass_skin_collection.jpg',
      '/images/hero_campaign.jpg'
    ],
    sizes: ['100 ml', '200 ml'],
    volume: '100 ml',
    inStock: true,
    shortDescription: 'Steam-distilled from freshly handpicked Kannauj Damask roses. Alcohol-free hydrating mist.',
    description: 'Sourced from the historic perfume capital of India, Kannauj. 100% pure steam-distilled hydrosol made from harvest-fresh Rosa Damascena petals. Balances skin pH, tightens pores, refreshes tired skin, and acts as a natural booster for face oils and moisturizers.',
    benefits: [
      'Instantly revitalizes and cools dehydrated, fatigued skin in hot climates',
      'Restores optimal 5.5 skin pH after harsh tap water cleansing',
      'Zero alcohol, zero artificial fragrance, 100% pure floral water',
      'Multi-purpose: skin toner, makeup setting mist, and soothing eye compress'
    ],
    keyIngredients: [
      { name: 'Steam-Distilled Kannauj Damask Rose Hydrosol', percentage: '100%', purpose: 'Natural humectant, antioxidant, and anti-inflammatory tonic' }
    ],
    ingredientsList: '100% Pure Steam Distilled Rosa Damascena (Damask Rose) Flower Water.',
    howToUse: [
      'Spray directly onto face with eyes closed from a distance of 15 cm.',
      'Pat lightly into skin, or mist over makeup throughout the day for instant radiance.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-6',
    name: '2% Salicylic Acid + Australian Tea Tree Cleanser',
    slug: '2-salicylic-acid-tea-tree-cleanser',
    brand: 'NIKHAAR',
    category: 'Face Wash',
    concern: 'Acne & Pimples',
    skinType: 'Oily & Combination',
    originalPrice: 699,
    price: 499,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 750,
    badge: 'New Launch',
    image: '/images/spf_sunscreen.jpg',
    galleryImages: [
      '/images/spf_sunscreen.jpg',
      '/images/moisturizer_cream.jpg'
    ],
    sizes: ['100 ml', '150 ml'],
    volume: '100 ml',
    inStock: true,
    shortDescription: 'Gentle BHA foaming cleanser that unplugs blackheads, decongests pores, and prevents breakouts.',
    description: 'An oil-free, non-stripping gel cleanser that dissolves hardened sebum, blackheads, and dead skin cells inside pore walls. Enriched with anti-bacterial Tea Tree essential oil, Allantoin, and soothing Chamomile so your skin feels fresh and clean, never tight or dry.',
    benefits: [
      'Deeply cleanses congested pores and dissolves blackheads and whiteheads',
      'Controls midday oily T-zone shine for up to 8 hours',
      'Sulfate-free formulation that maintains the delicate skin barrier',
      'Safe for daily use without triggering peeling or irritation'
    ],
    keyIngredients: [
      { name: 'Encapsulated Salicylic Acid (BHA)', percentage: '2%', purpose: 'Penetrates oil to clear inside pore linings' },
      { name: 'Australian Tea Tree Leaf Oil', percentage: '0.5%', purpose: 'Natural antibacterial agent that kills P. acnes' },
      { name: 'Allantoin & Chamomile', purpose: 'Buffers acid activity and prevents dehydration' }
    ],
    ingredientsList: 'Aqua, Cocamidopropyl Betaine, Sodium Lauroyl Sarcosinate, Salicylic Acid, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Glycerin, Chamomilla Recutita Extract, Allantoin, Polyquaternium-7, Phenoxyethanol.',
    howToUse: [
      'Take 1-2 pumps onto damp palms and lather up.',
      'Massage across face for 60 seconds, paying extra attention to nose, forehead, and jawline.',
      'Rinse thoroughly with lukewarm water. Use twice daily.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-7',
    name: 'Royal Saffron & Sandalwood Radiance Ubtan Clay Mask',
    slug: 'royal-saffron-sandalwood-ubtan-clay-mask',
    brand: 'NIKHAAR',
    category: 'Face Masks',
    concern: 'Dark Spots & Pigmentation',
    skinType: 'All Skin Types',
    originalPrice: 999,
    price: 749,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 630,
    badge: 'Festive Special',
    image: '/images/glass_skin_collection.jpg',
    galleryImages: [
      '/images/glass_skin_collection.jpg',
      '/images/kumkumadi_serum.jpg'
    ],
    sizes: ['100 g'],
    volume: '100 g',
    inStock: true,
    shortDescription: 'Traditional bridal ubtan elevated with French Kaolin, Kasturi Turmeric, and Chandan.',
    description: 'An indulgent weekly clay treatment inspired by royal Indian Shringaar rituals. Detans stubborn summer sun-exposure, draws out deep urban environmental grime, and polishes dull skin with fine almond powder and aromatic sandalwood oil.',
    benefits: [
      'Detans and brightens dull, tanned skin in a single 15-minute session',
      'Draws out pore impurities without drying or cracking',
      'Non-staining natural Kasturi Manjal gives an ethereal festive golden glow',
      'Infused with pure cold-pressed sweet almond oil for velvety softness'
    ],
    keyIngredients: [
      { name: 'Kashmiri Mongra Saffron', purpose: 'Evens out patchy skin tone and restores brightness' },
      { name: 'Pure Mysore Sandalwood Powder', purpose: 'Cools inflamed skin and tightens relaxed pores' },
      { name: 'Kasturi Turmeric (Wild Curcuma Aromatica)', purpose: 'Potent non-staining antibacterial brightener' },
      { name: 'French Kaolin & Bentonite Clay', purpose: 'Gentle mineral detoxification' }
    ],
    ingredientsList: 'Aqua, Kaolin, Bentonite, Glycerin, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Santalum Album Wood Powder, Curcuma Aromatica Root Extract, Crocus Sativus Stigma Extract, Niacinamide, Xanthan Gum, Phenoxyethanol.',
    howToUse: [
      'Apply an even opaque layer to freshly washed face avoiding the immediate eye area.',
      'Relax for 10-15 minutes until semi-dry (do not allow to dry bone-dry).',
      'Rinse off with water while massaging gently with wet fingertips in circular motions.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-8',
    name: 'Bhringraj & Cold-Pressed Golden Jojoba Hair Vitalizer',
    slug: 'bhringraj-jojoba-hair-vitalizer-oil',
    brand: 'NIKHAAR',
    category: 'Haircare',
    concern: 'Anti-Aging & Fine Lines',
    skinType: 'All Skin Types',
    originalPrice: 1399,
    price: 999,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 520,
    badge: 'Award Winner',
    image: '/images/kumkumadi_serum.jpg',
    galleryImages: [
      '/images/kumkumadi_serum.jpg',
      '/images/glass_skin_collection.jpg'
    ],
    sizes: ['100 ml', '200 ml'],
    volume: '100 ml',
    inStock: true,
    shortDescription: 'Root-activating herbal infusion with King of Hair Bhringraj, Rosemary & Amla.',
    description: 'An intensive Ayurvedic hair oil processed for 21 days with freshly harvested Bhringraj, Brahmi, and Indian Gooseberry (Amla) in cold-pressed Sesame and Golden Jojoba. Strengthens brittle hair follicles, reduces seasonal hair fall, and restores deep shine.',
    benefits: [
      'Reduces hair fall and breakage by up to 82% over 6 weeks',
      'Stimulates dormant hair roots for noticeably thicker crown volume',
      'Cools stressed scalp and relieves tension headaches with botanical herbs',
      'Lightweight non-greasy absorption that washes out cleanly in one shampoo'
    ],
    keyIngredients: [
      { name: 'Eclipta Alba (Bhringraj) Extract', purpose: 'Reactivates hair follicle growth phase (Anagen)' },
      { name: 'Emblica Officinalis (Amla) Fruit Oil', purpose: 'Rich in Vitamin C and antioxidants to prevent premature greying' },
      { name: 'Rosmarinus Officinalis (Rosemary) Leaf Oil', percentage: '1%', purpose: 'Clinically proven to rival minoxidil for follicle density' },
      { name: 'Cold-Pressed Simmondsia Chinensis (Jojoba) Oil', purpose: 'Balances scalp sebum and dissolves buildup' }
    ],
    ingredientsList: 'Sesamum Indicum Seed Oil, Simmondsia Chinensis Seed Oil, Eclipta Alba Extract, Emblica Officinalis Fruit Extract, Bacopa Monnieri (Brahmi) Extract, Rosmarinus Officinalis Leaf Oil, Lavandula Angustifolia Oil, Tocopheryl Acetate.',
    howToUse: [
      'Part hair into sections and apply oil directly to scalp using dropper.',
      'Massage with fingertips in firm circular motions for 5-10 minutes.',
      'Leave on for at least 1 hour or overnight, then wash with mild shampoo.'
    ],
    hsnCode: '330590',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-9',
    name: 'Wild Rose & Cardamom Whipped Body Soufflé',
    slug: 'wild-rose-cardamom-whipped-body-souffle',
    brand: 'NIKHAAR',
    category: 'Body Care',
    concern: 'Barrier Repair & Dry Skin',
    skinType: 'Dry to Very Dry',
    originalPrice: 1299,
    price: 949,
    discountPercent: 27,
    rating: 4.9,
    reviewsCount: 410,
    badge: 'New Launch',
    image: '/images/moisturizer_cream.jpg',
    galleryImages: [
      '/images/moisturizer_cream.jpg',
      '/images/glass_skin_collection.jpg'
    ],
    sizes: ['200 g'],
    volume: '200 g',
    inStock: true,
    shortDescription: 'Air-whipped Shea & Mango Butter with Kashmiri wild rose and warm cardamom essence.',
    description: 'A decadent body butter with a cloud-like whipped texture that melts into the skin on contact. Deeply hydrates ashy elbows, knees, and dry limbs with raw African Shea butter, Indian Mango seed butter, and sweet almond oil, enveloped in an intoxicating floral spice aroma.',
    benefits: [
      'Melts effortlessly without feeling heavy or sticky on clothes',
      'Locks in continuous moisture for 48 hours on winter-dry limbs',
      'Improves skin elasticity and diminishes the look of body stretch marks',
      'Leaves skin with a radiant, satin-sheen finish and luxurious scent'
    ],
    keyIngredients: [
      { name: 'Unrefined Butyrospermum Parkii (Shea) Butter', percentage: '35%', purpose: 'Deep emollient rich in vitamins A & E' },
      { name: 'Mangifera Indica (Mango) Seed Butter', percentage: '15%', purpose: 'Plumps skin and supports lipid structure' },
      { name: 'Elettaria Cardamomum Seed Oil', purpose: 'Aromatic circulatory stimulant that warms and relaxes muscles' }
    ],
    ingredientsList: 'Aqua, Butyrospermum Parkii Butter, Mangifera Indica Seed Butter, Prunus Amygdalus Dulcis Oil, Cetearyl Olivate, Sorbitan Olivate, Rosa Damascena Flower Oil, Elettaria Cardamomum Seed Oil, Glycerin, Tocopherol, Phenoxyethanol.',
    howToUse: [
      'Smooth generously over damp skin immediately after bath or shower.',
      'Massage until fully absorbed, paying special attention to dry knees and elbows.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  },
  {
    id: 'prod-10',
    name: 'Kashmiri Saffron & Almond Peptide Lip Butter',
    slug: 'kashmiri-saffron-peptide-lip-butter',
    brand: 'NIKHAAR',
    category: 'Lip Care',
    concern: 'Dullness & Glow',
    skinType: 'All Skin Types',
    originalPrice: 499,
    price: 399,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 680,
    badge: 'Bestseller',
    image: '/images/moisturizer_cream.jpg',
    galleryImages: [
      '/images/moisturizer_cream.jpg',
      '/images/kumkumadi_serum.jpg'
    ],
    sizes: ['15 g'],
    volume: '15 g',
    inStock: true,
    shortDescription: 'Plumping lip treatment with saffron oil, shea butter, and Volulip peptides.',
    description: 'Restores chapped, pigmented lips caused by smoking, matte lipsticks, or sun exposure. Infused with pure Saffron extract, Ghee, and biomimetic peptides that stimulate hyaluronic acid synthesis for naturally pillowy, rosy lips.',
    benefits: [
      'Heals cracked lips and relieves painful peeling in 24 hours',
      'Fades nicotine and sun-induced lip darkness over 4 weeks',
      'Plumps fine lip lines without stinging or burning',
      'Glossy sheen that can be worn alone or over lipstick'
    ],
    keyIngredients: [
      { name: 'Desi Cow Ghee (Clarified Butter)', purpose: 'Traditional Ayurvedic remedy for deep lip nourishment' },
      { name: 'Kashmiri Saffron Stigma Extract', purpose: 'Brightens dark lip pigmentation' },
      { name: 'Palmitoyl Tripeptide-38 (Volulip)', purpose: 'Stimulates natural lip volume and hydration' }
    ],
    ingredientsList: 'Ricinus Communis Seed Oil, Butyrospermum Parkii Butter, Clarified Butter (Cow Ghee), Cera Alba, Prunus Amygdalus Dulcis Oil, Palmitoyl Tripeptide-38, Crocus Sativus Extract, Tocopherol, Natural Flavor.',
    howToUse: [
      'Swipe across lips as needed throughout the day.',
      'Apply an extra thick layer before sleep as an overnight lip sleeping mask.'
    ],
    hsnCode: '330499',
    gstPercent: 18,
    isFeatured: false
  }
];

// Verified Customer Reviews
export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Ananya Sharma',
    city: 'Bandra West, Mumbai',
    rating: 5,
    title: 'Holy grail for stubborn hyperpigmentation!',
    comment: 'I was very skeptical about facial oils in humid Mumbai weather, but this Kumkumadi elixir is magical. Non-sticky, absorbs completely, and after 3 weeks my post-acne pigmentation has faded significantly. My skin literally glows in morning meetings!',
    date: '28 Oct 2026',
    verifiedBuyer: true,
    skinType: 'Combination'
  },
  {
    id: 'rev-2',
    productId: 'prod-3',
    userName: 'Rohan Mehra',
    city: 'Indiranagar, Bengaluru',
    rating: 5,
    title: 'Zero white cast on dusky skin! Finally!',
    comment: 'Every Indian guy knows the struggle of sunscreens looking like chalk on our beards and dusky skin. The Aqua-Light gel is completely invisible. It dries matte, feels like water, and does not sweat into my eyes during my daily bike commute.',
    date: '25 Oct 2026',
    verifiedBuyer: true,
    skinType: 'Oily'
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'Dr. Priya Varma',
    city: 'South Extension, New Delhi',
    rating: 5,
    title: 'Dermatologist approved barrier repair',
    comment: 'As a dermatologist dealing with Delhi pollution and harsh winter dryness, this 5-ceramide cream has become my top patient recommendation. The lipid balance mimics healthy epidermis perfectly. Calms tretinoin flaking in 2 days.',
    date: '19 Oct 2026',
    verifiedBuyer: true,
    skinType: 'Dry & Sensitive'
  },
  {
    id: 'rev-4',
    productId: 'prod-5',
    userName: 'Kavita Sundaram',
    city: 'R.A. Puram, Chennai',
    rating: 5,
    title: 'Pure Kannauj heaven in a bottle',
    comment: 'The scent is genuine steam-distilled desi gulab — no artificial perfume headache. I keep one bottle in the fridge. Spraying this chilled mist after stepping in from the Chennai afternoon heat is pure bliss.',
    date: '14 Oct 2026',
    verifiedBuyer: true,
    skinType: 'All Skin Types'
  }
];

// Active Coupons
export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 999,
    maxDiscount: 600,
    description: '15% OFF on orders above ₹999 (Max ₹600)',
    expiryDate: '30 Nov 2026'
  },
  {
    code: 'GLOW500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 1999,
    description: 'Flat ₹500 OFF on orders above ₹1,999',
    expiryDate: '15 Dec 2026'
  },
  {
    code: 'FIRST10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 300,
    description: '10% OFF your first order (Min ₹499)',
    expiryDate: '31 Dec 2026'
  }
];

// Blog Articles
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Kashmiri Saffron Miracle: Why Saffron Works for Indian Melasma',
    slug: 'kashmiri-saffron-miracle-hyperpigmentation',
    category: 'Ayurvedic Science',
    readTime: '4 min read',
    date: '01 Nov 2026',
    author: 'Dr. Radhika Sen',
    authorRole: 'Head of Ayurvedic Formulation',
    summary: 'Explore the biochemical reason why Crocin and Safranal in pure Kashmiri saffron inhibit melanin synthesis without irritating sensitive melanocytes.',
    content: [
      'Hyperpigmentation is the single most common skin concern among South Asian skin tones. Indian skin has denser, more reactive melanocytes that trigger stubborn dark spots in response to UV exposure, hormonal shifts, and acne inflammation.',
      'Unlike synthetic chemical bleaches that disrupt skin barrier integrity, authentic Crocus Sativus (Kashmiri Mongra Saffron) contains potent carotenoids including Crocin and Safranal. These natural phytomolecules inhibit tyrosinase activity — the enzyme responsible for melanin production.',
      'When infused into cold-pressed black sesame oil through the traditional 16-step Taila Paka Vidhi, the active bio-actives penetrate through the epidermal barrier directly into deeper dermal layers.',
      'To get the best results, always apply saffron elixir at night when your circadian repair cycle is at its peak. Pair with an SPF 50 sunscreen the following morning to safeguard new skin cells.'
    ],
    coverImage: '/images/kumkumadi_serum.jpg',
    relatedProductIds: ['prod-1', 'prod-7', 'prod-10']
  },
  {
    id: 'blog-2',
    title: 'How to Layer Skincare in High Humidity: The Zero-Pill Guide',
    slug: 'layering-skincare-indian-humidity',
    category: 'Routine Guides',
    readTime: '5 min read',
    date: '24 Oct 2026',
    author: 'Aarav Singhania',
    authorRole: 'Senior Skincare Chemist',
    summary: 'The secret to preventing greasiness and clogged pores in Indian monsoons and coastal cities: the thinnest-to-thickest rule explained.',
    content: [
      'In high humidity cities like Mumbai, Kolkata, and Chennai, heavy occlusives trap sweat and sebum, resulting in rapid congestion and annoying white bumps.',
      'The golden rule for Indian climates is the Water-to-Oil cascade: always start with water-light mists (like pure Kannauj Damask Rosewater), followed by active humectant serums (Niacinamide or Hyaluronic Acid).',
      'Allow each layer 30 seconds to settle into the stratum corneum before applying your moisturizer. In peak summer or high humidity, swap heavy cold creams for weightless ceramide gel formulations.',
      'Finish your morning routine with an alcohol-free, water-gel sunscreen that forms a flexible breathable network over the skin.'
    ],
    coverImage: '/images/glass_skin_collection.jpg',
    relatedProductIds: ['prod-3', 'prod-4', 'prod-5']
  },
  {
    id: 'blog-3',
    title: 'Ceramides vs Hyaluronic Acid: Which Does Your Barrier Actually Need?',
    slug: 'ceramides-vs-hyaluronic-acid-barrier-repair',
    category: 'Ingredient Spotlight',
    readTime: '3 min read',
    date: '15 Oct 2026',
    author: 'Meera Chawla',
    authorRole: 'Clinical Aesthetician',
    summary: 'Learn why Hyaluronic Acid alone can backfire in dry air conditioning, and why multi-ceramides are non-negotiable for skin barrier survival.',
    content: [
      'Think of your skin barrier as a brick-and-mortar wall. Your skin cells are the bricks, and lipids — composed of 50% ceramides, 25% cholesterol, and 15% free fatty acids — are the cement mortar.',
      'Hyaluronic acid is a water-binder. If the ambient air is dry (such as in an air-conditioned office or North Indian winter), HA without lipids can draw water out from your deeper skin layers, worsening dehydration.',
      'Ceramides, on the other hand, actively rebuild the missing mortar so moisture has zero escape routes. For optimal skin recovery, use a serum with humectants followed immediately by a bio-identical 5-ceramide cream.'
    ],
    coverImage: '/images/moisturizer_cream.jpg',
    relatedProductIds: ['prod-2', 'prod-1', 'prod-6']
  }
];

// Indian States and Union Territories
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

// Indian Major Pincode mapping helper
export function lookupIndianPincode(pincode: string): { city: string; state: string; days: number } | null {
  const code = pincode.trim();
  if (!/^\d{6}$/.test(code)) return null;

  const prefix2 = code.slice(0, 2);
  const prefix3 = code.slice(0, 3);

  // Delhi NCR
  if (prefix2 === '11') return { city: 'New Delhi', state: 'Delhi', days: 2 };
  if (prefix3 === '122') return { city: 'Gurugram', state: 'Haryana', days: 2 };
  if (prefix3 === '201') return { city: 'Noida / Ghaziabad', state: 'Uttar Pradesh', days: 2 };

  // Maharashtra
  if (prefix2 === '40') return { city: 'Mumbai', state: 'Maharashtra', days: 2 };
  if (prefix3 === '411') return { city: 'Pune', state: 'Maharashtra', days: 2 };
  if (prefix2 === '44') return { city: 'Nagpur', state: 'Maharashtra', days: 3 };

  // Karnataka
  if (prefix2 === '56') return { city: 'Bengaluru', state: 'Karnataka', days: 2 };

  // Tamil Nadu
  if (prefix2 === '60') return { city: 'Chennai', state: 'Tamil Nadu', days: 2 };

  // Telangana & AP
  if (prefix2 === '50') return { city: 'Hyderabad', state: 'Telangana', days: 2 };

  // West Bengal
  if (prefix2 === '70') return { city: 'Kolkata', state: 'West Bengal', days: 3 };

  // Rajasthan
  if (prefix3 === '302') return { city: 'Jaipur', state: 'Rajasthan', days: 2 };

  // Gujarat
  if (prefix3 === '380') return { city: 'Ahmedabad', state: 'Gujarat', days: 2 };

  // Default fallback for any valid 6-digit Indian PIN
  return { city: 'Express Zone', state: 'India', days: 3 };
}

// Initial Sample Orders for History & Admin
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'AURA-2026-1042',
    trackingNumber: 'BLUEDART-AURA-839210',
    createdAt: '2026-11-01T10:30:00Z',
    status: 'Dispatched',
    customer: {
      fullName: 'Aanya Sen',
      email: 'aanya.sen@example.com',
      phone: '+91 98201 44512'
    },
    shippingAddress: {
      addressLine1: 'Flat 402, Sea Crest Apartments',
      addressLine2: 'Pali Hill, Bandra West',
      landmark: 'Near Carter Road Promenade',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    payment: {
      method: 'UPI',
      transactionId: 'UPI-RAZ-98234710',
      status: 'Paid'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedSize: '30 ml',
        quantity: 1,
        unitPrice: 1899,
        totalPrice: 1899
      },
      {
        product: INITIAL_PRODUCTS[2],
        selectedSize: '50 ml',
        quantity: 1,
        unitPrice: 699,
        totalPrice: 699
      }
    ],
    pricing: {
      subtotal: 2598,
      discount: 389,
      couponCode: 'FESTIVE15',
      shippingFee: 0,
      codFee: 0,
      gstAmount: 395,
      finalTotal: 2209
    },
    timeline: [
      { status: 'Order Placed', time: '01 Nov, 10:30 AM', description: 'Order confirmed and payment verified via UPI', completed: true },
      { status: 'Packed & Quality Checked', time: '01 Nov, 03:15 PM', description: 'Freshly packed in eco-friendly protective carton at Mumbai Hub', completed: true },
      { status: 'Handed to BlueDart Express', time: '02 Nov, 09:40 AM', description: 'Air-waybill generated: BLUEDART-AURA-839210', completed: true },
      { status: 'In Transit', time: '03 Nov, 06:15 AM', description: 'Departed Mumbai Central Sorting Hub', completed: true },
      { status: 'Out for Delivery', time: 'Expected 04 Nov', description: 'Courier executive assigned for doorstep delivery', completed: false },
      { status: 'Delivered', time: 'Expected 04 Nov by 6 PM', description: 'Package handed over with OTP verification', completed: false }
    ]
  }
];
