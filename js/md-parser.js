// =========================================================
// Markdown parser for course .md files
// Handles standard markdown + project-specific tags:
//   <encadré>...</encadré>           → boxed metadata block
//   <document_imprimé>...</document_imprimé> → handout card
//   [annotation manuscrite : "..."]  → margin handwritten note
//   [image_alt: ...] / [image_alt : ...] → figure placeholder
//   [Schéma : ...]                    → schema placeholder
//   [passage en rouge :] / [passage en vert :] → colored-paragraph marker
// =========================================================
(function () {
  const md = {
    parse(src) {
      src = src.replace(/\r\n/g, '\n');
      // 1. drop leading H1 (the title is rendered by the reader header)
      src = src.replace(/^#\s+.+\n+/, '');
      // 2. drop encadré blocks that appear before the first ## header
      //    (those carry perspectives/notions/repères/œuvre/plan, already in metadata)
      const firstH2 = src.search(/^##\s+/m);
      if (firstH2 > -1) {
        const head = src.substring(0, firstH2)
          .replace(/<encadré>[\s\S]*?<\/encadré>\s*/g, '');
        src = head + src.substring(firstH2);
      }
      // 3. mark custom block boundaries so the line walker can wrap them
      src = src.replace(/<document_imprimé>\s*([\s\S]*?)\s*<\/document_imprimé>/g,
        (_, inner) => '\n\n@@DOCSTART@@\n' + inner + '\n@@DOCEND@@\n\n');
      src = src.replace(/<encadré>\s*([\s\S]*?)\s*<\/encadré>/g,
        (_, inner) => '\n\n@@ENCSTART@@\n' + inner + '\n@@ENCEND@@\n\n');
      return this.parseBlocks(src);
    },

    parseBlocks(src) {
      const lines = src.split('\n');
      const out = [];
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // custom block markers
        if (trimmed === '@@DOCSTART@@') { out.push('<div class="doc-printed">'); i++; continue; }
        if (trimmed === '@@DOCEND@@')   { out.push('</div>');                     i++; continue; }
        if (trimmed === '@@ENCSTART@@') { out.push('<div class="md-encadre">');   i++; continue; }
        if (trimmed === '@@ENCEND@@')   { out.push('</div>');                     i++; continue; }

        // empty line
        if (!trimmed) { i++; continue; }

        // horizontal rule
        if (/^---+$/.test(trimmed)) { out.push('<hr>'); i++; continue; }

        // header
        const h = trimmed.match(/^(#{1,6})\s+(.+?)\s*$/);
        if (h) {
          const lvl = h[1].length;
          const id = this.slugify(h[2]);
          out.push(`<h${lvl} id="${id}">${this.parseInline(h[2])}</h${lvl}>`);
          i++; continue;
        }

        // blockquote
        if (/^>\s?/.test(line)) {
          const buf = [];
          while (i < lines.length && /^>\s?/.test(lines[i])) {
            buf.push(lines[i].replace(/^>\s?/, ''));
            i++;
          }
          const inner = this.parseBlocks(buf.join('\n'));
          out.push('<blockquote>' + inner + '</blockquote>');
          continue;
        }

        // table
        if (/^\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\|[\s\-:|]+\|\s*$/.test(lines[i + 1])) {
          const head = this.parseTableRow(line, 'th');
          i += 2;
          const body = [];
          while (i < lines.length && /^\|.+\|\s*$/.test(lines[i])) {
            body.push('<tr>' + this.parseTableRow(lines[i], 'td') + '</tr>');
            i++;
          }
          out.push('<table><thead><tr>' + head + '</tr></thead><tbody>' + body.join('') + '</tbody></table>');
          continue;
        }

        // unordered list (allow blank lines between siblings)
        if (/^[-*]\s+/.test(line)) {
          const items = this.collectList(lines, i, /^[-*]\s+/);
          out.push('<ul>' + items.html + '</ul>');
          i = items.next; continue;
        }

        // ordered list (1. / 1) / (1))
        if (/^(\d+[.)]|\(\d+\))\s+/.test(line)) {
          const items = this.collectList(lines, i, /^(\d+[.)]|\(\d+\))\s+/);
          out.push('<ol>' + items.html + '</ol>');
          i = items.next; continue;
        }

        // figure-like markers on their own line
        const imgAlt = trimmed.match(/^\[image_alt\s*[:：]?\s*([\s\S]+?)\]\s*$/i);
        if (imgAlt) {
          out.push('<figure class="md-fig"><figcaption>' + this.parseInline(imgAlt[1]) + '</figcaption></figure>');
          i++; continue;
        }
        const schema = trimmed.match(/^\[Sch[ée]ma\s*[:：]?\s*([\s\S]+?)\]\s*$/);
        if (schema) {
          out.push('<figure class="md-fig md-schema"><figcaption><strong>Schéma —</strong> ' + this.parseInline(schema[1]) + '</figcaption></figure>');
          i++; continue;
        }
        const annot = trimmed.match(/^\[annotation[s]?\s+manuscrite[s]?[\s\S]*?[:：]\s*["«]?([\s\S]+?)["»]?\]\s*$/i);
        if (annot) {
          out.push('<aside class="doc-annot">' + this.parseInline(annot[1]) + '</aside>');
          i++; continue;
        }

        // paragraph: collect until blank line / block start
        const buf = [line];
        i++;
        while (i < lines.length && lines[i].trim() && !this.isBlockStart(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        let para = buf.join(' ');
        // colored paragraph markers
        let pClass = '';
        if (/^\[passage en rouge\s*:\]/i.test(para)) {
          pClass = ' class="hl-red"';
          para = para.replace(/^\[passage en rouge\s*:\]\s*/i, '');
        } else if (/^\[passage en vert\s*:\]/i.test(para)) {
          pClass = ' class="hl-green"';
          para = para.replace(/^\[passage en vert\s*:\]\s*/i, '');
        }
        out.push('<p' + pClass + '>' + this.parseInline(para) + '</p>');
      }
      return out.join('\n');
    },

    isBlockStart(line) {
      const t = line.trim();
      if (!t) return true;
      if (/^@@(DOC|ENC)(START|END)@@$/.test(t)) return true;
      if (/^---+$/.test(t)) return true;
      if (/^#{1,6}\s/.test(t)) return true;
      if (/^>\s?/.test(line)) return true;
      if (/^[-*]\s+/.test(line)) return true;
      if (/^(\d+[.)]|\(\d+\))\s+/.test(line)) return true;
      if (/^\|.+\|\s*$/.test(line)) return true;
      if (/^\[(image_alt|Sch[ée]ma|annotation)/i.test(t)) return true;
      return false;
    },

    collectList(lines, i, marker) {
      const items = [];
      while (i < lines.length) {
        if (marker.test(lines[i])) {
          let item = lines[i].replace(marker, '');
          i++;
          while (i < lines.length && /^\s{2,}\S/.test(lines[i])) {
            item += ' ' + lines[i].trim();
            i++;
          }
          items.push('<li>' + this.parseInline(item) + '</li>');
        } else if (!lines[i].trim()) {
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && marker.test(lines[j])) { i = j; continue; }
          break;
        } else {
          break;
        }
      }
      return { html: items.join(''), next: i };
    },

    parseTableRow(line, tag) {
      return line.trim().replace(/^\|/, '').replace(/\|\s*$/, '')
        .split('|')
        .map(c => `<${tag}>${this.parseInline(c.trim())}</${tag}>`)
        .join('');
    },

    parseInline(s) {
      if (!s) return '';
      // bold-italic ***text***
      s = s.replace(/\*\*\*([^*\n]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
      // bold **text**
      s = s.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
      // italic *text*  (avoid matching inside words / bullet markers)
      s = s.replace(/(^|[\s(«"',;:!?\-])\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*(?=[\s)«»"',;:!?.\-]|$)/g, '$1<em>$2</em>');
      // mark ==text==
      s = s.replace(/==([^=\n]+?)==/g, '<mark>$1</mark>');
      // inline code `text`
      s = s.replace(/`([^`\n]+?)`/g, '<code>$1</code>');
      // links [text](url)
      s = s.replace(/\[([^\]]+?)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      return s;
    },

    slugify(text) {
      return text.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60);
    }
  };

  window.App = window.App || {};
  window.App.md = md;
})();
