import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Hatch } from "../../Shared";

/*
 * Reusable case-study page layout. Each ProjectN.tsx only supplies its data:
 *   export default function Project1() { return <CaseStudy data={...} />; }
 */

/* ---------- icons ---------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  user: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M7 14h2M11 14h2M15 14h2M7 17h2M11 17h2" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 21V4h10v17M14 9h6v12M2 21h20M7 7h1M10 7h1M7 10h1M10 10h1M7 13h1M10 13h1M7 16h1M10 16h1M17 12h1M17 15h1M17 18h1" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M14 3H6v18h12V7l-4-4z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 21h18M6 17v-4M10 17V9M14 17v-6M18 17V5" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l5 5M20 4l-5 5M4 20l5-5M20 20l-5-5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 16v-3M12 16V9M16 16v-5" />
    </svg>
  ),
  antenna: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v8M8 7a5.5 5.5 0 0 0 0 8M16 7a5.5 5.5 0 0 1 0 8M5 4a10 10 0 0 0 0 14M19 4a10 10 0 0 1 0 14" />
    </svg>
  ),
  nodes: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M6.5 6.5l3.7 3.7M17.5 6.5l-3.7 3.7M6.5 17.5l3.7-3.7M17.5 17.5l-3.7-3.7" />
    </svg>
  ),
  predict: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M7 7.5c2 1.5 2 7.5 0 9M17 7.5c-2 1.5-2 7.5 0 9" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M5 20v-4M10 20v-8M15 20V8M20 20V4" strokeWidth="2.4" />
    </svg>
  ),
  screen: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14c2.8 0 4.5 2 4.5 5" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 10h8M8 14h5" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3v4M2 12v3M22 12v3" />
      <circle cx="9" cy="12.5" r="1.2" />
      <circle cx="15" cy="12.5" r="1.2" />
      <path d="M9.5 16h5" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4V7z" />
      <path d="M14 7v10" strokeDasharray="2 2" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2zM10 21h4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </svg>
  ),
  pipeline: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10M18 11c0 4-6 3-11 6.5" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

/* Soft tinted tiles behind icons */
const tones = {
  red: "bg-tone-red-soft text-tone-red",
  purple: "bg-tone-purple-soft text-tone-purple",
  green: "bg-tone-green-soft text-tone-green",
  blue: "bg-tone-blue-soft text-tone-blue",
  orange: "bg-tone-orange-soft text-tone-orange",
};

export type Tone = keyof typeof tones;

/* ---------- technology logos ---------- */

const techLogos = {
  react: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#2fb6e8" strokeWidth="1.6">
      <ellipse cx="16" cy="16" rx="14" ry="5.5" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="2.4" fill="#2fb6e8" stroke="none" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 32 32">
      <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" fill="none" stroke="#7cc327" strokeWidth="2.2" />
      <text x="16" y="20.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7cc327" fontFamily="Arial">JS</text>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 32 32">
      <path d="M16 2c4 5 8 9 8 15 0 6-4 9-7 10l-1 4-1-4c-3-1-7-4-7-10 0-6 4-10 8-15z" fill="#13aa52" />
      <path d="M16 6v24" stroke="#0d7a3a" strokeWidth="1" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 40 32">
      <text x="20" y="17" textAnchor="middle" fontSize="13" fontWeight="700" fill="#232f3e" fontFamily="Arial">aws</text>
      <path d="M8 22c7 4 17 4 24 0" fill="none" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M29 20l3.5 1.8-1.6 3.4" fill="none" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 32 32">
      <path d="M15.8 3c-6 0-5.6 2.6-5.6 2.6v2.7h5.7v.8H8s-3.8-.4-3.8 5.6 3.3 5.8 3.3 5.8h2v-2.8s-.1-3.3 3.3-3.3h5.6s3.2.1 3.2-3.1V6.2S22 3 15.8 3zm-3.1 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3772a4" />
      <path d="M16.2 29c6 0 5.6-2.6 5.6-2.6v-2.7h-5.7v-.8H24s3.8.4 3.8-5.6-3.3-5.8-3.3-5.8h-2v2.8s.1 3.3-3.3 3.3H13.6s-3.2-.1-3.2 3.1v5.1S10 29 16.2 29zm3.1-1.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#ffd040" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#1f2a3a" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M6 10l10-6 10 6v12l-10 6-10-6V10z" />
      <path d="M6 10l10 6 10-6M16 16v12" />
      <path d="M2 6l5 3" strokeLinecap="round" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" fill="#1f2a3a">
      <path d="M22.3 9.8a5.9 5.9 0 0 0-.5-4.9 6 6 0 0 0-6.5-2.9A6 6 0 0 0 4.9 4.2a5.9 5.9 0 0 0-4 2.9 6 6 0 0 0 .7 7 5.9 5.9 0 0 0 .5 4.9 6 6 0 0 0 6.5 2.9 5.9 5.9 0 0 0 4.4 2 6 6 0 0 0 5.7-4.2 5.9 5.9 0 0 0 4-2.9 6 6 0 0 0-.7-7zm-9 12.6a4.4 4.4 0 0 1-2.8-1l.1-.1 4.7-2.7a.8.8 0 0 0 .4-.7v-6.6l2 1.1v5.5a4.5 4.5 0 0 1-4.4 4.5zm-9.5-4.1a4.4 4.4 0 0 1-.5-3l.1.1 4.7 2.7a.8.8 0 0 0 .8 0l5.7-3.3v2.3l-4.8 2.7a4.5 4.5 0 0 1-6-1.5zM2.6 8.2a4.4 4.4 0 0 1 2.3-2V11.8a.8.8 0 0 0 .4.7l5.7 3.3-2 1.1-4.7-2.7a4.5 4.5 0 0 1-1.7-6zm16.2 3.8l-5.7-3.3 2-1.1 4.7 2.7a4.5 4.5 0 0 1-.7 8.1v-5.6a.8.8 0 0 0-.3-.8zm2-3l-.1-.1-4.7-2.7a.8.8 0 0 0-.8 0L9.5 9.5V7.2l4.8-2.7a4.5 4.5 0 0 1 6.6 4.6zM8.3 13l-2-1.1V6.4a4.5 4.5 0 0 1 7.3-3.4l-.1.1-4.7 2.7a.8.8 0 0 0-.4.7zm1.1-2.4L12 9.2l2.6 1.5v3L12 15.2l-2.6-1.5z" />
    </svg>
  ),
  webhooks: (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="3.2" strokeLinecap="round">
      <path d="M13 9a5 5 0 1 1 6 4.9L14.5 22" stroke="#c73a63" />
      <path d="M8.6 15.5a5 5 0 1 0 6.4 7.5h9" stroke="#4b4b4b" />
      <path d="M22.5 27a5 5 0 1 0-1.4-9.8L16.5 9" stroke="#4b4b4b" />
      <circle cx="16" cy="9" r="2.2" fill="#c73a63" stroke="none" />
      <circle cx="10" cy="23" r="2.2" fill="#c73a63" stroke="none" />
      <circle cx="23" cy="23" r="2.2" fill="#c73a63" stroke="none" />
    </svg>
  ),
  airflow: (
    <svg viewBox="0 0 32 32">
      <path d="M16 16L4 4c5-2 10 0 12 4z" fill="#017cee" />
      <path d="M16 16L28 4c2 5 0 10-4 12z" fill="#00ad46" />
      <path d="M16 16l12 12c-5 2-10 0-12-4z" fill="#04d659" />
      <path d="M16 16L4 28c-2-5 0-10 4-12z" fill="#e43921" />
      <circle cx="16" cy="16" r="1.6" fill="#fff" />
    </svg>
  ),
  pyspark: (
    <svg viewBox="0 0 48 32">
      <text x="2" y="22" fontSize="13" fontWeight="700" fill="#3772a4" fontFamily="Arial">Py</text>
      <text x="19" y="22" fontSize="13" fontWeight="700" fill="#e25a1c" fontFamily="Arial">Spark</text>
      <path d="M43 3l1.2 3 3 .4-2.3 2 .7 3-2.6-1.6-2.6 1.6.7-3-2.3-2 3-.4z" fill="#e25a1c" />
    </svg>
  ),
  deltalake: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#00add4" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M16 3L3 28h26L16 3z" />
      <path d="M11 21c3-4 7-4 10 0" />
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" fill="#2f6fd0">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 7.5c0 1.7 3.6 3 8 3s8-1.3 8-3V11c0 1.7-3.6 3-8 3s-8-1.3-8-3zM4 13.5c0 1.7 3.6 3 8 3s8-1.3 8-3V17c0 1.7-3.6 3-8 3s-8-1.3-8-3zM4 19.5" />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#2fa8e0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
      <path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5M3.5 10.5l3.5-1-1-3.5M20.5 13.5l-3.5 1 1 3.5M3.5 13.5l3.5 1-1 3.5M20.5 10.5l-3.5-1 1-3.5" />
    </svg>
  ),
  kafka: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#1f2a3a" strokeWidth="1.8">
      <circle cx="9" cy="3.8" r="2" />
      <circle cx="9" cy="12" r="2.6" />
      <circle cx="9" cy="20.2" r="2" />
      <circle cx="17.5" cy="7.5" r="2" />
      <circle cx="17.5" cy="16.5" r="2" />
      <path d="M9 5.8v3.6M9 14.6v3.6M11.4 10.8l4.3-2.4M11.4 13.2l4.3 2.4" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 32 32">
      <path d="M16 3c-6 0-10 3.5-10 9.5 0 4 1.5 8 3 11 1 2 2.5 3 3.5 2.5s1-2.5 1-4.5c1 .5 2 .7 3 .5 0 3 .5 6 2.5 6.5s4-1 4.5-4c.3-2 .5-4 .5-5.5 2-2 3-5 3-7.5C27 6 22 3 16 3z" fill="#336791" />
      <path d="M12 9.5c1-1 2.5-1 3.5 0M19 9.5c.8-.8 2-.8 2.8 0M16 12v6c0 2 1 3 2.5 3" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 32 32">
      <g fill="#1d91e6">
        <rect x="5" y="13" width="3.6" height="3.2" />
        <rect x="9.2" y="13" width="3.6" height="3.2" />
        <rect x="13.4" y="13" width="3.6" height="3.2" />
        <rect x="17.6" y="13" width="3.6" height="3.2" />
        <rect x="9.2" y="9.2" width="3.6" height="3.2" />
        <rect x="13.4" y="9.2" width="3.6" height="3.2" />
        <rect x="17.6" y="9.2" width="3.6" height="3.2" />
        <rect x="17.6" y="5.4" width="3.6" height="3.2" />
        <path d="M2 17h24.5c1.2-1.6 3-2 4.5-1.6-.5 1.4-1.5 2.2-2.8 2.4C26.5 24 21 27 14 27 7 27 3 23 2 17z" />
      </g>
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" fill="#05998b" />
      <path d="M17.5 5l-8 13h6l-1.5 9 8-13h-6l1.5-9z" fill="#fff" />
    </svg>
  ),
  pinecone: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#1f2a3a" strokeWidth="1.8" strokeLinecap="round">
      <path d="M16 3v26M16 8l-4-3M16 8l4-3M16 13l-6-4M16 13l6-4M16 18l-7-4M16 18l7-4M16 23l-6-4M16 23l6-4" />
    </svg>
  ),
  langchain: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#1c3c3c" strokeWidth="2.6" strokeLinecap="round">
      <rect x="3" y="11" width="15" height="10" rx="5" />
      <rect x="14" y="11" width="15" height="10" rx="5" />
    </svg>
  ),
  opencv: (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="4.5">
      <path d="M12.5 13.2A6 6 0 1 1 19.5 13.2" stroke="#ff2d2d" />
      <path d="M13 17.5A6 6 0 1 1 7 25" stroke="#2fb34a" />
      <path d="M25 25a6 6 0 1 1-6-7.5" stroke="#2a6ff0" />
    </svg>
  ),
  tensorflow: (
    <svg viewBox="0 0 32 32">
      <path d="M15 2L3 9v6l12-7v22l4-2.3V8l10 5.8V8z" fill="#ff8a00" />
      <path d="M21 16l4-2.3v6L21 22z" fill="#ff8a00" />
    </svg>
  ),
  tesseract: (
    <svg viewBox="0 0 32 32">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#fff" stroke="#e3e7ee" />
      <text x="16" y="23" textAnchor="middle" fontSize="19" fontWeight="700" fill="#1f2a3a" fontFamily="Georgia, serif">T</text>
    </svg>
  ),
  redis: (
    <svg viewBox="0 0 32 32">
      <path d="M2 20l14 6 14-6v3l-14 6-14-6z" fill="#a41e11" />
      <path d="M2 14l14 6 14-6v3l-14 6-14-6z" fill="#c6302b" />
      <path d="M2 11l14-6 14 6-14 6z" fill="#dc382d" />
      <path d="M11 10.5l3-1 .8 1.6 2.6-.6-1.7 1.4 1.3 1.4-2.8-.6-1.4 1-.3-1.6z" fill="#fff" />
    </svg>
  ),
  playwright: (
    <svg viewBox="0 0 32 32">
      <path d="M3 10c4-2 9-2 12 0l-1 12c-4 2-8 1-10-2z" fill="#e2574c" />
      <path d="M29 9c-4-2-9-2-12 0l1 12c4 2 8 1 10-2z" fill="#2ead33" />
      <circle cx="8" cy="14" r="1.3" fill="#1f2a3a" />
      <circle cx="12" cy="14" r="1.3" fill="#1f2a3a" />
      <circle cx="20" cy="13" r="1.3" fill="#1f2a3a" />
      <circle cx="24" cy="13" r="1.3" fill="#1f2a3a" />
      <path d="M7 18c1.5 1.5 4 1.5 5.5 0M19.5 17.5c1.5-1.2 3.5-1.2 5 0" fill="none" stroke="#1f2a3a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  selenium: (
    <svg viewBox="0 0 32 32">
      <rect x="3" y="3" width="26" height="26" rx="3" fill="#43b02a" />
      <text x="14" y="23" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Arial">Se</text>
      <path d="M21 9l2.5 3 4.5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  githubactions: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#2088ff" strokeWidth="2">
      <circle cx="7" cy="7" r="3.5" />
      <circle cx="7" cy="25" r="3.5" />
      <circle cx="25" cy="25" r="3.5" />
      <rect x="18" y="11" width="10" height="7" rx="2" />
      <path d="M7 10.5v11M10.5 25h11M10 9l8 4" />
    </svg>
  ),
  terraform: (
    <svg viewBox="0 0 32 32" fill="#7b42bc">
      <path d="M2 4l8 4.6v9.2L2 13.2z" />
      <path d="M11 8.6l8 4.6v9.2l-8-4.6z" />
      <path d="M20 13.2l8-4.6v9.2l-8 4.6z" opacity="0.75" />
      <path d="M11 19l8 4.6v9.2l-8-4.6z" transform="translate(0 -4)" />
    </svg>
  ),
  grafana: (
    <svg viewBox="0 0 32 32">
      <path d="M16 3l2.5 3.5 4-1 .8 4 3.9 1.5-1.6 3.7 2.4 3.3-3.6 1.9.1 4.1-4.1-.3-1.8 3.7L16 25l-2.6 2.9-1.8-3.7-4.1.3.1-4.1-3.6-1.9 2.4-3.3-1.6-3.7L8.7 10l.8-4 4 1z" fill="#f47a20" />
      <circle cx="16" cy="16" r="5" fill="#fff" />
      <circle cx="16" cy="16" r="2.5" fill="none" stroke="#f05a28" strokeWidth="1.5" />
    </svg>
  ),
  prometheus: (
    <svg viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#e6522c" />
      <path d="M16 6c1 3 4 4 4 8 0 1.5-1 3-2 3.5.5-2-1-3.5-2-4.5-.5 2-3 3-3 5.5-1-.7-2-2-2-4 0-4 4-5 5-8.5z" fill="#fff" />
      <path d="M9.5 20h13v2h-13zM11 23.5h10V26H11z" fill="#fff" />
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 32 32">
      <path d="M16 2l11 5.3 2.7 11.9L22 28.8H10l-7.7-9.6L5 7.3z" fill="#326ce5" />
      <circle cx="16" cy="16" r="5.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="M16 7v6.5M16 18.5V25M7.5 13l6 1.8M18.5 17.2l6 1.8M24.5 13l-6 1.8M13.5 17.2l-6 1.8M11 23.5l3.2-5M21 23.5l-3.2-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
} satisfies Record<string, ReactNode>;

export type TechLogo = keyof typeof techLogos;

/* ---------- data shape ---------- */

/** A step glyph can be a line icon or a technology logo. */
export type Glyph = IconName | TechLogo;

export type CaseStudyData = {
  /** Project number — the page lives at /Projects/ProjectsView/Project{id}. */
  id: number;
  /** Plain-text title used for the browser tab. */
  name: string;
  title: ReactNode;
  tagline: string;
  tags: string[];
  image: string;
  overview: string;
  details: { icon: IconName; label: string; value: string }[];
  challenge: string;
  challengePoints: { icon: IconName; tone: Tone; title: string; text: string }[];
  solution: string;
  solutionSteps: { icon: Glyph; tone: Tone; title: string; text: string }[];
  technologies: { logo: TechLogo; name: string; role: string }[];
  impact: { icon: IconName; tone: Tone; title: string; text: string }[];
};

/* ---------- small pieces ---------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-wider text-faint">{children}</p>;
}

function IconTile({ icon, tone, round = false, size = "md" }: { icon: Glyph; tone: Tone; round?: boolean; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14 p-3.5" : "h-10 w-10 p-2.5";
  return (
    <span className={`flex shrink-0 items-center justify-center ${box} ${round ? "rounded-full" : "rounded-tile"} ${tones[tone]}`}>
      {icon in icons ? icons[icon as IconName] : techLogos[icon as TechLogo]}
    </span>
  );
}

function Divider() {
  return <div className="page-container"><div className="border-t border-line" /></div>;
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- page ---------- */

/**
 * Case-study numbers, read from the ProjectN folders next to this file
 * (Project1, Project2, … ). Adding a Project13 folder is picked up automatically.
 */
function caseStudyIds(): number[] {
  const dir = path.join(process.cwd(), "src/app/Projects/ProjectsView");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .map((entry) => (entry.isDirectory() ? /^Project(\d+)$/.exec(entry.name) : null))
    .filter((match) => match !== null)
    .map((match) => Number(match[1]))
    .sort((a, b) => a - b);
}

const caseStudyHref = (id: number) => `/Projects/ProjectsView/Project${id}`;

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  // Previous on the first case study returns to /Projects/ProjectsView; the last one has no Next.
  const ids = caseStudyIds();
  const pos = ids.indexOf(data.id);
  const prevHref = pos > 0 ? caseStudyHref(ids[pos - 1]) : "/Projects/ProjectsView";
  const nextHref = pos < ids.length - 1 ? caseStudyHref(ids[pos + 1]) : undefined;

  return (
    <main className="relative w-full overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative">

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Case Study</Eyebrow>
            <h1 className="mt-3 type-section leading-heading text-ink">{data.title}</h1>
            <p className="mt-6 max-w-md type-copy text-ink">{data.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.tags.map((tag, i) => (
                <span key={`${i}-${tag}`} className="rounded-chip bg-surface px-4 py-2 text-sm font-medium text-ink shadow-raised">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={data.image}
              alt="Project preview"
              fill
              preload
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ===== 01 Overview ===== */}
      <section className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr]">
        <Hatch className="left-[22%] bottom-10 hidden h-16 w-24 md:block" />
        <div className="relative md:border-r md:border-line md:pr-12">
          <Eyebrow>01 / Overview</Eyebrow>
          <h2 className="mt-3 type-section text-ink">Project Overview</h2>
          <p className="mt-6 max-w-lg type-copy text-ink">{data.overview}</p>
        </div>
        <ul className="relative space-y-7">
          <Hatch className="right-0 top-0 hidden h-full w-16 md:block" />
          {data.details.map((d, i) => (
            <li key={`${i}-${d.label}`} className="relative flex items-start gap-6">
              <span className="h-7 w-7 shrink-0 text-ink-soft">{icons[d.icon]}</span>
              <div>
                <p className="text-lg font-medium text-ink">{d.label}</p>
                <p className="mt-1 font-mono text-sm text-ink-soft">{d.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* ===== 02 Challenge ===== */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Eyebrow>02 / Challenge</Eyebrow>
          <h2 className="mt-3 type-section text-ink">The Challenge</h2>
          <p className="mt-6 max-w-lg type-copy text-ink">{data.challenge}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.challengePoints.map((p, i) => (
            <div key={`${i}-${p.title}`} className="rounded-card border border-line-card bg-surface/50 p-5 shadow-raised backdrop-blur-sm">
              <IconTile icon={p.icon} tone={p.tone} />
              <h3 className="mt-5 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 type-caption text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ===== 03 Solution ===== */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.25fr]">
        <Hatch className="left-[26%] top-0 hidden h-full w-16 md:block" />
        <div className="relative">
          <Eyebrow>03 / Solution</Eyebrow>
          <h2 className="mt-3 type-section text-ink">The Solutions</h2>
          <p className="mt-6 max-w-lg type-copy text-ink">{data.solution}</p>
        </div>
        <ol className="relative grid grid-cols-2 gap-8 sm:flex sm:items-start sm:gap-2">
          {data.solutionSteps.map((s, i) => (
            <li key={`${i}-${s.title}`} className="contents">
              {i > 0 && (
                <span className="mt-5 hidden shrink-0 text-ink sm:block" aria-hidden="true">
                  <ArrowRight />
                </span>
              )}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start">
                  <IconTile icon={s.icon} tone={s.tone} round size="lg" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 whitespace-pre-line font-mono text-2xs leading-4 text-ink-soft">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Divider />

      {/* ===== 04 Technology ===== */}
      <section className="relative page-container py-16">
        <Eyebrow>04 / Technology</Eyebrow>
        <h2 className="mt-3 type-section text-ink">Technology Used</h2>
        <ul className="mt-12 flex flex-wrap gap-y-10">
          {data.technologies.map((t, i) => (
            <li key={`${i}-${t.name}`} className="flex w-1/3 flex-col items-center text-center md:w-auto md:flex-1">
              <span className="h-11 w-11">{techLogos[t.logo]}</span>
              <p className="mt-3 text-sm font-semibold text-ink">{t.name}</p>
              <p className="mt-1 text-xs text-subtle">{t.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* ===== 05 Impact ===== */}
      <section className="relative page-container py-16">
        <Hatch className="left-[30%] top-0 hidden h-20 w-20 md:block" />
        <Hatch className="right-[25%] top-0 hidden h-20 w-20 md:block" />
        <Eyebrow>05 / Impact</Eyebrow>
        <h2 className="mt-3 type-section text-ink">Business Impact</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.impact.map((p, i) => (
            <div key={`${i}-${p.title}`} className="flex items-center gap-4 rounded-card border border-line-card bg-surface/50 p-5 shadow-raised backdrop-blur-sm">
              <IconTile icon={p.icon} tone={p.tone} round />
              <div>
                <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 type-caption text-ink-soft">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <div className="flex items-center justify-between text-sm font-medium text-ink">
            <Link href={prevHref} className="flex items-center gap-4 hover:text-hover">
              <span className="rotate-180"><ArrowRight /></span>
              Previous Projects
            </Link>
            {nextHref && (
              <Link href={nextHref} className="flex items-center gap-4 hover:text-hover">
                Next Projects
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
