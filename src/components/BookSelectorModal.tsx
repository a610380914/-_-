/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Book } from '../types';
import { BOOKS } from '../data';
import { Search, X, BookOpen, Library, Check, Layers } from 'lucide-react';

interface BookSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBookId: string;
  onSelectBook: (bookId: string) => void;
  books?: Book[];
}

export default function BookSelectorModal({ 
  isOpen, 
  onClose, 
  selectedBookId, 
  onSelectBook,
  books = BOOKS
}: BookSelectorModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!isOpen) return null;

  const filteredBooks = books.filter(book => 
    book.id === 'all' || book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>切换作品</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">选择需要分析稿费收入的具体作品，或查看全部数据</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-gray-50/50 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="搜索作品名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-450 transition-all font-sans"
            />
          </div>
        </div>

        {/* Book List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredBooks.map((book) => {
            const isSelected = book.id === selectedBookId;
            const isAll = book.id === 'all';
            
            return (
              <div 
                key={book.id}
                onClick={() => {
                  onSelectBook(book.id);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50/20 shadow-sm shadow-blue-50' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Book Cover */}
                  {isAll ? (
                    <div className="w-11 h-15 rounded-md bg-gradient-to-br from-blue-400 to-indigo-600 shadow-sm flex flex-col items-center justify-center p-1.5 shrink-0 select-none">
                      <Library className="w-5 h-5 text-white" />
                      <span className="text-[9px] text-white/95 font-semibold mt-1">ALL</span>
                    </div>
                  ) : (
                    <div className={`w-11 h-15 rounded-md bg-gradient-to-br ${book.coverGradient} shadow-sm flex flex-col justify-between p-1.5 shrink-0 text-left select-none relative overflow-hidden`}>
                      <div className="text-[7px] text-white/80 font-mono tracking-wider font-semibold uppercase">{book.genre}</div>
                      <div className="text-[9px] font-bold leading-tight line-clamp-2 text-white/95">{book.title.slice(0, 4)}</div>
                      <div className="absolute top-1/2 right-0 w-2.5 h-full bg-white/10 -skew-x-12 transform origin-top-right"></div>
                    </div>
                  )}

                  {/* Book Details */}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-gray-800 truncate">{book.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                      {isAll ? (
                        <span className="bg-blue-100/60 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                          聚合统计
                        </span>
                      ) : (
                        <span className="bg-gray-100/60 text-gray-650 text-[10px] px-1.5 py-0.5 rounded font-medium">
                          {book.genre}
                        </span>
                      )}
                      
                      <span className="text-[11px] font-mono text-gray-400">|</span>
                      <span className="font-mono text-[11px] text-gray-400">{book.wordCount}</span>
                      
                      {!isAll && (
                        <>
                          <span className="text-[11px] font-mono text-gray-400">|</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            book.status === '连载中' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {book.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-gray-200 group-hover:border-gray-300"></div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredBooks.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-sm">没有找到匹配的作品</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
