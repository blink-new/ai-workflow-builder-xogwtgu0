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
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');

      if (typeof nodeType === 'undefined' || !nodeType) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (position) {
        addNode(nodeType, position);
      }
    },
    [addNode, reactFlowInstance]
  );

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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
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
    trigger: 'Trigger',
    dataSource: 'Data Source',
    filter: 'Filter',
    router: 'Router',
    gmail: 'Gmail',
    googleCalendar: 'Google Calendar',
    googleSheets: 'Google Sheets',
    slack: 'Slack',
    unsplash: 'Unsplash',
    webScraper: 'Web Scraper',
    github: 'GitHub',
    googleSearch: 'Google Search',
    dropbox: 'Dropbox',
    webhook: 'Webhook',
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
    },
    trigger: {
      triggerType: 'manual',
      schedule: ''
    },
    dataSource: {
      sourceType: 'file',
      format: 'json'
    },
    filter: {
      condition: 'contains',
      value: ''
    },
    router: {
      condition: 'if-then',
      routes: 2
    },
    gmail: {
      to: '',
      subject: '',
      body: '',
      attachments: false
    },
    googleCalendar: {
      action: 'create',
      title: '',
      startTime: '',
      duration: 60
    },
    googleSheets: {
      action: 'read',
      spreadsheetId: '',
      range: 'A1:Z100'
    },
    slack: {
      channel: '#general',
      message: '',
      username: 'Workflow Bot'
    },
    unsplash: {
      query: '',
      count: 1,
      orientation: 'landscape'
    },
    webScraper: {
      url: '',
      selector: '',
      attribute: 'text'
    },
    github: {
      action: 'create-issue',
      repo: '',
      title: '',
      body: ''
    },
    googleSearch: {
      query: '',
      count: 10,
      type: 'web'
    },
    dropbox: {
      action: 'upload',
      path: '/uploads/',
      filename: ''
    },
    webhook: {
      url: '',
      method: 'POST',
      headers: {},
      body: ''
    }
  };
  return configs[nodeType] || {};
}