import BookItem from "@/components/book-item";
import { API_URL } from "@/lib/constants";
import { BookData } from "@/types";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(`${API_URL}/book/search?q=${q}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q} fallback={<div>Loading...</div>}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
