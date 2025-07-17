import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  MessageSquare, 
  Image, 
  BarChart3, 
  Volume2, 
  Mic, 
  Languages, 
  Heart, 
  FileText,
  Zap,
  Database,
  Filter,
  Shuffle,
  Mail,
  Calendar,
  FileSpreadsheet,
  MessageCircle,
  Camera,
  Globe,
  Code,
  Search,
  Cloud,
  Webhook
} from 'lucide-react';

interface AINodeData {
  label: string;
  nodeType: string;
  config?: any;
}

const nodeIcons: Record<string, React.ComponentType<any>> = {
  textGeneration: MessageSquare,
  imageGeneration: Image,
  dataAnalysis: BarChart3,
  textToSpeech: Volume2,
  speechToText: Mic,
  translation: Languages,
  sentiment: Heart,
  summarization: FileText,
  trigger: Zap,
  dataSource: Database,
  filter: Filter,
  router: Shuffle,
  gmail: Mail,
  googleCalendar: Calendar,
  googleSheets: FileSpreadsheet,
  slack: MessageCircle,
  unsplash: Camera,
  webScraper: Globe,
  github: Code,
  googleSearch: Search,
  dropbox: Cloud,
  webhook: Webhook,
};

const nodeColors: Record<string, string> = {
  textGeneration: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  imageGeneration: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  dataAnalysis: 'bg-green-500/10 border-green-500/20 text-green-400',
  textToSpeech: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  speechToText: 'bg-red-500/10 border-red-500/20 text-red-400',
  translation: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  sentiment: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  summarization: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  trigger: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  dataSource: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
  filter: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
  router: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  gmail: 'bg-red-600/10 border-red-600/20 text-red-500',
  googleCalendar: 'bg-blue-600/10 border-blue-600/20 text-blue-500',
  googleSheets: 'bg-green-600/10 border-green-600/20 text-green-500',
  slack: 'bg-purple-600/10 border-purple-600/20 text-purple-500',
  unsplash: 'bg-gray-800/10 border-gray-800/20 text-gray-600',
  webScraper: 'bg-orange-600/10 border-orange-600/20 text-orange-500',
  github: 'bg-gray-900/10 border-gray-900/20 text-gray-700',
  googleSearch: 'bg-blue-700/10 border-blue-700/20 text-blue-600',
  dropbox: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  webhook: 'bg-emerald-600/10 border-emerald-600/20 text-emerald-500',
};

export function AINode({ data, selected }: NodeProps<AINodeData>) {
  const Icon = nodeIcons[data.nodeType] || MessageSquare;
  const colorClass = nodeColors[data.nodeType] || 'bg-gray-500/10 border-gray-500/20 text-gray-400';

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
      
      <Card className={`w-64 transition-all duration-200 ${
        selected 
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg' 
          : 'hover:shadow-md'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{data.label}</h3>
              <Badge variant="secondary" className="text-xs mt-1">
                {data.nodeType}
              </Badge>
            </div>
          </div>
          
          {data.config && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground space-y-1">
                {data.nodeType === 'textGeneration' && (
                  <>
                    <div>Model: {data.config.model}</div>
                    <div>Tokens: {data.config.maxTokens}</div>
                  </>
                )}
                {data.nodeType === 'imageGeneration' && (
                  <>
                    <div>Model: {data.config.model}</div>
                    <div>Size: {data.config.size}</div>
                  </>
                )}
                {data.nodeType === 'textToSpeech' && (
                  <>
                    <div>Voice: {data.config.voice}</div>
                    <div>Speed: {data.config.speed}x</div>
                  </>
                )}
                {data.nodeType === 'translation' && (
                  <>
                    <div>From: {data.config.sourceLanguage}</div>
                    <div>To: {data.config.targetLanguage}</div>
                  </>
                )}
                {data.nodeType === 'gmail' && (
                  <>
                    <div>To: {data.config.to || 'Not set'}</div>
                    <div>Subject: {data.config.subject || 'Not set'}</div>
                  </>
                )}
                {data.nodeType === 'slack' && (
                  <>
                    <div>Channel: {data.config.channel}</div>
                    <div>User: {data.config.username}</div>
                  </>
                )}
                {data.nodeType === 'googleSheets' && (
                  <>
                    <div>Action: {data.config.action}</div>
                    <div>Range: {data.config.range}</div>
                  </>
                )}
                {data.nodeType === 'webhook' && (
                  <>
                    <div>Method: {data.config.method}</div>
                    <div>URL: {data.config.url || 'Not set'}</div>
                  </>
                )}
                {data.nodeType === 'webScraper' && (
                  <>
                    <div>URL: {data.config.url || 'Not set'}</div>
                    <div>Selector: {data.config.selector || 'Not set'}</div>
                  </>
                )}
                {data.nodeType === 'unsplash' && (
                  <>
                    <div>Query: {data.config.query || 'Not set'}</div>
                    <div>Count: {data.config.count}</div>
                  </>
                )}
                {data.nodeType === 'github' && (
                  <>
                    <div>Action: {data.config.action}</div>
                    <div>Repo: {data.config.repo || 'Not set'}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
    </div>
  );
}