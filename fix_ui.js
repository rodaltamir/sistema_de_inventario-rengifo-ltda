const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

const searchInputStr = `<input
              type="text"
              placeholder="Buscar cdigo o nombre..."
              style={{ maxWidth: '300px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-base"
            />`;

const replaceStr = `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Buscar código o nombre..."
                style={{ maxWidth: '300px' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-base"
              />
              <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Desde:</label>
              <input 
                type="date" 
                className="input-base" 
                value={fechaInicio} 
                onChange={e => setFechaInicio(e.target.value)} 
              />
              <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Hasta:</label>
              <input 
                type="date" 
                className="input-base" 
                value={fechaFin} 
                onChange={e => setFechaFin(e.target.value)} 
              />
            </div>`;

// Use regex to catch the input block since the text encoding might be weird
const inputRegex = /<input\s*type="text"\s*placeholder="Buscar cdigo o nombre\.\.\."\s*style=\{\{ maxWidth: '300px' \}\}\s*value=\{search\}\s*onChange=\{e => setSearch\(e\.target\.value\)\}\s*className="input-base"\s*\/>/;

if (content.match(inputRegex)) {
  content = content.replace(inputRegex, replaceStr);
  fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
  console.log("Successfully added date filters to ProductosClient UI");
} else {
  // Let's try another regex
  const fallbackRegex = /<input[\s\S]*?placeholder="Buscar c.digo o nombre\.\.\."[\s\S]*?\/>/;
  if (content.match(fallbackRegex)) {
     content = content.replace(fallbackRegex, replaceStr);
     fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
     console.log("Successfully added date filters using fallback regex");
  } else {
     console.log("Could not find search input in ProductosClient.tsx");
  }
}
