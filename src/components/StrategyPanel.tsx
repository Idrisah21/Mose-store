/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { STRATEGY_SECTIONS } from "../data/strategy";
import { 
  FolderTree, 
  Layout, 
  ShoppingBag, 
  ShoppingCart, 
  CheckCircle, 
  Search, 
  BrainCircuit, 
  ShieldAlert, 
  MessageSquareText, 
  Mail, 
  Sparkles, 
  LineChart, 
  Cpu, 
  GitBranch, 
  Rocket,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  Sparkle
} from "lucide-react";

// Helper to match string icons to actual TSX components
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FolderTree,
  Layout,
  ShoppingBag,
  ShoppingCart,
  CheckCircle,
  Search,
  BrainCircuit,
  ShieldAlert,
  MessageSquareText,
  Mail,
  Sparkles,
  LineChart,
  Cpu,
  GitBranch,
  Rocket
};

export default function StrategyPanel() {
  const [activeSectionId, setActiveSectionId] = useState(STRATEGY_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSections = STRATEGY_SECTIONS.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.details.some(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeSection = STRATEGY_SECTIONS.find(s => s.id === activeSectionId) || STRATEGY_SECTIONS[0];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl" id="strategy-panel">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950/70 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-amber-500/15 text-amber-500 border border-amber-500/20 rounded">
              Elite Blueprint v1.0
            </span>
            <span className="text-xs text-neutral-400">• Tanzania & East Africa First</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            15-Part E-Commerce CRO & Strategy Blueprint
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Engineered by a team of UX Architects, SEO Specialists, and Fashion Retail CRO Experts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search strategy & templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-550 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
          />
          <Search className="absolute left-3.5 top-2.5 text-neutral-500 w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-80 border-r border-neutral-800 bg-neutral-950/30 p-4 shrink-0 max-h-[800px] overflow-y-auto">
          <p className="text-xs font-mono tracking-wider text-neutral-500 uppercase px-3 mb-3">Strategic Anchors</p>
          <div className="space-y-1">
            {filteredSections.map((section) => {
              const IconComp = iconMap[section.icon] || FolderTree;
              const isActive = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border-l-2 border-amber-500 font-medium pl-4"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50 border-l-2 border-transparent"
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-neutral-500"}`} />
                  <span className="text-xs font-sans tracking-wide leading-tight truncate">{section.title}</span>
                </button>
              );
            })}
            {filteredSections.length === 0 && (
              <p className="text-neutral-500 text-xs px-3 py-4">No matching strategies found.</p>
            )}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 max-h-[800px] overflow-y-auto bg-neutral-900">
          <div className="max-w-4xl">
            {/* Header / Intro */}
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                {(() => {
                  const ActiveIcon = iconMap[activeSection.icon] || FolderTree;
                  return <ActiveIcon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{activeSection.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-semibold text-amber-500 uppercase font-mono tracking-wider">Goal:</span>
                  <span className="text-xs text-neutral-300 italic">{activeSection.goal}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Strategic Overview</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">{activeSection.overview}</p>
            </div>

            {/* Subsections */}
            <div className="space-y-8">
              {activeSection.details.map((detail, index) => (
                <div key={index} className="border-t border-neutral-800/60 pt-6 first:border-0 first:pt-0">
                  <h4 className="text-md font-semibold text-white tracking-tight flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {detail.title}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{detail.description}</p>

                  {/* Render Bullet Points */}
                  {detail.bullets && (
                    <ul className="space-y-3 pl-2">
                      {detail.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                          <span className="text-amber-500 text-md inline-block select-none mt-0.5">•</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Render Table (e.g. SEO, Analytics events) */}
                  {detail.table && (
                    <div className="overflow-x-auto border border-neutral-800 rounded-xl mt-4 bg-neutral-950/40">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 font-mono tracking-wider uppercase">
                            {detail.table.headers.map((h, i) => (
                              <th key={i} className="py-3 px-4 font-normal">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                          {detail.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-neutral-900/40">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-3 px-4 leading-normal font-sans">
                                  {cell.startsWith("🟢") || cell.startsWith("🔴") ? (
                                    <span className="font-mono">{cell}</span>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Render Code Block (e.g., Schema recommendations, response scripts) */}
                  {detail.codeBlock && (
                    <div className="relative mt-4 group">
                      <div className="absolute right-3 top-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyText(detail.codeBlock || "", `${activeSection.id}-${index}`)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-neutral-400 hover:text-white transition-colors"
                          title="Copy script"
                        >
                          {copiedId === `${activeSection.id}-${index}` ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <pre className="p-4 bg-neutral-950 rounded-lg border border-neutral-800/80 text-xs text-amber-500/90 font-mono overflow-x-auto leading-relaxed max-h-[300px]">
                        {detail.codeBlock}
                      </pre>
                    </div>
                  )}

                  {/* Custom Action Trigger for localized script displays */}
                  {detail.title.includes("Script") && (
                    <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-between text-xs font-mono">
                      <span>✓ Copyable template is optimized for Tanzanian consumer slang (Habari, Shikamoo)</span>
                      <button 
                        onClick={() => handleCopyText(detail.bullets?.join("\n") || detail.description, `${activeSection.id}-badge`)}
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === `${activeSection.id}-badge` ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy All Bullets</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Section Quick-links helper */}
            <div className="mt-12 pt-8 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                <Sparkle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Interactive CRO Board</span>
              </div>
              <button 
                onClick={() => {
                  const curIdx = STRATEGY_SECTIONS.findIndex(s => s.id === activeSectionId);
                  const nextSection = STRATEGY_SECTIONS[(curIdx + 1) * (curIdx < STRATEGY_SECTIONS.length - 1 ? 1 : 0)];
                  setActiveSectionId(nextSection.id);
                  document.getElementById("strategy-panel")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <span>Read Next Section</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
