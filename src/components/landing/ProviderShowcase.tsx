import { CodeBlock } from "../ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Provider {
  id: string;
  name: string;
  code: string;
}

export function ProviderShowcase() {
  const providers: Provider[] = [
    {
      id: "openai",
      name: "OpenAI",
      code: `// 1. Initialize Memory
const memori = new Memori();

// 2. Register for auto-augmentation
memori.llm.register(client);

// 3. Every call is memory-augmented!
await client.chat.completions.create({
  model: "gpt-4",
  messages: [...]
});`,
    },
    {
      id: "google",
      name: "Google GenAI",
      code: `// 1. Initialize Memory
const memori = new Memori();

// 2. Register Gemini
memori.llm.register(client);

// 3. Use Gemini as normal
await client.models.generateContent({
  model: "gemini-pro",
  contents: [...]
});`,
    },
    {
      id: "anthropic",
      name: "Anthropic",
      code: `// 1. Initialize Memory
const memori = new Memori();

// 2. Patch Claude
memori.llm.register(client);

// 3. Claude has persistent memory
await client.messages.create({
  model: "claude-3-opus",
  messages: [...]
});`,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Provider Agnostic
          </h2>
          <p className="text-muted-foreground text-base max-w-xl">
            Works seamlessly with OpenAI, Google GenAI, and Anthropic. One line
            to register.
          </p>
        </div>

        <Tabs defaultValue="openai" className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            {providers.map((provider) => (
              <TabsTrigger key={provider.id} value={provider.id}>
                {provider.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="hidden md:block">
            {/* Spacer for desktop layout if needed, or keeping tabs aligned right */}
          </div>
        </Tabs>
      </div>

      <div className="w-full">
        <Tabs defaultValue="openai" className="w-full" value={undefined}>
          {/* Note: We are controlling the tabs via the list above, but for simplicity in this unstructured component we might need to unify state if we want the list to control the content below. 
               Actually standard Shadcn Tabs component expects TabsList and TabsContent to be children of the same Tabs root. 
               Let's refactor to keep them together. */}
        </Tabs>

        {/* Re-implementing correctly with single Root */}
        <Tabs defaultValue="openai" className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="text-left">
              {/* Mobile header repeated or just assume the top header covers it? Let's use the top header for text and put TabsList here */}
            </div>
            <TabsList className="w-full md:w-auto">
              {providers.map((provider) => (
                <TabsTrigger key={provider.id} value={provider.id}>
                  {provider.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {providers.map((provider) => (
            <TabsContent key={provider.id} value={provider.id} className="mt-0">
              <div className="rounded-xl border bg-muted/30 p-1 backdrop-blur-sm">
                <CodeBlock
                  code={provider.code}
                  language="typescript"
                  className="text-sm"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
