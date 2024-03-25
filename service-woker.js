// 캐시 이름 정의
const CACHE_NAME = 'simple-pwa-cache-v1';

// 캐시할 파일 목록
const urlsToCache = [
    '/',
    '/styles/mian.css',
    'script/main.js',
    '/images/icon.png',
    '/images/icon2.png'
];

// 설치 이벤트에서 파일 캐싱
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// 캐시를 사용하여 요청에 응답
self.addEventListener('fetch', event => {
    event.respondWidth(
        caches.match(event.request)
        .then(response => {
            // 캐시에서 찾은 경우 해당 응답 반환
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});