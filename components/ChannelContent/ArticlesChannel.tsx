"use client";

import React, { useState } from 'react';
import { useSiteDatas } from '../../lib/useSiteData';
import SelectedArticle from '../SelectedArticle';
import { Article } from '../../types';
import { Loading, SoulIcon } from '../../constants';
import { Sword, Nfc, X, FlaskConical } from 'lucide-react';

const ArticlesChannel: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const { siteData, loading } = useSiteDatas();
    const articles = siteData?.articles ?? [];

    if (loading) return <Loading></Loading>;

    if (selectedArticle) {
        return <SelectedArticle article={selectedArticle} onBack={() => setSelectedArticle(null)} />
    }
    return (
        <div className="w-full h-full bg-black text-white font-pixel-sans overflow-hidden flex flex-col no-scrollbar">
            <div className="p-8 pb-4">
                <p className="text-lg leading-relaxed mb-8">* Choose a destination.</p>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-32 no-scrollbar">
                <div className="grid gap-8">
                    {articles.map((article) => (
                        <button
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            className="group text-left flex items-start gap-2 transition-all hover:translate-x-1"
                        >
                            <div className="mt-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                                <SoulIcon />
                            </div>
                            <div>
                                <h3 className="text-lg group-hover:text-yellow-400 transition-colors uppercase mb-2">
                                    {article.title}
                                </h3>
                                <div className="flex gap-4 text-[10px] text-neutral-500 font-mono">
                                    <span className="text-blue-400">[{article.tag}]</span>
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center z-10 bg-black md:px-8">
                <div className="flex text-orange-500 w-full justify-around uppercase text-xs md:text-xl md:gap-8">
                    <div className="flex items-center border-2 border-orange-500 px-1 p-1 hover:border-yellow-500 hover:text-yellow-500 scale-10 md:scale-150">
                        <Sword />
                        <span>FIGHT</span>
                    </div>
                    <div className="flex items-center border-2 border-yellow-500 text-yellow-500 px-1 p-1 scale-10 md:scale-150">
                        <Nfc color="#00000000" />
                        <span>ACT</span>
                    </div>
                    <div className="flex items-center border-2 border-orange-500 px-1 p-1 scale-10 md:scale-150">
                        <FlaskConical />
                        <span>ITEM</span>
                    </div>
                    <div className="flex items-center border-2 border-orange-500 px-1 p-1 scale-10 md:scale-150">
                        <X />
                        <span>MERCY</span>
                    </div>
                </div>
            </div>

            <style jsx>{
                ` @keyframes ticker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }`
            }</style>
        </div>
    );
};

export default ArticlesChannel;