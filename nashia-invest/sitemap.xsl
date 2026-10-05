<?xml version="1.0" encoding="UTF-8"?>
<!-- Styles sitemap.xml when it's opened in a browser. Search engines ignore this file. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap — Studio Acquisitions</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&amp;family=Inter:wght@300;400&amp;display=swap"/>
        <style>
          :root { --bg: #FFFFF0; --text: #1B2A4A; --gold: #C9B99A; --gray: #B0B0B0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: var(--bg); color: var(--text); font-family: 'Inter', -apple-system, sans-serif; font-weight: 300; line-height: 1.7; -webkit-font-smoothing: antialiased; }
          main { max-width: 760px; margin: 0 auto; padding: 7rem 2rem 6rem; }
          h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.02em; text-align: center; }
          .line { width: 60px; height: 1px; background: var(--gold); margin: 2.5rem auto; }
          .intro { text-align: center; font-size: 0.8rem; letter-spacing: 0.04em; opacity: 0.55; margin-bottom: 4rem; }
          table { width: 100%; border-collapse: collapse; }
          th { text-align: left; font-size: 0.65rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); padding: 0 0 1rem; border-bottom: 1px solid var(--gold); }
          th.date, td.date { text-align: right; white-space: nowrap; }
          td { font-size: 0.9rem; padding: 1.1rem 0; border-bottom: 1px solid rgba(201, 185, 154, 0.35); }
          td a { color: var(--text); text-decoration: none; opacity: 0.8; word-break: break-all; transition: opacity 0.3s ease; }
          td a:hover { opacity: 1; }
          td.date { font-size: 0.75rem; opacity: 0.5; padding-left: 1.5rem; }
          footer { margin-top: 4rem; text-align: center; }
          footer a { font-size: 0.85rem; letter-spacing: 0.04em; color: var(--text); text-decoration: none; opacity: 0.6; }
          footer a:hover { opacity: 1; }
        </style>
      </head>
      <body>
        <main>
          <h1>Sitemap</h1>
          <div class="line"></div>
          <p class="intro"><xsl:value-of select="count(s:urlset/s:url)"/> pages on <xsl:value-of select="substring-before(substring-after(s:urlset/s:url[1]/s:loc, '://'), '/')"/></p>
          <table>
            <thead><tr><th>page</th><th class="date">last updated</th></tr></thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td class="date"><xsl:value-of select="s:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <footer><a href="/">&#8592; studio acquisitions</a></footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
