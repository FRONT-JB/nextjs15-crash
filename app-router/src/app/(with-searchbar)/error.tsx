"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { refresh } = useRouter();

  return (
    <div>
      <h1>{error.message}</h1>
      <button
        onClick={() => {
          // 함수 하나를 인수로 받아서 해당 함수 내부의 코드를 동기적으로 실행한다.
          startTransition(() => {
            // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러온다.
            refresh();
            // 에러 상태를 초기화 하고 컴포넌트들을 다시 렌더링한다.
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
