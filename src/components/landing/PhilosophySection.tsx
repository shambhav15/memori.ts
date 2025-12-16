import { Quote } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-4xl mx-auto">
        <Quote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" />

        <h2 className="text-4xl font-bold tracking-tight mb-8">
          "Memory should be invisible."
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Most "Memory" libraries are just complex wrappers around vector
          stores. Memori-JS takes a different approach: as a developer, you
          shouldn't care
          <em>how</em> the relevant context is found, only that your agent{" "}
          <em>has</em> it.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="bg-muted px-4 py-2 rounded-full">
            SQLite/Postgres Native
          </span>
          <span className="bg-muted px-4 py-2 rounded-full">
            Client-Side Patching
          </span>
          <span className="bg-muted px-4 py-2 rounded-full">
            Zero Configuration
          </span>
        </div>
      </div>
    </section>
  );
}
