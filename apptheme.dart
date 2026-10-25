import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Soothing Sage Forest color palette
  static const Color seedColor = Color(0xFF1B4332);
  static const Color primarySage = Color(0xFF2D6A4F);
  static const Color accentAmber = Color(0xFFD4A373);
  static const Color backgroundLight = Color(0xFFFBFBFA);
  static const Color surfaceLight = Color(0xFFFFFFFF);

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: seedColor,
      primary: primarySage,
      secondary: accentAmber,
      surface: surfaceLight,
      brightness: Brightness.light,
    ),
    scaffoldBackgroundColor: backgroundLight,
    textTheme: GoogleFonts.plusJakartaSansTextTheme().copyWith(
      displayLarge: GoogleFonts.outfit(fontWeight: FontWeight.bold),
      displayMedium: GoogleFonts.outfit(fontWeight: FontWeight.bold),
      headlineMedium: GoogleFonts.outfit(fontWeight: FontWeight.w600),
      titleLarge: GoogleFonts.outfit(fontWeight: FontWeight.w600),
    ),
    cardTheme: CardTheme(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: const BorderSide(color: Color(0xFFE7E5E4), width: 1),
      ),
      color: Colors.white,
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      ),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: seedColor,
      brightness: Brightness.dark,
    ),
    scaffoldBackgroundColor: const Color(0xFF0C100E),
    textTheme: GoogleFonts.plusJakartaSansTextTheme(ThemeData.dark().textTheme),
  );
}
