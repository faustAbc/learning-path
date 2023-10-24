"use server";

import OpenAI from "openai";
import { ReactFlowProps } from "reactflow";
import chartDto from "@/mocks/chart-dto.json";

const openai = new OpenAI();

interface ChatGptChartResponseDto {
  Nodes: {
    label: string;
    id: string;
  }[];
  Edges: {
    id: string;
    source: string;
    target: string;
  }[];
}

const parseNodesDto = ({
  Edges,
  Nodes,
}: ChatGptChartResponseDto): {
  nodes: ReactFlowProps["nodes"];
  edges: ReactFlowProps["edges"];
} => ({
  nodes: Nodes.map((node, index) => ({
    data: { label: node.label },
    id: node.id.toString(),
    position: { x: 0, y: index * 200 },
  })),
  edges: Edges.map((edge) => ({
    id: edge.id.toString(),
    source: edge.source.toString(),
    target: edge.target.toString(),
  })),
});

export const getData = async (query: string) => {
  //   const completion = await openai.chat.completions.create({
  //     messages: [
  //       {
  //         role: "system",
  //         content: `Generate learning path graph. Some leave nodes can have multiple children. Provide 20 nodes total. Ids are numbers.
  // -----
  // Provide output in JSON format as follows:
  // {
  //   "Nodes": [
  //     {
  //       "label": "...",
  //       "id": "..."
  //     },
  //     ...
  //   ],
  //   "Edges": [
  //     {
  //       "source": "...",
  //       "target": "...",
  //       "id": "..."
  //     },
  //     ...
  //   ]
  // }`,
  //       },
  //       {
  //         role: "user",
  //         content: query,
  //       },
  //     ],
  //     model: "gpt-3.5-turbo",
  //   });
  // const content = JSON.parse(
  //   completion.choices[0].message.content ?? "{}"
  // ) as ChatGptChartResponseDto;

  return parseNodesDto(chartDto);
};
