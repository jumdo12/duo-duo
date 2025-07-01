# duo-duo

**듀오해듀오**는 사용자들이 효율적으로 협업하고, 다양한 리소스를 관리할 수 있도록 돕는 웹 기반 플랫폼입니다. 프론트엔드 정적 리소스 관리와 구조화에 중점을 두고 있습니다.

---

# duo-duo 프론트엔드 리소스 구조

이 프로젝트는 프론트엔드 정적 리소스를 다음과 같이 관리합니다.

## 디렉토리 구조

```
duo-duo/
└── resources/
    └── static/
        ├── js/
        │   └── script.js
        ├── css/
        │   └── style.css
        └── html/
            └── index.html
```

- `resources/static/js/` : 자바스크립트 파일 보관
- `resources/static/css/` : 스타일(CSS) 파일 보관
- `resources/static/html/` : HTML 파일 보관

## 파일 이동 내역
- 기존 `duo-duo/` 폴더 내의 `script.js`, `style.css`, `index.html` 파일을 각각 위 구조에 맞게 이동하였습니다.

## 사용 방법
정적 리소스가 필요할 때 위 경로에서 파일을 참조하면 됩니다.

---

문의: hanseung-yeon 