const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/<input\s*type="text"\s*placeholder="Buscar c.digo o nombre\.\.\."\s*style=\{\{\s*maxWidth:\s*'300px'\s*\}\}\s*value=\{search\}\s*onChange=\{e\s*=>\s*setSearch\(e\.target\.value\)\}\s*(\/>|className=[^>]*\/>)/g, `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Buscar código o nombre..."
                style={{ maxWidth: '300px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <label style={{ fontSize: '0.9rem', color: '#6b7280' }}>Desde:</label>
              <input 
                type="date" 
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
                value={fechaInicio} 
                onChange={e => setFechaInicio(e.target.value)} 
              />
              <label style={{ fontSize: '0.9rem', color: '#6b7280' }}>Hasta:</label>
              <input 
                type="date" 
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
                value={fechaFin} 
                onChange={e => setFechaFin(e.target.value)} 
              />
            </div>`);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
