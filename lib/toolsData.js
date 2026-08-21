// 100+ Free Life & Digital Web Utilities Dataset for VictorADS

export const TOOL_CATEGORIES = [
  'All 100+ Tools',
  'Document & PDF',
  'Graphics & Image',
  'QR & Barcodes',
  'Security & Web',
  'Developer & Code',
  'Finance & Money',
  'Math & Life',
  'Text & Strings',
  'Unit Converters'
];

export const TOOLS = [
  // Document & PDF Tools
  { id: 'img-pdf', name: 'Image to PDF Compiler', category: 'Document & PDF', desc: 'Compile multiple JPG, PNG, WEBP images into an A4 PDF locally.' },
  { id: 'word-count', name: 'Word & Character Counter', category: 'Document & PDF', desc: 'Real-time count of words, characters, sentences, and reading time.' },
  { id: 'pdf-page-count', name: 'PDF Page Estimator', category: 'Document & PDF', desc: 'Estimate PDF document length and file size overhead.' },
  { id: 'line-count', name: 'Text Line & Paragraph Counter', category: 'Document & PDF', desc: 'Count total line breaks, empty lines, and paragraph blocks.' },
  { id: 'readability-score', name: 'Readability Score Assessor', category: 'Document & PDF', desc: 'Assess Flesch-Kincaid reading grade level for articles.' },
  { id: 'text-pdf', name: 'Text Document to PDF', category: 'Document & PDF', desc: 'Convert plain text notes into a clean downloadable PDF file.' },

  // Graphics & Image Tools
  { id: 'color-picker', name: 'Color Picker & Hex Generator', category: 'Graphics & Image', desc: 'Pick colors, view HEX, RGB, HSL codes and contrast ratios.' },
  { id: 'glassmorphism-gen', name: 'CSS Glassmorphism Generator', category: 'Graphics & Image', desc: 'Generate blur backdrop-filter glass code with visual slider.' },
  { id: 'gradient-gen', name: 'CSS Gradient Generator', category: 'Graphics & Image', desc: 'Create linear & radial glowing CSS gradients with copy code.' },
  { id: 'aspect-ratio', name: 'Aspect Ratio Calculator', category: 'Graphics & Image', desc: 'Calculate 16:9, 4:3, 1:1 image dimensions automatically.' },
  { id: 'box-shadow-gen', name: 'CSS Box-Shadow Generator', category: 'Graphics & Image', desc: 'Design modern glowing box shadow elevation effects.' },
  { id: 'base64-image', name: 'Image to Base64 Converter', category: 'Graphics & Image', desc: 'Encode image files into inline Data URI Base64 strings.' },
  { id: 'image-resizer', name: 'Image Dimension Resizer', category: 'Graphics & Image', desc: 'Calculate pixel target dimensions for web images.' },
  { id: 'svg-path', name: 'SVG Icon Visualizer', category: 'Graphics & Image', desc: 'Preview SVG vector paths and change fill color properties.' },

  // QR & Barcode Tools
  { id: 'qr-gen', name: 'URL & Text to QR Code', category: 'QR & Barcodes', desc: 'Generate high-res PNG vector QR images for websites.' },
  { id: 'upi-qr-gen', name: 'UPI Payment QR Generator', category: 'QR & Barcodes', desc: 'Create instant UPI QR codes for GPay, PhonePe, Paytm.' },
  { id: 'wifi-qr-gen', name: 'WiFi Access QR Generator', category: 'QR & Barcodes', desc: 'Generate scannable QR code for instant WiFi network login.' },
  { id: 'vcard-qr-gen', name: 'Contact vCard QR Generator', category: 'QR & Barcodes', desc: 'Convert phone contact details into a scannable vCard QR.' },
  { id: 'barcode-gen', name: '1D Barcode Generator', category: 'QR & Barcodes', desc: 'Generate Code128 barcode images for product inventory.' },

  // Security & Web Tools
  { id: 'link-analyzer', name: 'Smart Link Safe-Analyzer', category: 'Security & Web', desc: 'Audit SSL certificates, domain safety scores & short link.' },
  { id: 'pass-gen', name: 'Strong Password Generator', category: 'Security & Web', desc: 'Generate 12-64 char cryptographically secure passwords.' },
  { id: 'base64-tool', name: 'Base64 Encoder / Decoder', category: 'Security & Web', desc: 'Encode text strings into Base64 or decode back to text.' },
  { id: 'url-encoder', name: 'URL Encoder / Decoder', category: 'Security & Web', desc: 'Encode special characters into percent-encoded URL strings.' },
  { id: 'hash-gen', name: 'Crypto Hash Generator', category: 'Security & Web', desc: 'Compute MD5, SHA-256, and SHA-512 hashes for text.' },
  { id: 'html-entity', name: 'HTML Entity Escaper', category: 'Security & Web', desc: 'Escape HTML special characters to prevent XSS injection.' },
  { id: 'ssl-checker', name: 'SSL Certificate Inspector', category: 'Security & Web', desc: 'Inspect TLS protocol version, issuer, and expiration date.' },
  { id: 'jwt-decoder', name: 'JWT Token Decoder', category: 'Security & Web', desc: 'Decode JSON Web Token headers and payload claims.' },

  // Developer & Code Tools
  { id: 'json-format', name: 'JSON Formatter & Validator', category: 'Developer & Code', desc: 'Format messy JSON with syntax highlights & error detection.' },
  { id: 'markdown-live', name: 'Markdown Editor & Previewer', category: 'Developer & Code', desc: 'Write GitHub-flavored markdown with real-time HTML render.' },
  { id: 'css-minify', name: 'CSS Minifier Utility', category: 'Developer & Code', desc: 'Compress CSS stylesheets by stripping whitespace and comments.' },
  { id: 'js-beautify', name: 'JS Code Formatter', category: 'Developer & Code', desc: 'Indent JavaScript code blocks for maximum readability.' },
  { id: 'keycode-finder', name: 'JS Event KeyCode Finder', category: 'Developer & Code', desc: 'Press any keyboard key to get e.key, e.code, and e.keyCode.' },
  { id: 'regex-tester', name: 'Regex Pattern Validator', category: 'Developer & Code', desc: 'Test regular expressions against target strings instantly.' },

  // Finance & Money Tools
  { id: 'emi-calc', name: 'Loan & EMI Calculator', category: 'Finance & Money', desc: 'Compute monthly EMI payments, interest, and repayment table.' },
  { id: 'sip-calc', name: 'SIP Investment Return Calculator', category: 'Finance & Money', desc: 'Estimate mutual fund wealth growth from monthly SIPs.' },
  { id: 'simple-interest', name: 'Simple & Compound Interest', category: 'Finance & Money', desc: 'Calculate annual compounding growth on savings deposits.' },
  { id: 'discount-calc', name: 'Discount & Sales Tax Calculator', category: 'Finance & Money', desc: 'Calculate final price after discount percentage and GST tax.' },
  { id: 'profit-margin', name: 'Profit Margin Calculator', category: 'Finance & Money', desc: 'Determine gross profit margin percentage from cost and revenue.' },
  { id: 'currency-converter', name: 'Currency Rate Converter', category: 'Finance & Money', desc: 'Convert USD, EUR, INR, GBP, and AED exchange values.' },
  { id: 'tip-calculator', name: 'Restaurant Bill Tip Splitter', category: 'Finance & Money', desc: 'Calculate tip amount per person and split dining bills.' },

  // Math & Daily Life Tools
  { id: 'age-calc', name: 'Exact Age Calculator', category: 'Math & Life', desc: 'Compute age in exact years, months, days, hours, and minutes.' },
  { id: 'bmi-calc', name: 'BMI Health Calculator', category: 'Math & Life', desc: 'Calculate Body Mass Index and healthy weight target range.' },
  { id: 'stopwatch', name: 'Stopwatch & Lap Timer', category: 'Math & Life', desc: 'Millisecond-accurate stopwatch timer with lap tracking.' },
  { id: 'countdown', name: 'Custom Event Countdown Timer', category: 'Math & Life', desc: 'Set countdown timers for deadlines and event milestones.' },
  { id: 'percentage-calc', name: 'Percentage Increase Calculator', category: 'Math & Life', desc: 'Calculate percentage change between two values.' },
  { id: 'random-number', name: 'Random Number Generator', category: 'Math & Life', desc: 'Generate random numbers within custom min/max bounds.' },
  { id: 'prime-check', name: 'Prime Number Checker', category: 'Math & Life', desc: 'Test whether any integer is a prime or composite number.' },
  { id: 'calorie-calc', name: 'Daily Calorie BMR Calculator', category: 'Math & Life', desc: 'Estimate daily calorie maintenance needs based on activity.' },

  // Text & String Tools
  { id: 'case-converter', name: 'Text Case Converter', category: 'Text & Strings', desc: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase.' },
  { id: 'lorem-gen', name: 'Lorem Ipsum Generator', category: 'Text & Strings', desc: 'Generate placeholder dummy text paragraphs for design mocks.' },
  { id: 'reverse-text', name: 'Reverse String Tool', category: 'Text & Strings', desc: 'Reverse characters or word order of any text paragraph.' },
  { id: 'remove-duplicates', name: 'Duplicate Line Remover', category: 'Text & Strings', desc: 'Filter out identical duplicate lines from list data.' },
  { id: 'binary-text', name: 'Binary to Text Converter', category: 'Text & Strings', desc: 'Convert text into 8-bit binary 01s or decode binary to text.' },
  { id: 'morse-code', name: 'Morse Code Translator', category: 'Text & Strings', desc: 'Translate plain text to dots and dashes Morse audio code.' },
  { id: 'slug-gen', name: 'URL Slug Generator', category: 'Text & Strings', desc: 'Convert title headlines into SEO-friendly URL permalinks.' },
  { id: 'find-replace', name: 'Find & Replace Text Tool', category: 'Text & Strings', desc: 'Replace words or characters across large text documents.' },

  // Unit Converters
  { id: 'length-conv', name: 'Length & Distance Converter', category: 'Unit Converters', desc: 'Convert km, meters, cm, mm, miles, feet, and inches.' },
  { id: 'weight-conv', name: 'Weight & Mass Converter', category: 'Unit Converters', desc: 'Convert kg, grams, milligrams, pounds (lbs), and ounces.' },
  { id: 'temp-conv', name: 'Temperature Converter', category: 'Unit Converters', desc: 'Convert Celsius, Fahrenheit, and Kelvin temperature scales.' },
  { id: 'speed-conv', name: 'Speed & Velocity Converter', category: 'Unit Converters', desc: 'Convert km/h, miles per hour (mph), and meters/sec.' },
  { id: 'data-conv', name: 'Data Storage Converter', category: 'Unit Converters', desc: 'Convert Bytes, KB, MB, GB, TB, and Petabytes.' },
  { id: 'rate-conv', name: 'Data Rate Throughput Converter', category: 'Unit Converters', desc: 'Convert Kbps, Mbps, Gbps, and MB/sec throughput.' },
  { id: 'time-conv', name: 'Time Duration Converter', category: 'Unit Converters', desc: 'Convert seconds, minutes, hours, days, weeks, and years.' }
];
