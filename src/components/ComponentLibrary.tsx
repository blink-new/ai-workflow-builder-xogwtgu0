import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
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

interface ComponentLibraryProps {
  onAddNode: (nodeType: string, position: { x: number; y: number }) => void;
}

const aiComponents = [
  {
    id: 'textGeneration',
    name: 'Text Generator',
    description: 'Generate text using AI models',
    icon: MessageSquare,
    category: 'Text'
  },
  {
    id: 'imageGeneration',
    name: 'Image Generator',
    description: 'Create images from text prompts',
    icon: Image,
    category: 'Image'
  },
  {
    id: 'dataAnalysis',
    name: 'Data Analyzer',
    description: 'Analyze and process data',
    icon: BarChart3,
    category: 'Data'
  },
  {
    id: 'textToSpeech',
    name: 'Text to Speech',
    description: 'Convert text to audio',
    icon: Volume2,
    category: 'Audio'
  },
  {
    id: 'speechToText',
    name: 'Speech to Text',
    description: 'Transcribe audio to text',
    icon: Mic,
    category: 'Audio'
  },
  {
    id: 'translation',
    name: 'Translator',
    description: 'Translate between languages',
    icon: Languages,
    category: 'Text'
  },
  {
    id: 'sentiment',
    name: 'Sentiment Analysis',
    description: 'Analyze emotional tone',
    icon: Heart,
    category: 'Analysis'
  },
  {
    id: 'summarization',
    name: 'Summarizer',
    description: 'Create concise summaries',
    icon: FileText,
    category: 'Text'
  }
];

const utilityComponents = [
  {
    id: 'trigger',
    name: 'Trigger',
    description: 'Start workflow execution',
    icon: Zap,
    category: 'Control'
  },
  {
    id: 'dataSource',
    name: 'Data Source',
    description: 'Input data into workflow',
    icon: Database,
    category: 'Data'
  },
  {
    id: 'filter',
    name: 'Filter',
    description: 'Filter and transform data',
    icon: Filter,
    category: 'Data'
  },
  {
    id: 'router',
    name: 'Router',
    description: 'Route data conditionally',
    icon: Shuffle,
    category: 'Control'
  }
];

const externalToolComponents = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send emails via Gmail API',
    icon: Mail,
    category: 'Communication'
  },
  {
    id: 'googleCalendar',
    name: 'Google Calendar',
    description: 'Manage calendar events',
    icon: Calendar,
    category: 'Productivity'
  },
  {
    id: 'googleSheets',
    name: 'Google Sheets',
    description: 'Read/write spreadsheet data',
    icon: FileSpreadsheet,
    category: 'Data'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages to Slack',
    icon: MessageCircle,
    category: 'Communication'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Search and download photos',
    icon: Camera,
    category: 'Media'
  },
  {
    id: 'webScraper',
    name: 'Web Scraper',
    description: 'Extract data from websites',
    icon: Globe,
    category: 'Data'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Interact with GitHub API',
    icon: Code,
    category: 'Development'
  },
  {
    id: 'googleSearch',
    name: 'Google Search',
    description: 'Search the web',
    icon: Search,
    category: 'Data'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File storage and sharing',
    icon: Cloud,
    category: 'Storage'
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Send HTTP requests',
    icon: Webhook,
    category: 'Integration'
  }
];

export function ComponentLibrary({ onAddNode }: ComponentLibraryProps) {
  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = (nodeType: string) => {
    // Add node at a random position in the center area
    const position = {
      x: Math.random() * 400 + 200,
      y: Math.random() * 300 + 100
    };
    onAddNode(nodeType, position);
  };

  const ComponentItem = ({ component }: { component: typeof aiComponents[0] }) => {
    const Icon = component.icon;
    
    return (
      <div
        className="p-3 bg-muted rounded-lg border border-border hover:bg-muted/80 cursor-pointer transition-colors group"
        draggable
        onDragStart={(e) => handleDragStart(e, component.id)}
        onClick={() => handleClick(component.id)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate">{component.name}</h4>
            <p className="text-xs text-muted-foreground truncate">{component.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">Drag to add to workflow</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">AI Components</h3>
            <div className="space-y-2">
              {aiComponents.map((component) => (
                <ComponentItem key={component.id} component={component} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Utilities</h3>
            <div className="space-y-2">
              {utilityComponents.map((component) => (
                <ComponentItem key={component.id} component={component} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">External Tools</h3>
            <div className="space-y-2">
              {externalToolComponents.map((component) => (
                <ComponentItem key={component.id} component={component} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}