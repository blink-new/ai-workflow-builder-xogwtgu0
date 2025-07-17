import React from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import { Settings } from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateConfig: (nodeId: string, config: any) => void;
}

export function PropertiesPanel({ selectedNode, onUpdateConfig }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-card border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select a node to edit properties</p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = selectedNode;
  const config = data.config || {};

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    onUpdateConfig(selectedNode.id, newConfig);
  };

  const renderConfigFields = () => {
    switch (data.nodeType) {
      case 'textGeneration':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="model">Model</Label>
              <Select value={config.model} onValueChange={(value) => updateConfig('model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                value={config.prompt || ''}
                onChange={(e) => updateConfig('prompt', e.target.value)}
                placeholder="Enter your prompt..."
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="maxTokens">Max Tokens: {config.maxTokens}</Label>
              <Slider
                value={[config.maxTokens || 150]}
                onValueChange={(value) => updateConfig('maxTokens', value[0])}
                max={2000}
                min={10}
                step={10}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="temperature">Temperature: {config.temperature}</Label>
              <Slider
                value={[config.temperature || 0.7]}
                onValueChange={(value) => updateConfig('temperature', value[0])}
                max={2}
                min={0}
                step={0.1}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'imageGeneration':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="model">Model</Label>
              <Select value={config.model} onValueChange={(value) => updateConfig('model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                  <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                  <SelectItem value="midjourney">Midjourney</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                value={config.prompt || ''}
                onChange={(e) => updateConfig('prompt', e.target.value)}
                placeholder="Describe the image you want to generate..."
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={config.size} onValueChange={(value) => updateConfig('size', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                  <SelectItem value="1024x1792">1024x1792</SelectItem>
                  <SelectItem value="1792x1024">1792x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quality">Quality</Label>
              <Select value={config.quality} onValueChange={(value) => updateConfig('quality', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hd">HD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'textToSpeech':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="voice">Voice</Label>
              <Select value={config.voice} onValueChange={(value) => updateConfig('voice', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy</SelectItem>
                  <SelectItem value="echo">Echo</SelectItem>
                  <SelectItem value="fable">Fable</SelectItem>
                  <SelectItem value="onyx">Onyx</SelectItem>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="speed">Speed: {config.speed}</Label>
              <Slider
                value={[config.speed || 1.0]}
                onValueChange={(value) => updateConfig('speed', value[0])}
                max={4}
                min={0.25}
                step={0.25}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'translation':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceLanguage">Source Language</Label>
              <Select value={config.sourceLanguage} onValueChange={(value) => updateConfig('sourceLanguage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="targetLanguage">Target Language</Label>
              <Select value={config.targetLanguage} onValueChange={(value) => updateConfig('targetLanguage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <p>No configuration options available for this node type.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Properties</h2>
        <p className="text-sm text-muted-foreground">{data.label}</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              {renderConfigFields()}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}