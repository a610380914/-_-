/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Sidebar from './components/Sidebar';
import BookSelectorModal from './components/BookSelectorModal';
import MonthPicker from './components/MonthPicker';
import IncomeSummary from './components/IncomeSummary';
import RoyaltyDetails from './components/RoyaltyDetails';
import RulesExplain from './components/RulesExplain';
import { STORY_BOOKS, LONG_BOOKS } from './data';
import { 
  Bell, 
  HelpCircle, 
  ExternalLink, 
  BookMarked, 
  BadgeHelp, 
  Volume2, 
  DollarSign, 
  Wallet, 
  Sparkles, 
  Layers, 
  Share2,
  BookmarkCheck,
  Award,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = React.useState('story_income');
  
  // Independent selection states for short-form
  const [selectedBookIdShort, setSelectedBookIdShort] = React.useState('all');
  const [startMonthShort, setStartMonthShort] = React.useState('');
  const [endMonthShort, setEndMonthShort] = React.useState('');

  // Independent selection states for long-form
  const [selectedBookIdLong, setSelectedBookIdLong] = React.useState('all');
  const [startMonthLong, setStartMonthLong] = React.useState('');
  const [endMonthLong, setEndMonthLong] = React.useState('');

  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);
  const [showWithdrawTip, setShowWithdrawTip] = React.useState(false);

  // Dynamically map active state depending on tab
  const isShortForm = currentTab === 'story_income';
  const booksList = isShortForm ? STORY_BOOKS : LONG_BOOKS;
  
  const selectedBookId = isShortForm 
    ? selectedBookIdShort 
    : selectedBookIdLong;
      
  const setSelectedBookId = isShortForm 
    ? setSelectedBookIdShort 
    : setSelectedBookIdLong;
      
  const startMonth = isShortForm 
    ? startMonthShort 
    : startMonthLong;
      
  const setStartMonth = isShortForm 
    ? setStartMonthShort 
    : setStartMonthLong;
      
  const endMonth = isShortForm 
    ? endMonthShort 
    : endMonthLong;
      
  const setEndMonth = isShortForm 
    ? setEndMonthShort 
    : setEndMonthLong;

  // Retrieve selected book details
  const activeBook = booksList.find(b => b.id === selectedBookId) || booksList[0];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-gray-800 font-sans antialiased">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        {/* Top Floating App Navbar */}
        <header className="sticky top-0 bg-white border-b border-gray-150 h-16 flex items-center justify-between px-8 z-20 shrink-0">
          {/* Breadcrumb Info label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-mono">
              {currentTab === 'story_income' ? '点众短故事' : '点众长故事'}
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-gray-700">收益分析</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold text-gray-900">
              {currentTab === 'story_income' ? '短篇收益' : '长篇收益'}
            </span>
          </div>

          {/* Quick Stats Summary Banner / Notifications */}
          <div className="flex items-center gap-6">
            {/* Notification ticker */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold truncate max-w-[280px]">
                公告: 04月对账单已公式，疑问反馈于3日内处理
              </span>
            </div>

            {/* Help / Docs item linking */}
            <a 
              href="#rules" 
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-medium transition-colors"
            >
              <BadgeHelp className="w-4 h-4 text-gray-400" />
              <span>稿费规则中心</span>
            </a>

            <div className="h-4 w-px bg-gray-200"></div>

            {/* Profile trigger */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                CG
              </div>
              <span className="text-xs font-semibold text-gray-700">白茶清欢</span>
            </div>
          </div>
        </header>

        {/* Outer scrollable scroll container */}
        <div className="flex-1 p-8 space-y-6 max-w-7xl w-full mx-auto pb-12">
          
          {/* TAB ROUTER PLACEHOLDER */}
          {currentTab !== 'story_income' && currentTab !== 'long_form_income' ? (
            <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center max-w-xl mx-auto my-12 shadow-sm animate-fade-in">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">模块演示提示</h3>
              <p className="text-gray-500 text-sm mt-2.5 leading-relaxed">
                当前其他侧边栏页面正在开发中。本系统主要用来演示精细设计的
                <span className="font-bold text-blue-600">「短篇收益」</span>与<span className="font-bold text-blue-600">「长篇收益」</span>。
              </p>
              <button 
                onClick={() => setCurrentTab('story_income')}
                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-blue-100 cursor-pointer"
              >
                立即查看：短篇收益分析 →
              </button>
            </div>
          ) : (
            <>
              {/* PAGE COMPONENT: REVENUE (短篇/长篇收益) */}
              
              {/* Title area */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight font-sans">
                  {currentTab === 'story_income' ? '短篇收益' : '长篇收益'}
                </h2>
              </div>

              {/* Box 1: Book Switcher Panel */}
              <div className="bg-white rounded-2xl border border-gray-150 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-xs">
                <div className="flex items-center gap-4 min-w-0">
                  {/* Book cover graphic */}
                  {selectedBookId === 'all' ? (
                    <div className="w-12 h-16 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-500 to-blue-600 flex items-center justify-center p-2 text-white shrink-0 shadow-md shadow-blue-100 relative overflow-hidden select-none">
                      <Layers className="w-6 h-6 text-white stroke-[2.5]" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/10 rounded-full"></div>
                    </div>
                  ) : (
                    <div className={`w-12 h-16 rounded-xl bg-gradient-to-br ${activeBook.coverGradient} flex flex-col justify-between p-2 shrink-0 text-left relative overflow-hidden shadow-md select-none`}>
                      <div className="text-[7px] text-white/80 font-mono tracking-wide font-bold uppercase">{activeBook.genre}</div>
                      <div className="text-[10px] font-extrabold leading-tight text-white line-clamp-2">{activeBook.title.slice(0, 4)}</div>
                      <div className="absolute top-0 right-0 w-3 h-full bg-white/10 -skew-x-12 transform origin-top-right"></div>
                    </div>
                  )}

                  {/* Book info labels */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-extrabold text-base text-gray-900 tracking-tight truncate">
                        {activeBook.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="font-mono text-[11px] text-gray-550">{activeBook.wordCount}</span>
                      {selectedBookId !== 'all' && (
                        <>
                          <span className="text-gray-300 font-mono">|</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            activeBook.status === '连载中' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {activeBook.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Button: launch switch modal */}
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 active:bg-gray-200/50 text-gray-700 hover:text-gray-950 font-semibold text-xs rounded-xl cursor-pointer transition-all shrink-0 font-sans shadow-2xs active-scale"
                >
                  <span className="tracking-wide">切换作品</span>
                  <span className="font-mono text-gray-400">⇌</span>
                </button>
              </div>

              {/* Box 2: Month Picker Row & Metrics cards */}
              <div className="space-y-4">
                {/* Month control row */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 relative z-30">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-bold text-gray-800">稿费账期</span>
                    <MonthPicker 
                      startMonth={startMonth} 
                      endMonth={endMonth} 
                      onChange={(start, end) => {
                        setStartMonth(start);
                        setEndMonth(end);
                      }} 
                    />
                  </div>
                </div>

                {/* Toast alerts for withdrawal simulator */}
                {showWithdrawTip && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-4 py-3 rounded-xl flex items-center justify-between animate-slide-down">
                    <div className="flex items-center gap-2">
                      <span className="p-0.5 px-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">INFO</span>
                      <span>依据点众签约协议：期内结算出的稿费将于 <strong>25号发放日</strong> 统一汇入作者签署的银行卡中，无需手动提交审核打款。</span>
                    </div>
                    <button 
                      onClick={() => setShowWithdrawTip(false)}
                      className="text-blue-500 hover:text-blue-700 text-[10px] font-bold ml-4 uppercase"
                    >
                      明白
                    </button>
                  </div>
                )}

                {/* Summary metrics cards */}
                <IncomeSummary 
                  selectedBookId={selectedBookId}
                  selectedBookTitle={activeBook.title}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  isShort={currentTab !== 'long_form_income'}
                />
              </div>

              {/* Box 3: Royalty Details list table */}
              <RoyaltyDetails 
                selectedBookId={selectedBookId}
                startMonth={startMonth}
                endMonth={endMonth}
                isShort={currentTab !== 'long_form_income'}
              />

              {/* Box 4: Rule explanatory center */}
              <div id="rules">
                <RulesExplain isShort={currentTab !== 'long_form_income'} selectedBookId={selectedBookId} />
              </div>
            </>
          )}
        </div>

        {/* Floating book selection modal */}
        <BookSelectorModal 
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
          selectedBookId={selectedBookId}
          onSelectBook={setSelectedBookId}
          books={booksList}
        />
      </main>
    </div>
  );
}
