/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  CircleDollarSign, 
  MessageSquare, 
  BookMarked,
  LineChart,
  Wallet,
  Coins,
  Smile,
  Megaphone,
  Flame,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    works: true,
    data: true,
    income: true,
    interact: true,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-150 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-100 font-sans">
          点
        </div>
        <div>
          <h1 className="font-semibold text-gray-800 text-sm tracking-tight">点众创作者平台</h1>
          <span className="text-xs text-gray-400 font-mono">Creator Platform v2.4</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin">
        <div className="px-4 py-1.5 mb-2 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
          收益管理
        </div>

        {/* 短篇收益 */}
        <div 
          onClick={() => onTabChange('story_income')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
            currentTab === 'story_income' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <CircleDollarSign className={`w-4 h-4 ${currentTab === 'story_income' ? 'text-blue-500' : 'text-gray-450'}`} />
          <span>短篇收益</span>
        </div>

        {/* 长篇收益 */}
        <div 
          onClick={() => onTabChange('long_form_income')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
            currentTab === 'long_form_income' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <BookOpen className={`w-4 h-4 ${currentTab === 'long_form_income' ? 'text-blue-500' : 'text-gray-450'}`} />
          <span>长篇收益</span>
        </div>
      </div>

      {/* User profile bottom bar */}
      <div className="border-t border-gray-100 p-4 bg-gray-50/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
            作
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700 truncate">点众签约作家：白茶清欢</p>
            <p className="text-[10px] text-gray-400 truncate">ID: 8872910302</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
