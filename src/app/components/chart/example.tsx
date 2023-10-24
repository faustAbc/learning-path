"use client";

import "reactflow/dist/style.css";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProps,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { getData } from "@/app/actions";
import Dagre from "@dagrejs/dagre";
import { flushSync } from "react-dom";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, { ...node, width: 130, height: 50 })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow: FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { fitView, zoomTo } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const layout = (direction = "TB", nodes, edges) => {
    const layouted = getLayoutedElements(nodes, edges, { direction });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  };

  useEffect(() => {
    window.requestAnimationFrame(() => {
      fitView({
        duration: 1000,
      });
    });
  }, [edges, fitView, nodes]);

  return (
    <div style={{ height: "100%" }}>
      <Panel position="top-right">
        {isFetching && "Lading . . ."}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setIsFetching(true);
            const { edges, nodes } = await getData(
              new FormData(event.currentTarget).get("query") as string
            );
            setIsFetching(false);
            layout("TB", nodes, edges);
          }}
        >
          <label>
            Learning path for{" "}
            <input
              autoFocus
              defaultValue="React.js"
              type="search"
              name="query"
            />
          </label>
          <button>Request</button>
        </form>
      </Panel>
      <Background />
      <Controls />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </div>
  );
};

export const Example = () => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
};
