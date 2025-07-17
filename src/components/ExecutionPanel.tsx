import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Terminal, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ExecutionPanelProps {
  logs: string[];
  isExecuting: boolean;
}

export function ExecutionPanel({ logs, isExecuting }: ExecutionPanelProps) {
  const getLogIcon = (log: string) => {
    if (log.includes('completed')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (log.includes('error') || log.includes('failed')) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    if (log.includes('Starting') || log.includes('Executing')) {
      return <Clock className="w-4 h-4 text-blue-500" />;
    }
    return <Terminal className="w-4 h-4 text-muted-foreground" />;
  };

  const getLogColor = (log: string) => {
    if (log.includes('completed')) {
      return 'text-green-400';
    }
    if (log.includes('error') || log.includes('failed')) {
      return 'text-red-400';
    }
    if (log.includes('Starting') || log.includes('Executing')) {
      return 'text-blue-400';
    }
    return 'text-foreground';
  };

  return (
    <div className="h-48 bg-card border-t border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Execution Logs</h2>
        </div>
        <div className="flex items-center space-x-2">
          {isExecuting && (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
              Running
            </Badge>
          )}
          {logs.length > 0 && !isExecuting && (
            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ready
            </Badge>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {logs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Terminal className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No execution logs yet</p>
              <p className="text-sm">Click "Run" to execute the workflow</p>
            </div>
          ) : (
            <div className="space-y-2 font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-muted-foreground text-xs mt-0.5 min-w-[60px]">
                    {new Date().toLocaleTimeString()}
                  </span>
                  <div className="flex items-center space-x-2 flex-1">
                    {getLogIcon(log)}
                    <span className={getLogColor(log)}>{log}</span>
                  </div>
                </div>
              ))}
              {isExecuting && (
                <div className="flex items-start space-x-2">
                  <span className="text-muted-foreground text-xs mt-0.5 min-w-[60px]">
                    {new Date().toLocaleTimeString()}
                  </span>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-400">Processing...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}