// STATIC website content, used until the admin panel / API is switched on (set VITE_USE_API=true to use the API instead).
// The shape is exactly what the Laravel API returns, so going dynamic later needs no component changes.
// Pictures are the site photos in /public/images (1.jpeg … 16.jpeg).

const img = (n) => `/images/${n}.jpeg`

const phones = ['+91 96612 44434', '+91 93693 85322']

export const staticContent = {
  site: {
    name: 'Damvolt Engineering Service Private Limited',
    shortName: 'Damvolt',
    tagline: 'Electrical & Instrumentation Contractor',
    description:
      'Damvolt is an electrical and instrumentation (E&I) contractor for cement plants, power plants, steel plants, refineries and power grid projects — erection, testing, shutdown work and skilled manpower supply.',
    emails: ['damvoltengineeringservice@gmail.com'],
    phones,
    whatsapp: '919661244434',
    hours: 'Mon – Sat, 9:30 AM – 6:30 PM',
    offices: [
      {
        label: 'Office',
        address: 'Motassim Digital Sewa, Jhumka, Sikta, Paschim Champaran, Bihar, India – 845307',
        city: 'Sikta, Bihar',
        map: 'https://maps.google.com/maps?q=26.9924678,84.6405128&z=16&output=embed',
        mapLink: 'https://www.google.com/maps/place/Motassim+Digital+Sewa/@26.9924678,84.6405128,17z',
      },
    ],
    social: {},
  },

  home: {
    seo: {
      title: 'Damvolt Engineering | E&I Contractor – Cement, Power, Steel & Refinery Plants',
      description:
        'Electrical & instrumentation erection, panel, transformer and cable tray work, meggering testing, shutdown work and manpower supply for cement, power, solar, steel and refinery plants.',
      keywords:
        'E&I contractor, electrical erection, panel erection, transformer erection, cable tray erection, instrument installation, meggering testing, manpower supply, shutdown work, cement plant, power plant, Bihar',
    },
    slides: [
      {
        image: img(13),
        kicker: 'Electrical & Instrumentation Contractor',
        title: 'Powering cement, power and steel plants.',
        text: 'Complete E&I project work — panels, transformers, cable trays, testing and commissioning by one experienced team.',
        cta: { label: 'Get a free quote', to: '/contact' },
        cta2: { label: 'Our services', to: '/services' },
      },
      {
        image: img(6),
        kicker: 'Plant Erection · Shutdown Work',
        title: 'On site when your plant needs us most.',
        text: 'Planned shutdown and breakdown work with trained manpower, proper tools and strict site-safety discipline.',
        cta: { label: 'Explore services', to: '/services' },
        cta2: { label: 'Call us', to: 'tel:+919661244434' },
      },
      {
        image: img(12),
        kicker: 'Power Grid · Substations',
        title: 'Reliable power grid and substation works.',
        text: 'Transformer erection, HT/LT switchgear, cabling and meggering tests — done right and documented.',
        cta: { label: 'Send an enquiry', to: '/contact' },
        cta2: { label: 'Work with us', to: '/careers' },
      },
    ],
    trust: [
      { icon: 'ShieldCheck', title: 'Safety first', text: 'Strict site-safety practice' },
      { icon: 'Wrench', title: 'Skilled manpower', text: 'Trained technicians & supervisors' },
      { icon: 'Clock', title: 'On-time delivery', text: 'Planned execution' },
      { icon: 'Headset', title: 'Quick response', text: 'Shutdown & breakdown support' },
    ],
    about: {
      eyebrow: 'About Damvolt',
      title: 'One partner for your complete E&I work.',
      lead: 'Damvolt Engineering Service Private Limited (Damvolt) is an electrical and instrumentation contractor working in heavy industrial plants.',
      text: 'From cable tray and panel erection to instrument installation, meggering tests and power grid work, our crew handles the job from the first marking to final handover — safely and on schedule.',
      image: img(6),
      badgeValue: 'E&I',
      badgeLabel: 'Complete project work',
      points: ['Panel, transformer & cable tray erection', 'Instrument installation & testing', 'Shutdown and maintenance work', 'Skilled manpower supply'],
      buttonLabel: 'Our services',
      buttonUrl: '/services',
    },
    servicesHead: {
      eyebrow: 'Services',
      title: 'Electrical & instrumentation services',
      text: 'End-to-end erection, testing and automation work for industrial and infrastructure projects.',
      link_label: 'View all services',
    },
    statsHead: {},
    whyHead: {
      eyebrow: 'Why choose us',
      title: 'Built on safety, quality and trust.',
      text: 'Disciplined execution and experienced people on every project.',
    },
    why: [
      { icon: 'ShieldCheck', title: 'Safety First', text: 'Every job follows site-safety rules and standard electrical practice.' },
      { icon: 'Wrench', title: 'Experienced Crew', text: 'Technicians and supervisors who have worked in large industrial plants.' },
      { icon: 'Clock', title: 'On-Time Delivery', text: 'Planned manpower and material so work finishes within the shutdown window.' },
      { icon: 'Workflow', title: 'Turnkey Execution', text: 'Erection, cabling, termination, testing and commissioning with one team.' },
      { icon: 'BadgeCheck', title: 'Quality Workmanship', text: 'Neat, tested and documented work that passes client inspection.' },
      { icon: 'Headset', title: 'Quick Response', text: 'Reach us by call or WhatsApp for urgent site requirements.' },
    ],
    processHead: { eyebrow: 'How we work', title: 'From enquiry to handover' },
    process: [
      { step: 1, title: 'Requirement', text: 'Share your scope, drawings and schedule with us.' },
      { step: 2, title: 'Site survey & quote', text: 'We study the site and send a clear quotation.' },
      { step: 3, title: 'Execution', text: 'Mobilisation of crew and materials, work as per plan and safety rules.' },
      { step: 4, title: 'Testing & handover', text: 'Meggering and checks, documentation and handover.' },
    ],
    industriesHead: {
      eyebrow: 'Sectors',
      title: 'Industries we work in',
      text: 'Cement, power, steel, refinery, oil & gas and more.',
    },
    reviewsHead: {},
    cta: {
      title: 'Have a project or shutdown coming up?',
      text: 'Talk to our team — call, WhatsApp or send an enquiry and get a quick quotation.',
    },
  },

  categories: [
    { key: 'Erection', title: 'Erection & installation', text: 'Panels, transformers, cable trays, switchgear and instruments — erected and terminated.' },
    { key: 'Projects', title: 'Projects & automation', text: 'Complete E&I projects, power grid, building electrical and automation.' },
    { key: 'Testing', title: 'Testing', text: 'Verified insulation and performance before energising.' },
  ],

  services: [
    {
      slug: 'e-and-i-complete-project-work',
      title: 'E&I Complete Project Work',
      category: 'Projects',
      icon: 'Factory',
      image: img(2),
      short: 'Complete electrical and instrumentation project execution for industrial plants.',
      intro:
        'We execute the full electrical and instrumentation scope of a plant — from cable trays and cabling to panels, field instruments, termination, testing and commissioning — so your project has a single accountable E&I contractor.',
      offerings: [
        'Cable tray, conduit and cable laying',
        'Panel, MCC and switchgear erection',
        'Cable glanding, lugging and termination',
        'Field instrument installation and loop checking',
        'Earthing and lightning protection',
        'Pre-commissioning checks and handover documents',
      ],
      benefits: [
        { title: 'Single Point', text: 'One team responsible for the entire E&I scope.' },
        { title: 'On Schedule', text: 'Planned manpower and material for timely completion.' },
        { title: 'Clean Handover', text: 'Tested work with proper documentation.' },
      ],
      applications: ['Cement plants', 'Power plants', 'Steel plants', 'Refineries', 'Oil & gas'],
    },
    {
      slug: 'panel-erection',
      title: 'Panel Erection',
      category: 'Erection',
      icon: 'LayoutPanelTop',
      image: img(7),
      short: 'Erection, alignment and termination of control, MCC, PCC and relay panels.',
      intro:
        'We handle the shifting, levelling, grouting and connection of electrical panels at site. Every panel is aligned on its base frame, bus-bars are coupled and cables are terminated neatly with proper ferruling.',
      offerings: [
        'MCC, PCC, PDB and control panel erection',
        'Base frame fixing, levelling and alignment',
        'Bus-bar coupling and torque checks',
        'Cable termination with ferrules and tags',
        'Panel earthing',
        'Panel cleaning and final inspection',
      ],
      benefits: [
        { title: 'Precise Alignment', text: 'Level, plumb panels with smooth door and breaker operation.' },
        { title: 'Neat Wiring', text: 'Clearly tagged and dressed terminations.' },
        { title: 'Safe Work', text: 'Proper lifting and isolation practices on site.' },
      ],
      applications: ['Plant MCC rooms', 'Control rooms', 'Substations', 'Power plants'],
    },
    {
      slug: 'transformer-erection',
      title: 'Transformer Erection',
      category: 'Erection',
      icon: 'Zap',
      image: img(12),
      short: 'Positioning, assembly, oil filling and connection of power and distribution transformers.',
      intro:
        'We erect power and distribution transformers at site — placement on plinth, accessory fitting, oil filling, bushing and cable connections — followed by the required tests before charging.',
      offerings: [
        'Transformer shifting and placement on plinth',
        'Radiator, conservator and accessory assembly',
        'Oil filtration and filling',
        'HT / LT cable and bus-duct connection',
        'Earthing of neutral and body',
        'Pre-charging tests and checks',
      ],
      benefits: [
        { title: 'Experienced Handling', text: 'Careful handling of heavy equipment.' },
        { title: 'Tested Before Charging', text: 'Checks completed before energising.' },
        { title: 'Safe Execution', text: 'Lifting plans and permits followed.' },
      ],
      applications: ['Plant substations', 'Power plants', 'Solar plants', 'Industrial units'],
    },
    {
      slug: 'cable-tray-erection-work',
      title: 'Cable Tray Erection Work',
      category: 'Erection',
      icon: 'Cable',
      image: img(15),
      short: 'Supply-support fabrication and erection of ladder and perforated cable trays.',
      intro:
        'Cable trays are the backbone of plant wiring. We erect GI ladder and perforated trays with supports, bends and risers on structures and racks, ready for cable laying.',
      offerings: [
        'Ladder and perforated cable tray erection',
        'Support, bracket and clamp fixing',
        'Bends, tees, risers and reducers',
        'Trays on structures, racks and trenches',
        'Tray earthing continuity',
        'Cable laying and dressing on trays',
      ],
      benefits: [
        { title: 'Strong Supports', text: 'Rigid fixing designed for cable load.' },
        { title: 'Neat Routing', text: 'Clean routes that make future maintenance easy.' },
        { title: 'Height Work Skills', text: 'Trained crew for high-rise plant structures.' },
      ],
      applications: ['Cement plants', 'Steel plants', 'Power plants', 'Refineries'],
    },
    {
      slug: 'instrument-installation',
      title: 'Instrument Installation',
      category: 'Erection',
      icon: 'Gauge',
      image: img(8),
      short: 'Installation, tubing, wiring and loop checking of field instruments.',
      intro:
        'We install field instruments — transmitters, gauges, switches, flow, level and temperature elements — including impulse tubing, cabling, junction boxes and loop checks.',
      offerings: [
        'Pressure, temperature, flow and level instruments',
        'Impulse tubing and instrument air tubing',
        'Junction box and instrument cable laying',
        'Cable termination and ferruling',
        'Loop checking and calibration support',
        'Control valve and actuator hook-up',
      ],
      benefits: [
        { title: 'Accurate Hook-up', text: 'Installed as per P&ID and drawings.' },
        { title: 'Loop Tested', text: 'Every loop checked end to end.' },
        { title: 'Clean Tubing', text: 'Neat, leak-free tubing work.' },
      ],
      applications: ['Refineries', 'Oil & gas', 'Power plants', 'Cement & steel plants'],
    },
    {
      slug: 'meggering-testing',
      title: 'Meggering Testing',
      category: 'Testing',
      icon: 'Activity',
      image: img(14),
      short: 'Insulation resistance testing of cables, motors, transformers and switchgear.',
      intro:
        'Before any equipment is energised its insulation must be proven. We carry out meggering (insulation resistance) tests on cables, motors, transformers and bus-bars and record the results in test reports.',
      offerings: [
        'HT and LT cable insulation resistance tests',
        'Motor and transformer winding IR tests',
        'Bus-bar and switchgear IR tests',
        'Earth resistance measurement',
        'Polarisation index where required',
        'Test reports for client approval',
      ],
      benefits: [
        { title: 'Safe Energising', text: 'Faults found before they cause damage.' },
        { title: 'Recorded Results', text: 'Clear reports for your records.' },
        { title: 'Calibrated Tools', text: 'Reliable testing instruments.' },
      ],
      applications: ['New plants', 'Shutdown maintenance', 'Substations', 'Motors and drives'],
    },
    {
      slug: 'switchgear-and-switchboard',
      title: 'Switchgear & Switchboard',
      category: 'Erection',
      icon: 'PlugZap',
      image: img(10),
      short: 'Erection, connection and checking of HT / LT switchgear and switchboards.',
      intro:
        'We erect and connect HT and LT switchgear and switchboards, including breaker trucks, bus-bars, protection wiring and interlocks, and support the testing needed to commission them.',
      offerings: [
        'HT and LT switchgear erection',
        'Main and distribution switchboard erection',
        'Breaker rack-in / rack-out checks',
        'Bus-bar jointing and torque verification',
        'Control and protection wiring',
        'Pre-commissioning support',
      ],
      benefits: [
        { title: 'Safe Connections', text: 'Torqued, tested and inspected joints.' },
        { title: 'Correct Wiring', text: 'As per schematic, checked before charging.' },
        { title: 'Support to Commissioning', text: 'Our team stays through energisation.' },
      ],
      applications: ['Plant substations', 'Power houses', 'Industrial plants', 'Commercial buildings'],
    },
    {
      slug: 'automation',
      title: 'Automation',
      category: 'Projects',
      icon: 'Cpu',
      image: img(4),
      short: 'Control wiring, field hook-up and support for PLC / DCS based plant automation.',
      intro:
        'We support automation projects at site with control cabling, panel hook-up, field device wiring, signal checking and commissioning assistance for PLC, DCS and drive-based systems.',
      offerings: [
        'PLC / DCS panel hook-up',
        'Control and signal cabling',
        'VFD and drive wiring',
        'Field device installation and testing',
        'I/O and loop checking',
        'Commissioning assistance',
      ],
      benefits: [
        { title: 'Accurate Wiring', text: 'Signals tested before the system goes live.' },
        { title: 'Less Downtime', text: 'Quick fault finding during commissioning.' },
        { title: 'Experienced Support', text: 'Technicians who know plant control systems.' },
      ],
      applications: ['Cement plants', 'Steel plants', 'Power plants', 'Process industries'],
    },
    {
      slug: 'power-grid',
      title: 'Power Grid',
      category: 'Projects',
      icon: 'Zap',
      image: img(12),
      short: 'Substation, switchyard and HT line related electrical works.',
      intro:
        'We execute electrical works in substations and switchyards — equipment erection, structure assembly, earthing, cabling and testing — for plant power-grid connections and utility projects.',
      offerings: [
        'Switchyard equipment erection',
        'Structure assembly and fixing',
        'Earth mat and earthing works',
        'HT cable laying and termination',
        'Control and relay panel wiring',
        'Testing and commissioning support',
      ],
      benefits: [
        { title: 'Heavy-duty Experience', text: 'Work on live industrial power systems.' },
        { title: 'Strict Safety', text: 'Permit-to-work and lock-out practices.' },
        { title: 'Documented Work', text: 'Records ready for utility inspection.' },
      ],
      applications: ['Plant substations', 'Solar plants', 'Power plants', 'Utility projects'],
    },
    {
      slug: 'electrical-construction-building-work',
      title: 'Electrical Construction Building Work',
      category: 'Projects',
      icon: 'Building2',
      image: img(1),
      short: 'Complete electrical works for plant buildings, offices and colonies.',
      intro:
        'We do the full electrical work of buildings — conduiting, wiring, DB installation, lighting, fans, power outlets, earthing and testing — for plant buildings, offices and residential colonies.',
      offerings: [
        'Conduit and concealed / surface wiring',
        'Distribution board and MCB installation',
        'Lighting, fan and power point work',
        'Plant area and street lighting',
        'Earthing and lightning protection',
        'Testing and handover',
      ],
      benefits: [
        { title: 'Neat Finish', text: 'Clean wiring that stays safe for years.' },
        { title: 'Code Compliant', text: 'Standard electrical practice followed.' },
        { title: 'Timely Completion', text: 'Works planned with the civil schedule.' },
      ],
      applications: ['Plant buildings', 'Offices', 'Colonies', 'Warehouses'],
    },
  ],

  industries: [
    { title: 'Cement Industry', icon: 'Factory', image: img(13) },
    { title: 'Power Plant', icon: 'Zap', image: img(7) },
    { title: 'Solar Plant', icon: 'Sun', image: img(16) },
    { title: 'Power Grid', icon: 'PlugZap', image: img(12) },
    { title: 'ECP', icon: 'Building2', image: img(2) },
    { title: 'Supply Manpower', icon: 'Users', image: img(3) },
    { title: 'Steel Plant', icon: 'Anvil', image: img(9) },
    { title: 'Refinery Plant', icon: 'FlaskConical', image: img(8) },
    { title: 'Oil & Gas', icon: 'Fuel', image: img(5) },
    { title: 'Shutdown Work', icon: 'Wrench', image: img(4) },
  ],

  // Work requirements hosted on the Careers page. Empty = none shown. Add { title, exp, loc, note } entries to list one.
  careers: [],

  reviews: [],
  faqs: [],
  legal: [
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      description: 'How Damvolt collects, uses and protects the information you share with us.',
      updated: 'October 2026',
      content:
        '<p>This Privacy Policy explains how Damvolt Engineering Service Private Limited ("Damvolt", "we") handles the information you share through this website.</p>' +
        '<h2>Information we collect</h2><p>When you send an enquiry, call us or message us on WhatsApp, we receive the details you give: your name, phone number, email address, company and the requirement you describe.</p>' +
        '<h2>How we use it</h2><p>We use this information only to reply to your enquiry, prepare quotations and carry out the work you ask for. We do not sell your information to anyone.</p>' +
        '<h2>Sharing</h2><p>We share information only when it is needed to deliver our service, or when the law requires it.</p>' +
        '<h2>Your choices</h2><p>You can ask us to correct or delete the information you have shared at any time by contacting us.</p>',
    },
    {
      title: 'Terms & Conditions',
      slug: 'terms-and-conditions',
      description: 'Terms for using the Damvolt website and our services.',
      updated: 'October 2026',
      content:
        '<p>By using this website you agree to these terms.</p>' +
        '<h2>Information on this website</h2><p>The content here is for general information about our services. Scope, price and schedule of any work are confirmed only in a written quotation or work order.</p>' +
        '<h2>Quotations and work</h2><p>Quotations are valid for the period stated in them. Work is carried out under the terms agreed in the work order, including site-safety rules.</p>' +
        '<h2>Liability</h2><p>We take care to keep this website accurate, but we are not liable for loss arising from reliance on the general information shown here.</p>' +
        '<h2>Changes</h2><p>We may update these terms from time to time. The latest version is always on this page.</p>',
    },
    {
      title: 'Disclaimer',
      slug: 'disclaimer',
      description: 'Disclaimer for the information on the Damvolt website.',
      updated: 'October 2026',
      content:
        '<p>The pictures and descriptions on this website are shown to illustrate the kind of work we do. They may include work at client sites and plants.</p>' +
        '<p>Company and plant names, where mentioned, belong to their respective owners. Damvolt does not claim any affiliation beyond the work it has been engaged for.</p>' +
        '<p>Electrical and instrumentation work is hazardous. Please do not attempt any work shown here without qualified, authorised personnel.</p>',
    },
  ],
  pageSeo: {},
}
