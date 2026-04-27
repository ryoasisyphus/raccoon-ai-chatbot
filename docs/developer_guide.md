<DeveloperGuide>
  <Architecture>
    <File path="index.html">UI entry point.</File>
    <File path="src/app.js">Core business logic (GAS fetch, intent parsing, DOM manipulation).</File>
    <File path="static/css/style.css">Global styles (CSS Variables).</File>
    <File path="data/*.json">Fallback mock DB.</File>
  </Architecture>

  <Principles>
    <Rule name="Zero_Dead_Ends">Always provide fallback UI (e.g., suggestion chips) when intent fails.</Rule>
    <Rule name="Progressive_Disclosure">Escalation UI only shows when failCount >= 2 or explicitly triggered by FAQ.</Rule>
    <Rule name="Aesthetics_As_Trust">Maintain Glassmorphism and CSS transition consistencies.</Rule>
  </Principles>

  <Data_Update_SOP>
    <Action type="Cloud_DB">Edit Google Sheets (FAQ/Products). `app.js` auto-fetches via GAS on init.</Action>
    <Action type="Local_Fallback">Manually update `data/faq.json` or `data/products.json` if structure changes.</Action>
  </Data_Update_SOP>

  <API_Integration_Steps>
    <Step>Configure API Key in backend proxy (Vercel/Cloudflare).</Step>
    <Step>Replace local intent logic in `processResponse()` with POST request to LLM endpoint.</Step>
    <Step>Pass Google Sheets data as `system_instruction` or integrate Vector DB.</Step>
  </API_Integration_Steps>
</DeveloperGuide>
