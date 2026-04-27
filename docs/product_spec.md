<ProductSpec>
  <Overview>
    <Role>Raccoon AI Assistant</Role>
    <Description>Prototype for an e-commerce customer service bot focusing on usability and zero dead-ends.</Description>
  </Overview>
  
  <TechStack>
    <Frontend>Vanilla JS, CSS Variables (Glassmorphism)</Frontend>
    <Backend>Serverless (Google Sheets API via GAS)</Backend>
    <Fallback>Local JSON (data/faq.json, data/products.json)</Fallback>
    <Hosting>GitHub Pages</Hosting>
  </TechStack>

  <DataSchema>
    <FAQ>category, question, answer</FAQ>
    <Product>id, name, price, category, desc, image</Product>
  </DataSchema>

  <IntentRouting>
    <Priority level="1" type="FAQ_Match">
      <Condition>User input matches FAQ keyword.</Condition>
      <Action>Return predefined answer.</Action>
    </Priority>
    <Priority level="2" type="Discovery">
      <Condition>Intent unclear.</Condition>
      <Action>Provide contextual suggestion chips.</Action>
    </Priority>
    <Priority level="3" type="Recommendation">
      <Condition>User asks for gifts, shopping, or specific product categories.</Condition>
      <Action>Render formatted product cards from DB.</Action>
    </Priority>
    <Priority level="4" type="Escalation">
      <Trigger condition="active">FAQ response contains '轉接真人'.</Trigger>
      <Trigger condition="passive">failCount >= 2.</Trigger>
      <Action>Inject Handover UI button.</Action>
    </Priority>
  </IntentRouting>

  <Constraints>
    <Boundary>Never respond to political, religious, or legal controversies.</Boundary>
    <Boundary>Tone must be concise, friendly.</Boundary>
    <FallbackBehavior>Never crash. Always offer fallback UI options.</FallbackBehavior>
  </Constraints>
</ProductSpec>
