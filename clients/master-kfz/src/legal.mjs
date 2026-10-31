/*
 * Impressum and privacy policy — German only; German law governs both.
 * Missing register data renders as a visible <mark class="todo"> so it cannot
 * slip into production unnoticed (`npm run verify` fails on it in CI mode).
 */
import { business } from './data.mjs';

const todo = (label) => `<mark class="todo">[${label} – bitte ergänzen]</mark>`;
const addr = `${business.legalName}<br>${business.street}<br>${business.zip} ${business.city}`;

export const legal = {
  imprint: {
    title: 'Impressum',
    description: `Impressum der ${business.legalName}, ${business.street}, ${business.zip} ${business.city}.`,
    html: `
<h2>Angaben gemäß § 5 DDG</h2>
<p>${addr}</p>
<p>Vertreten durch den Geschäftsführer: ${business.owner}</p>
<h2>Kontakt</h2>
<p>Telefon: <a href="tel:${business.phoneIntl}">${business.phoneDisplay}</a><br>E-Mail: <a href="mailto:${business.email}">${business.email}</a></p>
<h2>Registereintrag</h2>
<p>Registergericht: ${business.registerCourt}<br>Registernummer: ${business.registerNumber ?? todo('HRB-Nummer')}</p>
<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ${business.vatId ?? todo('USt-IdNr.')}</p>
<h2>Berufsrechtliche Angaben</h2>
<p>Zulassungspflichtiges Handwerk: Kraftfahrzeugtechniker (Eintragung in die Handwerksrolle)<br>
Zuständige Kammer: Handwerkskammer Berlin, Blücherstraße 68, 10961 Berlin<br>
Berufsrechtliche Regelungen: Gesetz zur Ordnung des Handwerks (Handwerksordnung), einsehbar unter <a href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/hwo</a><br>
${todo('Betriebsleiter/Meister und Handwerksrollen-Nr. prüfen')}</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>${business.owner}, Anschrift wie oben</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>`,
  },
  privacy: {
    title: 'Datenschutzerklärung',
    description: `Datenschutzerklärung der ${business.name}: keine Cookies, kein Tracking, Terminanfragen per Formular oder WhatsApp.`,
    html: `
<p>Stand: Oktober 2026</p>
<h2>1. Verantwortlicher</h2>
<p>${addr}<br>Telefon: ${business.phoneDisplay}<br>E-Mail: <a href="mailto:${business.email}">${business.email}</a></p>
<h2>2. Das Wichtigste in Kürze</h2>
<p>Diese Website setzt <strong>keine Cookies</strong> und verwendet <strong>keine Analyse-, Tracking- oder Werbedienste</strong>. Schriften, Grafiken und Skripte werden ausschließlich von unserem eigenen Server geladen; beim Seitenaufruf werden keine Daten an Dritte wie Google oder Meta übertragen.</p>
<h2>3. Hosting und Server-Logfiles</h2>
<p>Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf verarbeitet der Hoster technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser-Typ) in Server-Logfiles, um die Website sicher und stabil auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</p>
<h2>4. Lokale Speicherung im Browser</h2>
<p>Damit das Intro nur einmal pro Besuch läuft und eine aktiv gewählte Sprache erhalten bleibt, legen wir einen Merker im Speicher Ihres Browsers ab (sessionStorage bzw. localStorage). Diese Angaben verlassen Ihr Gerät nicht und werden nicht an uns übertragen. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG; Sie können sie jederzeit über die Browser-Einstellungen löschen.</p>
<h2>5. Terminanfrage über das Formular</h2>
<p>Wenn Sie das Terminformular nutzen, verarbeiten wir Ihre Angaben (gewünschte Leistung, Fahrzeugdaten, Wunschtermin, Name, Telefonnummer, optional E-Mail-Adresse und Nachricht), um Ihre Anfrage zu beantworten und den Termin vorzubereiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.</p>
<p>Zur Zustellung per E-Mail nutzen wir den Dienst Web3Forms (Web3Forms, USA). Die Formulardaten werden an Web3Forms übermittelt und von dort an unser Postfach weitergeleitet; eine darüber hinausgehende Nutzung findet nach Angaben des Anbieters nicht statt. Weitere Informationen: <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">web3forms.com/privacy</a>.</p>
<p>Wir löschen Anfragen, sobald sie erledigt sind und keine gesetzlichen Aufbewahrungspflichten (z. B. für Rechnungen) entgegenstehen.</p>
<h2>6. Kontakt per WhatsApp, Telefon und E-Mail</h2>
<p>Wenn Sie uns per WhatsApp kontaktieren, wird die Nachricht über WhatsApp Ireland Limited (Meta) übermittelt; es gelten zusätzlich deren Datenschutzbestimmungen. Die WhatsApp-Links auf dieser Website stellen erst nach Ihrem Klick eine Verbindung her. Für Anfragen per Telefon oder E-Mail verarbeiten wir Ihre Angaben ausschließlich zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b DSGVO).</p>
<h2>7. Links zu Google Maps und Instagram</h2>
<p>Karte und Instagram-Profil sind als einfache Links eingebunden, nicht eingebettet. Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
<h2>8. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zudem können Sie sich bei einer Aufsichtsbehörde beschweren, etwa bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit, Alt-Moabit 59–61, 10555 Berlin.</p>
<h2>9. Verschlüsselung</h2>
<p>Diese Website nutzt eine TLS-Verschlüsselung. Sie erkennen sie am Schloss-Symbol und an „https://“ in der Adresszeile.</p>`,
  },
};
