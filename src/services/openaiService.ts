import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is stored securely
});

export default async function generateResponse(gameName: string, gameProvider: string, gameType: string) {
  const prompt = `
    You are a content writer for an online gaming platform called Diamond365 India. Write a detailed game description in <strong>HTML format only</strong> using the game details provided below:
    - <strong>Game Name</strong>: ${gameName}  
    - <strong>Provider</strong>: ${gameProvider}  
    - <strong>Game Type</strong>: ${gameType}  
    - <strong>Platform</strong>: Diamond365 India  

    ### Instructions: 
    Follow the exact structure and formatting guidelines below. Ensure the output uses only valid HTML tags and styles, with no markdown syntax (e.g., no '<strong>'). All bold text must be wrapped in the '<strong>' tag.

    1. <h1 style="font-size: 1rem; margin-top: 1rem; margin-bottom:0.5rem;">Game Overview</h1>  
       - Write a concise introduction (5–8 lines) highlighting the game's <strong>theme</strong>, <strong>visuals</strong>, and <strong>unique features</strong>.  
       - Bold key elements like the game name, features, and platform name (e.g., <strong>Diamond365 India online betting app</strong>) using the '<strong>' tag.  
       - Naturally include keywords like "online gaming," "casino games," "betting sites," "online betting," and "best online casino." Avoid keyword stuffing or repetition.

    2. <h1 style="font-size: 1rem; margin-top: 1rem; margin-bottom:0.5rem;">How to Play</h1>  
       - Provide step-by-step gameplay instructions in an unordered list.  
       - Style each '<li>' with: 'opacity: 0.8; margin-left: 1rem; margin-bottom: 0.2rem; list-style: disc;'.  
       - Ensure instructions are clear, logical, and suitable for all players, including beginners.

    3. <h1 style="font-size: 1rem; margin-top: 1rem; margin-bottom:0.5rem;">Rules for Gameplay</h1>  
       - List the key gameplay rules in bullet points using the same list styling as above.  
       - Explain mechanics such as reels, paylines, volatility, and special rules in simple terms.  
       - Use the '<strong>' tag for key terms.

    4. <h1 style="font-size: 1rem; margin-top: 1rem; margin-bottom:0.5rem;">Payouts</h1>  
       - Write a brief paragraph explaining how payouts are determined.  
       - Mention factors like winning combinations, RTP (Return to Player), and bonus features.  
       - Ensure clarity and conciseness while maintaining SEO-friendly language.

    ### Formatting Guidelines:
    - <strong>Headings</strong>: Use '<h1>' with the provided inline styles for section titles.  
    - <strong>Bold Text</strong>: Always use the '<strong>' with 'style="opacity: 1;"' tag for emphasis, including for game names, feature names, and the platform name.  
    - <strong>Paragraphs</strong>: Style text with '<p>' and 'style="opacity: 0.8;"' for readability.  
    - <strong>Lists</strong>: Use '<ul>' and '<li>' with the specified styles for bullet points.  
    - Do not include any hyperlinks in the content.  

    ### Customization for Uniqueness:
    - Tailor each description for the specific game and avoid duplicate phrasing across games.  
    - Use fresh examples, synonyms, and varied keyword placement for each game.  
    - Ensure all content flows naturally, is engaging, and improves search engine visibility.

    ### Output Rules:
    - Output only valid HTML content — do not include '<html>', '<body>', or other unnecessary tags.  
    - Ensure no markdown syntax (e.g., '"""') is present in the output.  
    - Use '<strong>' tags for all bold text and follow the provided structure and formatting guidelines strictly.  
    - The content must be SEO-optimized, user-friendly, and ready for direct publishing on the website.
    - Do not add triple backticks
`;








    

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500, // Allow enough room for HTML generation
    });

    const rawContent = response?.choices[0]?.message?.content || "Description Unavailable";

    // Remove any extraneous commentary that isn't part of the HTML
    const sanitizedContent = rawContent.replace(/^\s*[^<]+/, ""); // Remove anything before the first HTML tag

    // console.log("Generated HTML: ", sanitizedContent);
    return sanitizedContent;
  } catch (error) {
    console.error("Error:", error);
    return "Description Unavailable";
  }
}


// const prompt = `
//     You are a content writer for an online gaming platform called Diamond365 India. Write a detailed game description in <strong>HTML format only<strong> for the specified game details:
//     - Game Details  
//     - Game Name: ${gameName}  
//     - Provider: ${gameProvider}  
//     - Game Type: ${gameType}  
//     - Platform: Diamond365 India  

//     ### Instructions: 
//     Follow the exact structure below and ensure proper formatting as specified:  

//     1. <h1 style="font-size: 1rem; margin-top: 1rem;">Game Overview</h1>  
//     - Write a 5-8 line introduction that highlights the game's theme, visuals, features, and player appeal.  
//     - Use the '<strong>' tag to bold text where needed, such as the game name, key features (e.g., wild multipliers, respins), and platform name <strong>Diamond365 India online betting app</strong>.

//     2. <h1 style="font-size: 1rem; margin-top: 1rem;">How to Play</h1>  
//     - Use an unordered list ('<ul>' and '<li>') to describe gameplay steps.  
//     - Ensure each '<li>' uses the style: 'opacity: 0.8; margin-left: 1rem; margin-bottom: 0.2rem; list-style: disc;'.  
//     - <strong>Remove hyperlinks<strong> such as Sign Up/Login and Download App as per the new requirement.

//     3. <h1 style="font-size: 1rem; margin-top: 1rem;">Rules for Gameplay</h1>  
//     - List the key rules in bullet points using '<ul>' and '<li>' with the same styling as above.  
//     - Highlight game mechanics such as reels, paylines, and volatility.

//     4. <h1 style="font-size: 1rem; margin-top: 1rem;">Bonus Features</h1>  
//     - Describe the special game features (e.g., bonus rounds, wilds, free spins) in a bullet point list.  
//     - Use the '<strong>' tag for feature names like <strong>Disco Respin Feature</strong>, <strong>Bonus Wheel</strong>, etc.

//     5. <h1 style="font-size: 1rem; margin-top: 1rem;">Payouts</h1>  
//     - Write a short paragraph explaining how payouts are determined.  
//     - Remove references to hyperlinks, keeping the content simple.

//     ### Formatting Rules:
//     - <strong>Headings<strong>: Use '<h1>' with the inline styles specified above for all section titles.  
//     - <strong>Bold Text<strong>: Use the '<strong>' tag for bolding game names, feature names, and platform names.  
//     - <strong>Paragraphs<strong>: Use '<p>' with 'style="opacity: 0.8;"'.  
//     - <strong>Lists<strong>: Use '<ul>' and '<li>' with 'style="opacity: 0.8; margin-left: 1rem; margin-bottom: 0.2rem; list-style: disc;"'.  

//     ### Output Rules:
//     - <strong>Output only the HTML content<strong> without '<html>', '<body>', or other unnecessary tags.  
//     - Ensure strict adherence to the provided style and structure.
// `;
