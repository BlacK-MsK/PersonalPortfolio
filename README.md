# The Architect's Portfolio | DevFolio AI

A high-octane, anime-inspired personal portfolio website built with React, Tailwind CSS, and the Google Gemini API. This project transforms a standard developer portfolio into an interactive "Manga/Comic Book" experience, featuring a narrated AI assistant, hidden Easter eggs, and a unique "God Mode".

## 🌟 Features

*   **Manga Grid Layout:** A responsive, comic-book style layout with thick borders, hard shadows, and narrative captions.
*   **AI Narrator (System Operator):** An integrated Chatbot powered by Google Gemini 2.5 Flash that roleplays as a dramatic anime narrator, answering questions about your skills and background.
*   **Interactive "Arsenal" (Skills):** A skill tree visualization with tooltips and entrance animations.
*   **"Battle Logs" (Projects):** Project cards styled as classified mission files with cyber-deck aesthetics and hover-activated GIF previews.
*   **God Mode (Konami Code):** A hidden feature triggered by the classic Konami Code sequence (`↑ ↑ ↓ ↓ ← → ← → B A`) that unlocks a chaotic, physics-defying visual mode.
*   **Custom UI:** Custom cursor, typewriter effects, and immersive sound design hooks (ready for implementation).

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** (comes with Node.js)
*   A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <your-repo-url>
    cd <project-folder>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter an error regarding `@google/genai`, run `npm install @google/genai@latest`.*

3.  **Configure Environment Variables:**
    *   Create a file named `.env` in the root directory.
    *   Add your Gemini API key:
        ```env
        VITE_API_KEY=your_actual_api_key_here
        ```

4.  **Add Assets:**
    *   Place your resume PDF in the `public` folder and name it `resume.pdf`.
    *   (Optional) Add sound files `hover.mp3` and `click.mp3` to `public` if you want to enable UI sounds.

### Running the Application

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 🎮 Controls & Secrets

*   **Navigation:** Use the comic-style header or the mobile menu to jump between "Episodes" (Sections).
*   **Chat:** Click the floating action button (FAB) in the bottom right to summon the "System Narrator".
*   **God Mode:** Focus on the window and enter the Konami Code on your keyboard:
    *   **Up, Up, Down, Down, Left, Right, Left, Right, b, a**
    *   *Warning: Reality stability is not guaranteed.*

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS (Custom configuration for fonts, colors, and animations)
*   **AI:** Google Gemini API (`@google/genai` SDK)
*   **Fonts:** Inter, JetBrains Mono, Space Grotesk (via Google Fonts)

## 🎨 Customization

You can easily customize the content by editing `src/constants.ts`:
*   **`PROJECTS`**: Add your own projects, images, and GIFs.
*   **`SKILL_CATEGORIES`**: Update your skills and mastery levels.
*   **`INTRO_TEXT_CORE`**: Change the protagonist's bio and title.
*   **`SYSTEM_INSTRUCTION`**: Modify the AI's personality and lore.

## 📄 License

This project is open source. Feel free to fork and modify it to build your own legend!
