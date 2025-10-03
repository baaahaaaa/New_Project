import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Plateforme Éducative Innovante
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bienvenue sur le futur de l'apprentissage en ligne.
        </p>
        <div className="mt-8">
          <Button>Commencer l'aventure</Button>
        </div>
      </div>
    </main>
  );
}