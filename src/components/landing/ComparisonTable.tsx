import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ComparisonTable() {
  const rows = [
    {
      feature: "Setup",
      vectorDb: "Requires Docker, API keys, or cloud infrastructure.",
      memori: "Zero-Config. Creates a local memori.db SQLite file instantly.",
    },
    {
      feature: "Scalability",
      vectorDb: "Manual migration needed.",
      memori:
        "Pluggable. Scale from local SQLite to Postgres/Supabase seamlessly.",
    },
    {
      feature: "Integration",
      vectorDb: "You write the RAG pipeline logic manually.",
      memori:
        "Auto-Augmentation. Patches the LLM client to inject memory automatically.",
    },
    {
      feature: "Complexity",
      vectorDb: "High (Embeddings, Chunking, Retrieval).",
      memori: "Low. Handles embedding generation and retrieval internally.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Memori vs Standard Vector DBs
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Stop building complex RAG pipelines. Let Memori handle context
          injection automatically.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Standard Vector DB</TableHead>
              <TableHead className="text-primary font-bold">
                Memori.ts
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.feature}</TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  {row.vectorDb}
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {row.memori}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
