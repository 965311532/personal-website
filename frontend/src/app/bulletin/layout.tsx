import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Newspaper } from "lucide-react";

export default function BulletinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link
              href="/bulletin"
              className="flex items-center gap-2.5 group"
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Newspaper className="size-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Bulletin
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/bulletin"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/bulletin/admin"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                Admin
              </Link>
              <div className="w-px h-5 bg-border/50 mx-1" />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-border/40 mt-auto bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Bulletin — AI-powered digest of your conversations
          </p>
        </div>
      </footer>
    </div>
  );
}
