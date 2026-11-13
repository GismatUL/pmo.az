"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, shortDate, type Post } from "@/lib/posts";
import { ARROW } from "@/lib/site";

const PAGE = 6;

/** Blog category chips + article grid with "load more" (Figma 16:414). */
export function BlogList({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState("Hamısı");
  const [limit, setLimit] = useState(PAGE);
  const filtered = category === "Hamısı" ? posts : posts.filter((p) => p.category === category);
  const visible = filtered.slice(0, limit);

  return (
    <>
      <div className="chips chips--label chips--cream" role="group" aria-label="Kateqoriyalar">
        {["Hamısı", ...CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setLimit(PAGE);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <h2 className="t-h1 c-ink">Son yazılar</h2>

      <div className="article-grid">
        {visible.map((p) => (
          <ArticleCard key={p.slug} post={p} label={`${p.kind}  /  ${shortDate(p.date)}`} />
        ))}
        {visible.length === 0 && <p className="t-body c-muted">Bu kateqoriyada hələ yazı yoxdur.</p>}
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        disabled={filtered.length <= limit}
        onClick={() => setLimit((l) => l + PAGE)}
      >
        {"Daha çox yazı  ↓"}
      </button>
    </>
  );
}

export function ArticleCard({
  post,
  label,
  action = "Oxumağa davam et",
  short = false,
}: {
  post: Post;
  label: string;
  action?: string;
  short?: boolean;
}) {
  return (
    <article className="article-card">
      <p className="t-label c-muted">{label}</p>
      <h3 className="t-h2 c-ink">
        <Link href={`/blog/${post.slug}`}>{short ? (post.shortTitle ?? post.title) : post.title}</Link>
      </h3>
      <Link className="label-link c-ink" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        {`${action}${ARROW}`}
      </Link>
    </article>
  );
}
