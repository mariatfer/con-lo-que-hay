# Con lo que hay — AI Recipe Generator

**Con lo que hay** is a fast and accessible recipe generator built with **Nuxt 4** and **TypeScript**.  
The app creates cooking recipes based on the ingredients you already have at home, using AI models through **OpenRouter**.  
It features real‑time streaming responses, multilingual support, and a clean, responsive UI.

---

## 🚀 Features

- **AI‑powered recipe generation** using OpenRouter models  
- **Ingredient‑based prompts**: generate recipes with whatever you have available  
- **Real‑time streaming responses** for a smoother UX  
- **Automatic model fallback** (Gemma, Llama, GPT‑OSS, Nemotron…)  
- **Multilingual UI (ES/EN)**  
- **Fully typed codebase** with TypeScript  
- **Modern Nuxt 4 architecture**: server routes, composables, components, SSR  

---

## 🛠️ Tech Stack

- **Nuxt 4**  
- **Vue 3 + TypeScript**  
- **SCSS**  
- **OpenRouter API**  
- **Nitro server routes**  
- **i18n (ES/EN)**  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mariatfer/con-lo-que-hay.git

cd con-lo-que-hay

# Install dependencies
npm install
```

## 🔑 Environment Variables

Create a .env file in the project root:

```Code
OPENROUTER_API_KEY=your_api_key_here
```

## ▶️ Development

```bash
npm run dev
```
## 🤖 How It Works

1. User enters the ingredients they have at home
2. The app sends the prompt to a Nitro server route
3. The server tries multiple AI models until one returns a valid response
4. The response is streamed back to the UI in real time
5. The recipe is displayed with a clean, readable layout

## 🌍 Internationalization
The app supports:

- Spanish (ES)
- English (EN)

Language is detected automatically but can also be switched manually.

## 📄 License
MIT License.

## ✨ About the Project
This app was created as a fun and practical way to explore AI‑powered cooking assistance.
It focuses on speed, accessibility, and a clean UX — perfect for experimenting with modern Nuxt 4 features and AI integrations.
