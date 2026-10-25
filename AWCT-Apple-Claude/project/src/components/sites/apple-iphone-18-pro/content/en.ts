/**
 * English (en-US) copy for the iPhone 18 Pro overview, taken from apple.com/iphone-18-pro.
 *
 * Rich strings support: **bold**, [^4] / [^*] / [^**] / [^◊] footnote references, and \n line breaks.
 * Every locale file must satisfy `PageContent` (the shape of this object).
 */

const compareOptions = [
  { value: "iphone-14", label: "iPhone 14" },
  { value: "iphone-14-pro", label: "iPhone 14 Pro" },
  { value: "iphone-14-pro-max", label: "iPhone 14 Pro Max" },
  { value: "iphone-15", label: "iPhone 15" },
  { value: "iphone-15-pro", label: "iPhone 15 Pro" },
  { value: "iphone-15-pro-max", label: "iPhone 15 Pro Max" },
  { value: "iphone-16", label: "iPhone 16" },
  { value: "iphone-16-pro", label: "iPhone 16 Pro" },
  { value: "iphone-16-pro-max", label: "iPhone 16 Pro Max" },
  { value: "iphone-17", label: "iPhone 17" },
  { value: "iphone-17-pro", label: "iPhone 17 Pro" },
  { value: "iphone-17-pro-max", label: "iPhone 17 Pro Max" },
];

/** [video hours, CPU %, GPU] per compared model, in `compareOptions` order. */
const compareFigures: [string, string, string][] = [
  ["25", "80%", "4x"],
  ["22", "60%", "2.8x"],
  ["16", "60%", "2.8x"],
  ["25", "60%", "2.8x"],
  ["22", "50%", "2.1x"],
  ["16", "50%", "2.1x"],
  ["23", "30%", "2x"],
  ["18", "30%", "80%"],
  ["12", "30%", "80%"],
  ["15", "20%", "60%"],
  ["12", "20%", "40%"],
  ["6", "20%", "40%"],
];

export const en = {
  locale: {
    code: "en",
    lang: "en-US",
    dir: "ltr" as "ltr" | "rtl",
    path: "/iphone-18-pro",
    regionName: "United States",
  },

  localeBanner: {
    copy: "Choose another country or region to see content specific to your location and shop online.",
    label: "Choose your country or region",
    options: [
      { code: "en", label: "United States", path: "/iphone-18-pro" },
      { code: "fa", label: "ایران (فارسی)", path: "/fa/iphone-18-pro" },
    ],
    continue: "Continue",
    close: "Close",
  },

  globalNav: {
    menu: "Menu",
    close: "Close",
    back: "Back",
    apple: "Apple",
    search: "Search apple.com",
    searchPlaceholder: "Search apple.com",
    quickLinks: "Quick Links",
    bag: "Shopping Bag",
    /** Translations for labels that come from data/global-nav.en.json. Empty = keep the source label. */
    labels: {} as Record<string, string>,
  },

  ribbon: {
    text: "Lease a new iPhone with low monthly payments for 12 or 24 months and upgrade at the end of your term with Apple Upgrade.[^◊]",
    link: "Learn more",
    href: "https://www.apple.com/us/shop/goto/apple_upgrade",
  },

  localNav: {
    title: "iPhone 18 Pro",
    explore: "Explore",
    close: "Close",
    buy: "Buy",
    price: "From $1199\nor $49.95/mo. for 24 mo.[^*]",
    overview: "Overview",
    products: [
      { id: "iphone-duo", label: "iPhone Duo", badge: "New", href: "https://www.apple.com/iphone-duo/" },
      { id: "iphone-18-pro", label: "iPhone 18 Pro", badge: "Currently viewing", href: "/iphone-18-pro" },
      { id: "iphone-air", label: "iPhone Air", badge: "", href: "https://www.apple.com/iphone-air/" },
      { id: "iphone-17", label: "iPhone 17", badge: "", href: "https://www.apple.com/iphone-17/" },
      { id: "iphone-17e", label: "iPhone 17e", badge: "", href: "https://www.apple.com/iphone-17e/" },
      { id: "iphone-16", label: "iPhone 16", badge: "", href: "https://www.apple.com/us/shop/goto/buy_iphone/iphone_16" },
      { id: "compare", label: "Compare", badge: "", href: "https://www.apple.com/iphone/compare/" },
      { id: "accessories", label: "Accessories", badge: "", href: "https://www.apple.com/us/shop/goto/iphone/accessories" },
      { id: "shop", label: "Shop iPhone", badge: "", href: "https://www.apple.com/us/shop/goto/buy_iphone" },
      { id: "ios", label: "iOS 27", badge: "", href: "https://www.apple.com/os/ios/" },
    ],
    previous: "Previous",
    next: "Next",
    tabs: [
      { id: "highlights", label: "Highlights" },
      { id: "design", label: "Design" },
      { id: "cameras", label: "Cameras" },
      { id: "performance", label: "Performance" },
      { id: "shared-features", label: "Shared Features" },
      { id: "accessories", label: "Accessories" },
    ],
    links: [
      { label: "Tech Specs", href: "https://www.apple.com/iphone-18-pro/specs/" },
      { label: "Switch from Android", href: "https://www.apple.com/iphone-18-pro/switch/" },
    ],
  },

  buyHref: "https://www.apple.com/us/shop/goto/buy_iphone/iphone_18_pro",

  hero: {
    eyebrow: "iPhone 18 Pro",
    headline: "Pro further.",
    price: "From $1199 or $49.95/mo. for 24 mo.[^*]",
    lease: "Lease from $34.99/mo. for 24 mo. with Apple Upgrade[^◊]",
    buy: "Buy",
    buyLabel: "Buy, iPhone 18 Pro",
  },

  highlights: {
    headline: "Get the highlights.",
    film: "Watch the film",
    play: "Play Highlights Gallery",
    pause: "Pause Highlights Gallery",
    replay: "Replay Highlights Gallery",
    items: [
      { id: "camera", label: "Camera", caption: "48MP Fusion Main camera with\nvariable aperture. Improved low-light photos\nand video. Impressive depth of field.", note: "" },
      { id: "battery", label: "Battery", caption: "The longest battery life\nin an iPhone.[^1] Up to 45 hours video playback on iPhone 18 Pro Max.[^2]", note: "" },
      { id: "colors", label: "Colors", caption: "Four gorgeous colors. Two great sizes.\nOne durable aluminum design.", note: "" },
      { id: "chip", label: "A20 Pro chip", caption: "A20 Pro chip. Next-generation vapor\nchamber. Dual 16-core Neural Engine.\nTotal AI powerhouse.", note: "" },
      { id: "siri", label: "Siri AI", caption: "Meet Siri AI. Your AI assistant.\nMore personal. More powerful.", note: "Siri AI is rolling out in English.[^3]" },
    ],
  },

  aio: {
    eyebrow: "The ultimate upgrade",
    headline: "Most wanted.",
    body: "iPhone 18 Pro is **purpose-built for unprecedented performance**. Get up to 6 more hours of video playback on iPhone 18 Pro Max compared with iPhone 17 Pro Max.[^4] Faster wired charging.[^5] Vapor-cooled A20 Pro chip to **handle even the most intensive AI workloads**. New 48MP Fusion Main camera with variable aperture for better-quality low-light photos and video and greater depth of field. All in a durable unibody with Ceramic Shield front and back — everything a pro wants.",
    compareLabel: "Compare with",
    defaultOption: "iphone-15-pro",
    options: compareOptions,
    stats: compareOptions.map((option, index) => {
      const [hours, cpu, gpu] = compareFigures[index];
      return {
        value: option.value,
        items: [
          { pre: "Up to", value: `${hours} more hours`, post: "video playback on\niPhone 18 Pro Max[^4]" },
          { pre: "Up to", value: `${cpu} faster`, post: "6-core CPU" },
          { pre: "Up to", value: `${gpu} faster`, post: "7-core GPU" },
        ],
      };
    }),
    imageAlt: "iPhone 18 Pro, burgundy finish, partial back exterior angled to show pro camera system in top left corner",
  },

  aioAndroid: {
    eyebrow: "Switch from Android to iPhone 18 Pro",
    body: "iPhone 18 Pro is **purpose-built for unprecedented performance**. The best iPhone battery life.[^4] Faster wired charging. Vapor-cooled A20 Pro chip to **handle even the most intensive AI workloads**. New 48MP Fusion Main camera with variable aperture for better-quality low-light photos and video and greater depth of field. All in a durable unibody that’s built to last with Ceramic Shield front and back — everything a pro wants. Because it’s an iPhone, it holds its value longer than other smartphones. And switching from Android is easy.",
    option: { value: "android", label: "Android" },
    items: [
      { pre: "Up to", value: "45 hours", post: "video playback\non iPhone 18 Pro Max[^4]" },
      { pre: "All-new", value: "variable\naperture", post: "for better low-light photos and video" },
      { pre: "All-new", value: "vapor-cooled A20 Pro chip", post: "for extreme performance" },
    ],
  },

  design: {
    eyebrow: "Design",
    headline: "Our finest\nunibody of work.",
    ar: "View in your space, iPhone 18 Pro in Burgundy",
    close: "Close",
    previous: "Previous item, Take a closer look gallery",
    next: "Next item, Take a closer look gallery",
    colorsLabel: "Product Colors.",
    colors: [
      { id: "burgundy", label: "Burgundy" },
      { id: "glacier", label: "Glacier" },
      { id: "silver", label: "Silver" },
      { id: "black", label: "Black" },
    ],
    items: [
      { id: "colors", label: "Colors", body: "**Colors.** Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in {color}." },
      { id: "sizes", label: "Two sizes", body: "**Two sizes.** 6.9-inch iPhone 18 Pro Max and 6.3-inch iPhone 18 Pro.[^6] Featuring brilliant Super Retina XDR displays with ProMotion up to 120Hz." },
      { id: "camera", label: "New Main camera", body: "**New Main camera.** A variable aperture on the 48MP Fusion Main camera adjusts for lighting and depth of field automatically. So you can take your best shot seamlessly, even in low light." },
      { id: "island", label: "Redesigned Dynamic Island", body: "**Redesigned Dynamic Island.** See up to three Live Activities at once and more information at a glance — like live sports scores, navigation, and music." },
      { id: "durability", label: "Durability", body: "**Durability.** Built to last with a strong aluminum unibody, Ceramic Shield back, and Ceramic Shield 2 front with 3x better scratch resistance than iPhone 16 Pro.[^5]" },
      { id: "camera-control", label: "Camera Control", body: "**Camera Control.** Instantly take a photo, record video, adjust settings, and more. So you never miss a moment." },
      { id: "action", label: "Action button", body: "**Action button.** A customizable fast track to your favorite feature. Press and hold to launch the action you want — Silent mode, Translate, Shortcut, and more." },
    ],
  },

  camera: {
    eyebrow: "Pro camera system",
    headline: "Eye-opening control.",
    heroAlt: "iPhone 18 Pro in Black, angled, partial rear exterior, focus on the Pro Fusion camera system",
    intro: "Meet our **best-ever camera system for pros and creators**. iPhone 18 Pro breaks new ground with a variable aperture on the 48MP Fusion Main camera, delivering better low-light photos and video and sharper detail throughout the scene. And with new Pro controls and Photographic Styles 3 to adjust texture and grain, you’ll have even more creative range.",
    stats: [
      { pre: "All", value: "48MP", post: "rear cameras" },
      { pre: "Up to", value: "8x", post: "optical-quality zoom" },
    ],
    specs: [
      { title: "48MP Fusion Main camera with variable aperture", lines: ["24/48 mm focal length (1x/2x)", "ƒ/1.48, ƒ/1.8, ƒ/2.8, and ƒ/4.0 aperture", "2.44 µm quad-pixel (1.22 µm individual)"] },
      { title: "48MP Fusion Ultra Wide camera", lines: ["13 mm focal length (.5x/macro)", "ƒ/2.2 aperture", "1.4 µm quad-pixel (0.7 µm individual)"] },
      { title: "48MP Fusion Telephoto camera", lines: ["100/200 mm focal length (4x/8x)", "ƒ/2.8 aperture", "1.4 µm quad-pixel (0.7 µm individual)"] },
    ],
    aperture: {
      headline: "Variable aperture.\nIf you know, you pro.",
      body: "The new variable aperture on the Main camera **adjusts for better lighting and depth of field automatically** — so everything from candid portraits to cinematic videos looks its best. For more versatility, use it with custom Pro controls in the Camera app — like shutter speed to capture fast action in incredible detail.",
      previous: "Previous item",
      next: "Next item",
      tabs: [
        { id: "max-light", label: "ƒ/1.48", aria: "F 1.48", title: "Maximum light.", body: "Around 50 percent better low-light performance — great for indoor scenes.[^5] Take better-quality Night mode photos faster." },
        { id: "balance", label: "ƒ/1.8", aria: "F 1.8", title: "Default.", body: "A versatile balance between low light and depth." },
        { id: "depth", label: "ƒ/2.8", aria: "F 2.8", title: "More depth.", body: "A narrow aperture lets you capture detail farther back in the scene." },
        { id: "max-depth", label: "ƒ/4.0", aria: "F 4.0", title: "Maximum depth.", body: "Use Pro controls to create artful effects manually, like a luminous starburst from bright light." },
      ],
    },
    gallery: {
      headline: "Such a control freak.",
      label: "Camera System gallery",
      items: [
        { id: "pro-controls", title: "Pro controls.", body: "In the Camera app, you can bring your most-used settings to the top for quicker access. Add new settings like aperture, shutter speed, white balance, and histogram.", note: "" },
        { id: "styles", title: "Photographic Styles 3.", body: "In addition to tone and color, you can now customize texture and grain to soften skin details or achieve an artful film look, and easily adjust or reverse effects anytime.", note: "" },
        { id: "editing", title: "Intelligent photo editing.", body: "Reframe a photo after it’s been taken with Spatial Reframing. Expand your shots with the Extend tool. And remove even larger objects with the enhanced Clean Up tool. All possible with Apple Intelligence.", note: "Usage limits may apply." },
        { id: "focus", title: "Smart focus tracking.", body: "Whether you’re shooting photos or video, on-device intelligence lets you lock onto a subject and maintain focus as they move through the scene — even if they leave and then reenter the frame.", note: "" },
        { id: "zoom", title: "8x optical-quality zoom.", body: "Add extraordinary reach to your compositions with 8x optical-quality zoom — delivering 16x total optical zoom range.", note: "" },
        { id: "ultra-wide", title: "48MP Fusion Ultra Wide camera.", body: "Capture sweeping landscapes and stunning macro photos in super-high-resolution detail.", note: "" },
        { id: "center-stage", title: "Center Stage front camera.", body: "Frame your shot in more flexible ways. Go from portrait to landscape without moving your iPhone. And fit more people in the frame automatically.", note: "" },
        { id: "reference", title: "Apple Reference Image.", body: "Now you can prove the authenticity of an image taken on iPhone. Secure, pixel-level signing of photo data happens at the time of capture, making it easy to verify exactly what the camera sensor saw.", note: "" },
      ],
    },
  },

  video: {
    eyebrow: "Pro video",
    headline: "Make it cinematic.\nAfter the fact.",
    body: "iPhone 18 Pro lets you **add Cinematic mode effects to regular video** — even after you shoot — so any moment can feel like a movie. Support for 60 fps makes slo-mo smooth. And with Audio Mix, you can isolate a musical performance from its surroundings, so every note comes through clearly.",
    gallery: {
      headline: "Fully scene. Fully heard.",
      label: "Pro Video gallery",
      items: [
        { id: "low-light", title: "Better low-light video.", body: "The iPhone 18 Pro camera system improves low-light video at night or indoors by intelligently adjusting aperture and frame rate for brighter, clearer footage.", note: "" },
        { id: "timelapse", title: "4K time-lapse.", body: "Record in more detail with support for 4K resolution with Dolby Vision HDR.", note: "" },
        { id: "audio-mix", title: "Audio Mix for music.", body: "Audio Mix now lets you separate music and voices from unwanted background noise in your videos.", note: "" },
        { id: "features", title: "Pro video features.", body: "Built for filmmakers and content creators, with pro tools like ProRes RAW and Apple Log 2 for color grading, genlock for multicamera sync, and 4K 120 fps Dolby Vision for cinema-quality HDR footage.", note: "" },
        { id: "dual-capture", title: "Dual Capture video.", body: "Record yourself and the world around you with simultaneous front and rear video capture.", note: "" },
      ],
    },
  },

  battery: {
    eyebrow: "Battery life",
    headline: "Best iPhone battery life.[^4]\nGreatest of hour time.",
    imageAlt: "iPhone 18 Pro in burgundy showcases Apple TV content in horizontal mode, Apple TV logo, series title",
    stat: { pre: "Up to", value: "30 hours of use", post: "per charge on iPhone 18 Pro Max[^7]" },
    body: "iPhone 18 Pro Max delivers a massive leap in battery life with up to 45 hours of video playback — **6 more hours than iPhone 17 Pro Max**. And with more battery capacity and greater efficiency, you’ll have up to 30 hours of use per charge for more streaming, gaming, and browsing, day or night.[^7]",
    charge: {
      headline: "There’s a new Pro in charge.",
      body: "Thanks to faster wired charging, iPhone 18 Pro reaches up to 50 percent battery life in around 15 minutes.[^8] And now you can get **up to 7 hours of video playback in 5 minutes on iPhone 18 Pro Max**[^8] — great for a quick top-off before a long flight.",
      stat: { pre: "Up to", value: "50% charge in around 15 minutes", post: "with compatible power adapter[^8]" },
    },
  },

  performance: {
    eyebrow: "Performance",
    headline: "Welcome to the mother chip.",
    body: "A20 Pro is our most powerful and efficient iPhone chip design ever, with packaging inspired by our M-series chips. Working with the next‑generation vapor chamber, it gives you the best possible graphics performance — up to 40 percent faster than iPhone 17 Pro. And introduces a new Dual 16‑core Neural Engine with two times the compute for on‑device intelligence.[^5]",
    callouts: [
      { id: "ai", title: "Exceptional\nAI capabilities", body: "More power for all your AI tasks. And faster Apple Intelligence thanks to new Neural Accelerators, a Dual 16‑core Neural Engine, and 50 percent higher memory bandwidth." },
      { id: "a20", title: "M‑class-inspired\npackaging design", body: "By placing the silicon die side by side with memory, the A20 Pro chip packaging drastically improves heat flow for significantly better thermal performance." },
    ],
    vapor: {
      headline: "Bigger vapor chamber.\nLet the heat drop.",
      imageAlt: "iPhone 18 Pro in glacier showcases the user interface of the Logic Pro music production app",
      body: "The next-generation vapor chamber has three times the surface area to dissipate even more heat. Combined with more thermally conductive materials, it works with the A20 Pro chip design to deliver up to **40 percent better sustained performance** than iPhone 17 Pro. So you can push high-intensity gaming and run larger, more complex AI models on your device for longer.",
    },
  },

  upgrader: {
    headline: "Worth the upgrade?\nYou bet.",
    label: "Select an iPhone to\ncompare with iPhone 18 Pro:",
    subheadline: "Here’s what you get with **iPhone 18 Pro**.",
    defaultOption: "iphone-15-pro",
    options: compareOptions,
    tiles: compareOptions.map((option, index) => {
      const [hours, cpu] = compareFigures[index];
      return { value: option.value, cpu: `${cpu} faster`, hours: `${hours} more\nhours` };
    }),
    camera: "48MP Fusion Main camera with variable aperture and Pro controls",
    cameraAlt: "Rear exterior iPhone 18 Pro in Burgundy, featuring 48 MP Main camera with variable aperture",
    chipAlt: "A20 Pro Chip from iPhone 18 Pro",
    upTo: "Up to",
    cpuPost: "6-core CPU",
    hoursPost: "video playback on\niPhone 18 Pro Max[^4]",
    charge: "50% charge",
    chargePost: "in around 15 minutes with compatible adapter",
    frontCamera: "18MP Center Stage\nfront camera",
    frontCameraAlt: "iPhone 18 Pro in Black, front-facing, showcasing two people with face tracking feature",
    siri: "Siri AI with more expressive voices and systemwide dictation[^3]",
    tradeInAlt: "Apple Trade In",
    tradeIn: "Get credit toward a new iPhone when you trade in an eligible device.",
    tradeInCta: "Find your trade‑in value",
    tradeInHref: "https://www.apple.com/us/shop/goto/trade_in",
  },

  switchAndroid: {
    headline: "Worth switching from Android to iPhone? You bet.",
    chip: "Vapor-cooled A20 Pro chip for extreme performance",
    hours: "45\nhours",
    values: [
      { id: "iphone", title: "Trade in your Android phone for credit.", body: "With Apple Trade In, you can get credit toward a new iPhone when you trade in your Android phone.[^9]", cta: "See what your device is worth", href: "https://www.apple.com/us/shop/goto/trade_in" },
      { id: "creditcard", title: "Lease with Apple Upgrade.", body: "Lease a new iPhone with low monthly payments for 12 or 24 months and upgrade at the end of your term.[^◊]", cta: "Learn more", href: "https://www.apple.com/us/shop/goto/apple_upgrade" },
      { id: "person", title: "Guided Shopping.", body: "Let us help you find what you need and answer all of your questions, one on one, at an Apple Store or online.", cta: "Shop with a Specialist online", href: "https://contactretail.apple.com/?pg=iphone&ap=COM&c=us&l=en&ag=SWSOV" },
    ],
    moveToIos: {
      headline: "Move to iOS app",
      body: "Transfer your contacts, WhatsApp content, photos, videos, and more — from your Android phone to your iPhone with the Move to iOS app.",
      cta: "Learn more",
      href: "https://support.apple.com/118670?cid=general-iphone-marcom-08062025",
      imageAlt: "iPhone screen showing Move to iOS App with transfer complete",
    },
  },

  family: {
    eyebrow: "All in the family",
    headline: "All the must‑haves.\nAll on iPhone.",
    imageAlt: "Siri AI - iPhone 18 Pro on the left, angled, Glacier color showing Siri image generation; iPhone 18 Pro in the middle; iPhone Duo on the right",
    body: "The latest iPhone models come packed with advanced capabilities. **Siri AI**, your new, more powerful AI assistant. **Apple Intelligence** for next-level photo editing, Writing Tools, Visual Intelligence,[^10] and child safety features to make your everyday effortless.[^3] **Fast, secure connections** with **Wi‑Fi 7,[^11] Bluetooth 6, 5G,[^12] and eSIM.[^13]** And safety features like Messages via satellite designed to give you peace of mind.[^14]",
  },

  siri: {
    headline: "Meet Siri AI. Your AI assistant.\nMore personal. More powerful.",
    notes: ["Siri AI is rolling out in English.", "Usage limits may apply."],
    cta: "Learn more about Siri AI",
    ctaHref: "https://www.apple.com/apple-intelligence/",
    label: "Siri AI gallery",
    items: [
      { id: "assistant", title: "Just ask Siri AI.", body: "Powered by Apple Intelligence, Siri AI is your conversational AI assistant with entirely new capabilities on iPhone.[^3] Ask open-ended questions, brainstorm ideas for work or creative projects on the go, and engage in natural, back-and-forth conversations.", note: "" },
      { id: "personal-context", title: "Personal context.", body: "Siri AI can find relevant answers to what you’re looking for just by asking. Search for a photo from years ago, easily locate an email buried in your inbox, or pull up a note you saved on your iPhone.", note: "" },
      { id: "app-actions", title: "App actions.", body: "Siri AI can take actions in apps like Messages, Music, Reminders, and more based on what you’re doing in the moment. Quickly edit a message you just sent or add a song you hear in the car to your workout playlist.", note: "" },
      { id: "world-knowledge", title: "World knowledge.", body: "Ask about virtually any topic that’s on your mind, from important facts to recipes and travel recommendations. Siri AI can reference information online to give you detailed, up-to-date insights.", note: "" },
      { id: "siri-app", title: "Siri app.", body: "A dedicated app brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access or start a new one.", note: "" },
      { id: "siri-mode", title: "Siri mode in Camera.", body: "Siri mode and Visual Intelligence let you search, ask questions, and take action based on what’s around you with just a tap.[^15]", note: "" },
      { id: "customize", title: "Customize Siri.", body: "Pick a voice, then customize expressivity and pace until it clicks for you.[^16]", note: "" },
      { id: "write", title: "Write with Siri.", body: "Siri AI can now generate a draft from scratch or provide feedback on what you’ve written. Just describe what you need in your own words. And in Messages and Mail, Siri AI can match your writing style, punctuation, and tone.", note: "" },
    ],
  },

  intelligence: {
    headline: "iOS and Apple Intelligence.\nHelpful in all the right places.",
    cta: "Learn more about iOS 27 and Apple Intelligence",
    ctaHref: "https://www.apple.com/os/ios/",
    label: "iOS and Apple Intelligence gallery",
    items: [
      { id: "call-context", title: "Call Context.", body: "Call Context can proactively surface relevant information from across your apps when you’re calling a business — like a confirmation code from Mail when you call an airline.", note: "" },
      { id: "child-safety", title: "Child safety features.", body: "New and expanded child safety features help make it easier for parents and guardians to keep kids safe online.", note: "" },
      { id: "clean-up", title: "Clean Up.", body: "Remove even larger objects with higher-quality infill, and blend your background seamlessly so your photos look their best.[^17]", note: "Usage limits may apply." },
      { id: "image-playground", title: "Image Playground.", body: "Create unique, high-quality images in just about any style, including photorealistic. Modify and transform your images with just a description or using touch for endless possibilities.", note: "Usage limits may apply." },
      { id: "suggestions", title: "Suggestions.", body: "Messages[^18] and Mail offer suggestions to help you take quick actions based on context from your conversation — add a calendar event or search for a photo with just a tap.", note: "Available in English." },
      { id: "safari-tabs", title: "Safari tabs.", body: "Now your tabs can be automatically grouped into topics, so related pages are easier to find. Safari Notify Me monitors pages for changes — for example, a price change or restock — and alerts you when it’s time to act. And you can create an extension that personalizes website content and formatting or automates common Safari actions.", note: "" },
      { id: "shortcuts", title: "Shortcuts.", body: "Automate daily tasks with a simple description. Just describe what you need, and Shortcuts creates an automation that connects actions across apps.", note: "Usage limits may apply." },
    ],
  },

  connectivity: {
    headline: "Connectivity.\nPeace of mind in your pocket.",
    label: "Connectivity gallery",
    items: [
      { id: "esim", title: "eSIM.", body: "A built-in eSIM provides seamless connectivity, flexibility, convenience, and better security without the need for a physical SIM card — perfect for traveling.[^13]", cta: "Learn more about eSIM", href: "https://www.apple.com/esim/" },
      { id: "messages", title: "Messages via satellite.", body: "Send and receive messages when you’re off the grid, right from the Messages app.[^14]", cta: "", href: "" },
      { id: "roadside", title: "Roadside Assistance via satellite.", body: "Get help for things like a flat tire or dead car battery. iPhone will connect you with a roadside assistance provider, who can send help to your exact location.[^19]", cta: "See how Roadside Assistance works", href: "https://support.apple.com/guide/iphone/request-roadside-assistance-via-satellite-iph29bea54b5/ios" },
      { id: "esos", title: "Emergency SOS via satellite.", body: "If you try calling 911 but don’t have cell service or Wi‑Fi, you can use iPhone to text emergency services over satellite.[^14]", cta: "See how Emergency SOS via satellite works", href: "https://support.apple.com/guide/iphone/use-emergency-sos-via-satellite-iph2968440de/ios" },
      { id: "crash-detection", title: "Crash Detection.", body: "Hardware sensors and advanced motion algorithms can detect a severe car crash and call for help if you can’t.[^20]", cta: "", href: "" },
      { id: "find-my", title: "Find My.", body: "Securely share your location with friends and family.", cta: "", href: "" },
    ],
  },

  accessories: {
    eyebrow: "Accessories",
    headline: "Addition by attraction.",
    body: "Accessorize in a snap with a selection of MagSafe cases and wallets. And go hands-free with the new Wrist Strap or the Crossbody Strap in new colors.",
    cta: "Shop all iPhone accessories",
    href: "https://www.apple.com/us/shop/goto/iphone/accessories",
    imageAlt: "From left to right, iPhone 18 Pro in Burgundy leather case with Burgundy Crossbody strap, middle iPhone 18 Pro in clear case with MagSafe charger, right iPhone 18 Pro in case with wallet and wrist strap",
  },

  incentive: {
    headline: "Why Apple is the best\nplace to shop iPhone.",
    cta: "Shop iPhone",
    ctaHref: "https://www.apple.com/us/shop/goto/buy_iphone",
    label: "Why Apple gallery",
    close: "Close",
    cards: [
      { id: "apple-upgrade", label: "Apple Upgrade", headline: "Love it. Lease it. Upgrade it.", body: "Lease a new iPhone with low monthly payments for 12 or 24 months and upgrade at the end of your term.[^◊]", alt: "iPhone 18 Pro, back view, silver color, featuring a camera system in the top left corner", href: "https://www.apple.com/us/shop/goto/apple_upgrade", control: "Read more about Apple Upgrade", modal: null as null | { headline: string; body: string; cta: string; href: string } },
      { id: "carrier", label: "Carrier Deals at Apple", headline: "Get up to $1200 in credit on a new iPhone after trade‑in.", body: "Includes carrier credits. AT&T: up to $1200. T‑Mobile: up to $1000. Verizon: up to $840.[^21]", alt: "Verizon, AT&T, T-mobile", href: "https://www.apple.com/us/shop/goto/buy_iphone/carrier_offers", control: "Learn more about carrier deals", modal: null },
      { id: "trade-in", label: "Apple Trade In", headline: "Save on a new iPhone with a trade‑in.", body: "Get credit toward your next iPhone when you trade in an eligible device.[^9]", alt: "Hands exchanging trade-in. Older iPhone in a case with stickers for a new Burgundy iPhone 18 Pro", href: "", control: "Read more about Apple Trade in", modal: { headline: "Trade in your eligible device for credit.", body: "Just add a trade‑in when you choose a new product. Once your eligible device has been received and verified, we’ll credit the value to your payment method. Or choose to check out with Apple Card Monthly Installments and we’ll apply the credit instantly. Terms apply.", cta: "Learn more", href: "https://www.apple.com/us/shop/goto/trade_in" } },
      { id: "ways-to-buy", label: "Ways to Buy", headline: "Pay over time, interest‑free.", body: "When you choose to check out at Apple with Apple Card Monthly Installments.[^**]", alt: "Front of Apple Card, titanium finish", href: "", control: "Read more about Apple Card", modal: { headline: "Apple Card Monthly Installments.", body: "Pay for your new iPhone over time, interest‑free with Apple Card.[^**] Simply choose to check out at Apple with Apple Card Monthly Installments as your payment option when you make your purchase. And enjoy 3% Daily Cash back, all up front. Terms apply.", cta: "Learn more", href: "https://www.apple.com/apple-card/monthly-installments/" } },
      { id: "personal-setup", label: "Personal Setup", headline: "Meet your new iPhone with Personal Setup.", body: "Jump into online sessions with a Specialist to set up your iPhone and discover new features.", alt: "Apple devices and features, iCloud, iPhone with Face ID and charging cable, Camera, messaging", href: "", control: "Learn more about Personal Setup", modal: { headline: "Jump into online, one‑on‑one sessions.", body: "When you buy your new iPhone directly from Apple, you’ll get access to Personal Setup. In these guided online sessions, a Specialist can walk you through setup and data transfer or focus on features that help you make the most of your iPhone. Best of all, you can join whenever works for you, from wherever you are.", cta: "Learn more", href: "https://www.apple.com/us/shop/goto/personal_session" } },
      { id: "delivery", label: "Delivery and Pickup", headline: "Get flexible delivery and easy pickup.", body: "Choose two‑hour delivery from an Apple Store, free delivery, or easy pickup options.", alt: "Apple shopping bag in white color with Apple Logo near top", href: "", control: "Read more about delivery and pickup", modal: { headline: "Flexible delivery and pickup options.", body: "Get your new Apple products quickly and easily with two‑hour delivery from an Apple Store, free next‑day delivery, or convenient Apple pickup options.", cta: "Learn more", href: "https://www.apple.com/us/shop/goto/shipping_pickup" } },
      { id: "guided-shopping", label: "Guided Shopping", headline: "Shop live with a Specialist.", body: "Let us help you find what you need and answer all of your questions, one on one, at an Apple Store or online.", alt: "Smiling Apple Specialist with an approachable demeanor", href: "", control: "Read more about shop with a specialist", modal: { headline: "Get help finding what’s right for you.", body: "Specialists are here to answer your questions about all things Apple. Shop one on one with an Apple Specialist live, at an Apple Store or online.", cta: "Shop with a Specialist online", href: "https://contactretail.apple.com/?pg=iphone&ap=COM&c=us&l=en&ag=SWSOV" } },
      { id: "store-app", label: "Apple Store App", headline: "Explore a shopping experience designed around you.", body: "Use the Apple Store app to get a more personal way to shop.", alt: "Apple Store App, shopping bag icon, blue", href: "", control: "Read more about Apple Store App", modal: { headline: "Shop in the Apple Store app, tailored specifically for you.", body: "Get personalized product recommendations, compare models, access Your Saves, and track your orders. And opt in today to get updates on new products, promotions, flexible payment options, and store events.", cta: "Download the Apple Store app", href: "https://apps.apple.com/us/app/apple-store/id375380948/" } },
    ],
    /** Android-visitor variant overrides (by card id). */
    android: {
      carrier: { headline: "Apple. Your one‑stop shop for incredible carrier deals.[^21]", body: "Get an unbelievable deal on a new iPhone with AT&T, T‑Mobile, or Verizon." },
      "trade-in": { headline: "Get credit toward your next iPhone when you trade in an eligible device.", body: "With Apple Trade In, you can get credit toward a new iPhone when you trade in your Android phone.[^9]" },
    } as Record<string, { headline: string; body: string }>,
  },

  contrast: {
    headline: "Keep exploring iPhone.",
    cta: "Explore all iPhone",
    ctaHref: "https://www.apple.com/iphone/",
    newBadge: "New",
    more: "+ more",
    currentlyViewing: "Currently viewing",
    learnMore: "Learn more",
    buy: "Buy",
    compare: "Compare all iPhone models",
    compareHref: "https://www.apple.com/iphone/compare/",
    products: [
      {
        id: "iphone-18-pro",
        name: "iPhone 18 Pro",
        current: true,
        href: "/iphone-18-pro",
        buyHref: "https://www.apple.com/us/shop/goto/buy_iphone/iphone_18_pro",
        colors: [
          { label: "Burgundy", color: "#4d1821" },
          { label: "Glacier", color: "#e8f2ff" },
          { label: "Silver", color: "#f7f7f7" },
          { label: "Black", color: "#3c3c3c" },
        ],
        positioning: "The ultimate performance and camera of any iPhone, with exceptional battery life.",
        price: "From $1199 or $49.95/mo. for 24 mo.[^*]",
        lease: "Lease from $34.99/mo. for 24 mo. with Apple Upgrade[^◊]",
        display: "6.9” or 6.3”",
        specs: [
          { icon: "", lines: ["Super Retina XDR display[^6]", "—"] },
          { icon: "battery", lines: ["Up to 45 hours video playback[^2]", "—"] },
          { icon: "chip", lines: ["A20 Pro chip", "7-core GPU with Neural Accelerators"] },
          { icon: "camera-pro", lines: ["48MP Pro Fusion camera system", "48MP Fusion Main with variable aperture", "48MP Fusion Ultra Wide", "48MP Fusion Telephoto", "ƒ/1.48, ƒ/1.8, ƒ/2.8, ƒ/4.0 variable aperture options (Fusion Main)"] },
          { icon: "center-stage", lines: ["18MP Center Stage front camera", "Ultra-stabilized video", "Dual Capture", "Center Stage for photos and video calls", "—"] },
          { icon: "intelligence", lines: ["Apple Intelligence[^3]", "Siri AI[^3]"] },
        ],
      },
      {
        id: "iphone-duo",
        name: "iPhone Duo",
        current: false,
        href: "https://www.apple.com/iphone-duo/",
        buyHref: "https://www.apple.com/us/shop/goto/buy_iphone/iphone_duo",
        colors: [
          { label: "Star White", color: "#f7f6f5" },
          { label: "Night Sky", color: "#394452" },
        ],
        positioning: "The largest display of any iPhone. Foldable. Posable. And durable.",
        price: "From $1999 or $83.29/mo. for 24 mo.[^*]",
        lease: "Lease from $57.99/mo. for 24 mo. with Apple Upgrade[^◊]",
        display: "7.6”",
        specs: [
          { icon: "", lines: ["7.6-inch Super Retina XDR folding display with nano‑texture[^6]", "5.4-inch Super Retina XDR outer display[^6]"] },
          { icon: "battery", lines: ["Up to 31 hours video playback when using inner display[^22]", "Up to 44 hours video playback when using outer display[^22]"] },
          { icon: "chip", lines: ["A20 Pro chip", "7-core GPU with Neural Accelerators"] },
          { icon: "camera-duo", lines: ["48MP Dual Fusion camera system", "48MP Fusion Main", "48MP Fusion Ultra Wide", "—", "—"] },
          { icon: "center-stage", lines: ["12MP Center Stage front camera", "Ultra-stabilized video", "Dual Capture", "Center Stage for photos and video calls", "Under-display FaceTime camera"] },
          { icon: "intelligence", lines: ["Apple Intelligence[^3]", "Siri AI[^3]"] },
        ],
      },
    ],
  },

  environment: {
    headline: "iPhone 18 Pro and the environment.",
    cta: "Learn more in our Product Environmental Report (PDF)",
    ctaHref: "https://www.apple.com/environment/pdf/products/iphone/iPhone_18_Pro_and_iPhone_18_Pro_Max_PER_Sept2026.pdf",
    newTab: ", opens in new tab",
    label: "Environment gallery",
    approach: "Our approach.",
    help: "How you can help.",
    close: "Close",
    cards: [
      { id: "recycling", headline: "Made with **40% recycled material** by weight.", accent: "#8a5cc5", modalTitle: "Recycled Material", approach: "Using recycled materials, like 85% recycled aluminum in the enclosure, reduces the need to mine new material, which avoids the carbon emissions and environmental impacts of mining.", help: "You can protect the earth’s precious resources by trading in, passing down, or recycling devices and accessories you no longer use. You can bring them into any Apple Store for free, secure recycling. We also offer other ways to recycle, including mail-in options.", helpCta: "Learn how to trade in or recycle devices", helpHref: "https://www.apple.com/us/shop/goto/trade_in/#recycle", control: "Learn more about Apple’s approach to recycled material" },
      { id: "electricity", headline: "Manufactured with **50% renewable electricity.**", accent: "#e45e1c", modalTitle: "Renewable Electricity", approach: "Using electricity from renewable sources like wind and solar — instead of fossil fuels — across our global supply chain significantly reduces carbon emissions from manufacturing Apple products.", help: "You can extend the lifespan of your batteries and Apple products by using Optimized Battery Charging. It works by learning your charging habits and delaying the final charge — from 80% to 100% — until you are likely to need it.", helpCta: "Learn more about Optimized Battery Charging", helpHref: "https://support.apple.com/en-us/108055?cid=general-iphone-b3d8fc66-62029290", control: "Learn more about Apple’s approach to renewable electricity" },
      { id: "package", headline: "Ships in **100% fiber-based packaging.**", accent: "#1aa1b9", modalTitle: "Package and Ship", approach: "iPhone 18 Pro comes in a 100% fiber-based box as part of our commitment to remove plastic from the packaging of all Apple products.", help: "New Apple products come in paper packaging that’s 100% fiber-based, so for many customers, the entire box can go straight into your household recycling bin. You can also bring Apple packaging to any Apple Store, and we’ll recycle it for free.", helpCta: "Learn more about recycling", helpHref: "https://www.apple.com/us/shop/goto/trade_in/#recycle", control: "Learn more about Apple’s approach to packaging" },
    ],
  },

  values: {
    headline: "Our values lead the way.",
    label: "Values gallery",
    cards: [
      { id: "environment", headline: "A plan as innovative as our products.", body: "We’re committed to bringing net emissions to zero across our entire carbon footprint by 2030.", cta: "Learn more about environment", href: "https://www.apple.com/environment/" },
      { id: "privacy", headline: "Privacy. That’s Apple.", body: "Privacy is a fundamental human right. Every product and service is designed to help keep your data safe and secure.", cta: "Learn more about privacy", href: "https://www.apple.com/privacy/" },
      { id: "accessibility", headline: "Innovation that’s accessible by design.", body: "Our products and services are designed for everyone, with built-in features to help you do what you love, your way.", cta: "Learn more about accessibility", href: "https://www.apple.com/accessibility/" },
    ],
  },

  index: {
    headline: "iPhone",
    columns: [
      {
        title: "Explore iPhone",
        elevated: true,
        links: [
          { label: "Explore All iPhone", href: "https://www.apple.com/iphone/" },
          { label: "iPhone Duo", href: "https://www.apple.com/iphone-duo/" },
          { label: "iPhone 18 Pro", href: "/iphone-18-pro" },
          { label: "iPhone Air", href: "https://www.apple.com/iphone-air/" },
          { label: "iPhone 17", href: "https://www.apple.com/iphone-17/" },
          { label: "iPhone 17e", href: "https://www.apple.com/iphone-17e/" },
          { label: "iPhone 16", href: "https://www.apple.com/us/shop/goto/buy_iphone/iphone_16" },
        ],
        extra: [
          { label: "Compare iPhone", href: "https://www.apple.com/iphone/compare/" },
          { label: "Switch from Android", href: "https://www.apple.com/iphone/switch/" },
        ],
      },
      {
        title: "Shop iPhone",
        elevated: false,
        links: [
          { label: "Shop iPhone", href: "https://www.apple.com/us/shop/goto/buy_iphone" },
          { label: "iPhone Accessories", href: "https://www.apple.com/us/shop/goto/iphone/accessories" },
          { label: "Apple Upgrade", href: "https://www.apple.com/us/shop/goto/apple_upgrade" },
          { label: "Apple Trade In", href: "https://www.apple.com/us/shop/goto/trade_in#iphone" },
          { label: "Carrier Deals at Apple", href: "https://www.apple.com/us/shop/goto/buy_iphone/carrier_offers" },
          { label: "Financing", href: "https://www.apple.com/us/shop/goto/payment_plan" },
          { label: "Personal Setup", href: "https://www.apple.com/us/shop/goto/personal_setup" },
        ],
        extra: [] as { label: string; href: string }[],
      },
      {
        title: "More from iPhone",
        elevated: false,
        links: [
          { label: "iPhone Support", href: "https://support.apple.com/iphone?cid=gn-ols-iphone-psp-prodfly" },
          { label: "AppleCare", href: "https://www.apple.com/applecare/?filter=iphone" },
          { label: "iOS 27", href: "https://www.apple.com/os/ios/" },
          { label: "Apple Intelligence and Siri", href: "https://www.apple.com/apple-intelligence/" },
          { label: "Apps by Apple", href: "https://www.apple.com/apps/" },
          { label: "iPhone Privacy", href: "https://www.apple.com/privacy/" },
          { label: "Better with Mac", href: "https://www.apple.com/macos/continuity/" },
          { label: "iCloud+", href: "https://www.apple.com/icloud/" },
          { label: "Wallet, Pay, Card", href: "https://www.apple.com/wallet/" },
          { label: "Apple at Work", href: "https://www.apple.com/business/" },
        ],
        extra: [],
      },
    ],
  },

  footer: {
    breadcrumbs: ["Apple", "iPhone", "iPhone 18 Pro"],
    breadcrumbHrefs: ["https://www.apple.com/", "https://www.apple.com/iphone/", "/iphone-18-pro"],
    /** Footnotes stay in their source language (legal copy). */
    footnoteLang: "en",
    /** Translations for directory titles/links from data/footer.en.json. Empty = keep source labels. */
    labels: {} as Record<string, string>,
    shop: "",
    copyright: "",
    legalLinks: [] as { label: string; href: string }[],
    regionLabel: "Choose your country or region",
  },

  media: {
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    zoomVideo: "8x optical-quality zoom video",
    timelapseVideo: "4K time-lapse video",
    previous: "Previous item",
    next: "Next item",
  },
};

export type PageContent = typeof en;
