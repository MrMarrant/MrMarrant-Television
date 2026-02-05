"use client";

import { SoulIcon } from '../constants';
import { Article } from '../types';

interface SelectedArticleProps {
    article: Article;
    onBack: () => void;
}

const SelectedArticle: React.FC<SelectedArticleProps> = ({ article, onBack }) => {
    return (
        <div className="w-full h-full bg-black text-white font-pixel overflow-y-auto p-6 flex flex-col items-center no-scrollbar">
            <div className="w-full max-w-2xl articles-border mb-8 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex justify-between items-start mb-6 border-b-4 border-white pb-4">
                    <div>
                        <p className="text-[10px] text-yellow-400 mb-2 uppercase tracking-widest">{article.tag}</p>
                        <h1 className="text-xl leading-relaxed">{article.title}</h1>
                    </div>
                </div>

                <div className="text-[14px] leading-[2] mb-8 space-y-6">
                    <p style={{ whiteSpace: "pre-line" }}>* {article.content}</p>
                </div>
            </div>

            <button
                onClick={onBack}
                className="group relative border-4 border-orange-500 hover:bg-orange-500/20 text-orange-500 px-8 py-3 transition-colors flex items-center gap-4"
            >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <SoulIcon />
                </div>
                <span className="text-lg">BACK</span>
            </button>
        </div>
    );
};

export default SelectedArticle;