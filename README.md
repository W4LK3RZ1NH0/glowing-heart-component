# 💗 Glowing Heart — Multilingual Love Animation

A glowing, animated heart built with React, featuring four concentric rings of text expressing **“I love you”** in different languages and writing systems.

<p align="center">
  <img src="src/assets/glowing-heart.gif" alt="Glowing Heart — animated multilingual love heart" width="500" />
</p>

Each ring follows a mathematical heart-shaped path, creating a continuous animation with glowing pink text. The rings move in alternating directions to create a dynamic, flowing effect.

## ✨ Features

- **Four concentric heart rings** — Each ring follows its own heart-shaped path.
- **Multilingual expressions of love** — Features languages from Europe, Asia, the Middle East, and Africa.
- **Continuous text animation** — Individual characters move along the heart outlines.
- **Neon glow effect** — Pink text with layered shadows.
- **Alternating directions** — Adjacent rings move in opposite directions.
- **Mathematical path generation** — Uses a parametric equation to generate the heart shape.
- **Arc-length sampling** — Uses precomputed tables and binary search to position characters along each path.
- **Reusable React component** — The component and its stylesheet are separated from the demo application.

## 🛠️ Technologies

- [React](https://react.dev/)
- JavaScript (ES6+)
- CSS
- [Vite](https://vite.dev/)
- `requestAnimationFrame`

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Run the Demo

Clone the repository:

```bash
git clone https://github.com/W4LK3RZ1NH0/glowing-heart-component.git
```

Navigate to the project directory:

```bash
cd glowing-heart-component
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## 💻 Using the Component

The reusable component is located in `src/components/`.

### 1. Import the Component

In your React application, import it using the appropriate relative path:

```jsx
import GlowingHeart from './components/GlowingHeart';

export default function App() {
  return <GlowingHeart />;
}
```

If your `App.jsx` is inside `src/`, the import above assumes that `components/` is also inside `src/`.

### 2. Include the Stylesheet

The component already imports its stylesheet:

```jsx
import './GlowingHeart.css';
```

Keep `GlowingHeart.css` in the same directory as `GlowingHeart.jsx`, or update the import path accordingly.

### 3. Integrate It Into Another Project

To reuse the component in an existing React project, copy these two files:

```text
src/components/
├── GlowingHeart.jsx
└── GlowingHeart.css
```

Make sure React is installed in the destination project and that the component is rendered inside a suitable container.

## ⚙️ How It Works

### 1. Multilingual Text

The expressions are organized into four arrays in `loveByRingFemale`, with each array representing a ring.

The phrases are joined with separators and split into individual characters, allowing each character to be positioned and animated independently.

### 2. Mathematical Heart Shape

The component generates the heart using a parametric equation:

```javascript
x = CX + scale * 16 * Math.pow(Math.sin(t), 3);

y = CY - scale * (
  13 * Math.cos(t)
  - 5 * Math.cos(2 * t)
  - 2 * Math.cos(3 * t)
  - Math.cos(4 * t)
);
```

`CX` and `CY` define the center coordinates, while `scale` controls the size of each ring.

### 3. Arc-Length Sampling

The component precomputes 1,200 samples for each heart path.

An arc-length table stores the sampled positions and cumulative distances. Binary search finds the appropriate position for each character, helping distribute the text along the heart outline.

### 4. Character Animation

`requestAnimationFrame` continuously updates the positions of the characters.

Each character receives calculated `left` and `top` coordinates and a rotation based on the direction of the path. Alternating movement directions create the final effect.

### 5. Styling and Glow

`GlowingHeart.css` controls the wrapper dimensions, character styling, font sizes, opacity, and positioning behavior.

The component applies pink text and layered `text-shadow` effects to produce the glowing appearance.

## 🎨 Customization

You can customize the animation by modifying the component and stylesheet.

| Setting | Description |
|---|---|
| `loveByRingFemale` | Add, remove, or change the expressions in each ring. |
| `CX` and `CY` | Adjust the center coordinates. |
| `SCALES` | Change the size of each ring. |
| `distances` increments | Adjust animation speed and direction. |
| `#e36397` | Change the text and glow color. |
| `textShadow` | Adjust the glow intensity. |
| `samples` | Change the number of samples used for each path. |
| `.char-1` to `.char-4` | Change individual ring font sizes and opacity. |
| `.heart-wrapper` | Adjust the container dimensions and stacking order. |

## 📁 Project Structure

```text
glowing-heart-component/
├── public/
├── src/
│   ├── assets/
│   │   └── glowing-heart.gif
│   ├── components/
│   │   ├── GlowingHeart.jsx
│   │   └── GlowingHeart.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

This structure includes both the reusable component and the Vite demo application.

## 💡 Concept

The project combines mathematics, animation, and multilingual expressions of love into a single visual experience.

Instead of displaying static text, every character contributes to the shape itself, turning different languages and writing systems into a continuously moving heart.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, distribute, and include this component in personal or commercial projects, provided that the original copyright notice and license are included.

---

*Made with React, mathematics, and a little love. 💗*