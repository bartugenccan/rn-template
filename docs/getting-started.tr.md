---
title: Expo RN Template Başlangıç Rehberi
summary: Expo SDK 54, React Navigation 7 ve TanStack Query 5 ile modern React Native proje şablonunu nasıl kullanacağınızı adım adım öğrenin.
---

# Başlangıç Rehberi

Bu repo, Expo SDK 54 + React Native 0.81 tabanlı, TypeScript kullanan ve veri katmanında TanStack Query içeren modern bir başlangıç projesidir. Aşağıdaki rehber, şablonu klonladığınız andan itibaren uygulamayı üretken şekilde nasıl geliştireceğinizi anlatır.

## Klasör Yapısı

```
.
├── api/                # Axios istemcisi, endpoint sabitleri ve TanStack Query hook'ları
├── components/         # Paylaşılan UI bileşenleri (örn. CustomTabBar, CustomText)
├── config/             # Ortam değişkenleri ve yapılandırmalar
├── constants/          # Renk, tipografi gibi statik tanımlar
├── hooks/              # Proje geneli özel hook'lar
├── i18n/               # Çok dillilik yapılandırması (i18next + react-i18next)
├── navigation/         # React Navigation stack/tab yapıları
├── screens/            # Özelleştirilmiş ekranlar
├── types/              # TypeScript tipleri
├── app.config.ts       # Expo yapılandırması (typed config)
└── App.tsx             # Giriş noktası, QueryClient ve Navigation provider'ları
```

## API ve TanStack Query Katmanı

- `api/client.ts`: Axios kurulumunu, token ekleyen interceptor'ları içerir.
- `api/services/*.ts`: REST çağrılarını yapan saf fonksiyonlar ve bunları saran TanStack Query hook'ları bulunur.
  - `useLoginMutation`, `useRegisterMutation` gibi mutasyonlar `auth.service.ts` içinde.
  - `useUserProfileQuery`, `useUpdateProfileMutation` ile profil verisi otomatik önbelleğe alınır.
- Sorgu anahtarları (`userQueryKeys`) sayesinde `invalidateQueries` çağrıları ile önbellek senkron kalır.
- `App.tsx` içinde uygulama `QueryClientProvider` ile sarılır; AppState üzerinden odak yönetimi yapılır.

### Örnek Kullanım

```tsx
import { useLoginMutation } from '@/api';

const LoginForm = () => {
  const { mutateAsync: login, isPending } = useLoginMutation();

  const handleSubmit = async (values: LoginRequest) => {
    await login(values);
  };

  return <Button title={isPending ? 'Gönderiliyor...' : 'Giriş Yap'} onPress={handleSubmit} />;
};
```

## Navigasyon Yapısı

- React Navigation 7 tabanlı Stack + BottomTab birleşimi kullanılır.
- `navigation/AppNavigator.tsx` kök yönlendirme olup auth/main stack'leri durum bazlı seçer.
- `MainNavigator` tab + modal ekranları yönetirken `TabNavigator` özel tab bar bileşeni (`components/CustomTabBar`) ile çalışır.
- Tip güvenliği için `types/navigation` altındaki `ParamList` ve rotalar güncel tutulmalıdır.

## Stil ve UI Katmanı

- `constants/Colors.ts` ve `Typography.ts` birleşik tema öğelerini barındırır.
- `components/CustomText` ve `react-native-size-matters` ile tek tip tipografi/ölçekleme sağlanır.
- SafeArea, Gesture Handler gibi sağlayıcılar doğrudan `App.tsx` içinde sarılmıştır.

## Çok Dillilik (i18n)

- `i18n/index.ts` dosyası i18next yapılandırmasını yapar ve `en.json`, `tr.json` dosyalarını yükler.
- Yeni dil eklemek için `i18n/locales/<language>.json` oluşturup `i18n/index.ts` içine dahil edin.
- Metinler `useTranslation` hook'u veya `Trans` bileşeni ile kullanılabilir.

## En İyi Uygulamalar

- API çağrılarına yeni endpoint eklendiğinde hem saf fonksiyon hem de ilgili Query hook'unu oluşturun.
- `QueryClient` varsayılan ayarları 60 saniyelik `staleTime` sağlar; ihtiyaç halinde `useQuery` içinde override edin.
- Her yeni ekran için `screens/<ScreenName>/index.ts` + `<ScreenName>.tsx` yapısını takip edin.
- Lint ve tip kontrolünü CI/CD'ye ekleyin: `npm run lint && npm run typecheck`.

## Sık Karşılaşılan Sorular

**S: Yeni bir modül kurdum, Expo şikayet ediyor.**

> `npx expo install <paket>` komutunu kullanın; Expo SDK ile uyumlu sürüm seçer.

**S: Token yenileme işlemi nasıl yönetilecek?**

> `axiosInstance` içinde 401 cevaplarını yakalayabilir veya TanStack Query `mutation.onError` içinde yönlendirme yapabilirsiniz. İhtiyaç duyarsanız Refresh token akışını `client.ts` içinde genişletebilirsiniz.

**S: Native projeye geçmek istiyorum.**

> `expo prebuild` komutu ile `ios/` ve `android/` klasörlerini üretin, ardından platforma özel adımları izleyin.

## Sonraki Adımlar

- Uygulama ikon/splash görsellerini `assets/images` altında güncelleyin.
- Modülleriniz için Storybook veya Jest setup'ı eklemeyi değerlendirin.
- CI/CD pipeline'ınıza `expo-doctor` ve yayınlama iş akışlarını ekleyin.

Hazırsınız! Şablonu temel alarak ihtiyacınıza göre ekranlar, servisler ve tema katmanını genişletebilirsiniz. Sorularınız için dokümana yeni bölümler eklemekten çekinmeyin.
