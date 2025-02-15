import { API_URL } from "@/lib/constants";
import style from "./page.module.css";
import { BookData } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(`${API_URL}/book`);

  const allBooks: BookData[] = await response.json();

  return allBooks.map((book) => ({
    id: book.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(`${API_URL}/book/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다.</div>;
  }

  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  }: BookData = await response.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={style.title}>{title}</div>

      <div className={style.subTitle}>{subTitle}</div>

      <div className={style.author}>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}
