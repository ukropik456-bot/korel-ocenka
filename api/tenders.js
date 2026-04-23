import * as cheerio from "cheerio";

const STATIC = {
  live: false,
  purchases: 152,
  purchasesSum: "12 млн руб.",
  contracts: 166,
  contractsSum: "13 млн руб.",
  yearsLabel: "10+ лет в реестре",
  winPct: 82,
  notDefinedPct: 10,
  losePct: 8,
  totalTenders: 170,
  topClients: [
    { name: "ТУ Росимущества в Иркутской области", amount: "932 000 ₽", pct: 100 },
    { name: "МТУ Росимущества в Алтайском Крае и Республике Алтай", amount: "816 750 ₽", pct: 88 },
    { name: "МТУ Росимущества в Челябинской и Курганской Областях", amount: "650 000 ₽", pct: 70 },
  ],
  categories: [
    "Финансы и консалтинг",
    "Прочее",
    "Строительство и инженерные услуги",
    "Страхование",
    "Категория неизвестна",
  ],
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  try {
    const response = await fetch("https://www.rusprofile.ru/id/7132258", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      signal: AbortSignal.timeout(9000),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const parsed = { live: true };

    // Try to extract госзакупки numbers from the page
    // rusprofile shows tender stats in various formats — try common selectors
    const text = $("body").text();

    // Extract tender counts via regex on page text as fallback parser
    const purchasesMatch = text.match(/(\d[\d\s]*)\s*закупк/i);
    if (purchasesMatch) {
      parsed.purchases = parseInt(purchasesMatch[1].replace(/\s/g, ""), 10);
    }

    const contractsMatch = text.match(/(\d[\d\s]*)\s*контракт/i);
    if (contractsMatch) {
      parsed.contracts = parseInt(contractsMatch[1].replace(/\s/g, ""), 10);
    }

    // If we couldn't extract meaningful data, fall back to static
    if (!parsed.purchases && !parsed.contracts) {
      return res.status(200).json({ ...STATIC, live: false, reason: "parse_failed" });
    }

    res.status(200).json({
      ...STATIC,
      ...parsed,
    });
  } catch (err) {
    res.status(200).json({ ...STATIC, live: false, reason: err.message });
  }
}
