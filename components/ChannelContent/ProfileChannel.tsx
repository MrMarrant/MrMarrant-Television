import React from 'react';
import { Redacted } from '../../constants';

const ProfileChannel: React.FC = () => {
    return (
        <div className="w-full h-full bg-yellow-500 text-neutral-900 font-sans overflow-y-auto relative no-scrollbar">
            {/* Header Overlay */}
            <div className="sticky top-0 z-20 bg-yellow-100 border-b-2 border-red-600 px-6 py-3 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Profile</span>
                    <span className="text-neutral-500 text-xs font-mono">LIVE_FEED_894</span>
                </div>
                <div className="text-red-600 font-bold text-xs animate-pulse">● REC</div>
            </div>

            <div className="max-w-3xl mx-auto p-6 md:p-10 pb-20">
                {/* Main Subject Header */}
                <header className="mb-8 border-b border-neutral-300 pb-8">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-neutral-800">
                        Mr <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Marrant</span>
                    </h1>
                    <p className="font-mono text-sm text-neutral-500">FUNNY ARTIST /// HE SMILE</p>
                </header>

                {/* Content Layout */}
                <div className="flex flex-col gap-8">

                    {/* Lead Image */}
                    <div className="relative w-full aspect-video bg-neutral-800 overflow-hidden shadow-xl rounded-sm">
                        <img
                            src="https://i.imgur.com/3L5r6qc.gif"
                            alt="MrMarrant Portrait"
                            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-white text-xs font-mono">CAPTURE OF THE SUBJECT, LOCATE IN <Redacted>UNKNOWN</Redacted></p>
                        </div>
                    </div>

                    {/* Introduction Text */}
                    <div className="prose prose-neutral max-w-none">
                        <p className="text-lg font-serif leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-red-600">
                            Let me introduce myself — MrMarrant.
                            Welcome to this show, which will mainly be about... Me.

                            It might sound a bit self-centered, but I really want to share what I do and what I'm passionate about.
                            Alright, let’s talk about me then.<br></br>
                            I’m a young adult in good health, passionate about the art of video games.<br></br>

                            Even today, video games are often dismissed as just a way to kill time, or even outright looked down upon.<br></br>
                            And yet, a game can bring together nearly all existing art forms — from music, cinema, and writing, to even sculpture and painting.
                        </p>
                    </div>

                    {/* Illustrations Grid */}
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="bg-white p-2 shadow-md rotate-1 transition-transform hover:rotate-0 hover:z-10 hover:scale-105">
                            <img src="https://i.imgur.com/nmbbZQE.jpg" alt="Work 1" className="w-full h-32 object-cover mb-2 grayscale hover:grayscale-0 transition-all" />
                            <p className="text-[10px] font-mono leading-tight text-neutral-500">ENTITIES SUPPOSEDLY CREATED BY THE SUBJECT</p>
                        </div>
                        <div className="bg-white p-2 shadow-md -rotate-1 transition-transform hover:rotate-0 hover:z-10 hover:scale-105">
                            <img src="https://i.imgur.com/QkggENU.png" alt="Work 2" className="w-full h-32 object-cover mb-2 grayscale hover:grayscale-0 transition-all" />
                            <p className="text-[10px] font-mono leading-tight text-neutral-500">ENTITIES RELATED TO THE SUBJECT OBSERVED ON THE MOON</p>
                        </div>
                    </div>

                    {/* Detailed Text Sections */}
                    <div className="flex flex-col gap-6">
                        <section className="bg-white p-6 border-l-4 border-red-500 shadow-sm">
                            <h3 className="font-bold text-lg uppercase tracking-wide mb-3 flex items-center gap-2">
                                What were we talking about again?
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                                Ah yes, about me.
                                I started studying medicine, and as life can be quite strange sometimes, I ended up working on the Web by day and modding <a className="hover:text-orange-500" href="https://steamcommunity.com/sharedfiles/filedetails/?id=2956796515">clowns</a> by night.
                            </p>
                            <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                                Today, I’m a fullstack developer specialized in the web.
                                I’ve worked on quite a few different projects, whether for the army, an aquarium, or a French local department.</p>
                            <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                                Right now, I’m trying to develop games in my free time — you can find them on the projects page.</p>
                            <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                                I’m still new to this field and still exploring themes and looking for my own unique signature.
                                Feel free to check out my current posts on Itch.io.
                            </p>

                            <p className="text-lg leading-relaxed text-neutral-600 mb-4">
                                That’s all for now, thanks for tuning in — and don’t forget to laugh.
                            </p>
                        </section>

                        <section className="bg-neutral-800 text-neutral-200 p-6 shadow-lg rounded-sm">
                            <h3 className="font-bold text-lg uppercase tracking-wide mb-3 text-red-400">LEAVE, LEAVE, LEAVE THIS PLACE</h3>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed opacity-90 italic mb-4">
                                        DON'T YOU HEAR?
                                    </p>
                                    <p className="text-xs leading-relaxed opacity-70">
                                        HE LAUGHS, WITHOUT EVEN EXISTING, HE HEARS EVERYTHING, HE THINKS OF YOU, HE THINKS OF WHAT YOU'RE DOING!
                                    </p>
                                    <p className="text-xs leading-relaxed opacity-70 mb-4">
                                        THE MORE YOU THINK ABOUT IT, THE MORE HE THINKS ABOUT IT, LET HIM SLEEP, LET HIM GO TO HIS LITTLE DEATH.
                                    </p>
                                    <p className="text-sm leading-relaxed opacity-90 italic">
                                        I hope you laughed. Thank you for laughing with us
                                    </p>
                                </div>
                                <img src="https://i.imgur.com/exyICNB.png" alt="MrMarrant" className="w-20 h-20 rounded-full border-2 border-neutral-600" />
                            </div>
                        </section>
                    </div>

                    <div className="text-center mt-8 mb-4">
                        <span className="inline-block w-16 h-1 bg-red-600 mb-2"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileChannel;