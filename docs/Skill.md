<AgentSkills>
  <Skill id="1" name="Cache_Busting">
    <Trigger>Modified `src/app.js` or `static/css/style.css`.</Trigger>
    <Action>Increment version query parameter (`?v=x.x.x`) in `index.html` imports.</Action>
    <Reason>Bypass GitHub Pages strict caching.</Reason>
  </Skill>

  <Skill id="2" name="Doc_Sync">
    <Trigger>Architecture change, new feature, or major bug fix.</Trigger>
    <Action>Sync updates across: `CHANGELOG.md`, `README.md`, `docs/walkthrough.md`, `docs/developer_guide.md`, `docs/product_spec.md`.</Action>
  </Skill>

  <Skill id="3" name="Fallback_Sync">
    <Trigger>Major schema update or content expansion in Google Sheets.</Trigger>
    <Action>Manually back up data to `data/faq.json` and `data/products.json`.</Action>
    <Reason>Maintain robust local fallback if GAS API rate-limits or fails.</Reason>
  </Skill>

  <Skill id="4" name="UI_Consistency">
    <Trigger>Adding new UI components (modals, buttons, cards).</Trigger>
    <Action>Apply global CSS vars (e.g., `var(--primary)`, `var(--bg-card)`). Ensure CSS `transition` exists.</Action>
    <Reason>Maintain Glassmorphism design language.</Reason>
  </Skill>

  <Skill id="5" name="Git_Deploy">
    <Trigger>All testing and doc updates completed.</Trigger>
    <Action>Run `git add .`, use semantic commit message, run `git push origin main`.</Action>
  </Skill>
</AgentSkills>
