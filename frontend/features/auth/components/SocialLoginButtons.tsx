import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SocialLoginButtonsProps {
  type?: "login" | "signup";
}

export function SocialLoginButtons({ type = "login" }: SocialLoginButtonsProps) {
  return (
    <View style={styles.container}>
      {/* 구분선 */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerTextContainer}>
          <Text style={styles.dividerText}>
            {type === "login" ? "간편로그인" : "간편가입"}
          </Text>
        </View>
      </View>

      {/* 소셜 로그인 버튼들 */}
      <View style={styles.buttonsContainer}>
        {/* 구글 */}
        <TouchableOpacity style={[styles.button, styles.googleButton]}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </Svg>
        </TouchableOpacity>

        {/* 카카오 */}
        <TouchableOpacity style={[styles.button, styles.kakaoButton]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000000">
             <Path d="M12 3C7.03 3 3 6.61 3 11.05c0 2.84 1.88 5.34 4.68 6.72l-1.24 4.56c-.06.25.18.45.41.33l5.33-3.35c.27.02.54.04.82.04 4.97 0 9-3.61 9-8.05S16.97 3 12 3z"/>
          </Svg>
        </TouchableOpacity>

        {/* 네이버 */}
        <TouchableOpacity style={[styles.button, styles.naverButton]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="white">
            <Path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dividerContainer: {
    position: 'relative',
    height: 20,
    justifyContent: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#d1d5db', // gray-300
    top: 10,
  },
  dividerTextContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    position: 'relative',
  },
  dividerText: {
    fontSize: 14,
    color: '#6b7280', // gray-500
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16, // space-x-4
  },
  button: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 24, // rounded-full
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#f3f4f6', // gray-100
    borderWidth: 1,
    borderColor: '#d1d5db', // border-gray-300
  },
  kakaoButton: {
    backgroundColor: '#facc15', // yellow-400
  },
  naverButton: {
    backgroundColor: '#22c55e', // green-500
  },
});
