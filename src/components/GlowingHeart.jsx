import React, { useMemo, useEffect, useRef } from 'react';
import './GlowingHeart.css';

/**
 * 4 Rings of "I love you / Amo-te" translations across different languages and scripts.
 */
const loveByRingFemale = [
  // Ring 1 — European languages
  [
    'Amo-te',                 // Portuguese
    'I love you',             // English
    'Te amo',                 // Spanish
    'Je t’aime',              // French
    'Ti amo',                 // Italian
    'T’estimo',               // Catalan
    'Jag älskar dig',         // Swedish
    'Te iubesc',              // Romanian
    'Kocham cię',             // Polish
    'Miluji tě',              // Czech
    'Ľúbim ťa',               // Slovak
    'Szeretlek',              // Hungarian
    'Σε αγαπώ',               // Greek
    'Я тебя люблю',           // Russian
    'Ma armastan sind',       // Estonian
    'Es tevi mīlu',           // Latvian
    'Aš tave myliu',          // Lithuanian
    'Volim te',               // Croatian
    'Волим те',               // Serbian
    'Обичам те',              // Bulgarian
  ],

  // Ring 2 — More European languages
  [
    'Ich liebe dich',         // German
    'Ik hou van jou',         // Dutch
    'Jeg elsker deg',         // Norwegian
    'Jeg elsker dig',         // Danish
    'Ég elska þig',           // Icelandic
    'Rakastan sinua',         // Finnish
    'Mahal kita',             // Filipino
    'Mo ghrá thú',             // Irish
    'Rwy’n dy garu di',       // Welsh
    'Të dua',                 // Albanian
    'Te sakam',               // Macedonian
    'Ljubim te',              // Slovenian
    'Miluji tě',              // Czech
    'Aš tave myliu',          // Lithuanian
    'Ik bin fan dy',          // West Frisian
    'Mi amas vin',            // Esperanto
  ],

  // Ring 3 — Middle Eastern, Central and South Asian languages
  [
    'أحبك',                   // Arabic (to a woman: uhibbuki)
    'دوستت دارم',             // Persian
    'אני אוהב אותך',         // Hebrew (male speaker)
    'Seni seviyorum',         // Turkish
    'Мен сени сүйөм',         // Kyrgyz
    'Мен сені жақсы көремін', // Kazakh
    'Ես սիրում եմ քեզ',      // Armenian
    'მიყვარხარ',              // Georgian
    'मुझे तुमसे प्यार है',    // Hindi
    'আমি তোমাকে ভালোবাসি',   // Bengali
    'මම ඔයාට ආදරෙයි',        // Sinhala
    'நான் உன்னை காதலிக்கிறேன்', // Tamil
    'నేను నిన్ను ప్రేమిస్తున్నాను', // Telugu
    'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ', // Kannada
    'म तिमीलाई माया गर्छु',  // Nepali
    'ฉันรักคุณ',              // Thai (female speaker)
    'Tôi yêu em',             // Vietnamese (male speaker to a woman)
  ],

  // Ring 4 — East Asian, Southeast Asian and African languages
  [
    '我爱你',                 // Chinese (Simplified)
    '我愛你',                 // Chinese (Traditional)
    '愛してる',               // Japanese
    '사랑해',                 // Korean
    'Aku cinta kamu',         // Indonesian
    'Mahal kita',             // Filipino
    'ខ្ញុំស្រឡាញ់អ្នក',       // Khmer
    'ຂ້ອຍຮັກເຈົ້າ',         // Lao
    'Nakupenda',              // Swahili
    'Ndinokuda',              // Shona
    'Ngiyakuthanda',          // Zulu
    'Ndiyakuthanda',          // Xhosa
    'Mo nifẹ rẹ',             // Yoruba
    'A hụrụ m gị n’anya',    // Igbo
    'Waan ku jeclahay',       // Somali
    'Ina son ka',             // Hausa (to a man)
    'Ana behibak',            // Egyptian Arabic (to a man)
    'Ek het jou lief',        // Afrikaans
  ],
];

// Center coordinates for the heart shape calculation (matched to the wrapper size)
const CX = 325;
const CY = 300;

// Scaling factors for each concentric heart ring
const SCALES = [12.5, 11.5, 10.5, 9.5];

/**
 * Mathematical parametric equation for a heart shape.
 */
function getRawHeartPoint(t, scale) {
  const x = CX + scale * 16 * Math.pow(Math.sin(t), 3);
  const y = CY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x, y };
}

function useArcTable(scale) {
  return useMemo(() => {
    const samples = 1200;
    const table = [];
    let totalLength = 0;
    let prev = getRawHeartPoint(0, scale);

    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * Math.PI * 2;
      const pt = getRawHeartPoint(t, scale);
      const dist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
      totalLength += dist;
      table.push({ t, dist: totalLength, x: pt.x, y: pt.y });
      prev = pt;
    }

    return { table, totalLength };
  }, [scale]);
}

function getPointAtDistance(targetDist, arcTable) {
  const { table, totalLength } = arcTable;
  let d = targetDist % totalLength;
  if (d < 0) d += totalLength;

  let low = 0, high = table.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (table[mid].dist < d) low = mid + 1;
    else high = mid - 1;
  }

  const idx1 = Math.max(0, low - 1);
  const idx2 = Math.min(table.length - 1, low);
  const p1 = table[idx1];
  const p2 = table[idx2];

  const segLen = p2.dist - p1.dist;
  const factor = segLen > 0 ? (d - p1.dist) / segLen : 0;

  const x = p1.x + (p2.x - p1.x) * factor;
  const y = p1.y + (p2.y - p1.y) * factor;

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angle = (Math.atan2(dy, dx) * 180 / Math.PI);

  return { x, y, angle };
}

export default function GlowingHeart() {
  const refs0 = useRef([]);
  const refs1 = useRef([]);
  const refs2 = useRef([]);
  const refs3 = useRef([]);

  const allRefs = [refs0, refs1, refs2, refs3];

  const formattedTexts = useMemo(() => {
    return loveByRingFemale.map((list) => list.join(' • ') + ' • ');
  }, []);

  const charactersList = useMemo(() => {
    return formattedTexts.map((text) => text.split(''));
  }, [formattedTexts]);

  const arcTable0 = useArcTable(SCALES[0]);
  const arcTable1 = useArcTable(SCALES[1]);
  const arcTable2 = useArcTable(SCALES[2]);
  const arcTable3 = useArcTable(SCALES[3]);

  const arcTables = useMemo(() => [
    arcTable0, arcTable1, arcTable2, arcTable3
  ], [arcTable0, arcTable1, arcTable2, arcTable3]);

  useEffect(() => {
    let animationFrameId;
    const distances = [0, 0, 0, 0];

    const animate = () => {
      distances[0] += 0.5;
      distances[1] -= 0.5;
      distances[2] += 0.5;
      distances[3] -= 0.5;

      allRefs.forEach((refList, layerIndex) => {
        const arcTable = arcTables[layerIndex];
        const chars = charactersList[layerIndex];
        const currentOffset = distances[layerIndex];

        refList.current.forEach((el, index) => {
          if (!el) return;
          const charSpacing = arcTable.totalLength / chars.length;
          const currentDist = (index * charSpacing) + currentOffset;
          const { x, y, angle } = getPointAtDistance(currentDist, arcTable);

          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
          el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

          el.style.color = '#e36397';
          el.style.textShadow = '0 0 4px #e36397, 0 0 12px #e36397, 0 0 22px rgba(227, 99, 151, 0.65)';
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [charactersList, arcTables]);

  return (
    <div className="heart-wrapper">
      {charactersList.map((chars, layerIndex) => (
        chars.map((char, index) => (
          <span
            key={`c${layerIndex}-${index}`}
            ref={(el) => (allRefs[layerIndex].current[index] = el)}
            className={`char char-${layerIndex + 1}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))
      ))}
    </div>
  );
}