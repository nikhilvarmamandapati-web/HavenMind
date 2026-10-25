import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/wellness_models.dart';

final emotionalBandwidthProvider = StateProvider<EmotionalBandwidth>((ref) {
  return EmotionalBandwidth.balanced;
});

class CommunityPostsNotifier extends StateNotifier<List<CommunityPost>> {
  CommunityPostsNotifier()
      : super([
          CommunityPost(
            id: '1',
            authorName: 'WillowBreeze',
            title: 'Made it through a work panic attack without fleeing',
            content:
                'My heart started racing during a meeting. In the past I would have run out. Today I put my feet flat on the floor and breathed slowly. I stayed. It was shaky, but I stayed.',
            intent: PostIntent.smallWin,
            timeAgo: '45 mins ago',
            holdingSpaceCount: 28,
            gentleHugCount: 44,
            iHearYouCount: 19,
            comments: [
              'Staying in the room is a huge victory. Proud of you!',
              'I needed this reminder today. Thank you.',
            ],
          ),
          CommunityPost(
            id: '2',
            authorName: 'QuietRiver',
            title: 'Exhausted from pretending to be okay all week',
            content:
                'I have spent 40 hours smiling and pretending everything is fine. My battery is at 1%. Please no tips or advice, I just need to be heard and know it makes sense to be tired.',
            intent: PostIntent.noAdvicePlease,
            timeAgo: '2 hours ago',
            holdingSpaceCount: 65,
            gentleHugCount: 92,
            iHearYouCount: 81,
            comments: [
              'It makes complete sense that you are bone-tired. Rest without guilt.',
            ],
          ),
          CommunityPost(
            id: '3',
            authorName: 'AmberFern',
            title: 'Two-year grief anniversary today',
            content:
                'Lost my brother two years ago today. Everyone thinks I should be "over it". How do you ground yourself on heavy grief anniversaries?',
            intent: PostIntent.adviceWelcome,
            timeAgo: '5 hours ago',
            isSensitive: true,
            sensitiveNotice: 'Mentions bereavement and heavy grief anniversary',
            holdingSpaceCount: 112,
            gentleHugCount: 88,
            iHearYouCount: 54,
            comments: [
              'Grief does not shrink, our lives grow around it. Splash cold water on your face whenever it feels too heavy.',
            ],
          ),
        ]);

  void react(String postId, String reactionType) {
    state = [
      for (final post in state)
        if (post.id == postId)
          CommunityPost(
            id: post.id,
            authorName: post.authorName,
            title: post.title,
            content: post.content,
            intent: post.intent,
            timeAgo: post.timeAgo,
            isSensitive: post.isSensitive,
            sensitiveNotice: post.sensitiveNotice,
            holdingSpaceCount: reactionType == 'holdingSpace'
                ? post.holdingSpaceCount + 1
                : post.holdingSpaceCount,
            gentleHugCount: reactionType == 'gentleHug'
                ? post.gentleHugCount + 1
                : post.gentleHugCount,
            iHearYouCount: reactionType == 'iHearYou'
                ? post.iHearYouCount + 1
                : post.iHearYouCount,
            comments: post.comments,
          )
        else
          post
    ];
  }

  void addPost(CommunityPost post) {
    state = [post, ...state];
  }

  void addComment(String postId, String comment) {
    state = [
      for (final post in state)
        if (post.id == postId)
          CommunityPost(
            id: post.id,
            authorName: post.authorName,
            title: post.title,
            content: post.content,
            intent: post.intent,
            timeAgo: post.timeAgo,
            isSensitive: post.isSensitive,
            sensitiveNotice: post.sensitiveNotice,
            holdingSpaceCount: post.holdingSpaceCount,
            gentleHugCount: post.gentleHugCount,
            iHearYouCount: post.iHearYouCount,
            comments: [...post.comments, comment],
          )
        else
          post
    ];
  }
}

final communityPostsProvider =
    StateNotifierProvider<CommunityPostsNotifier, List<CommunityPost>>((ref) {
  return CommunityPostsNotifier();
});

final kindnessBeaconsProvider = StateProvider<List<KindnessBeacon>>((ref) {
  return [
    KindnessBeacon(
      id: 'b1',
      requesterName: 'CloverLeaf',
      prompt: 'Severe anxiety about an interview tomorrow morning at 9:00 AM.',
      neededEnergy: 'Courage & Confidence',
      notes: [
        'They already invited you because you are capable. Breathe deep into your belly!',
        'Your worth is intact no matter what. Cheering for you!',
      ],
      timeAgo: '20 mins ago',
    ),
    KindnessBeacon(
      id: 'b2',
      requesterName: 'StarlitCloud',
      prompt: 'Alone on a Saturday night and feeling like nobody cares.',
      neededEnergy: 'Gentle Comfort & Hugs',
      notes: [
        'I am reading your note right now and I care that you are here tonight. You matter.',
        'Drink warm tea and wrap up in a blanket. Dawn will come.',
      ],
      timeAgo: '45 mins ago',
    ),
  ];
});
