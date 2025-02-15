# App Router 시작하기

## Page 컴포넌트에 async 함수를 사용하는 이유

- 서버 컴포넌트의 경우 서버측에서 사전 렌더링을 위해 딱 한번 실행되기 때문에 비동기적으로 동작해도 문제가 발생하지 않는다.

## URL Parameter, Search Params

- 반드시 Promise를 반환하는 타입으로 작성해서 await 키워드를 사용해 동적으로 사용해야 한다.

## Dynamic Route

- [id], [...id]와 같이 동적으로 사용할 수 있는 라우트 (/book/123, /book/123/1234)
- 예를 들어, 책을 찾는 페이지에서 책의 아이디가 없는 경우, 책을 찾는 페이지를 보여줄 수 있다.
- 단 URL 파라미터가 존재하지 않는 경우는 대응이 되지 않는다. (404에러 발생)

## Optional Catch All Segments

- [[...id]]와 같이 선택적으로 사용할 수 있는 라우트
- 예를 들어, 책을 찾는 페이지에서 책의 아이디가 없는 경우, 책을 찾는 페이지를 보여줄 수 있다.
- 책을 찾는 페이지에서 책의 아이디가 없는 경우, 책을 찾는 페이지를 보여줄 수 있다.

## Route Grouping

- 라우트를 그룹으로 묶어서 관리할 수 있다.
- app 디렉터리 내 `()`를 포함한 네이밍으로 폴더를 만들고 그 안에 라우트를 만들면 해당 그룹에 속한 라우트만 레이아웃을 공유할 수 있다.

## Server Component

- App Route 내 모든 컴포넌트는 기본값으로 서버 컴포넌트이다.
- 서버측에서만 실행되는 컴포넌트이다. (브라우저에서는 실행되지 않는다.)
  - 서버 컴포넌트는 사전 렌더링 시점에 딱 1번 실행된다.

### Server Component 주의사항

- Server Component에는 브라우저에서 실행될 코드가 포함되면 안된다.
  - onClick(브라우저 이벤트), useState와 같은 hooks, 브라우저에서 실행되어야할 라이브러리
- Client Component는 Client에서만 실행되는게 아니다.
  - 사전 렌더링을 위해 서버에서 1번 실행되고, hydration을 위해 브라우저에서 1번 실행된다.
  - Client Component에서 console.log를 사용하면 Server에서 1번 console.log가 실행되고 브라우저에서도 1번 console.log가 실행된다
- Client Component는 Server Component 내에서 사용할 수 있다.
  - 상호작용이 필요한 경우는 Client Component를 사용한다.
  - 상호작용이 필요없는 경우 Server Component를 사용한다.
- Client Component에서 Server Component를 import 할 수 없다.
  - 오류가 발생하거나 의도치 않은 문제가 발생할 수 있다.
  - 만약 Server Component를 Client Component에서 import 하게 되면 Server Component를 자동으로 Client Component로 변환하게 된다.
    - 이렇게 되면 자바스크립트 번들의 크기가 늘어나게 되는 현상이므로 지양해야 한다.
    - 만약 Client Component에서 실행해야하는 Server Component라면 Client Component의 children 타입으로 Server Component를 전달하는게 좋다. (Server Component를 Client Component로 변환하지 않는다.)
- Server Component에서 Client Component에게 직렬화 되지 않는 Props는 전달이 불가하다.
  - 직렬화란 객체, 배열 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태로 변환하는 것이다.
  - 함수는 직렬화가 불가능하다. (단순한 문자열이나 바이트로 직렬화 할 수 없다.)

## 네비게이팅

- App Router에서는 페이지 이동 요청이 발생하면 서버에서 JS Bundle과 RSC Payload를 생성해서 전달한다.
- 이 후 JS를 실행(컴포넌트 교체) 시점에 RSC Payload와 합쳐서 브라우저에서 실행되고 페이지가 교체된다.
  - 정적인 Static 페이지는 Production 시점에 prefetch가 발생한다. (RSC Payload + JS Bundle)
  - 동적인 Dynamic 페이지는 RSC Payload만 prefetch가 발생한다. (JS Bundle prefetch 되지 않고 브라우저에서 실행된다.)

## 데이터 페칭

- 페이지 라우터와 앱 라우터의 큰 차이점은 페이지 함수에서 `async` 키워드를 사용할 수 있다는 점이 있다.
  - 페이지 라우터 방식에서는 `async` 함수처럼 비동기로 처리하게 되면 hydration, 메모이제이션 과정에서 문제가 생길 수 있어서 불가능하다.
  - 앱 라우터에서는 페이지에 `async` 키워드를 사용해 `await`로 데이터를 불러올 수 있다

### 데이터 캐시

- fetch 메서드를 활용해서 불러온 데이터를 Next 서버에서 보관하는 기능
  - 영구적으로 데이터를 보관하거나, 특정 시간을 주기로 갱신 시키는 작업을 할 수 있다.
  - 오직 fetch 메서드에서만 활용이 가능하다.
  - 캐시의 기본값은 캐시를 하지 않는다. ( 아무런 옵션을 넣지 않았을때 기본값으로 캐시를 하지 않는다. )
    - Nextjs 14에서는 기본적으로 캐시하는 옵션으로 동작한다.
  - 캐시 기능을 활성화 한 경우 서버가 중단될때까지 캐시를 유지한다.

### 데이터 캐시 설정

```js
// 요청의 결과를 무조건 캐싱한다. ( 한번 호출된 이후에는 다시 호출되지 않는다. )
const response = await fetch(API_URL, { cache: "force-cache" });

// 요청의 결과를 캐싱하지 않는다. ( 캐싱을 하지 않도록 설정하는 옵션 )
const response = await fetch(API_URL, { cache: "no-store" });

// 요청의 결과를 10초마다 갱신한다. ( ISR )
const response = await fetch(API_URL, { revalidate: 10 });

// 특정 태그를 가진 요청의 결과를 캐싱한다. ( on-demand Revalidate )
const response = await fetch(API_URL, { tags: ["a"] });
```

### Request Memoization

- 중복된 API 요청을 자동으로 하나의 요청으로 최적화 해주는 기능이다.
  - 하나의 페이지에서 발생하는 중복된 요청을 캐싱해서 중복으로 요청되지 않는다.
  - 데이터 캐시 기능과는 다른 기능이다. ( 렌더링이 종료되면 모든 캐시가 소멸된다. )
  - 서버 컴포넌트가 도입되면서 컴포넌트 별로 API를 요청해서 사용할 수 있기 때문에 중복된 API 요청이 발생하지 않도록 하기 위해 사용된다.

## 풀 라우트 캐시

- Next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능
  - 기존 페이지 라우팅 방식에서 사용하던 SSG와 비슷한 방식이다.
  - revalidate가 가능하다. (ISR 방식)

### Dynamic Page로 설정되는 기준

- 캐시되지 않는 Data Fetching을 사용할 경우 ( 특정 페이지가 접속요청을 받을때 마다 매번 변화가 생기거나 데이터가 달라질 경우 )
  - 페이지에서 사용하는 데이터가 많을 경우 (cache option을 사용하지 않는 경우)
- 동적 함수 (쿠키, 헤더, 쿼리스트링)을 사용하는 컴포넌트가 있을때
  - 요청에 따라 값을 가져오는 동적 기능을 사용하는 경우
- 유저의 액션으로 결정되는 페이지는 Static Page로 전환하기 보다는 데이터 캐시만 진행해서 Dynamic Page로 둘 수 밖에 없다.

### Static Page로 설정되는 기준

- Dynamic Page가 아니면 모두 Static Page가 된다. (default)
- Static Page에만 풀 라우트 캐시가 적용된다.
- generateStaticParams 함수를 이용해 정적으로 데이터를 생성할 수 있다.
  - generateStaticParams 함수에서 전달할 각 각의 파라미터는 string 타입이어야 한다.
  - 빌드시점에 만들어지지 않은 정적 페이지는 Next.js 서버에서 동적으로 접근한 후 데이터가 변경되지 않는다고 판단되면 자동으로 정적 파일로 캐싱한다.
  - generateStaticParams로 전달하지 않은 파라미터를 404 페이지로 처리하려면 `dynamicParams` 옵션을 `false`로 설정해야 한다.
