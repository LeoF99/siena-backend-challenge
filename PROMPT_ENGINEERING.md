# Prompt Engineering Assignment

In this document I describe the process of Prompt Engineering made during Siena's Senior Backend Challenge.

### Prompt to detect user intent

Prompt to help identify intents from the user messages to generate responses as an AI powered customer support agent.

1. Examples:
```
message → Do you ship internationally, intent → Request for international shipping information

message → Hey, are their any veteran discounts? → Request for veteran discount
```

2. Proposed prompt
```
Please describe your query or concern regarding our products or services.
We're here to assist you with any questions or assistance you may need.

User Input: "{}"
Provide the user intent Classification:

// replace "{}" with user input

```

3. Use with OpenAi API:
```typescript
// Set up OpenAI API
openai.configure({
  apiKey: 'your-api-key',
});

// Construct the prompt
const prompt = `
Please describe your query or concern regarding our products or services. We're here to assist you with any questions or assistance you may need.

User Input: "{}"
Provide the user intent Classification:
`;

// User input question
const userQuestion = "What are the specifications of the Mackbook M2 Pro model laptop?";

// Construct the complete prompt with user input
const completePrompt = prompt.replace("{}", userQuestion);

// Query the OpenAI API
openai.Completion.create({
  engine: '', // Choose the appropriate engine
  prompt: completePrompt,
}).then((response: any) => {
  // Extract intent from response
  const intent = response.choices[0].text.trim();
  console.log("Detected Intent:", intent);
}).catch((error: any) => {
  console.error("Error:", error);
});
```

4. Some intents detected for the example used above using the proposed prompt:
```
// User input:
// "What are the specifications of the Mackbook M2 Pro model laptop?"

// Chat GPT response
// first choice: Request for product details

// second choice: Inquiry about product specifications

// third choice: Query about laptop features
```

### Validation of True Intent

Some steps to improve even futher the LLM intent identification.

1. Use the LLM to check with the user if the intent identified is correct.
```
// Prompt
`
Based on the initial input provided by the user and our system's identified intent, please confirm if the identified intent accurately represents your query or concern regarding our products or services.

User Initial Input: "{}"
Identified Intent: [insert identified intent here]

To confirm:
1. If the identified intent accurately represents your query, reply with "Yes."
2. If the identified intent does not accurately represent your query, reply with "No" followed by additional context or corrections.

User Confirmation:
`

// Example
`
Based on the initial input provided by the user and our system's identified intent, please confirm if the identified intent accurately represents your query or concern regarding our products or services.

User Initial Input: "What's the estimated delivery time for this product?"
Identified Intent: Inquiry about shipping/delivery time

To confirm:
1. If the identified intent accurately represents your query, reply with "Yes."
2. If the identified intent does not accurately represent your query, reply with "No" followed by additional context or corrections.

User Confirmation: Yes

Response: System proceeds with providing information about the estimated delivery time.
`
```

Other steps to double check the user intent:

1. **Define Ground Truth Data**: Create a dataset or list containing pairs of user messages and their true intents. These intents should be manually labeled or verified to ensure accuracy.

2. **Feedback Loop**: Implement a feedback loop where incorrect predictions are flagged and used to retrain the intent classification model. This iterative process improves the accuracy of future predictions.

3. **Human Review**: For critical applications or cases where automated validation may not be sufficient, consider involving human reviewers to manually validate the predicted intents.

### Prompt use with Siena's examples

Input examples
```
1. how are you doing?

2. do you ship internationally?
```

Using the prompts
1. how are you doing?

![Prompt example 1](./assets/screenshots/Screenshot%20from%202024-04-20%2017-08-41.png)

2. do you ship internationally?

![Prompt example 2](./assets/screenshots/Screenshot%20from%202024-04-20%2017-24-58.png)



