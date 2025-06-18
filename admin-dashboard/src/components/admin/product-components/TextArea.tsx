import React, { useState, useRef, useEffect } from 'react';

interface TextEditorProps {
  initialText?: string;
  onChange?: (content: string) => void | undefined;
}

const BasicTextEditor: React.FC<TextEditorProps> = ({
  initialText = '',
  onChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isSmallFont, setIsSmallFont] = useState(false);
  const [isMediumFont, setIsMediumFont] = useState(false);

  // Initialize the editor
  useEffect(() => {
    if (editorRef.current && initialText) {
      editorRef.current.innerHTML = initialText;
    }
  }, [initialText]);

  // Track selection state changes
  useEffect(() => {
    const checkFormatting = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        setIsBold(document.queryCommandState('bold'));
        setIsSmallFont(false);
        setIsMediumFont(false);
      }
    };

    document.addEventListener('selectionchange', checkFormatting);
    return () => {
      document.removeEventListener('selectionchange', checkFormatting);
    };
  }, []);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    
    if (command === 'bold') {
      setIsBold(document.queryCommandState('bold'));
    }
  };

  const applyBold = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      execCommand('bold');
    }
  };

  const applySmallFont = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      setIsSmallFont(!isSmallFont);
      setIsMediumFont(false);
      
      execCommand('fontSize', '1');
    }
  };

  const applyMediumFont = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      setIsMediumFont(!isMediumFont);
      setIsSmallFont(false);
      
      execCommand('fontSize', '3');
    }
  };


  const handleInput = () => {
    if (editorRef.current && onChange) {
        const data = editorRef.current.innerHTML;
      onChange(data);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl border border-gray-300 rounded-md">
      <div className="flex items-center p-2 border-b border-gray-300 bg-gray-100">
        <button
          onClick={applyBold}
          className={`px-3 py-1 mr-2 text-sm font-bold border border-gray-300 rounded hover:bg-gray-200 ${
            isBold ? 'bg-gray-300' : 'bg-white'
          }`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={applySmallFont}
          className={`px-3 py-1 mr-2 text-xs border border-gray-300 rounded hover:bg-gray-200 ${
            isSmallFont ? 'bg-gray-300' : 'bg-white'
          }`}
          title="Small Font"
        >
          S
        </button>
        <button
          onClick={applyMediumFont}
          className={`px-3 py-1 mr-2 text-base border border-gray-300 rounded hover:bg-gray-200 ${
            isMediumFont ? 'bg-gray-300' : 'bg-white'
          }`}
          title="Medium Font"
        >
          M
        </button>
        <div className="flex-grow"></div>
      </div>
      
      <div
        ref={editorRef}
        className="w-full sm:h-[500px] h-[300px] p-3 focus:outline-none"
        style={{ 
          overflowY: 'auto',
          minHeight: '100px'
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleInput}
      />
    </div>
  );
};

export default BasicTextEditor;

// Usage Example with capturing content:
/*
import { useState } from 'react';
import BasicTextEditor from '../components/BasicTextEditor';

export default function Home() {
  const [savedContent, setSavedContent] = useState('');
  
  const handleSaveContent = (content: string) => {
    setSavedContent(content);
    // Here you can do whatever you want with the content:
    // - Send it to an API
    // - Store it in state/context
    // - Save it to localStorage
  };
  
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Text Editor</h1>
      <BasicTextEditor 
        height="400px" 
        initialText="Start writing..." 
        onSave={handleSaveContent} 
      />
      {savedContent && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-semibold">Saved Content:</h2>
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
        </div>
      )}
    </div>
  );
}
*/