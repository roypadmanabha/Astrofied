import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Moon } from 'lucide-react';

const moonSigns = [
    {
        name: 'Aries',
        sanskrit: 'Mesh',
        icon: '♈',
        desc: "Aries Moon sign individuals are pioneers by nature, possessing an innate courage and a fiery spirit that thrives on action. You are often the first to take initiative, fueled by an impulsive yet infectious energy that inspires those around you. Your mind works at a high velocity, constantly seeking new horizons and mental stimulation. In emotions, you are direct and honest, expressing your feelings with a raw intensity that leaves little room for ambiguity. While your independence is your strength, you may find that your path to true wisdom lies in learning the art of patience and the power of strategic stillness. Your competitive drive ensures that you rarely settle for second best, but your truest victories come when you align your fiery ambition with a deeper sense of purpose and compassion.",
        color: 'from-orange-500/20 to-red-500/20'
    },
    {
        name: 'Taurus',
        sanskrit: 'Vrishabha',
        icon: '♉',
        desc: "With the Moon in Taurus, you possess an inherent need for stability and a deep connection to the material world. You are the embodiment of patience and loyalty, seeking comfort and security in your emotional foundations. Your sensory world is rich, and you find peace in the beauty of nature and the steady rhythm of life. Once you set a goal, your determination is unshakable, moving toward success with a grace that others admire. You have a profound appreciation for the fine things in life, yet you remain remarkably grounded. Your challenge is to embrace change with the same steadiness you apply to your routines. Your loyalty makes you a pillar of strength for your loved ones, a calm port in any storm, providing a sense of enduring peace to all you encounter.",
        color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        name: 'Gemini',
        sanskrit: 'Mithuna',
        icon: '♊',
        desc: "Gemini Moon individuals are blessed with a lightning-fast intellect and a curiosity that knows no bounds. You process emotions through the lens of communication, finding clarity by sharing your thoughts and exploring diverse perspectives. Your versatility allows you to adapt to any situation with remarkable ease, often juggling multiple interests with infectious enthusiasm. You possess a dual nature that makes you both a great listener and a brilliant conversationalist. Your world is one of movement and ideas, where every interaction is an opportunity to learn something new. While your mind is a whirlwind of activity, your growth comes from finding the stillness within your own thoughts. Your natural charm and witty spirit make you a delightful companion, always ready to bridge gaps with your words.",
        color: 'from-blue-400/20 to-indigo-500/20'
    },
    {
        name: 'Cancer',
        sanskrit: 'Karka',
        icon: '♋',
        desc: "The Moon finds its home in Cancer, making you deeply intuitive and profoundly connected to the emotional tides of life. You are a natural nurturer, possessing a heart that is wide enough to hold the world's sorrows and joys. Your home is your sanctuary, and you have an uncanny ability to sense the needs of others even before they are spoken. Your memory is long and your loyalty runs deep, often finding strength in the traditions and roots that ground you. You experience life with a vivid emotional intensity, where every feeling is a guide to your truest self. Your journey is one of learning to protect your sensitive heart while remaining open to the transformative power of love. By trusting your powerful intuition, you navigate the complexities of life with a wisdom that is as ancient as the tides.",
        color: 'from-sky-300/20 to-blue-400/20'
    },
    {
        name: 'Leo',
        sanskrit: 'Simha',
        icon: '♌',
        desc: "With a Leo Moon, your emotions are radiant, generous, and expressed with a dramatic flair that commands attention. You possess a royal heart that thrives on warmth, creative expression, and the joy of being appreciated by those you love. Your natural leadership is guided by a fierce loyalty and a desire to see everyone in your circle succeed and shine. You have a brilliant creative energy that can turn even the simplest moment into a grand celebration. Your pride is your shield, but your vulnerability is your most powerful connection to others when you share it honestly. Your path to fulfillment involves balancing your need for external recognition with the quiet validation of your own worthy soul. You are a source of sunshine and strength, inspiring others to find their own inner fire through your magnanimous example.",
        color: 'from-amber-400/20 to-orange-500/20'
    },
    {
        name: 'Virgo',
        sanskrit: 'Kanya',
        icon: '♍',
        desc: "Virgo Moon individuals find emotional security in order, service, and the meticulous refinement of their inner and outer worlds. You possess a brilliant, analytical mind that seeks to understand the details and improve the lives of those around you. Your kindness is practical, often showing love through acts of service and helpful suggestions that bring clarity to chaos. You seek purity in all things, from your thoughts to your environment, and your attention to detail is your greatest gift. While you can be your own harshest critic, your journey is toward self-acceptance and the realization that perfection is found in the effort itself. You have a quiet, steady strength that ensures everything you touch is left better than you found it. Your wisdom lies in seeing the sacred in the mundane and the beauty in the small details of daily life.",
        color: 'from-lime-500/20 to-green-600/20'
    },
    {
        name: 'Libra',
        sanskrit: 'Tula',
        icon: '♎',
        desc: "Libra Moon sign individuals are driven by a profound need for harmony, balance, and the beauty of human connection. You possess a diplomatic spirit and an innate sense of justice that allows you to see all sides of every situation. Your emotional well-being is tied to the health of your relationships, and you thrive in environments that are aesthetically pleasing and peaceful. You are a natural peacemaker, using your charm and social grace to bridge divides and create unity. Your appreciation for art, music, and the refined things in life is a reflection of your own inner elegance. Your growth comes from learning that true balance sometimes requires taking a firm stand for your own needs. By seeking peace within yourself first, you become a beacon of light and fairness, helping others navigate the complexities of life with your balanced perspective.",
        color: 'from-rose-400/20 to-pink-500/20'
    },
    {
        name: 'Scorpio',
        sanskrit: 'Vrishchika',
        icon: '♏',
        desc: "With a Scorpio Moon, your emotional world is one of profound depth, intensity, and transformative power. You possess a piercing intuition that looks beneath the surface of things, seeking the absolute truth in every situation. Your loyalty is legendary, and once you commit to a person or a cause, your devotion is absolute and unchanging. You experience emotions with an intensity that can lead to great heights and deep insights, often acting as a catalyst for change in your own life and the lives of others. You are private and protective of your inner world, sharing its riches only with those you trust completely. Your path is one of alchemy—learning to transform your shadow into light through the process of emotional release and rebirth. Your strength is your resilience, rising from every challenge with a wiser and more powerful soul.",
        color: 'from-red-600/20 to-purple-800/20'
    },
    {
        name: 'Sagittarius',
        sanskrit: 'Dhanu',
        icon: '♐',
        desc: "Sagittarius Moon individuals are eternal students of life, driven by a restless spirit and an unquenchable thirst for wisdom and adventure. You find emotional freedom in the exploration of new ideas, cultures, and the vast horizons of the mind. Your optimism is your greatest shield, allowing you to see the blessing in every challenge and the opportunity in every detour. You value truth above all else, often speaking your mind with a candid honesty that is both refreshing and bold. Your emotional world is expansive, thriving on movement and the excitement of the unknown. Your challenge is to find the meaning in the destination as much as the journey itself. By grounding your philosophical insights in practical reality, you become an inspiring guide for others, showing the world that with enough faith, every horizon is within reach.",
        color: 'from-violet-500/20 to-purple-600/20'
    },
    {
        name: 'Capricorn',
        sanskrit: 'Makara',
        icon: '♑',
        desc: "With a Capricorn Moon, your emotions are grounded in responsibility, ambition, and a deep respect for tradition and structure. You seek to build an emotional life that is as solid and enduring as a mountain, valuing discipline and long-term security. You are the master of your own destiny, possessing a stoic strength that allows you to endure any difficulty to reach your lofty goals. Your love is demonstrated through your commitment and the tangible support you provide to your family and community. You find peace in order and the satisfaction of a job well done, often acting as the reliable anchor for those around you. Your growth lies in learning to value your emotional needs as much as your achievements. By allowing yourself to be vulnerable, you find a deeper kind of strength that is as profound as your worldly success.",
        color: 'from-slate-600/20 to-gray-800/20'
    },
    {
        name: 'Aquarius',
        sanskrit: 'Kumbha',
        icon: '♒',
        desc: "Aquarius Moon sign individuals possess a visionary mind and a heart that beats for the collective good of humanity. You are uniquely original, often viewing emotions through a lens of objectivity and detachment that allows you to see the bigger picture. Your independence is non-negotiable, and you thrive when given the freedom to explore unconventional ideas and futuristic possibilities. You are a natural rebel with a cause, seeking to break tradition only to build a fairer and more progressive world. Your friendships are your chosen family, and you find deep fulfillment in the synergy of like-minded souls. Your path is toward reconciling your desire for universal connection with the intimacy of personal emotion. By bringing your high ideals into your private life, you become a revolutionary of the heart, inspiring others to live their truest and most authentic lives.",
        color: 'from-cyan-400/20 to-blue-500/20'
    },
    {
        name: 'Pisces',
        sanskrit: 'Meena',
        icon: '♓',
        desc: "The Moon in Pisces bestows an emotional nature that is as vast and deep as the ocean, filled with compassion, artistry, and a divine wisdom. You are a bridge between worlds, possessing a sensitivity that allows you to feel the unspoken vibrations of the universe. Your imagination is your sanctuary, and you find comfort in the creative arts, spiritual exploration, and the quiet depths of your own vivid dreams. You are profoundly empathetic, often absorbing the emotions of those around you with a selfless kindness that is truly rare. Your journey is one of learning to set boundaries for your sensitive heart while remaining a channel for the universal flow of love. By trusting your vivid dreams and powerful intuition, you navigate the physical world with a soul that is forever anchored in the eternal, inspiring others with your mystical grace.",
        color: 'from-purple-400/20 to-pink-400/20'
    }
];

export default function MoonSigns() {
    const { isDarkMode } = useTheme();

    return (
        <section id="moonsigns" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-[#FDFDFD]'}`}>
            {/* Background decorative elements */}
            <div className={`absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-purple-200'}`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 blur-[120px] opacity-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-yellow-100'}`} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 glass ${
                            isDarkMode ? 'border-gold/20 text-gold shadow-gold/10' : 'border-[#4B0082]/20 text-[#4B0082] shadow-[#4B0082]/10'
                        }`}
                    >
                        <Moon size={16} />
                        <span className="text-xs font-bold tracking-widest uppercase italic">Lunar Wisdom</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6"
                        style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}
                    >
                        Know Your <span style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>Moonsign</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`max-w-2xl mx-auto text-lg md:text-xl opacity-80 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                        Your Moon sign reveals the depths of your emotional landscape and the truest needs of your soul. Discover the celestial map of your inner world.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {moonSigns.map((sign, index) => (
                        <motion.div
                            key={sign.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`group relative rounded-[2.5rem] p-1 border transition-all duration-500 hover:scale-[1.02] ${
                                isDarkMode ? 'border-white/5 hover:border-gold/30' : 'border-black/5 hover:border-[#4B0082]/30'
                            }`}
                        >
                            <div className={`h-full relative rounded-[2.4rem] p-8 md:p-10 overflow-hidden glass backdrop-blur-3xl ${
                                isDarkMode ? 'bg-[#0F0221]/40' : 'bg-white/80'
                            }`}>
                                {/* Gradient Background Mask */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-br ${sign.color}`} />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex flex-col">
                                            <h3 className="text-3xl font-bold font-raleway tracking-tight" style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}>
                                                {sign.name}
                                            </h3>
                                            <span className="text-sm font-medium tracking-widest uppercase opacity-60 italic" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                                                {sign.sanskrit}
                                            </span>
                                        </div>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 ${
                                            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-[#4B0082]/5 border border-[#4B0082]/10'
                                        }`}>
                                            {sign.icon}
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <Sparkles className={`absolute -top-4 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse ${
                                            isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                                        }`} />
                                        <p className={`text-base leading-relaxed text-justify md:text-[0.95rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500 font-mulish ${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {sign.desc}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        <span className={`text-xs font-bold tracking-widest uppercase ${
                                            isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                                        }`}>Moonsign Profile</span>
                                        <div className={`w-8 h-px ${isDarkMode ? 'bg-gold/30' : 'bg-[#4B0082]/30'}`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
