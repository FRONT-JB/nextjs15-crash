import BookItem from "@/components/book-item";
import { API_URL } from "@/lib/constants";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  await delay(1500);

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
