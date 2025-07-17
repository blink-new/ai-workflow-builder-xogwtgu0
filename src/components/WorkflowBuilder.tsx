import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ComponentLibrary } from './ComponentLibrary';
import { PropertiesPanel } from './PropertiesPanel';
import { ExecutionPanel } from './ExecutionPanel';
import { TopNavigation } from './TopNavigation';
import { AINode } from './nodes/AINode';

const nodeTypes = {
  aiNode: AINode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'aiNode',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Text Generator',
      nodeType: 'textGeneration',
      config: {
        model: 'gpt-4',
        prompt: 'Generate creative content...',
        maxTokens: 150
      }
    },
  },
];

const initialEdges: Edge[] = [];

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const addNode = useCallback((nodeType: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'aiNode',
      position,
      data: {
        label: getNodeLabel(nodeType),
        nodeType,
        config: getDefaultConfig(nodeType)
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes.length, setNodes]);

  const updateNodeConfig = useCallback((nodeId: string, config: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
  }, [setNodes]);

  const executeWorkflow = useCallback(async () => {
    setIsExecuting(true);
    setExecutionLogs(['Starting workflow execution...']);
    
    // Simulate workflow execution
    for (let i = 0; i < nodes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExecutionLogs(prev => [...prev, `Executing node: ${nodes[i].data.label}`]);
    }
    
    setExecutionLogs(prev => [...prev, 'Workflow execution completed!']);
    setIsExecuting(false);
  }, [nodes]);

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <TopNavigation onExecute={executeWorkflow} isExecuting={isExecuting} />
      
      <div className="flex-1 flex">
        <ComponentLibrary onAddNode={addNode} />
        
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Controls className="bg-card border-border" />
            <MiniMap 
              className="bg-card border-border"
              nodeColor="#6366F1"
              maskColor="rgba(0, 0, 0, 0.2)"
            />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="#374151"
            />
          </ReactFlow>
        </div>
        
        <PropertiesPanel 
          selectedNode={selectedNode}
          onUpdateConfig={updateNodeConfig}
        />
      </div>
      
      <ExecutionPanel 
        logs={executionLogs}
        isExecuting={isExecuting}
      />
    </div>
  );
}

function getNodeLabel(nodeType: string): string {
  const labels: Record<string, string> = {
    textGeneration: 'Text Generator',
    imageGeneration: 'Image Generator',
    dataAnalysis: 'Data Analyzer',
    textToSpeech: 'Text to Speech',
    speechToText: 'Speech to Text',
    translation: 'Translator',
    sentiment: 'Sentiment Analysis',
    summarization: 'Summarizer',
  };
  return labels[nodeType] || 'AI Node';
}

function getDefaultConfig(nodeType: string): any {
  const configs: Record<string, any> = {
    textGeneration: {
      model: 'gpt-4',
      prompt: 'Generate creative content...',
      maxTokens: 150,
      temperature: 0.7
    },
    imageGeneration: {
      model: 'dall-e-3',
      prompt: 'A beautiful landscape...',
      size: '1024x1024',
      quality: 'standard'
    },
    dataAnalysis: {
      analysisType: 'statistical',
      outputFormat: 'json'
    },
    textToSpeech: {
      voice: 'alloy',
      speed: 1.0
    },
    speechToText: {
      language: 'en',
      model: 'whisper-1'
    },
    translation: {
      targetLanguage: 'es',
      sourceLanguage: 'auto'
    },
    sentiment: {
      outputFormat: 'detailed'
    },
    summarization: {
      maxLength: 100,
      style: 'concise'
    }
  };
  return configs[nodeType] || {};
}