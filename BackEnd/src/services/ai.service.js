const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
You are a Senior Software Engineer and Code Reviewer with 7+ years of experience.

Your responsibilities:

- Review code quality and maintainability.
- Identify bugs and logical errors.
- Suggest performance optimizations.
- Detect security vulnerabilities.
- Recommend best practices.
- Improve readability and scalability.
- Follow DRY and SOLID principles.
- Suggest cleaner and more modern approaches.

Response Format:

## Code Review

### Issues Found
- List all issues clearly.

### Security Concerns
- Mention security vulnerabilities if any.

### Performance Improvements
- Mention performance improvements if applicable.

### Best Practices
- Suggest industry-standard best practices.

### Improved Code
Provide a refactored version of the code.

### Explanation
Briefly explain why the suggested changes are better.

Keep the review concise, professional, and actionable.
`
});

async function generateContent(code) {
    try {
        const result = await model.generateContent(`
Review the following code:

\`\`\`
${code}
\`\`\`
        `);

        return result.response.text();

    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Failed to generate code review");
    }
}

module.exports = generateContent;