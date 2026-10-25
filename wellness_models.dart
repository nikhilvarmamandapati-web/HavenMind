import 'package:flutter/material.dart';

enum EmotionalBandwidth { gentle, balanced }

enum PostIntent {
  needsGentleListening('Just Listening'),
  noAdvicePlease('No Advice Please'),
  adviceWelcome('Advice Welcome'),
  smallWin('Small Win');

  final String label;
  const PostIntent(this.label);
}

class CommunityPost {
  final String id;
  final String authorName;
  final String title;
  final String content;
  final PostIntent intent;
  final String timeAgo;
  final bool isSensitive;
  final String? sensitiveNotice;
  int holdingSpaceCount;
  int gentleHugCount;
  int iHearYouCount;
  final List<String> comments;

  CommunityPost({
    required this.id,
    required this.authorName,
    required this.title,
    required this.content,
    required this.intent,
    required this.timeAgo,
    this.isSensitive = false,
    this.sensitiveNotice,
    this.holdingSpaceCount = 0,
    this.gentleHugCount = 0,
    this.iHearYouCount = 0,
    List<String>? comments,
  }) : comments = comments ?? [];
}

class KindnessBeacon {
  final String id;
  final String requesterName;
  final String prompt;
  final String neededEnergy;
  final List<String> notes;
  final String timeAgo;

  KindnessBeacon({
    required this.id,
    required this.requesterName,
    required this.prompt,
    required this.neededEnergy,
    required this.notes,
    required this.timeAgo,
  });
}

class DistortionResult {
  final String name;
  final String explanation;
  final String gentleReframe;

  DistortionResult({
    required this.name,
    required this.explanation,
    required this.gentleReframe,
  });
}
