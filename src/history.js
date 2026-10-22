const emptyHistory = `<li><div><h3>No releases are recorded yet.</h3><p>When a version is published, its date, source link, and verified changes will appear here.</p></div></li>`;

export function historyMarkup(entries) {
  if (!entries.length) return emptyHistory;
  return entries.map((entry) => `<li><span>${entry.version}</span><div><h3>${entry.title}</h3><p>${entry.summary}</p><p>${entry.links.map((link) => `<a href="${link.url}">${link.label} ↗</a>`).join(" · ")}</p></div><time datetime="${entry.date}">${entry.date}</time></li>`).join("");
}
