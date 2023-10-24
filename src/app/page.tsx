"use server";

import { Example } from "@/app/components/chart/example";
import OpenAI from "openai";
import { ReactFlowProps } from "reactflow";

const nodes = [
  {
    label: "HTML and CSS Fundamentals",
    id: 1,
  },
  {
    label: "JavaScript Fundamentals",
    id: 2,
  },
  {
    label: "ES6 (ECMAScript 2015)",
    id: 3,
  },
  {
    label: "DOM Manipulation",
    id: 4,
  },
  {
    label: "Introduction to React",
    id: 5,
  },
  {
    label: "React Components",
    id: 6,
  },
  {
    label: "React Router",
    id: 7,
  },
  {
    label: "State Management with Redux",
    id: 8,
  },
  {
    label: "API Integration",
    id: 9,
  },
  {
    label: "React Hooks",
    id: 10,
  },
  {
    label: "Context API",
    id: 11,
  },
  {
    label: "Styling in React",
    id: 12,
  },
  {
    label: "Testing in React",
    id: 13,
  },
  {
    label: "Server-Side Rendering (SSR)",
    id: 14,
  },
  {
    label: "Performance Optimization",
    id: 15,
  },
  {
    label: "Advanced React Patterns",
    id: 16,
  },
  {
    label: "Authentication and Authorization",
    id: 17,
  },
  {
    label: "Deployment and Hosting",
    id: 18,
  },
  {
    label: "Advanced Topics",
    id: 19,
  },
  {
    label: "Project Building",
    id: 20,
  },
].map((node, index) => ({
  data: { label: node.label },
  id: node.id.toString(),
  position: { x: 0, y: index * 200 },
})) satisfies ReactFlowProps["nodes"];

const edges = [
  {
    source: 1,
    target: 2,
    id: 21,
  },
  {
    source: 2,
    target: 3,
    id: 22,
  },
  {
    source: 3,
    target: 4,
    id: 23,
  },
  {
    source: 4,
    target: 5,
    id: 24,
  },
  {
    source: 5,
    target: 6,
    id: 25,
  },
  {
    source: 6,
    target: 7,
    id: 26,
  },
  {
    source: 6,
    target: 10,
    id: 27,
  },
  {
    source: 6,
    target: 11,
    id: 28,
  },
  {
    source: 6,
    target: 12,
    id: 29,
  },
  {
    source: 7,
    target: 8,
    id: 30,
  },
  {
    source: 8,
    target: 9,
    id: 31,
  },
  {
    source: 10,
    target: 13,
    id: 32,
  },
  {
    source: 5,
    target: 20,
    id: 33,
  },
  {
    source: 8,
    target: 16,
    id: 34,
  },
  {
    source: 17,
    target: 19,
    id: 35,
  },
  {
    source: 13,
    target: 16,
    id: 36,
  },
  {
    source: 15,
    target: 19,
    id: 37,
  },
  {
    source: 18,
    target: 19,
    id: 38,
  },
].map((edge) => ({
  id: edge.id.toString(),
  source: edge.source.toString(),
  target: edge.target.toString(),
  type: "smoothstep",
})) satisfies ReactFlowProps["edges"];

export default async function Home() {
  return <Example />;
}
