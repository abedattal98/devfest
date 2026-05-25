const fs = require('fs');
const path = require('path');

const routes = [
  {
    path: 'sponsoring',
    title: 'Devenir Sponsor - DevFest Paris 2026 | GDG Paris',
    description: 'Devenez sponsor du DevFest Paris 2026. Packs Silver, Gold et Premium disponibles. Networking avec 450+ développeurs, visibilité maximale, recrutement de talents tech. Rejoignez la 8ème édition le 27 novembre 2026.',
    keywords: 'Sponsor DevFest, Sponsoring Conférence Tech, GDG Paris, Pack Sponsor, Visibilité Tech, Recrutement Développeurs, DevFest Paris 2026',
    ogDescription: 'Devenez sponsor du DevFest Paris 2026. Packs Silver, Gold et Premium. 450+ développeurs, 30+ speakers experts.',
    twitterDescription: 'Devenez sponsor du DevFest Paris 2026. Packs Silver, Gold et Premium disponibles.'
  },
  {
    path: 'speakers',
    title: 'Speakers - DevFest Paris 2026 | GDG Paris',
    description: 'Découvrez les speakers du DevFest Paris 2026. 30+ experts locaux et internationaux en Cloud, IA, Frontend, Backend, Mobile et DevSecOps. Conférences, workshops et lunch talks le 27 novembre 2026.',
    keywords: 'Speakers DevFest, Conférenciers Tech, GDG Paris, Experts Cloud, IA, Frontend, Backend, Mobile, DevFest Paris 2026',
    ogDescription: 'Découvrez les 30+ speakers experts du DevFest Paris 2026. Cloud, IA, Frontend, Backend, Mobile.',
    twitterDescription: 'Découvrez les 30+ speakers experts du DevFest Paris 2026.'
  },
  {
    path: 'coc',
    title: 'Code de Conduite - DevFest Paris 2026 | GDG Paris',
    description: 'Code de conduite et conditions de participation aux événements du DevFest Paris 2026 organisé par le GDG Paris. Règles de bonne conduite, respect et inclusivité.',
    keywords: 'Code de Conduite, DevFest Paris, GDG Paris, Règles, Inclusivité, Événement Tech',
    ogDescription: 'Code de conduite et conditions de participation au DevFest Paris 2026 par GDG Paris.',
    twitterDescription: 'Code de conduite et conditions de participation au DevFest Paris 2026.'
  }
];

function build() {
  const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  routes.forEach(route => {
    let content = indexContent;

    // Replace Title
    content = content.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    
    // Replace Meta Description
    content = content.replace(/<meta name="description"[\s\n]*content=".*?">/, `<meta name="description" content="${route.description}">`);
    
    // Replace Keywords
    content = content.replace(/<meta name="keywords"[\s\n]*content=".*?">/, `<meta name="keywords" content="${route.keywords}">`);

    // Replace Open Graph / Twitter Tags
    content = content.replace(/<meta property="og:url" content="https:\/\/devfest.gdgparis.fr\/">/, `<meta property="og:url" content="https://devfest.gdgparis.fr/${route.path}">`);
    content = content.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${route.title.split(' |')[0]}">`);
    content = content.replace(/<meta property="og:description"[\s\n]*content=".*?">/, `<meta property="og:description" content="${route.ogDescription}">`);
    
    content = content.replace(/<meta property="twitter:url" content="https:\/\/devfest.gdgparis.fr\/">/, `<meta property="twitter:url" content="https://devfest.gdgparis.fr/${route.path}">`);
    content = content.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${route.title.split(' |')[0]}">`);
    content = content.replace(/<meta property="twitter:description"[\s\n]*content=".*?">/, `<meta property="twitter:description" content="${route.twitterDescription}">`);

    // Replace Canonical and Hreflang
    content = content.replace(/<link rel="canonical" href="https:\/\/devfest.gdgparis.fr\/">/, `<link rel="canonical" href="https://devfest.gdgparis.fr/${route.path}">`);
    content = content.replace(/<link rel="alternate" hreflang="fr" href="https:\/\/devfest.gdgparis.fr\/\?lang=fr" \/>/, `<link rel="alternate" hreflang="fr" href="https://devfest.gdgparis.fr/${route.path}?lang=fr" />`);
    content = content.replace(/<link rel="alternate" hreflang="en" href="https:\/\/devfest.gdgparis.fr\/\?lang=en" \/>/, `<link rel="alternate" hreflang="en" href="https://devfest.gdgparis.fr/${route.path}?lang=en" />`);
    content = content.replace(/<link rel="alternate" hreflang="x-default" href="https:\/\/devfest.gdgparis.fr\/" \/>/, `<link rel="alternate" hreflang="x-default" href="https://devfest.gdgparis.fr/${route.path}" />`);

    // Fix relative asset paths
    content = content.replace(/href="style\.css"/g, 'href="../style.css"');
    content = content.replace(/href="images\//g, 'href="../images/');
    content = content.replace(/src="images\//g, 'src="../images/');
    content = content.replace(/src="main\.jpeg"/g, 'src="../main.jpeg"');
    content = content.replace(/src="translations\//g, 'src="../translations/');

    // Ensure the directory exists
    const dirPath = path.join(__dirname, route.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write the new file
    fs.writeFileSync(path.join(dirPath, 'index.html'), content, 'utf8');
    console.log(`Generated SEO page for /${route.path}`);
  });
}

build();
