import { useState } from 'react';
import { TopNavigationBar } from './components/TopNavigationBar';
import { BottomTabBar } from './components/BottomTabBar';
import { CommunityFeed } from './components/CommunityFeed';
import { SilentPresence } from './components/SilentPresence';
import { VentVault } from './components/VentVault';
import { KindnessExchange } from './components/KindnessExchange';
import { FlutterCompanion } from './components/FlutterCompanion';
import { GroundingModal } from './components/GroundingModal';
import { NewPostModal } from './components/NewPostModal';
import { INITIAL_POSTS } from './data/initialData';
import { CommunityPost, EmotionalBandwidth, PostIntent } from './types';
import { Smartphone, Monitor, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [bandwidth, setBandwidth] = useState<EmotionalBandwidth>('balanced');
  const [isGroundingOpen, setIsGroundingOpen] = useState<boolean>(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile-frame'>('responsive');

  // Handle post reaction
  const handleReact = (postId: string, reactionType: 'holdingSpace' | 'gentleHug' | 'iHearYou' | 'inspired') => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          reactions: {
            ...p.reactions,
            [reactionType]: p.reactions[reactionType] + 1,
          },
        };
      })
    );
  };

  // Handle adding comment
  const handleAddComment = (postId: string, commentText: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const newComment = {
          id: 'c-' + Date.now(),
          author: {
            id: 'usr-self',
            pseudonym: 'KindPresence',
            auraGradient: 'from-emerald-400 to-teal-500',
            auraLabel: 'Sage Aura',
            avatarIcon: 'heart',
          },
          content: commentText,
          createdAt: 'Just now',
          intentBadge: 'Gentle Reflection' as const,
        };
        return {
          ...p,
          comments: [...p.comments, newComment],
        };
      })
    );
  };

  // Handle adding new post
  const handleAddNewPost = (postData: {
    title: string;
    content: string;
    intent: PostIntent;
    isSensitive: boolean;
    sensitiveNotice?: string;
  }) => {
    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      author: {
        id: 'usr-self',
        pseudonym: 'HavenWanderer',
        auraGradient: 'from-emerald-500 to-teal-600',
        auraLabel: 'Deep Emerald',
        avatarIcon: 'leaf',
      },
      title: postData.title || undefined,
      content: postData.content,
      intent: postData.intent,
      createdAt: new Date().toISOString(),
      timeAgo: 'Just now',
      isSensitive: postData.isSensitive,
      sensitiveNotice: postData.sensitiveNotice,
      reactions: {
        holdingSpace: 1,
        gentleHug: 0,
        iHearYou: 0,
        inspired: 0,
      },
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setActiveTab('feed');
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'presence':
        return <SilentPresence />;
      case 'vault':
        return (
          <VentVault
            onPublishToFeed={(data) => {
              handleAddNewPost(data);
            }}
          />
        );
      case 'pebbles':
        return <KindnessExchange />;
      case 'flutter':
        return <FlutterCompanion />;
      case 'feed':
      default:
        return (
          <CommunityFeed
            posts={posts}
            bandwidth={bandwidth}
            setBandwidth={setBandwidth}
            onReact={handleReact}
            onAddComment={handleAddComment}
            onOpenNewPostModal={() => setIsNewPostOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Navigation Bar: Strict 3-zone contract */}
      <TopNavigationBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGrounding={() => setIsGroundingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
        {/* Editorial Sub-bar & Viewport Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">Haven Mind</span>
            <span aria-hidden="true">·</span>
            <span>A Safe & Kind Community</span>
            <span aria-hidden="true">·</span>
            <span>Zero Judgment</span>
          </div>

          {/* Viewport Frame Switcher */}
          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl self-start sm:self-auto border border-stone-200/80">
            <span className="text-[11px] text-stone-500 px-1.5 font-medium">View Mode:</span>
            <button
              onClick={() => setViewMode('responsive')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                viewMode === 'responsive'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
            <button
              onClick={() => setViewMode('mobile-frame')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                viewMode === 'mobile-frame'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone Frame</span>
            </button>
          </div>
        </div>

        {/* Quick Start Guide for New Users */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">
              👋 What would you like to do right now?
            </span>
            <button
              onClick={() => setActiveTab('flutter')}
              className="text-xs text-emerald-800 hover:underline font-semibold"
            >
              Read Plain-English Guide →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => setActiveTab('presence')}
              className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                activeTab === 'presence'
                  ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/20'
                  : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200'
              }`}
            >
              <div className="font-bold text-stone-900">🌬️ Breathe</div>
              <div className="text-[11px] text-stone-500">Calm down silently with others</div>
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                activeTab === 'vault'
                  ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500/20'
                  : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200'
              }`}
            >
              <div className="font-bold text-stone-900">📝 Private Vent</div>
              <div className="text-[11px] text-stone-500">Burn worries or get kind advice</div>
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                activeTab === 'feed'
                  ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500/20'
                  : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200'
              }`}
            >
              <div className="font-bold text-stone-900">💬 Stories</div>
              <div className="text-[11px] text-stone-500">Read & share honest struggles</div>
            </button>
            <button
              onClick={() => setActiveTab('pebbles')}
              className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                activeTab === 'pebbles'
                  ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500/20'
                  : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200'
              }`}
            >
              <div className="font-bold text-stone-900">💌 Kindness</div>
              <div className="text-[11px] text-stone-500">Send or get warm reminders</div>
            </button>
          </div>
        </div>

        {/* Hero Banner Strip (Ambient Forest) */}
        {activeTab === 'feed' && (
          <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs aspect-[21/9] sm:aspect-[28/9] max-h-48 sm:max-h-56">
            <img
              src="/src/assets/images/wellness_ambient_forest_1792301072633.jpg"
              alt="Misty dawn forest sanctuary"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent flex flex-col justify-center p-6 sm:p-8 text-white space-y-2">
              <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Safe Psychological Sanctuary
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white max-w-lg">
                Mental wellness support without judgment or forced positivity.
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md hidden sm:block">
                Choose your emotional bandwidth, breathe silently with peers in real-time, or untangle heavy thoughts in the private Vent Vault.
              </p>
            </div>
          </div>
        )}

        {/* Viewport Frame Renderer */}
        {viewMode === 'mobile-frame' ? (
          <div className="flex justify-center py-4">
            <div className="w-full max-w-[420px] rounded-[44px] bg-stone-900 p-3 shadow-2xl border-4 border-stone-800 ring-1 ring-stone-950">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-stone-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-8 h-1 bg-stone-800 rounded-full"></div>
              </div>
              {/* Inner Phone Screen */}
              <div className="bg-stone-50 rounded-[34px] overflow-hidden min-h-[640px] max-h-[760px] overflow-y-auto p-4 space-y-4">
                {renderActiveTabContent()}
              </div>
            </div>
          </div>
        ) : (
          renderActiveTabContent()
        )}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Grounding & Emergency Modal */}
      <GroundingModal
        isOpen={isGroundingOpen}
        onClose={() => setIsGroundingOpen(false)}
      />

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmit={handleAddNewPost}
      />
    </div>
  );
}
