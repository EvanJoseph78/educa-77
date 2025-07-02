'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  filePath: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  filePath,
  className = ''
}) => {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setMarkdown('# Erro ao carregar o conteúdo\n\nPor favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (isLoading) {
    return (
      <div className={`p-4 max-w-4xl mx-auto ${className}`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">Carregando conteúdo...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 max-w-4xl mx-auto ${className}`}>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <h3 className="text-red-800 font-medium">Erro ao carregar</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 max-w-4xl mx-auto ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headers
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-800" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-800" {...props}>
              {children}
            </h3>
          ),

          // Text elements
          p: ({ children, ...props }) => (
            <p className="my-4 leading-relaxed text-gray-700" {...props}>
              {children}
            </p>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-gray-800" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-gray-700" {...props}>
              {children}
            </em>
          ),

          // Links
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),

          // Lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 my-3 space-y-1 text-gray-700" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 my-3 space-y-1 text-gray-700" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="pl-2" {...props}>
              {children}
            </li>
          ),

          // Tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="bg-white divide-y divide-gray-200" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 text-sm text-gray-700" {...props}>
              {children}
            </td>
          ),

          // Code blocks
          code(
            {
              inline,
              className,
              children,
              ...props
            }: React.PropsWithChildren<{
              inline?: boolean;
              className?: string;
            }> & React.HTMLAttributes<HTMLElement>
          ) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter
                  language={match[1]}
                  style={atomOneLight}
                  PreTag="div"
                  showLineNumbers={true}
                  wrapLines={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.9rem',
                    backgroundColor: '#f8fafc'
                  }}
                  {...props as SyntaxHighlighterProps}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className={`font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm ${className || ''}`}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-600 my-4 py-2 bg-blue-50 rounded-r" {...props}>
              {children}
            </blockquote>
          ),

          // Images
          img: ({ src, alt, ...props }) => (
            <div className="my-6 flex justify-center">
              <img
                src={src}
                alt={alt || ''}
                className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                {...props}
              />
            </div>
          ),

          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="my-8 border-t border-gray-200" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;