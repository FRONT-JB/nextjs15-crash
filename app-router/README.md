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
