import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">EduPlatform</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/courses"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Cours
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Inscription</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}