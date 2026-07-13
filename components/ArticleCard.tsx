import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="panel panel-hover flex flex-col overflow-hidden">
      <Link href={`/articles/${article.slug}`} prefetch={false} className="flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden border-b border-line">
          {article.cover_image ? (
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          ) : (
            <div className="cover-placeholder flex h-full w-full items-center justify-center">
              <span className="font-display text-3xl font-bold text-brand/60">
                {article.category.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className="label-eyebrow rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-brand">
              {article.category}
            </span>
            <time dateTime={article.created_at} className="text-xs text-text-dim">
              {formatDate(article.created_at)}
            </time>
          </div>

          <h3 className="font-display text-lg font-bold leading-snug text-text">
            {article.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-text-dim">
            {article.excerpt}
          </p>

          <span className="mt-1 text-sm font-semibold text-brand">Read analysis &rarr;</span>
        </div>
      </Link>
    </article>
  );
}
