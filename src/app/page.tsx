import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border border-red-500">
      <div>Hello World.

        <Button>Click me</Button>
      </div>
    </main>
  );
}
