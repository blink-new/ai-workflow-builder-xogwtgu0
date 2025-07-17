import React from 'react';
import { Button } from './ui/button';
import { Play, Square, Save, FolderOpen, Settings } from 'lucide-react';

interface TopNavigationProps {
  onExecute: () => void;
  isExecuting: boolean;
}

export function TopNavigation({ onExecute, isExecuting }: TopNavigationProps) {
  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <h1 className="text-lg font-semibold text-foreground">AI Workflow Builder</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <FolderOpen className="w-4 h-4 mr-2" />
          Open
        </Button>
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <div className="w-px h-6 bg-border mx-2"></div>
        <Button 
          onClick={onExecute}
          disabled={isExecuting}
          className="bg-primary hover:bg-primary/90"
          size="sm"
        >
          {isExecuting ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run
            </>
          )}
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}