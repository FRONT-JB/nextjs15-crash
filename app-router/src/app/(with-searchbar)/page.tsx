import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { API_URL } from "@/lib/constants";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function AllBooks() {
  await delay(1500);

  const response = await fetch(`${API_URL}/book`, { cache: "force-cache" });

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);

  const response = await fetch(`${API_URL}/book/random`, {
    next: {
      revalidate: 3,
    },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 스트리밍을 적용하기 위해 강제로 dynamic을 사용합니다.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense fallback={<div>RecoBooks Loading...</div>}>
          <RecoBooks />
        </Suspense>
      </section>

      <section>
        <h3>등록된 모든 도서</h3>

        <Suspense fallback={<div>AllBooks Loading...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
