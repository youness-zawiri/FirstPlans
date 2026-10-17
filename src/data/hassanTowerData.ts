import { ArchitecturalDimension, CameraViewPreset, HistoricalChapter, Hotspot } from '../types.ts';

export const CAMERA_PRESETS: CameraViewPreset[] = [
  {
    id: 'overview',
    name: {
      ar: 'بانوراما شاملة',
      fr: 'Vue Panoramique',
      en: 'Panoramic View',
    },
    position: [0, 24, -58],
    target: [0, 18, 0],
    fov: 45,
  },
  {
    id: 'tower_closeup',
    name: {
      ar: 'تفاصيل الصومعة',
      fr: 'Détails du Minaret',
      en: 'Tower Close-up',
    },
    position: [-16, 26, 22],
    target: [0, 24, 0],
    fov: 42,
  },
  {
    id: 'columns_walk',
    name: {
      ar: 'ممشى الأعمدة (348 عمود)',
      fr: 'Forêt de Colonnes',
      en: 'Forest of Columns',
    },
    position: [18, 4, 45],
    target: [0, 15, 0],
    fov: 50,
  },
  {
    id: 'aerial_drone',
    name: {
      ar: 'مشهد علوي دروني',
      fr: 'Vue Aérienne Drone',
      en: 'Aerial Drone View',
    },
    position: [0, 85, 45],
    target: [0, 12, 35],
    fov: 52,
  },
  {
    id: 'mausoleum_vista',
    name: {
      ar: 'إطلالة الضريح والفسقية',
      fr: 'Esplanade du Mausolée',
      en: 'Mausoleum Esplanade',
    },
    position: [0, 14, 130],
    target: [0, 18, 20],
    fov: 45,
  },
  {
    id: 'sunset_gate',
    name: {
      ar: 'بوابة الغروب ونهر أبي رقراق',
      fr: 'Perspective du Couchant',
      en: 'Sunset River Gate',
    },
    position: [-45, 12, -25],
    target: [0, 22, 10],
    fov: 48,
  },
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'minaret_facades',
    title: {
      ar: 'صومعة حسان وزخارف الشبيكة الموحدية',
      fr: 'Le Minaret et Motifs Sebka',
      en: 'Hassan Minaret & Sebka Lattice',
    },
    subtitle: {
      ar: 'تحفة العمارة الموحدية بالقرن الثاني عشر',
      fr: 'Chef-d’œuvre Almohade du XIIe siècle',
      en: '12th-century Almohad Architectural Masterpiece',
    },
    description: {
      ar: 'شيدت الصومعة بالحجر الرملي الوردي المقاوم لعوامل الزمن. تتميز واجهاتها الأربع بنقوش فريدة ومختلفة عن بعضها، مزدانة بعقود حدوية مفصصة وزخرفة "الشبكة" (Sebka) الأندلسية المتشابكة.',
      fr: 'Érigée en grès rouge calcaire. Les quatre façades présentent chacune une composition ornementale unique d’arcs outrepassés brisés et de panneaux en losanges entrelacés dits "Sebka".',
      en: 'Built from local red calcarenite sandstone. Its four facades boast distinct Moorish polylobed blind arcades and interlaced lozenge tracery known as "Sebka".',
    },
    architecturalDetails: [
      {
        ar: 'الارتفاع الحالي: 44 متراً (كان مخططاً لها 60-80 متراً)',
        fr: 'Hauteur actuelle: 44 mètres (60-80 m prévus)',
        en: 'Preserved height: 44 meters (60-80 m planned)',
      },
      {
        ar: 'القاعدة المربعة: 16 × 16 متراً بسمك جداري 2.5م',
        fr: 'Base carrée: 16 × 16 mètres, murs de 2,5 m',
        en: 'Square base: 16 × 16 meters, 2.5m thick walls',
      },
      {
        ar: 'الواجهات الأربع: لكل واجهة تصميم أقواس وقناطر مستقل',
        fr: 'Façades: 4 agencements ornementaux distincts',
        en: 'Four facades: individual architectural compositions',
      },
    ],
    position: [0, 22, 9],
    category: 'tower',
  },
  {
    id: 'internal_ramp',
    title: {
      ar: 'المنحدر الداخلي المخصص للفرسان',
      fr: 'La Rampe Intérieure Équestre',
      en: 'The Internal Equestrian Ramp',
    },
    subtitle: {
      ar: 'تصميم هندسي عبقري بدل الأدراج التقليدية',
      fr: 'Rampe inclinée accessible à cheval',
      en: 'Continuous ramp for horse and rider',
    },
    description: {
      ar: 'بدلاً من السلالم العادية، تحتوي الصومعة على منحدر عريض مائل يلتف حول قلب حجري مركزي يضم غرفاً متدرجة. سمح هذا التصميم للمؤذن ورجال الصيانة بالصعود إلى القمة ممتطين الخيول ومحملين بمواد البناء.',
      fr: 'Au lieu d’un escalier classique, le minaret renferme une rampe douce en spirale permettant au muezzin de monter à cheval ou à dos de bête chargée d’approvisionnements.',
      en: 'Instead of conventional steps, a continuous gentle incline wraps around a central stone core, allowing the muezzin to ride horseback to the upper galleries.',
    },
    architecturalDetails: [
      {
        ar: 'عرض المنحدر: حوالي مترين بميلان تدريجي مريح',
        fr: 'Largeur de rampe: environ 2 mètres en pente douce',
        en: 'Ramp width: approx 2 meters with gentle slope',
      },
      {
        ar: 'النوافذ المنحدرة: فتحات مائلة تتبع بدقة مسار الصعود',
        fr: 'Meurtrières obliques suivant le tracé ascendant',
        en: 'Slanted windows aligned with the climbing ramp',
      },
      {
        ar: 'القلب المركزي: 6 قاعات تعلو إحداها الأخرى بأسقف مقببة',
        fr: 'Noyau central: 6 salles superposées voûtées',
        en: 'Central core: 6 stacked vaulted chambers',
      },
    ],
    position: [0, 16, 0],
    category: 'tower',
  },
  {
    id: 'forest_of_columns',
    title: {
      ar: 'غابة الأعمدة الأثرية (348 عموداً)',
      fr: 'La Forêt des 348 Colonnes',
      en: 'The Forest of 348 Columns',
    },
    subtitle: {
      ar: 'بقايا أكبر قاعة صلاة موحدية في العالم الإسلامي',
      fr: 'Vestiges de la salle de prière hypostyle',
      en: 'Remains of the Grand Hypostyle Mosque Hall',
    },
    description: {
      ar: 'تمتد في الفناء 348 أسطوانة وعموداً حجرياً رخامياً ترمز إلى قاعة الصلاة الضخمة ذات الـ 21 بلاطة، والتي كانت تتسع لأكثر من 20 ألف مصلٍ، وانهار سقفها الخشبي الأرزي في زلزال لشبونة الشهير عام 1755م.',
      fr: '348 fûts de colonnes cylindriques en pierre calcaire et marbre composaient la vaste salle de prière à 21 nefs, capable d’accueillir 20 000 fidèles avant le séisme de Lisbonne en 1755.',
      en: '348 stone column drums mark the colossal 21-aisle prayer hall intended for 20,000 worshippers, whose cedar roofs were destroyed in the 1755 Lisbon earthquake.',
    },
    architecturalDetails: [
      {
        ar: 'العدد: 348 عموداً أسطوانياً و4 ركائز ركنية ضخمة',
        fr: 'Effectif: 348 colonnes et 4 piliers d’angle',
        en: 'Quantity: 348 cylindrical columns & 4 main piers',
      },
      {
        ar: 'التوزيع: 21 بلاطة عمودية على جدار القبلة',
        fr: 'Distribution: 21 nefs perpendiculaires à la qibla',
        en: 'Layout: 21 aisles perpendicular to the Qibla wall',
      },
      {
        ar: 'مساحة المسجد: 183 × 139 متراً (أكثر من 25 ألف متر مربع)',
        fr: 'Superficie: 183 × 139 mètres (25 400 m²)',
        en: 'Mosque Area: 183 × 139 meters (25,400 m²)',
      },
    ],
    position: [0, 4, 52],
    category: 'columns',
  },
  {
    id: 'fountain_basin',
    title: {
      ar: 'الفسقية وصهريج الوضوء الموحدي',
      fr: 'Le Bassin d’Ablutions et Zellij',
      en: 'Ablution Fountain & Moroccan Zellij',
    },
    subtitle: {
      ar: 'هندسة المياه المغربية التقليدية',
      fr: 'Hydraulique et art du zellige marocain',
      en: 'Traditional Moroccan Water Engineering',
    },
    description: {
      ar: 'فسقية رخامية ثمانية الأضلاع مبطنة بفسيفساء الزليج المغربي الملون، كانت مخصصة لوضوء المصلين وتغذى عبر قنوات مائية موحدية ذكية متصلة بعيون وادي أبي رقراق.',
      fr: 'Bassin octogonal en marbre incrusté de zelliges traditionnels, conçu pour les ablutions rituelles et alimenté jadis par le réseau hydraulique almohade.',
      en: 'Octagonal marble fountain basin lined with authentic geometric Moroccan zellij, providing ritual ablution water via historic Almohad aqueducts.',
    },
    architecturalDetails: [
      {
        ar: 'الشكل: حوض ثماني الأضلاع بزوايا متناظرة',
        fr: 'Forme: Bassin octogonal harmonieux',
        en: 'Shape: Symmetrical octagonal basin',
      },
      {
        ar: 'الزليج: نجوم ثمانية بألوان الفيروزي والتراكوتا والذهب',
        fr: 'Zellige: Motifs étoilés à 8 branches',
        en: 'Zellij: 8-pointed star mosaic in turquoise and ochre',
      },
    ],
    position: [0, 2, -22],
    category: 'fountain',
  },
  {
    id: 'mausoleum_area',
    title: {
      ar: 'ضريح محمد الخامس التذكاري',
      fr: 'Mausolée Mohammed V',
      en: 'Mausoleum of Mohammed V',
    },
    subtitle: {
      ar: 'صرح العمارة المغربية الحديثة مقابل التاريخ الموحدي',
      fr: 'Écrin moderne de l’artisanat marocain',
      en: 'Modern Moroccan Royal Monument',
    },
    description: {
      ar: 'يقع في الجهة الجنوبية من باحة الصومعة. شيد بين 1961 و1971 تكريماً للملك الراحل محمد الخامس محرر الوطن، ويضم جثمانه وجثمان الملك الحسن الثاني والأمير مولاي عبد الله، ويعلوه سقف هرمي من القرميد الأخضر الزمردي.',
      fr: 'Érigé au sud de l’esplanade (1961-1971), ce chef-d’œuvre abrite les sépultures de Mohammed V et Hassan II sous une toiture pyramidale de tuiles vertes vernissées.',
      en: 'Standing at the southern end, this white Italian marble monument with its emerald-green pyramidal roof houses the tombs of King Mohammed V and King Hassan II.',
    },
    architecturalDetails: [
      {
        ar: 'المواد: رخام كرارا الإيطالي، خشب الأرز المنقوش، الجبص المغربي',
        fr: 'Matériaux: Marbre blanc, cèdre sculpté, plâtre ciselé',
        en: 'Materials: White marble, carved cedarwood, sculpted plaster',
      },
      {
        ar: 'السقف: قرميد أخضر زمردي هرمي بارتفاع مهيب',
        fr: 'Toit: Tuiles vertes vernissées pyramidales',
        en: 'Roof: Iconic emerald-green glazed tiles',
      },
    ],
    position: [0, 16, 122],
    category: 'mausoleum',
  },
  {
    id: 'mihrab_qibla',
    title: {
      ar: 'محراب المسجد الكبير وجدار القبلة',
      fr: 'Le Grand Mihrab et Mur de Qibla',
      en: 'The Grand Mihrab & Qibla Wall',
    },
    subtitle: {
      ar: 'الاتجاه نحو مكة المكرمة في عهد الموحدين',
      fr: 'Orientation rituelle vers La Mecque',
      en: 'Sacred Direction towards Mecca',
    },
    description: {
      ar: 'حنية المحراب الموحدية الضخمة تتوسط جدار القبلة الجنوبي، محاطة بإفريز مزخرف بعقود متجاوزة تظهر دقة الحسابات الفلكية والهندسية لعلماء العصر الموحدي.',
      fr: 'L’imposante niche du mihrab almohade au centre du mur de qibla, témoin de la maîtrise astronomique et géométrique des bâtisseurs du XIIe siècle.',
      en: 'The monumental Almohad horseshoe mihrab niche anchors the southern wall, showcasing the astronomical precision of medieval Moroccan surveyors.',
    },
    architecturalDetails: [
      {
        ar: 'التوجيه: 114 درجة شرقاً وفق الحسابات الموحدية التاريخية',
        fr: 'Orientation astronomique almohade historique',
        en: 'Historic Almohad astronomical Qibla orientation',
      },
      {
        ar: 'العقد: حذوة فرس متجاوزة بزخارف جصية ورخامية',
        fr: 'Arc outrepassé monumental sculpté',
        en: 'Monumental carved horseshoe arch',
      },
    ],
    position: [0, 4, 88],
    category: 'history',
  },
];

export const ARCHITECTURAL_DIMENSIONS: ArchitecturalDimension[] = [
  {
    id: 'tower_height',
    label: { ar: 'ارتفاع الصومعة المنجز', fr: 'Hauteur Réalisée', en: 'Preserved Height' },
    value: '44 m',
    detail: {
      ar: '44 متراً الحالية (كان الهدف الوصول إلى 60-80م)',
      fr: '44 mètres atteints sur les 60-80m projetés',
      en: '44m reached out of 60-80m planned',
    },
    start: [-11, 0, 0],
    end: [-11, 44, 0],
    color: '#d4af37',
  },
  {
    id: 'tower_base',
    label: { ar: 'عرض القاعدة المربعة', fr: 'Largeur de la Base', en: 'Square Base Width' },
    value: '16.2 m',
    detail: {
      ar: '16.2 × 16.2 متراً بقاعدة متناسقة بنسبة 1:5',
      fr: '16,2 × 16,2 mètres, ratio almohade 1:5',
      en: '16.2 × 16.2 meters, classic 1:5 Almohad ratio',
    },
    start: [-8.1, 0.5, 11],
    end: [8.1, 0.5, 11],
    color: '#38bdf8',
  },
  {
    id: 'wall_thickness',
    label: { ar: 'سمك الجدران الحجرية', fr: 'Épaisseur des Murs', en: 'Wall Thickness' },
    value: '2.5 m',
    detail: {
      ar: 'حجر رملي صلب لتحمل ضغط المنحدر والوزن الذاتي',
      fr: 'Grès massif pour soutenir la rampe interne',
      en: 'Massive sandstone to sustain internal ramp load',
    },
    start: [5.6, 5, 8.1],
    end: [8.1, 5, 8.1],
    color: '#f97316',
  },
  {
    id: 'mosque_length',
    label: { ar: 'طول المسجد التاريخي', fr: 'Longueur du Complexe', en: 'Mosque Total Length' },
    value: '183 m',
    detail: {
      ar: 'أكبر مجمع ديني في الغرب الإسلامي آنذاك',
      fr: 'Plus vaste complexe religieux d’Occident musulman',
      en: 'Largest religious precinct in medieval Western Islam',
    },
    start: [-55, 0.3, -20],
    end: [-55, 0.3, 110],
    color: '#10b981',
  },
  {
    id: 'mosque_width',
    label: { ar: 'عرض المسجد التاريخي', fr: 'Largeur du Complexe', en: 'Mosque Total Width' },
    value: '139 m',
    detail: {
      ar: '21 بلاطة عمودية تتسع لـ 20,000 مصلٍ',
      fr: '21 nefs pour 20 000 fidèles',
      en: '21 aisles accommodating 20,000 worshippers',
    },
    start: [-55, 0.3, 75],
    end: [55, 0.3, 75],
    color: '#a855f7',
  },
];

export const HISTORICAL_CHAPTERS: HistoricalChapter[] = [
  {
    id: 'genesis_mansur',
    title: {
      ar: 'تاريخ البناء والتأسيس: السلطان يعقوب المنصور (1195م)',
      fr: 'Fondation Historique: Sultan Yacoub el-Mansour (1195)',
      en: 'Construction History: Sultan Yaqub al-Mansur (1195 CE)',
    },
    period: '1195 - 1199 م / 591 - 595 هـ',
    summary: {
      ar: 'انطلاق ورش البناء لأضخم مسجد ومئذنة في العالم الإسلامي تخليداً لانتصار معركة الأرك التاريخية في الأندلس.',
      fr: 'Lancement du chantier du plus grand minaret du monde islamique pour commémorer la victoire d’Alarcos en Al-Andalus.',
      en: 'The inauguration of the greatest mosque construction project in the Islamic world following the landmark Battle of Alarcos.',
    },
    content: {
      ar: [
        'في عام 1195 ميلادية (591 هجرية)، وبعد الانتصار الساحق للموحدين في معركة "الأرك" الشهيرة بالأندلس على ملك قشتالة ألفونسو الثامن، أمر الخليفة الموحدي الثالث، السلطان أبو يوسف يعقوب المنصور، بتشييد أعظم صرح ديني ومعماري في عاصمته الجديدة "رباط الفتح".',
        'كان الطموح الموحدي يهدف إلى بناء أكبر مسجد في الغرب الإسلامي، بمئذنة شاهقة تطل على مصب نهر أبي رقراق والمحيط الأطلسي، لتكون منارة هادية للسفن ورمزاً لقوة الدولة الموحدية التي امتدت من حدود مصر إلى شواطئ المحيط والأندلس.',
        'تم استقدام أمهر البنائين والنحاتين والمهندسين من المغرب والأندلس، واستُخدم الحجر الرملي الوردي المقاوم للرطوبة البحرية المستخرج من مقالع سلا والرباط المجاورة.',
        'توقفت أشغال البناء فجأة عام 1199م إثر الوفاة المباغتة للسلطان يعقوب المنصور في الرباط، فتوقفت الصومعة عند ارتفاع 44 متراً، أي ما يعادل ثلثي ارتفاعها المبرمج الذي كان مقدراً بين 60 و80 متراً.',
      ],
      fr: [
        'En 1195 (591 de l’Hégire), au lendemain de l’éclatante victoire almohade d’Alarcos en Espagne, le calife Abou Yacoub Youssef el-Mansour décide de doter sa capitale impériale, "Ribat al-Fath", d’une mosquée monumentale sans égale.',
        'L’édifice devait surpasser en grandeur toutes les créations contemporaines, avec un minaret visible depuis l’océan Atlantique et l’estuaire du Bouregreg, incarnant l’apogée politique et spirituel de l’Empire almohade.',
        'Les meilleurs architectes et maîtres artisans d’Al-Andalus et du Maroc furent mobilisés pour tailler le grès calcaire rouge caractéristique.',
        'En 1199, le décès prématuré du souverain interrompt définitivement les travaux. La tour reste inachevée à 44 mètres de hauteur, sur les 60 à 80 mètres initialement prévus.',
      ],
      en: [
        'In 1195 CE (591 AH), following the Almohad victory at the historic Battle of Alarcos against Alfonso VIII of Castile, the third Almohad Caliph, Abu Yaqub Yusuf al-Mansur, commissioned the grandest mosque in the western Islamic world in his imperial capital, Ribat al-Fath (Rabat).',
        'The ambitious project was envisioned to stand as a monumental beacon overlooking the mouth of the Bouregreg River and the Atlantic Ocean, symbolizing the zenith of an empire spanning from Andalusia to Tunisia.',
        'Master stonecutters and hydraulic engineers from across Morocco and Al-Andalus gathered to shape the durable local calcarenite red sandstone blocks.',
        'Construction came to an abrupt halt in 1199 CE upon the sudden passing of Sultan al-Mansur. The minaret reached 44 meters—roughly two-thirds of its intended 60 to 80 meter height.',
      ],
    },
    keyFacts: [
      { label: { ar: 'سنة التأسيس', fr: 'Année de fondation', en: 'Foundation year' }, value: '1195 م / 591 هـ' },
      { label: { ar: 'الخليفة المؤسس', fr: 'Calife bâtisseur', en: 'Founding Caliph' }, value: 'أبو يوسف يعقوب المنصور' },
      { label: { ar: 'السبب التاريخي', fr: 'Occasion historique', en: 'Historic catalyst' }, value: 'نصر معركة الأرك بالأندلس' },
      { label: { ar: 'سبب التوقف', fr: 'Arrêt du chantier', en: 'Construction cessation' }, value: 'وفاة السلطان سنة 1199م' },
    ],
  },
  {
    id: 'architectural_dimensions',
    title: {
      ar: 'الأبعاد الهندسية والإنشائية الدقيقة للصومعة والمسجد',
      fr: 'Dimensions et Ingénierie Architecturale',
      en: 'Precise Architectural Dimensions & Structural Engineering',
    },
    period: 'القياسات والنسب الهندسية المعتمدة',
    summary: {
      ar: 'دراسة تحليلية لأبعاد الصومعة وقاعدتها المربعة وسمك جدرانها ومساحة قاعة الصلاة والأعمدة.',
      fr: 'Étude volumétrique rigoureuse: base carrée, élévation, épaisseur des parois et surface cultuelle.',
      en: 'Rigorous engineering metrics: square base, preserved elevation, wall thickness, and prayer capacity.',
    },
    content: {
      ar: [
        'ارتفاع الصومعة: بلغ الارتفاع المنجز بدقة 44 متراً (نحو 144 قدماً). ووفقاً للنسبة المعمارية الموحدية الكلاسيكية (1 إلى 5)، كان مقرراً أن يبلغ ارتفاعها الكامل مع المنور والشرفة نحو 80 متراً، لتكون أعلى مئذنة في العصور الوسطى.',
        'القاعدة المربعة: تبلغ أبعاد القاعدة 16.2 متراً في كل ضلع، وتستند على أساسات صخرية متينة وثلاث مصاطب حجرية متدرجة لامتصاص ثقل البرج.',
        'سماكة الجدران: يتجاوز سمك الجدران الخارجية الحجرية 2.5 متراً في الأسفل، وهي سماكة مدروسة هندسياً لتمكين البرج من احتواء المنحدر الداخلي المائل وتوزيع قوى الضغط الزلزالية والريحية العاتية الآتية من المحيط الأطلسي.',
        'مساحة المسجد الكبير: يمتد الصحن وقاعة الصلاة على مساحة مستطيلة هائلة تبلغ 183 متراً طولاً و139 متراً عرضاً (أكثر من 25,400 متر مربع)، مما جعله ثاني أكبر مسجد في العالم الإسلامي في عصره بعد جامع سامراء الكبير.',
        'غابة الأعمدة: اشتمل تصميم المسجد على 348 عموداً أسطوانياً رخامياً وحجرياً بالإضافة إلى 4 ركائز ضخمة، وزعت في 21 بلاطة متعامدة مع جدار القبلة لاستيعاب ما يزيد عن 20,000 مصلٍ دفعة واحدة.',
      ],
      fr: [
        'Hauteur: La tour s’élève précisément à 44 mètres. Suivant la proportion almohade dorée de 1 sur 5, l’édifice devait atteindre près de 80 mètres avec son lanternon et ses clochetons.',
        'Base carrée: 16,2 mètres de côté, reposant sur des soubassements en gradins de pierre de taille taillés pour répartir la masse monumentale.',
        'Épaisseur des parois: Plus de 2,5 mètres à la base, garantissant la stabilité de la rampe hélicoïdale intérieure et la résistance aux vents océaniques violents.',
        'Superficie de la mosquée: Une enceinte de 183 m de long sur 139 m de large (25 437 m²), ce qui en faisait la deuxième plus grande mosquée du monde médiéval après Samarra.',
        'Les colonnes: 348 fûts de colonnes répartis en 21 nefs perpendiculaires au mur de qibla, calibrés pour accueillir une congrégation de plus de 20 000 fidèles.',
      ],
      en: [
        'Elevation: Preserved at exactly 44 meters (144 ft). Designed around the classical Almohad proportion ratio of 1:5, the completed minaret would have exceeded 80 meters with its upper lantern and finials.',
        'Base footprint: 16.2 meters on each side, anchored upon stepped stone plinths designed to distribute structural weight evenly into the bedrock.',
        'Wall thickness: Over 2.5 meters of solid ashlar masonry at the base, engineered to house the wide interior equestrian ramp and withstand Atlantic coastal gale winds.',
        'Total Mosque Complex: Enclosing an immense rectangle of 183 meters by 139 meters (25,437 m² / 6.3 acres), making it the second-largest religious enclosure in medieval Islam after Samarra.',
        'Column Grid: 348 circular columns and 4 large piers arranged into 21 parallel aisles perpendicular to the southern Qibla wall, built to hold over 20,000 worshippers.',
      ],
    },
    keyFacts: [
      { label: { ar: 'الارتفاع المنجز', fr: 'Hauteur atteinte', en: 'Achieved height' }, value: '44 متراً' },
      { label: { ar: 'القاعدة المربعة', fr: 'Base carrée', en: 'Square base' }, value: '16.2 × 16.2 م' },
      { label: { ar: 'سمك الجدران', fr: 'Épaisseur murs', en: 'Wall thickness' }, value: '2.5 متر' },
      { label: { ar: 'مساحة المسجد', fr: 'Superficie mosquée', en: 'Mosque area' }, value: '183 × 139 م (25,437 م²)' },
      { label: { ar: 'عدد الأعمدة', fr: 'Nombre de colonnes', en: 'Number of columns' }, value: '348 عموداً' },
      { label: { ar: 'سعة المصلين', fr: 'Capacité cultuelle', en: 'Congregational capacity' }, value: 'أكثر من 20,000 مصلٍ' },
    ],
  },
  {
    id: 'almohad_style_sebka',
    title: {
      ar: 'الأسلوب المعماري الموحدي وزخارف الشبيكة والمنحدر الخيلي',
      fr: 'Style Almohade, Motifs Sebka et Rampe Équestre',
      en: 'Almohad Moorish Style, Sebka Lattice & Equestrian Ramp',
    },
    period: 'الجماليات والابتكارات الهندسية الموحدية',
    summary: {
      ar: 'تفرد الواجهات الأربع، شبكة المعينات الهندسية، والمنحدر الداخلي المبتكر الذي يتيح صعود الخيل إلى القمة.',
      fr: 'Originalité des quatre façades asymétriques, ornementation Sebka et rampe intérieure cavalière.',
      en: 'The uniqueness of the four distinct facades, geometric Sebka lozenges, and the spiral equestrian ramp.',
    },
    content: {
      ar: [
        'العمارة الموحدية الأندلسية: تمثل صومعة حسان أوج الفن المعماري الموحدي الذي يجمع بين الصرامة والوقار والرشاقة الهندسية الخالصة دون إفراط في التزويق.',
        'الواجهات الأربع المستقلة: على غرار شقيقتيها الكتبية والخيرالدا، تختلف واجهات صومعة حسان الأربع في تكويناتها الزخرفية. فالواجهة الجنوبية تحتوي على أقواس حدوية متجاوزة، بينما تتميز الواجهات الأخرى بأشرطة من العقود المفصصة وقناطر عمياء ثنائية وثلاثية الفصوص.',
        'زخرفة "الشبيكة" (Sebka): نحتت على الحجر الرملي شبكات هندسية متداخلة من المعينات الناتجة عن تقاطع أقواس نصف دائرية ومفصصة، وهي بصمة أصيلة ابتكرها فنانو المغرب والأندلس وأصبحت علامة فارقة في العمارة الإسلامية.',
        'المنحدر الداخلي المائل: أهم ما يميز العمارة العسكرية والمدنية الموحدية؛ إذ لم تستعمل الأدراج، بل شُيد ممر مائل مرصوف بالحجر يدور حول عمود مركزي مجوف يضم 6 غرف متدرجة ومقببة، مما كان يتيح للمؤذن والحراس صعود البرج ممتطين الخيل، فضلاً عن نقل أحجار الصيانة ومواد الإمداد بسهولة تامة.',
        'النوافذ المائلة: عكست النوافذ الخارجية والفتحات المائلة مسار الصعود الداخلي للفرسان، مما منح الواجهات حركة ديناميكية نادرة في أبراج العصور الوسطى.',
      ],
      fr: [
        'Le génie almohade: Équilibre parfait entre sobriété majestueuse, puissance monumentale et rigueur géométrique.',
        'Asymétrie voulue des façades: Chaque face de la tour possède son agencement propre d’arcatures aveugles polylobées, d’arcs brisés outrepassés et de niches en encorbellement.',
        'Le réseau ornemental Sebka: Panneaux de losanges entrelacés taillés dans le grès rouge, nés de l’entrecroisement savant d’arcs festonnés.',
        'La rampe hélicoïdale intérieure: Prouesse fonctionnelle évitant les marches d’escalier; le passage doux pavé permettait l’ascension à cheval jusqu’au sommet pour sonner l’appel à la prière ou acheminer les matériaux de taille.',
        'Baies obliques: Les meurtrières extérieures épousent la pente de la rampe interne, créant une diagonale visuelle vivante sur les façades.',
      ],
      en: [
        'The Almohad Aesthetic: The pinnacle of medieval Hispano-Moorish architecture, harmonizing monumental sobriety, military strength, and sublime geometric refinement.',
        'Four Distinct Facades: True to the Almohad tradition seen in Marrakech’s Koutoubia and Seville’s Giralda, each of the four facades displays an individualized arrangement of horseshoe and multifoil blind arcades.',
        'Sebka Diamond Relief: Elaborate carved sandstone trellis panels formed by interlacing undulating polylobed arches, creating the timeless Moorish diamond pattern.',
        'The Spiral Equestrian Ramp: Replacing standard stairs with an inclined stone ramp winding around a hollow multi-chambered central core, enabling riders on horseback and laden beasts to reach the summit with ease.',
        'Ascending Slanted Windows: Narrow external window slits deliberately track the incline angle of the internal ramp, injecting dynamic architectural rhythm into the massive facades.',
      ],
    },
    keyFacts: [
      { label: { ar: 'المادة الرئيسية', fr: 'Matériau noble', en: 'Primary stone' }, value: 'حجر رملي كلسي وردي' },
      { label: { ar: 'الزخرفة الرئيسية', fr: 'Motif ornemental', en: 'Signature motif' }, value: 'الشبيكة الموحدية (Sebka)' },
      { label: { ar: 'نظام الصعود', fr: 'Système d’accès', en: 'Ascent method' }, value: 'منحدر فرسان مائل حلزوني' },
      { label: { ar: 'تصميم الواجهات', fr: 'Architecture façades', en: 'Facade design' }, value: '4 واجهات بتكوينات مستقلة' },
    ],
  },
  {
    id: 'triad_and_heritage',
    title: {
      ar: 'الثالوث الموحدي والتراث الثقافي الإنساني (اليونسكو)',
      fr: 'La Triade Almohade et Patrimoine Mondial (UNESCO)',
      en: 'The Almohad Triad & UNESCO World Heritage Status',
    },
    period: 'الرباط - إشبيلية - مراكش: تراث إنساني مشترك',
    summary: {
      ar: 'العلاقة التاريخية الفريدة مع صومعة الكتبية بمراكش والخيرالدا بإشبيلية، ومكانتها في التراث العالمي وضريح محمد الخامس.',
      fr: 'Parenté architecturale avec la Koutoubia et la Giralda de Séville, et classement UNESCO.',
      en: 'The legendary architectural triad alongside the Koutoubia and Seville’s Giralda, and UNESCO recognition.',
    },
    content: {
      ar: [
        'الثالوث الموحدي الخالد: تشكل صومعة حسان ضلعاً في الثالوث المعماري الذهبي للقرن الثاني عشر الميلادي، إلى جانب شقيقتها الكبرى "صومعة الكتبية" بمراكش (اكتملت 1190م، بارتفاع 77 متراً)، وشقيقتها الأندلسية "صومعة الخيرالدا" بإشبيلية (اكتملت 1198م، بارتفاع 97 متراً، وتحولت لاحقاً إلى برج كاتدرائية إشبيلية).',
        'صومعة حسان كانت الأكبر قاعدة والأكثر طموحاً بين الثلاث، وتعتبر التتويج النهائي للنضج المعماري لدولة الموحدين.',
        'زلزال لشبونة الكبير (1755م): في الأول من نوفمبر 1755م، ضرب زلزال لشبونة العنيف سواحل الأطلسي، وتسبب في انهيار الأسقف الخشبية الأرزية المزخرفة للمسجد الكبير وسقوط بعض أقواس قاعة الصلاة، في حين صمدت صومعة حسان بفضل جدرانها الهائلة وأساساتها المتينة، لتولد "غابة الأعمدة" المفتوحة على السماء كشاهد تاريخي فريد.',
        'تصنيف اليونسكو: في عام 2012، أدرجت منظمة اليونسكو صومعة حسان والموقع الأثري المحيط بها ضمن قائمة التراث العالمي الإنساني تحت عنوان "الرباط: العاصمة الحديثة والمدينة التاريخية: تراث مشترك".',
        'ضريح محمد الخامس: في ستينيات القرن العشرين، تم تشييد ضريح الملك محمد الخامس في الطرف الجنوبي للبلاط المقابل للصومعة، مكرساً التلاقي الرمزي بين تاريخ المغرب الموحدي التليد واستقلال المغرب الحديث تحت القيادة الملكية.',
      ],
      fr: [
        'La Triade Almohade: Hassan forme avec la Koutoubia de Marrakech (77 m, achevée en 1190) et la Giralda de Séville (achevée en 1198) le sommet indépassable de l’art architectural hispano-maghrébin.',
        'Hassan était la plus vaste en emprise au sol et la plus ambitieuse techniquement des trois soeurs impériales.',
        'Le séisme de Lisbonne (1755): Le grand tremblement de terre atlantique détruisit les somptueuses charpentes en cèdre et les voûtes de la salle de prière. Les murs cyclopéens du minaret résistèrent miraculeusement, donnant naissance à la forêt de colonnes à ciel ouvert.',
        'Patrimoine Mondial UNESCO: Inscrite en 2012 au patrimoine mondial de l’humanité comme composante majeure de "Rabat, capitale moderne et ville historique: un patrimoine partagé".',
        'Le Mausolée Mohammed V: Érigé face au minaret, il crée un dialogue architectural saisissant entre le marbre blanc moderne et le grès almohade patiné par huit siècles.',
      ],
      en: [
        'The Legendary Almohad Triad: Hassan Tower is the crowning member of the historic triad alongside the Koutoubia Minaret in Marrakech (completed 1190 CE, 77m) and the Giralda in Seville (completed 1198 CE, 97m).',
        'Hassan possessed the largest ground footprint and highest intended elevation of the three sister towers.',
        'The Great Lisbon Earthquake (1755 CE): On November 1, 1755, the catastrophic seismic shock that struck the Atlantic coast brought down the cedar timbered roofs and brick arcades of the hypostyle hall. Hassan Minaret remained steadfast thanks to its 2.5m thick foundations.',
        'UNESCO World Heritage Listing: Inscribed in 2012 under "Rabat, Modern Capital and Historic City: A Shared Heritage" for its outstanding universal cultural value.',
        'Mausoleum of Mohammed V: Erected between 1961 and 1971 opposite the tower, honoring King Mohammed V, creating an indelible bridge between medieval Almohad grandeur and modern sovereign Morocco.',
      ],
    },
    keyFacts: [
      { label: { ar: 'الأبراج الشقيقة', fr: 'Tours soeurs', en: 'Sister towers' }, value: 'الكتبية (مراكش) والخيرالدا (إشبيلية)' },
      { label: { ar: 'زلزال لشبونة', fr: 'Séisme de Lisbonne', en: 'Lisbon earthquake' }, value: '1755 م (أبقى الأعمدة وأسقط السقف)' },
      { label: { ar: 'تصنيف اليونسكو', fr: 'Classement UNESCO', en: 'UNESCO listing' }, value: '2012 م (تراث عالمي إنساني)' },
      { label: { ar: 'المعلم المجاور', fr: 'Monument voisin', en: 'Neighboring monument' }, value: 'ضريح محمد الخامس والحسن الثاني' },
    ],
  },
];
