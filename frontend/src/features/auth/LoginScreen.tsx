// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Label } from "./components/ui/label";
// import { Search, Mail } from "lucide-react";

import { Button, Text, TextInput, View } from "react-native";

// 로그인 화면 컴포넌트
export default function LoginScreen() {
  return (
    <View className="min-h-screen bg-white flex items-center justify-center p-4">
      <View className="w-full max-w-md space-y-8">
        {/* 로고 */}
        <View className="text-center">
          <View className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-lg mb-4">
            <Text className="text-2xl font-bold">M</Text>
          </View>
        </View>

        {/* 브랜드명과 슬로건 */}
        <View className="text-center space-y-2">
          <Text className="text-3xl font-bold text-slate-800">마이레시피</Text>
          <Text className="text-gray-500 text-sm">맛있는 요리의 시작</Text>
        </View>

        {/* 로그인 폼 */}
        <View className="space-y-6">
          <View className="space-y-4">
            <View className="space-y-2">
              <Text>아이디</Text>
              <TextInput
                id="username"
                keyboardType="email-address"
                placeholder="아이디를 입력하세요"
                className="h-12 border-gray-300 focus:border-slate-600"
              />
            </View>
            <View className="space-y-2">
              <Text>비밀번호</Text>
              <TextInput
                id="password"
                keyboardType="visible-password"
                placeholder="비밀번호를 입력하세요"
                className="h-12 border-gray-300 focus:border-slate-600"
              />
            </View>
          </View>

          {/* 로그인 버튼 */}
          <Button onPress={() => {}} className="w-full h-12 bg-black hover:bg-gray-800 text-white">
            <Text>로그인</Text>
          </Button>

          {/* 아이디찾기 / 비밀번호찾기 */}
          <View className="flex justify-center space-x-8">
            <Button onPress={() => {}} className="text-gray-500 text-sm hover:text-slate-700"><Text>아이디찾기</Text></Button>
            <View className="text-gray-300">|</View>
            <Button onPress={() => {}} className="text-gray-500 text-sm hover:text-slate-700"><Text>비밀번호찾기</Text></Button>
          </View>

          {/* 회원가입 */}
          <View className="text-center">
            <Button onPress={() => {}} className="text-gray-500 text-sm hover:text-slate-700"><Text>회원가입</Text></Button>
          </View>

          {/* 구분선 */}
          <View className="relative">
            <View className="absolute inset-0 flex items-center">
              <View className="w-full border-t border-gray-300"></View>
            </View>
            <View className="relative flex justify-center text-sm">
              <Text className="px-2 bg-white text-gray-500">간편로그인</Text>
            </View>
          </View>

          {/* 소셜 로그인 */}
          <View className="flex justify-center space-x-4">
            {/* 구글 */}
            <Button onPress={() => {}} className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300">
              <Text>구글</Text>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </Button>

            {/* 카카오 */}
            <Button onPress={() => {}} className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center">
              <Text>카카오</Text>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
                <path d="M12 3C7.03 3 3 6.61 3 11.05c0 2.84 1.88 5.34 4.68 6.72l-1.24 4.56c-.06.25.18.45.41.33l5.33-3.35c.27.02.54.04.82.04 4.97 0 9-3.61 9-8.05S16.97 3 12 3z"/>
              </svg>
            </Button> 

            {/* 네이버 */}
            <Button onPress={() => {}} className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center">
              <Text>네이버</Text>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
            </Button> 
          </View>
        </View>
      </View>
    </View>
  );
}